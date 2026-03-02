import { z } from 'zod';

export const loginUserSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(6, 'Password is required'),
});

export type LoginUserDto = z.infer<typeof loginUserSchema>;
