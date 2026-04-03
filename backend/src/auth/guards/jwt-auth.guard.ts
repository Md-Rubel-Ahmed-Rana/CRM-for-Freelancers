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
  private readonly unauthorizedMessage =
    'Unauthenticated access. Please login to access resource(s)';
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
      throw new UnauthorizedException(this.unauthorizedMessage);
    }

    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
      });

      console.log({ payload });

      request.user = payload;
      return true;
    } catch (error: any) {
      if (error?.name !== 'TokenExpiredError') {
        throw new UnauthorizedException();
      }

      if (!refreshToken) {
        throw new UnauthorizedException(this.unauthorizedMessage);
      }

      const refreshPayload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      const session = await this.prisma.userSession.findUnique({
        where: { id: refreshPayload.sessionId },
      });

      if (!session || session.is_revoked) {
        throw new UnauthorizedException(
          'Session invalid. Please log in again.',
        );
      }

      if (!session || !session.refresh_token) {
        throw new UnauthorizedException(
          'Session invalid. Please log in again.',
        );
      }

      const isValid = await bcrypt.compare(refreshToken, session.refresh_token);

      if (!isValid) {
        throw new UnauthorizedException(
          'Session invalid. Please log in again.',
        );
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

      response.cookie(
        'access_token',
        newAccess,
        this.cookieOptions(1000 * 60 * 60 * 24 * 7),
      ); //  7 days

      response.cookie(
        'refresh_token',
        newRefresh,
        this.cookieOptions(30 * 24 * 60 * 60 * 1000),
      ); // 30 days

      request.user = refreshPayload;
      return true;
    }
  }
  cookieOptions: (
    maxAge?: number,
    shouldUseMaxAge?: boolean,
  ) => Record<string, any> = (
    maxAge = 1000 * 60 * 60 * 24 * 7,
    shouldUseMaxAge = true,
  ) => {
    return {
      httpOnly: true,
      secure: true,
      sameSite: 'none' as const,
      maxAge: shouldUseMaxAge ? maxAge : undefined, // by default 7 days
    };
  };
}
