import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Reminder } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RemindersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: string,
    payload: {
      client_id: string;
      project_id?: string | null;
      title: string;
      description: string;
      due_date: Date | string;
      is_completed?: boolean;
    },
  ): Promise<Reminder> {
    await this.ensureClientBelongsToUser(payload.client_id, userId);

    if (payload.project_id) {
      await this.ensureProjectBelongsToUser(payload.project_id, userId);

      const project = await this.prisma.project.findUnique({
        where: { id: payload.project_id },
        select: { client_id: true },
      });

      if (project?.client_id !== payload.client_id) {
        throw new BadRequestException(
          'Selected project does not belong to the selected client',
        );
      }
    }

    return this.prisma.reminder.create({
      data: {
        user_id: userId,
        client_id: payload.client_id,
        project_id: payload.project_id ?? null,
        title: payload.title,
        description: payload.description,
        due_date: new Date(payload.due_date),
        is_completed: payload.is_completed ?? false,
      },
    });
  }

  async findAll(
    userId: string,
    filters?: {
      client_id?: string;
      project_id?: string;
      is_completed?: boolean;
      from_date?: string;
      to_date?: string;
      searchTerm?: string;
    },
    page: number = 1,
    limit: number = 10,
  ) {
    const where: Prisma.ReminderWhereInput = {
      user_id: userId,
    };

    if (filters?.client_id) {
      where.client_id = filters.client_id;
    }

    if (filters?.project_id) {
      where.project_id = filters.project_id;
    }

    if (typeof filters?.is_completed === 'boolean') {
      where.is_completed = filters.is_completed;
    }

    if (filters?.from_date || filters?.to_date) {
      where.due_date = {
        ...(filters.from_date && { gte: new Date(filters.from_date) }),
        ...(filters.to_date && { lte: new Date(filters.to_date) }),
      };
    }

    if (filters?.searchTerm) {
      where.OR = [
        {
          title: {
            contains: filters.searchTerm,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: filters.searchTerm,
            mode: 'insensitive',
          },
        },
      ];
    }

    const skip = (page - 1) * limit;

    const reminders = await this.prisma.reminder.findMany({
      where,
      include: {
        client: true,
        project: true,
      },
      orderBy: {
        due_date: 'asc',
      },
      skip,
      take: limit,
    });
    const total = await this.prisma.reminder.count({ where });
    return {
      message: 'Reminders retrieved successfully',
      meta: {
        total,
        page,
        limit,
      },
      data: reminders,
    };
  }

  async findOne(userId: string, reminderId: string): Promise<Reminder> {
    const reminder = await this.prisma.reminder.findUnique({
      where: { id: reminderId },
      include: {
        client: true,
        project: true,
      },
    });

    if (!reminder) {
      throw new NotFoundException('Reminder not found');
    }

    if (reminder.user_id !== userId) {
      throw new ForbiddenException(
        'You are not allowed to access this reminder',
      );
    }

    return reminder;
  }

  async update(
    userId: string,
    reminderId: string,
    payload: {
      client_id?: string;
      project_id?: string | null;
      title?: string;
      description?: string;
      due_date?: Date | string;
      is_completed?: boolean;
    },
  ): Promise<Reminder> {
    const existingReminder = await this.prisma.reminder.findUnique({
      where: { id: reminderId },
    });

    if (!existingReminder) {
      throw new NotFoundException('Reminder not found');
    }

    if (existingReminder.user_id !== userId) {
      throw new ForbiddenException(
        'You are not allowed to update this reminder',
      );
    }

    const finalClientId = payload.client_id ?? existingReminder.client_id;
    const finalProjectId =
      payload.project_id !== undefined
        ? payload.project_id
        : existingReminder.project_id;

    await this.ensureClientBelongsToUser(finalClientId, userId);

    if (finalProjectId) {
      await this.ensureProjectBelongsToUser(finalProjectId, userId);

      const project = await this.prisma.project.findUnique({
        where: { id: finalProjectId },
        select: { client_id: true },
      });

      if (project?.client_id !== finalClientId) {
        throw new BadRequestException(
          'Selected project does not belong to the selected client',
        );
      }
    }

    return this.prisma.reminder.update({
      where: { id: reminderId },
      data: {
        ...(payload.client_id !== undefined && {
          client_id: payload.client_id,
        }),
        ...(payload.project_id !== undefined && {
          project_id: payload.project_id,
        }),
        ...(payload.title !== undefined && { title: payload.title }),
        ...(payload.description !== undefined && {
          description: payload.description,
        }),
        ...(payload.due_date !== undefined && {
          due_date: new Date(payload.due_date),
        }),
        ...(payload.is_completed !== undefined && {
          is_completed: payload.is_completed,
        }),
      },
    });
  }

  async markAsCompleted(userId: string, reminderId: string): Promise<Reminder> {
    const reminder = await this.findOne(userId, reminderId);

    return this.prisma.reminder.update({
      where: { id: reminder.id },
      data: {
        is_completed: true,
      },
    });
  }

  async markAsIncomplete(
    userId: string,
    reminderId: string,
  ): Promise<Reminder> {
    const reminder = await this.findOne(userId, reminderId);

    return this.prisma.reminder.update({
      where: { id: reminder.id },
      data: {
        is_completed: false,
      },
    });
  }

  async toggleCompletion(
    userId: string,
    reminderId: string,
  ): Promise<Reminder> {
    const reminder = await this.findOne(userId, reminderId);

    return this.prisma.reminder.update({
      where: { id: reminder.id },
      data: {
        is_completed: !reminder.is_completed,
      },
    });
  }

  async remove(userId: string, reminderId: string): Promise<Reminder> {
    const reminder = await this.prisma.reminder.findUnique({
      where: { id: reminderId },
    });

    if (!reminder) {
      throw new NotFoundException('Reminder not found');
    }

    if (reminder.user_id !== userId) {
      throw new ForbiddenException(
        'You are not allowed to delete this reminder',
      );
    }

    return this.prisma.reminder.delete({
      where: { id: reminderId },
    });
  }

  async getDueThisWeek(userId: string): Promise<Reminder[]> {
    const now = new Date();

    const endOfWeek = new Date(now);
    endOfWeek.setDate(now.getDate() + 7);
    endOfWeek.setHours(23, 59, 59, 999);

    return await this.prisma.reminder.findMany({
      where: {
        user_id: userId,
        is_completed: false,
        due_date: {
          gte: now,
          lte: endOfWeek,
        },
      },
      include: {
        client: true,
        project: true,
      },
      orderBy: {
        due_date: 'asc',
      },
    });
  }

  async getReminderStats(userId: string) {
    const now = new Date();

    const next7Days = new Date(now);
    next7Days.setDate(now.getDate() + 7);
    next7Days.setHours(23, 59, 59, 999);

    const [total, completed, pending, dueThisWeek, overdue] = await Promise.all(
      [
        this.prisma.reminder.count({
          where: { user_id: userId },
        }),
        this.prisma.reminder.count({
          where: { user_id: userId, is_completed: true },
        }),
        this.prisma.reminder.count({
          where: { user_id: userId, is_completed: false },
        }),
        this.prisma.reminder.count({
          where: {
            user_id: userId,
            is_completed: false,
            due_date: {
              gte: now,
              lte: next7Days,
            },
          },
        }),
        this.prisma.reminder.count({
          where: {
            user_id: userId,
            is_completed: false,
            due_date: {
              lt: now,
            },
          },
        }),
      ],
    );

    return {
      total,
      completed,
      pending,
      dueThisWeek,
      overdue,
    };
  }

  private async ensureClientBelongsToUser(
    clientId: string,
    userId: string,
  ): Promise<void> {
    const client = await this.prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    if (client.user_id !== userId) {
      throw new ForbiddenException('This client does not belong to you');
    }
  }

  private async ensureProjectBelongsToUser(
    projectId: string,
    userId: string,
  ): Promise<void> {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    if (project.user_id !== userId) {
      throw new ForbiddenException('This project does not belong to you');
    }
  }
}
