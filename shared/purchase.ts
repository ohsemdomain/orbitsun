import { z } from 'zod';

export const purchaseSchema = z.object({
  id: z.string(),
  purchaseNumber: z.string(),
  vendorId: z.string(),
  amount: z.number().positive(),
  status: z.enum(['ordered', 'received', 'invoiced', 'paid']),
  orderDate: z.date(),
  items: z.array(z.object({
    itemId: z.string(),
    quantity: z.number().positive(),
    price: z.number().positive(),
  })),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Purchase = z.infer<typeof purchaseSchema>;