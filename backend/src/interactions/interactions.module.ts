import { Module } from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import { InteractionsController } from './interactions.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [InteractionsController],
  providers: [InteractionsService, JwtService],
})
export class InteractionsModule {}
