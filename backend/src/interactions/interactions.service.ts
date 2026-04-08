import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InteractionLog, Prisma } from '@prisma/client';
import {
  IPaginationOptions,
  paginationHelpers,
} from 'src/common/helpers/pagination';
import { GetInteractionsFilterDto } from './dto/filters.dto';

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
    options: IPaginationOptions,
    filters: GetInteractionsFilterDto,
    search_query: string,
  ) {
    const {
      page,
      limit,
      skip,
      sortBy = 'date',
      sortOrder,
    } = paginationHelpers.calculatePagination(options);
    const { type, client, project, start_date, end_date } = filters;

    const where: Prisma.InteractionLogWhereInput = {
      user_id: userId,
      ...(client && { client_id: client }),
      ...(project && { project_id: project }),
      ...(type && { type: type as any }),
      ...(start_date || end_date
        ? {
            date: {
              ...(start_date && { gte: new Date(start_date) }),
              ...(end_date && { lte: new Date(end_date) }),
            },
          }
        : {}),
    };

    if (search_query) {
      where.OR = [
        {
          notes: {
            contains: search_query,
            mode: 'insensitive',
          },
        },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.interactionLog.findMany({
        where,
        include: {
          client: true,
          project: true,
        },
        orderBy: { [sortBy]: sortOrder },
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
