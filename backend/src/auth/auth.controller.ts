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
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto, RegisterDto } from './auth.schema';
import { UserSession } from '@prisma/client';
import { randomUUID } from 'crypto';
import { ChangePasswordValidate } from './auth.validate';

@Controller('auth')
export class AuthController {
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
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const device_id = randomUUID();
    const sessionInfo: Partial<UserSession> = {
      ip_address: req.ip ?? null,
      user_agent: req.headers['user-agent'] ?? null,
      device_id,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };

    const { access_token, refresh_token, user } =
      await this.authService.register(dto as any, sessionInfo as any);

    this.setCookie(response, { access_token, refresh_token, device_id });

    return { user, message: 'User has been registered successfully' };
  }

  private setCookie(
    response: Response,
    {
      access_token,
      refresh_token,
      device_id,
    }: { access_token: string; refresh_token: string; device_id: string },
  ) {
    response.cookie('access_token', access_token, this.cookieOptions());

    response.cookie('refresh_token', refresh_token, this.cookieOptions());

    response.cookie(
      'device_id',
      device_id,
      this.cookieOptions(1000 * 60 * 60 * 24 * 365),
    ); // set 1 year for device_id to identify the device in future logins
  }

  private clearCookies(response: Response) {
    response.clearCookie('access_token', this.cookieOptions(0, false));
    response.clearCookie('refresh_token', this.cookieOptions(0, false));
    response.clearCookie('device_id', this.cookieOptions(0, false));
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const device_id = randomUUID();
    const sessionInfo: Partial<UserSession> = {
      ip_address: req.ip ?? null,
      user_agent: req.headers['user-agent'] ?? null,
      device_id,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };

    const { access_token, refresh_token, user } =
      await this.authService.credentialsLogin(
        loginDto as any,
        sessionInfo as any,
      );

    this.setCookie(response, { access_token, refresh_token, device_id });

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
  @HttpCode(HttpStatus.OK)
  @Post('logout-all')
  async logoutAll(@Req() req: any) {
    await this.authService.logoutAll(req.user.id);
    this.clearCookies(req.res);
    return {
      message: 'Logged out from all devices successfully',
    };
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch('change-password')
  async changePassword(@Req() req: any, @Body() body: ChangePasswordValidate) {
    // clear cookies
    await this.authService.changePassword(
      req.user.sub,
      body.oldPassword,
      body.newPassword,
    );
    this.clearCookies(req.res);
    return {
      message: 'Password changed successfully. Please log in again.',
    };
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Req() req: any) {
    await this.authService.logout(req.user.sessionId);
    this.clearCookies(req.res);
    return {
      message: 'Logged out successfully',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('sessions')
  async getAllSessions(@Req() req: any) {
    const isRevoked = req.query.isRevoked === 'true';
    return await this.authService.getAllSessions(req.user.sub, isRevoked);
  }
}
