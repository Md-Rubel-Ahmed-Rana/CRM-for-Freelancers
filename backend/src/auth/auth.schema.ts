import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z
      .string({ error: 'Name is required' })
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(50)
      .regex(/^[a-zA-Z\s]+$/, 'Name must contain only letters'),

    email: z.email({ error: 'Email is required' }),

    password: z
      .string({ error: 'Password is required' })
      .min(8, 'Password must be at least 8 characters')
      .max(100)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain uppercase, lowercase and number',
      ),
  })
  .strict();

export const loginSchema = z
  .object({
    email: z.email({ error: 'Email is required' }),

    password: z
      .string({ error: 'Password is required' })
      .min(8, 'Password must be at least 8 characters')
      .max(100)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain uppercase, lowercase and number',
      ),
  })
  .strict();

export class RegisterDto {
  static schema = registerSchema;
}

export class LoginDto {
  static schema = loginSchema;
}
