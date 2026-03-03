import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    if (!metatype || !(metatype as any).schema) {
      return value;
    }

    const schema: ZodSchema = (metatype as any).schema;

    const result = schema.safeParse(value);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => {
        if (issue.code === 'unrecognized_keys' && (issue as any).keys) {
          const keys = (issue as any).keys;
          return {
            path: issue?.path[issue.path.length - 1] || 'body',
            message: `The field(s) ${keys.map((key: string) => `'${key}'`).join(', ')} are not allowed.`,
          };
        }

        if (
          issue.code === 'custom' &&
          issue.message === 'At least one field is required'
        ) {
          return {
            path: issue?.path[issue.path.length - 1] || 'body',
            message: 'Please provide at least one field to update.',
          };
        }

        return {
          path: issue?.path[issue.path.length - 1] || 'body',
          message: issue?.message,
        };
      });

      throw new BadRequestException({
        message: 'Validation failed',
        errorMessages: errors,
      });
    }

    return result.data;
  }
}
