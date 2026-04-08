import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import type { InteractionLog } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import pickQueries from 'src/common/helpers/pickQueries';
import { paginationFields } from 'src/constants/paginationFields';
import {
  GetInteractionsFilterDto,
  interactionFilterableFields,
} from './dto/filters.dto';

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
  findAll(@Req() req: any) {
    const userId = req.user.id;
    const options = pickQueries(req.query, paginationFields);
    const filters = pickQueries(
      req.query,
      interactionFilterableFields,
    ) as GetInteractionsFilterDto;
    const search_query = req.query.search_query as string;
    return this.interactionsService.findAll(
      userId,
      options,
      filters,
      search_query,
    );
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
