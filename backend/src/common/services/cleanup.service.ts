import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CleanupService implements OnApplicationShutdown {
  constructor(private readonly prisma: PrismaService) {}

  async onApplicationShutdown(signal?: string) {
    console.log('Shutting down due to:', signal);

    await this.prisma.$disconnect();

    // TODO: shutdown other service like below
    // await this.redis.quit();
    // await this.queue.close();

    console.log('Cleanup completed.');
  }
}
