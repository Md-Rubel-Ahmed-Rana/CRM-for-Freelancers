import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Project, ProjectStatus } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: Project) {
    const client = await this.prisma.client.findFirst({
      where: {
        id: dto.client_id,
        user_id: userId,
      },
    });

    if (!client) {
      throw new BadRequestException(
        'The client you are trying to assign this project to does not exist or does not belong to you.',
      );
    }

    const project = await this.prisma.project.create({
      data: {
        ...dto,
        user_id: userId,
      },
    });

    return {
      message: 'Project created successfully',
      data: project,
    };
  }

  async findAll(
    userId: string,
    query?: {
      search?: string;
      status?: string;
      page?: number;
      limit?: number;
    },
  ) {
    const page = Number(query?.page || 1);
    const limit = Number(query?.limit || 10);
    const skip = (page - 1) * limit;

    const search = query?.search?.trim();
    const status = query?.status;

    const where: Prisma.ProjectWhereInput = {
      client: {
        user_id: userId,
      },
      ...(status ? { status: status as ProjectStatus } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { client: { name: { contains: search, mode: 'insensitive' } } },
            ],
          }
        : {}),
    };

    const [projects, total] = await Promise.all([
      this.prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          created_at: 'desc',
        },
        include: {
          client: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      this.prisma.project.count({ where }),
    ]);

    return {
      meta: {
        page,
        limit,
        total,
        totalPage: Math.ceil(total / limit),
      },
      data: projects,
    };
  }

  async findAllForDropdown(userId: string, client_id?: string) {
    const projects = await this.prisma.project.findMany({
      where: {
        user_id: userId,
        client_id: client_id,
      },
      select: {
        id: true,
        title: true,
      },
    });
    return {
      projects,
      message: 'Projects fetched successfully',
    };
  }

  async findOne(userId: string, id: string) {
    const project = await this.prisma.project.findFirst({
      where: {
        id,
        client: {
          user_id: userId,
        },
      },
      include: {
        client: true,
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
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async update(userId: string, id: string, dto: Project) {
    await this.ensureProjectExists(userId, id);

    if (dto.client_id) {
      const client = await this.prisma.client.findFirst({
        where: {
          id: dto.client_id,
          user_id: userId,
        },
      });

      if (!client) {
        throw new BadRequestException('Invalid client');
      }
    }

    const updatedProject = await this.prisma.project.update({
      where: { id },
      data: dto,
      include: {
        client: true,
      },
    });

    return updatedProject;
  }

  async remove(userId: string, id: string) {
    await this.ensureProjectExists(userId, id);

    await this.prisma.project.delete({
      where: { id },
    });

    return null;
  }

  private async ensureProjectExists(userId: string, id: string) {
    const project = await this.prisma.project.findFirst({
      where: {
        id,
        client: {
          user_id: userId,
        },
      },
      select: { id: true },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }
}
