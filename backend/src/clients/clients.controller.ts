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
import { ClientsService } from './clients.service';
import type { Client } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import pickQueries from 'src/common/helpers/pickQueries';
import { paginationFields } from 'src/constants/paginationFields';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() dto: Client) {
    return this.clientsService.create(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req, @Query() query) {
    const options = pickQueries(req.query, paginationFields);
    return this.clientsService.findAll(
      req.user.id,
      options,
      query.search_query,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('dropdown')
  findAllForDropdown(@Req() req) {
    return this.clientsService.findAllForDropdown(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Req() req, @Param('id') id: string) {
    return this.clientsService.findOne(req.user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() dto: Client) {
    return this.clientsService.update(req.user.id, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.clientsService.remove(req.user.id, id);
  }
}
