import { z } from 'zod';

export interface Task {
  id: string;
  title: string;
  description?: string;
  created_at: number;
  updated_at: number;
}

export const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});