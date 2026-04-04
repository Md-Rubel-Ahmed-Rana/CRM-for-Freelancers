import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, JwtService],
})
export class ClientsModule {}
