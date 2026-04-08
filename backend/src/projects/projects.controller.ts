import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import type { Project } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import pickQueries from 'src/common/helpers/pickQueries';
import { paginationFields } from 'src/constants/paginationFields';
import {
  GetProjectsFilterDto,
  projectFilterableFields,
} from './dto/filters.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() dto: Project) {
    return this.projectsService.create(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req, @Query() query) {
    const options = pickQueries(req.query, paginationFields);
    const filters = pickQueries(
      req.query,
      projectFilterableFields,
    ) as GetProjectsFilterDto;
    const search_query = req.query.search_query as string;
    return this.projectsService.findAll(
      req.user.id,
      options,
      filters,
      search_query,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('dropdown')
  findAllForDropdown(@Req() req, @Query() query) {
    return this.projectsService.findAllForDropdown(
      req.user.id,
      query.client_id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Req() req, @Param('id') id: string) {
    return this.projectsService.findOne(req.user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() dto: Project) {
    return this.projectsService.update(req.user.id, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.projectsService.remove(req.user.id, id);
  }
}
