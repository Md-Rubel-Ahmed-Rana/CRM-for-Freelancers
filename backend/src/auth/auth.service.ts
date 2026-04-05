import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { User, UserSession } from '@prisma/client';
import { LoginUserDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiError } from 'src/common/errors/api.error';
import { CreateAuthDto } from './dto/create-auth.dto';

type SafeUser = Omit<User, 'password'>;

@Injectable()
export class AuthService {
  private saltRound = 12;
  private noPassword: string =
    'You did not register with password. Please login with social account or reset password';

  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  async register(
    createAuthDto: CreateAuthDto,
    sessionInfo: Omit<UserSession, 'user_id'>,
  ): Promise<{
    access_token: string;
    refresh_token: string;
    user: SafeUser;
  }> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createAuthDto.email },
    });

    if (existingUser) {
      throw new ApiError(
        HttpStatus.CONFLICT,
        'User already exists with this email. Please login.',
      );
    }

    const hashedPassword = await bcrypt.hash(
      createAuthDto.password,
      this.saltRound,
    );

    return await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          ...createAuthDto,
          password: hashedPassword,
          auth_provider: 'credentials',
          has_password: true,
          is_active: true,
          last_login_at: new Date(),
        },
        omit: {
          password: true,
        },
      });

      const session = await tx.userSession.create({
        data: {
          user_id: user.id,
          ...sessionInfo,
        },
      });

      const tokens = await this.generateTokens(
        {
          id: user.id,
          sub: user.id,
          email: user.email,
          name: user.name,
        },
        session.id,
      );

      await tx.userSession.update({
        where: { id: session.id },
        data: {
          refresh_token: await bcrypt.hash(
            tokens.refresh_token,
            this.saltRound,
          ),
        },
      });

      return {
        ...tokens,
        user,
      };
    });
  }

  async credentialsLogin(
    data: LoginUserDto,
    sessionInfo: Omit<UserSession, 'user_id'>,
  ) {
    const user = await this.userService.findByEmail(data.email);

    if (!user.password) {
      throw new ApiError(HttpStatus.BAD_REQUEST, this.noPassword);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const session = await this.prisma.userSession.create({
      data: {
        user_id: user.id,
        ...sessionInfo,
      },
    });

    const loggedInUser = await this.prisma.user.update({
      where: { id: user.id },
      data: { last_login_at: new Date() },
      omit: { password: true },
    });

    const tokens = await this.generateTokens(
      {
        id: user.id,
        sub: user.id,
        email: user.email,
        name: user.name,
      },
      session.id,
    );

    await this.prisma.userSession.update({
      where: { id: session.id },
      data: { refresh_token: tokens.refresh_token },
    });

    return {
      ...tokens,
      user: loggedInUser,
    };
  }

  async getUserProfile(id: string, sessionId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    });
    if (!user) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'User not found');
    }

    return { ...user, session_id: sessionId };
  }

  async refreshToken(refreshToken: string) {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
    });

    const session = await this.prisma.userSession.findFirst({
      where: {
        user_id: payload.id,
        is_revoked: false,
      },
    });

    if (!session) {
      throw new UnauthorizedException('Session expired');
    }

    if (!session.refresh_token) {
      throw new UnauthorizedException('Session refresh_token missing');
    }

    const isValid = await bcrypt.compare(refreshToken, session.refresh_token);

    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokens = await this.generateTokens(
      {
        id: payload.id,
        sub: payload.id,
        email: payload.email,
        name: payload.name,
      },
      session.id,
    );

    // rotate refresh token
    const hashedRefresh = await bcrypt.hash(
      tokens.refresh_token,
      this.saltRound,
    );

    await this.prisma.userSession.update({
      where: { id: session.id },
      data: { refresh_token: hashedRefresh },
    });

    return tokens;
  }

  async logout(sessionId: string) {
    await this.prisma.userSession.update({
      where: { id: sessionId },
      data: { is_revoked: true },
    });

    return { message: 'Logged out successfully' };
  }

  async logoutAll(userId: string) {
    await this.prisma.userSession.updateMany({
      where: { user_id: userId },
      data: { is_revoked: true },
    });

    return { message: 'Logged out from all devices' };
  }

  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.userService.findById(userId);

    if (!user.password) {
      throw new ApiError(HttpStatus.BAD_REQUEST, this.noPassword);
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Old password incorrect');
    }

    const newHashed = await bcrypt.hash(newPassword, this.saltRound);

    await this.prisma.user.update({
      where: { id: userId },
      data: { password: newHashed },
    });

    // revoke all sessions after password change
    await this.logoutAll(userId);
  }

  async getAllSessions(userId: string, isRevoked = false) {
    const sessions = await this.prisma.userSession.findMany({
      where: { user_id: userId, is_revoked: isRevoked },
    });

    const sortedSessions = sessions
      .map(this.toSessionResponseDto)
      .sort((a, b) => {
        if (a.status === 'active' && b.status === 'revoked') return -1;
        if (a.status === 'revoked' && b.status === 'active') return 1;
        return 0;
      });
    return {
      data: sortedSessions,
      message: 'Sessions retrieved successfully',
    };
  }

  async updateProfile(userId: string, data: Partial<Pick<User, 'name'>>) {
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: data,
      omit: { password: true },
    });
    return {
      data: updatedUser,
      message: 'Profile updated successfully',
    };
  }

  private toSessionResponseDto = (session: any) => ({
    id: session.id,
    deviceId: session.device_id,
    deviceName: session.user_agent,
    ipAddress: session.ip_address,
    createdAt: session.created_at,
    lastActiveAt: session.updated_at,
    expiresAt: session.expires_at,
    status: session.is_revoked ? 'revoked' : 'active',
  });

  private async generateTokens(
    user: { id: string; sub: string; email: string; name: string },
    sessionId: string,
    expiresIn: { access: string; refresh: string } = {
      access: '7d',
      refresh: '30d',
    },
  ) {
    const accessTokenSecret = this.configService.get('JWT_ACCESS_SECRET');
    const refreshTokenSecret = this.configService.get('JWT_REFRESH_SECRET');

    const payload = {
      id: user.id,
      sub: user.sub,
      email: user.email,
      name: user.name,
      sessionId,
    };

    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: expiresIn.access as any,
      secret: accessTokenSecret,
    });

    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: expiresIn.refresh as any,
      secret: refreshTokenSecret,
    });

    return { access_token, refresh_token };
  }
}
