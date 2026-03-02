import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { User, UserSession } from '@prisma/client';
import { LoginUserDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';
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
    sessionInfo: UserSession,
  ): Promise<{
    access_token: string;
    refresh_token: string;
    user: SafeUser;
  }> {
    const hashedPassword = await bcrypt.hash(
      createAuthDto.password,
      this.saltRound,
    );

    const user = await this.userService.create({
      ...createAuthDto,
      password: hashedPassword,
      auth_provider: 'credentials',
    });
    const session = await this.createSession(user.id, sessionInfo);
    const tokens = await this.generateTokens(
      {
        sub: user.id,
        email: user.email,
        name: user.name,
      },
      session.id,
    );

    await this.prisma.userSession.update({
      where: { id: session.id },
      data: {
        refresh_token: await bcrypt.hash(tokens.refresh_token, this.saltRound),
      },
    });

    return {
      ...tokens,
      user,
    };
  }

  async credentialsLogin(data: LoginUserDto, sessionInfo: UserSession) {
    const user = await this.userService.findByEmail(data.email);

    if (!user.password) {
      throw new ApiError(HttpStatus.BAD_REQUEST, this.noPassword);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const session = await this.createSession(user.id, sessionInfo);

    const tokens = await this.generateTokens(
      {
        sub: user.id,
        email: user.email,
        name: user.name,
      },
      session.id,
    );

    const { password: _, ...safeUser } = user;

    return {
      ...tokens,
      user: safeUser,
    };
  }

  async refreshToken(refreshToken: string) {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get('JWT_SECRET'),
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

    const isValid = await bcrypt.compare(refreshToken, session.refresh_token);

    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokens = await this.generateTokens(
      {
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

    return { message: 'Password changed successfully' };
  }

  private async createSession(userId: string, sessionInfo: any) {
    return await this.prisma.userSession.create({
      data: {
        user_id: userId,
        ...sessionInfo,
      },
    });
  }

  private async generateTokens(
    user: { sub: string; email: string; name: string },
    sessionId: string,
  ) {
    const accessTokenSecret = this.configService.get('JWT_ACCESS_SECRET');
    const refreshTokenSecret = this.configService.get('JWT_REFRESH_SECRET');

    const payload = {
      sub: user.sub,
      email: user.email,
      name: user.name,
      sessionId,
    };

    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: accessTokenSecret,
    });

    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: refreshTokenSecret,
    });

    return { access_token, refresh_token };
  }
}
