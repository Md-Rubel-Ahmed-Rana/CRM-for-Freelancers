import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiError } from '../errors/api.error';
import { Prisma } from '@prisma/client';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Something went wrong';
    let errorMessages: any[] = [];

    // ✅ Custom ApiError
    if (exception instanceof ApiError) {
      statusCode = exception.statusCode;
      message = exception.message;
      errorMessages = exception.errorMessages?.length
        ? exception.errorMessages
        : [{ path: '', message }];
    }

    // ✅ Prisma Known Errors
    else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002': {
          statusCode = HttpStatus.CONFLICT;

          const field = (exception.meta?.target as string[])?.[0];

          message = `${field} already exists`;
          errorMessages = [
            {
              path: field,
              message: `${field} already exists`,
            },
          ];
          break;
        }

        case 'P2025':
          statusCode = HttpStatus.NOT_FOUND;
          message = 'Record not found';
          errorMessages = [{ path: '', message }];
          break;

        case 'P2003':
          statusCode = HttpStatus.BAD_REQUEST;
          message = 'Invalid foreign key reference';
          errorMessages = [{ path: '', message }];
          break;

        default:
          statusCode = HttpStatus.BAD_REQUEST;
          message = exception.message;
          errorMessages = [{ path: '', message }];
      }
    }

    // ✅ Prisma Validation Error
    else if (exception instanceof Prisma.PrismaClientValidationError) {
      statusCode = HttpStatus.BAD_REQUEST;
      message = 'Validation error';
      errorMessages = [{ path: '', message: exception.message }];
    }

    // ✅ NestJS HttpException (including Zod BadRequestException)
    else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();

      const res: any = exception.getResponse();

      // Handle different possible response shapes
      if (typeof res === 'string') {
        message = res;
        errorMessages = [{ path: '', message: res }];
      } else {
        message = res.message || exception.message;

        if (res.errors) {
          // 🔥 Zod validation errors
          errorMessages = res.errors;
        } else if (res.errorMessages) {
          // Custom formatted errors
          errorMessages = res.errorMessages;
        } else if (Array.isArray(res.message)) {
          // class-validator style errors
          errorMessages = res.message.map((msg: string) => ({
            path: '',
            message: msg,
          }));
        } else {
          errorMessages = [{ path: '', message }];
        }
      }
    }

    // ✅ Unknown Errors
    else if (exception instanceof Error) {
      message = exception.message;
      errorMessages = [{ path: '', message }];
    }

    response.status(statusCode).json({
      statusCode,
      success: false,
      message,
      traceId: request['traceId'],
      errorMessages,
      stack:
        process.env.NODE_ENV === 'development'
          ? (exception as any)?.stack
          : undefined,
    });
  }
}
