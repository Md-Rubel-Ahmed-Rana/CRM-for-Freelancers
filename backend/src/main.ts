import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { RequestMethod } from '@nestjs/common';

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

  await app.listen(port, () => {
    console.log(`CRM for Freelancers Server is running on port:${port}`);
  });
}
bootstrap().catch((err) => {
  console.error('Error starting the server:', err);
  process.exit(1);
});
