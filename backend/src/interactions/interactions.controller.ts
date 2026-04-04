import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import type { InteractionLog } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('interactions')
export class InteractionsController {
  constructor(private readonly interactionsService: InteractionsService) {}

  @Post()
  create(@Req() req: any, @Body() body: InteractionLog) {
    const userId = req.user.id;
    return this.interactionsService.create(userId, body);
  }

  @Get()
  findAll(
    @Req() req: any,
    @Query()
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
    const userId = req.user.id;
    return this.interactionsService.findAll(userId, query);
  }

  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    const userId = req.user.id;
    return this.interactionsService.findOne(userId, id);
  }

  @Patch(':id')
  update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() body: InteractionLog,
  ) {
    const userId = req.user.id;
    return this.interactionsService.update(userId, id, body);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    const userId = req.user.id;
    return this.interactionsService.remove(userId, id);
  }
}
