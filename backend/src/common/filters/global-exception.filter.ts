import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiError } from '../errors/api.error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Something went wrong';
    let errorMessages: any[] = [];
    let stack: string | undefined;

    if (exception instanceof ApiError) {
      statusCode = exception.statusCode;
      message = exception.message;
      errorMessages = exception.errorMessages.length
        ? exception.errorMessages
        : [{ path: '', message }];
      stack = exception.stack;
    } else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const res: any = exception.getResponse();
      message = res.message || exception.message;
      errorMessages = [{ path: '', message }];
    }

    response.status(statusCode).json({
      statusCode,
      success: false,
      message,
      traceId: request['traceId'],
      errorMessages,
      stack: process.env.NODE_ENV === 'development' ? stack : undefined,
    });
  }
}
