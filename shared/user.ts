import { z } from 'zod';

export interface User {
  id: string;
  email: string;
  name: string;
  created_at: number;
  updated_at: number;
}

export const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});