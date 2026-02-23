import { PrismaClient } from '@prisma/client';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    console.log('Prisma is connecting to PostgreSQL...');
    try {
      await this.$connect();
      console.log('Database connected successfully!');
    } catch (error: any) {
      console.log(error);
      console.error(`Failed to connect to database. Error: ${error?.message}`);
    }
  }
}
