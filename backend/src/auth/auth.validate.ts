import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string({
        error: 'Current password is required',
      })
      .min(8, 'Current password must be at least 8 characters')
      .max(15, 'Current password must be at most 15 characters'),

    newPassword: z
      .string({
        error: 'New password is required',
      })
      .min(8, 'New password must be at least 8 characters')
      .max(15, 'New password must be at most 15 characters')
      .regex(/[A-Z]/, 'New password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'New password must contain at least one lowercase letter')
      .regex(/\d/, 'New password must contain at least one number'),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: 'New password must be different from current password',
    path: ['newPassword'],
  });

export class ChangePasswordValidate extends createZodDto(
  changePasswordSchema,
) {}
