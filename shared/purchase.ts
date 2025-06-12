import { z } from 'zod';

export interface Purchase {
  id: string;
  purchase_number: string;
  amount_cents: number;
  created_at: number;
  updated_at: number;
}

export const purchaseSchema = z.object({
  purchase_number: z.string().min(1),
  amount_cents: z.number().int().min(0),
});