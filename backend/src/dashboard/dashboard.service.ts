import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getDashboardData(userId: string) {
    const now = new Date();
    const next7Days = new Date();
    next7Days.setDate(now.getDate() + 7);

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(now.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const totalClients = await this.prisma.client.count({
      where: { user_id: userId },
    });

    const totalProjects = await this.prisma.project.count({
      where: { user_id: userId },
    });

    const upcomingReminders = await this.prisma.reminder.findMany({
      where: {
        user_id: userId,
        is_completed: false,
        due_date: {
          gte: now,
          lte: next7Days,
        },
      },
      orderBy: { due_date: 'asc' },
      take: 5,
    });

    const totalDueReminders = await this.prisma.reminder.count({
      where: {
        user_id: userId,
        is_completed: false,
        due_date: {
          gte: now,
          lte: next7Days,
        },
      },
    });

    const totalActiveProjects = await this.prisma.project.count({
      where: {
        user_id: userId,
        status: {
          in: ['PLANNING', 'IN_PROGRESS', 'ON_HOLD'],
        },
      },
    });

    const projectsByStatusRaw = await this.prisma.project.groupBy({
      by: ['status'],
      where: { user_id: userId },
      _count: {
        status: true,
      },
    });

    const projectsByStatus = projectsByStatusRaw.map((item) => ({
      status: item.status,
      count: item._count.status,
    }));

    const projectStatusPie = {
      labels: projectsByStatus.map((item) => item.status),
      series: projectsByStatus.map((item) => item.count),
    };

    return {
      data: {
        summary: {
          totalClients,
          totalProjects,
          totalDueReminders,
          totalActiveProjects,
        },
        upcomingReminders,
        projectsByStatus,
        chartsData: {
          projectStatusPie,
          remindersDueByDay: {
            labels: [],
            series: [],
          },
          projectsCreatedByMonth: {
            labels: [],
            series: [],
          },
        },
      },
      message: 'Dashboard data retrieved successfully',
    };
  }
}
