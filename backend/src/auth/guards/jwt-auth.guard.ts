import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  CanActivate,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const accessToken = request.cookies?.access_token;
    const refreshToken = request.cookies?.refresh_token;

    if (!accessToken) {
      throw new UnauthorizedException('Access token missing');
    }

    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
      });

      request.user = payload;
      return true;
    } catch (error) {
      if (error.name !== 'TokenExpiredError') {
        throw new UnauthorizedException();
      }

      if (!refreshToken) {
        throw new UnauthorizedException('Refresh token missing');
      }

      const refreshPayload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      const session = await this.prisma.userSession.findUnique({
        where: { id: refreshPayload.sessionId },
      });

      if (!session || session.is_revoked) {
        throw new UnauthorizedException('Session invalid');
      }

      const isValid = await bcrypt.compare(refreshToken, session.refresh_token);

      if (!isValid) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // 🔄 Rotate tokens
      const newAccess = await this.jwtService.signAsync(refreshPayload, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
      });

      const newRefresh = await this.jwtService.signAsync(refreshPayload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      });

      await this.prisma.userSession.update({
        where: { id: session.id },
        data: {
          refresh_token: await bcrypt.hash(newRefresh, 12),
        },
      });

      response.cookie('access_token', newAccess, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });

      response.cookie('refresh_token', newRefresh, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });

      request.user = refreshPayload;
      return true;
    }
  }
}
