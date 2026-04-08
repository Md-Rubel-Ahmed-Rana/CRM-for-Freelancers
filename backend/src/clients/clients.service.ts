import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Client, Prisma } from '@prisma/client';
import {
  IPaginationOptions,
  paginationHelpers,
} from 'src/common/helpers/pagination';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createClientDto: Client) {
    const { email, phone, name, company, notes } = createClientDto;

    const existingClient = await this.prisma.client.findFirst({
      where: {
        user_id: userId,
        OR: [{ email }, { phone }],
      },
      select: {
        id: true,
        email: true,
        phone: true,
      },
    });

    if (existingClient) {
      if (existingClient.email === email) {
        throw new ConflictException('A client with this email already exists');
      }

      if (existingClient.phone === phone) {
        throw new ConflictException('A client with this phone already exists');
      }
    }

    const client = await this.prisma.client.create({
      data: {
        user_id: userId,
        name,
        email,
        phone,
        company,
        notes,
      },
      include: {
        _count: {
          select: {
            projects: true,
            interactionLogs: true,
            reminders: true,
          },
        },
      },
    });

    return client;
  }

  async findAll(
    userId: string,
    options: IPaginationOptions,
    search_query: string,
  ) {
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers.calculatePagination(options);
    const search = search_query?.trim();

    const where: Prisma.ClientWhereInput = {
      user_id: userId,
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } },
              { phone: { contains: search, mode: 'insensitive' } },
              { company: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };

    const [clients, total] = await Promise.all([
      this.prisma.client.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
        include: {
          _count: {
            select: {
              projects: true,
              interactionLogs: true,
              reminders: true,
            },
          },
        },
      }),
      this.prisma.client.count({ where }),
    ]);

    return {
      meta: {
        page,
        limit,
        total,
        totalPage: Math.ceil(total / limit),
      },
      data: clients,
    };
  }

  async findAllForDropdown(userId: string) {
    const clients = await this.prisma.client.findMany({
      where: {
        user_id: userId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return {
      clients,
      message: 'Clients retrieved for dropdown successfully',
    };
  }

  async findOne(userId: string, id: string) {
    const client = await this.prisma.client.findFirst({
      where: {
        id,
        user_id: userId,
      },
      include: {
        projects: {
          orderBy: {
            created_at: 'desc',
          },
        },
        interactionLogs: {
          orderBy: {
            created_at: 'desc',
          },
        },
        reminders: {
          orderBy: {
            due_date: 'asc',
          },
        },
        _count: {
          select: {
            projects: true,
            interactionLogs: true,
            reminders: true,
          },
        },
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }

  async update(userId: string, id: string, updateClientDto: Client) {
    await this.ensureClientExists(userId, id);

    const { email, phone } = updateClientDto;

    if (email || phone) {
      const existingClient = await this.prisma.client.findFirst({
        where: {
          user_id: userId,
          id: {
            not: id,
          },
          OR: [...(email ? [{ email }] : []), ...(phone ? [{ phone }] : [])],
        },
        select: {
          id: true,
          email: true,
          phone: true,
        },
      });

      if (existingClient) {
        if (email && existingClient.email === email) {
          throw new ConflictException(
            'A client with this email already exists',
          );
        }

        if (phone && existingClient.phone === phone) {
          throw new ConflictException(
            'A client with this phone already exists',
          );
        }
      }
    }

    const updatedClient = await this.prisma.client.update({
      where: { id },
      data: updateClientDto,
      include: {
        _count: {
          select: {
            projects: true,
            interactionLogs: true,
            reminders: true,
          },
        },
      },
    });

    return updatedClient;
  }

  async remove(userId: string, id: string) {
    await this.ensureClientExists(userId, id);

    await this.prisma.client.delete({
      where: { id },
    });

    return null;
  }

  private async ensureClientExists(userId: string, id: string) {
    const client = await this.prisma.client.findFirst({
      where: {
        id,
        user_id: userId,
      },
      select: {
        id: true,
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }
}
