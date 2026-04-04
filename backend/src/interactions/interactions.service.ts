import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InteractionLog, Prisma } from '@prisma/client';

@Injectable()
export class InteractionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, payload: InteractionLog) {
    await this.prisma.interactionLog.create({
      data: {
        ...payload,
        user_id: userId,
      },
    });

    return {
      message: 'Interaction log created successfully',
      data: payload,
    };
  }

  async findAll(
    userId: string,
    query: {
      page?: number;
      limit?: number;
      client_id?: string;
      project_id?: string;
      type?: string;
      from_date?: string;
      to_date?: string;
    },
  ) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.InteractionLogWhereInput = {
      user_id: userId,
      ...(query.client_id && { client_id: query.client_id }),
      ...(query.project_id && { project_id: query.project_id }),
      ...(query.type && { type: query.type as any }),
      ...(query.from_date || query.to_date
        ? {
            date: {
              ...(query.from_date && { gte: new Date(query.from_date) }),
              ...(query.to_date && { lte: new Date(query.to_date) }),
            },
          }
        : {}),
    };

    const [data, total] = await Promise.all([
      this.prisma.interactionLog.findMany({
        where,
        include: {
          client: true,
          project: true,
        },
        orderBy: { date: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.interactionLog.count({ where }),
    ]);

    return {
      message: 'Interactions retrieved successfully',
      meta: {
        page,
        limit,
        total,
        totalPage: Math.ceil(total / limit),
      },
      data: data,
    };
  }

  async findOne(userId: string, id: string) {
    const interaction = await this.prisma.interactionLog.findFirst({
      where: {
        id,
        user_id: userId,
      },
      include: {
        client: true,
        project: true,
      },
    });

    if (!interaction) {
      throw new NotFoundException('Interaction not found');
    }

    return {
      message: 'Interaction retrieved successfully',
      data: interaction,
    };
  }

  async update(
    userId: string,
    id: string,
    payload: Prisma.InteractionLogUpdateInput,
  ) {
    await this.findOne(userId, id);

    await this.prisma.interactionLog.update({
      where: { id },
      data: payload,
    });

    return {
      message: 'Interaction updated successfully',
    };
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);

    await this.prisma.interactionLog.delete({
      where: { id },
    });

    return {
      message: 'Interaction deleted successfully',
    };
  }
}
