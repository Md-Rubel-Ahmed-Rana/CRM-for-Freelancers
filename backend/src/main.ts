import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { RequestMethod } from '@nestjs/common';
import { traceIdMiddleware } from './common/middleware/trace-id.middleware';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { ZodValidationPipe } from './common/pipes/zod-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port: number = app.get(ConfigService).get<number>('PORT') || 5000;

  app.enableCors({
    origin: ['http://localhost:3000', 'https://freelancers-crm.vercel.app'],
    credentials: true,
  });

  app.setGlobalPrefix('/api/v1', {
    exclude: [
      { path: '/', method: RequestMethod.GET },
      { path: '/health', method: RequestMethod.GET },
    ],
  });

  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(traceIdMiddleware);
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ZodValidationPipe());

  await app.listen(port, () => {
    console.log(`CRM for Freelancers Server is running on port:${port}`);
  });
}
bootstrap().catch((err) => {
  console.error('Error starting the server:', err);
  process.exit(1);
});
