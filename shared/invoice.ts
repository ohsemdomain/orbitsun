import { z } from 'zod';

export const invoiceSchema = z.object({
  id: z.string(),
  invoiceNumber: z.string(),
  contactId: z.string(),
  amount: z.number().positive(),
  status: z.enum(['draft', 'sent', 'paid', 'overdue']),
  dueDate: z.date(),
  items: z.array(z.object({
    itemId: z.string(),
    quantity: z.number().positive(),
    price: z.number().positive(),
  })),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Invoice = z.infer<typeof invoiceSchema>;