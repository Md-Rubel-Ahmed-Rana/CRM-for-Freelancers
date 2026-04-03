import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    return next.handle().pipe(
      map((originalResponse) => {
        let message = 'Request successful';
        let data = originalResponse;

        if (
          originalResponse &&
          typeof originalResponse === 'object' &&
          'message' in originalResponse
        ) {
          message = originalResponse.message;

          const { message: _, ...rest } = originalResponse;
          data = rest;
        }

        return {
          statusCode: response.statusCode || HttpStatus.OK,
          success: true,
          message,
          traceId: request['traceId'],
          data,
        };
      }),
    );
  }
}
