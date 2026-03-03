import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Get,
  Patch,
  Res,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import type { LoginUserDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto, RegisterDto } from './auth.schema';
import { UserSession } from '@prisma/client';
import { randomUUID } from 'crypto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const sessionInfo: Partial<UserSession> = {
      ip_address: req.ip ?? null,
      user_agent: req.headers['user-agent'] ?? null,
      device_id: randomUUID(),
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };

    const { access_token, refresh_token, user } =
      await this.authService.register(dto as any, sessionInfo as any);

    this.setCookie(response, { access_token, refresh_token });

    return { user, message: 'User has been registered successfully' };
  }

  private setCookie(
    response: Response,
    {
      access_token,
      refresh_token,
    }: { access_token: string; refresh_token: string },
  ) {
    response.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const sessionInfo: Partial<UserSession> = {
      ip_address: req.ip ?? null,
      user_agent: req.headers['user-agent'] ?? null,
      device_id: randomUUID(),
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };

    const { access_token, refresh_token, user } =
      await this.authService.credentialsLogin(
        loginDto as any,
        sessionInfo as any,
      );

    this.setCookie(response, { access_token, refresh_token });

    return {
      message: 'User logged in successfully',
      user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req: any) {
    const user = await this.authService.getUserProfile(req.user.sub);
    return {
      message: "Authenticated user's profile retrieved successfully",
      user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout-all')
  async logoutAll(@Req() req: any) {
    return this.authService.logoutAll(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  async changePassword(
    @Req() req: any,
    @Body() body: { oldPassword: string; newPassword: string },
  ) {
    return this.authService.changePassword(
      req.user.id,
      body.oldPassword,
      body.newPassword,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: any) {
    return this.authService.logout(req.user.sessionId);
  }
}
