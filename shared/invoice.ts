import { z } from 'zod';

export interface Invoice {
  id: string;
  invoice_number: string;
  amount_cents: number;
  created_at: number;
  updated_at: number;
}

export const invoiceSchema = z.object({
  invoice_number: z.string().min(1),
  amount_cents: z.number().int().min(0),
});