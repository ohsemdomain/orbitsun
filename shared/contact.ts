import { z } from 'zod';

export interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  created_at: number;
  updated_at: number;
}

export const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});