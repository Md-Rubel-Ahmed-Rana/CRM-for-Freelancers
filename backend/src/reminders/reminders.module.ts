import { Module } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { RemindersController } from './reminders.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [RemindersController],
  providers: [RemindersService, JwtService],
})
export class RemindersModule {}
