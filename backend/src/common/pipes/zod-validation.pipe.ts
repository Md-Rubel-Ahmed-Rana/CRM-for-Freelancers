import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import * as zod from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: zod.ZodSchema) {}

  transform(value: any) {
    const result: any = this.schema.safeParse(value);

    if (!result.success) {
      const errors = result.error.errors.map((err: any) => ({
        path: err.path.join('.'),
        message: err.message,
      }));

      throw new BadRequestException({
        message: 'Validation failed',
        errorMessages: errors,
      });
    }

    return result.data;
  }
}
