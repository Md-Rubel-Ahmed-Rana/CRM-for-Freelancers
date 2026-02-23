import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck() {
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'CRM for Freelancers API is healthy and running smoothly.',
      data: {
        uptime: `${process.uptime()} seconds`,
        timestamp: new Date().toISOString(),
      },
    };
  }
}
