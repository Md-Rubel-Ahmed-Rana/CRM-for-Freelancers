import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Post()
  create(@Req() req, @Body() body: any) {
    return this.remindersService.create(req.user.id, body);
  }

  @Get()
  findAll(@Req() req, @Query() query) {
    return this.remindersService.findAll(req.user.id, query);
  }

  @Get('due-this-week')
  getDueThisWeek(@Req() req) {
    return this.remindersService.getDueThisWeek(req.user.id);
  }

  @Get('stats')
  getStats(@Req() req) {
    return this.remindersService.getReminderStats(req.user.id);
  }

  @Get(':id')
  findOne(@Req() req, @Param('id') id: string) {
    return this.remindersService.findOne(req.user.id, id);
  }

  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() body: any) {
    return this.remindersService.update(req.user.id, id, body);
  }

  @Patch(':id/toggle')
  toggle(@Req() req, @Param('id') id: string) {
    return this.remindersService.toggleCompletion(req.user.id, id);
  }

  @Patch(':id/complete')
  markCompleted(@Req() req, @Param('id') id: string) {
    return this.remindersService.markAsCompleted(req.user.id, id);
  }

  @Patch(':id/incomplete')
  markIncomplete(@Req() req, @Param('id') id: string) {
    return this.remindersService.markAsIncomplete(req.user.id, id);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.remindersService.remove(req.user.id, id);
  }
}
