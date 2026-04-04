import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getDashboardData(@Req() req: any) {
    const userId = req?.user?.id || '2417c0a2-ac45-45ec-b556-8e5be659d9c6';
    return this.dashboardService.getDashboardData(userId);
  }
}
