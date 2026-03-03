import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  healthCheck() {
    return {
      message: 'CRM for Freelancers server is healthy and running smoothly.',
      uptime: `${process.uptime()} seconds`,
      timestamp: new Date().toISOString(),
    };
  }
}
