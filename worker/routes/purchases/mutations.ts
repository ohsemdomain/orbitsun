import { z } from 'zod';
import { publicProcedure } from '../../trpc';
import { purchaseSchema } from '../../../shared/types';
import type { Purchase } from '../../../shared/types';

export const purchaseMutations = {
  create: publicProcedure
    .input(purchaseSchema.omit({ id: true, createdAt: true, updatedAt: true }))
    .mutation(async ({ input }): Promise<Purchase> => {
      // TODO: Implement D1 insert
      const newPurchase: Purchase = {
        id: crypto.randomUUID(),
        ...input,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return newPurchase;
    }),

  update: publicProcedure
    .input(z.object({
      id: z.string(),
      data: purchaseSchema.partial().omit({ id: true, createdAt: true }),
    }))
    .mutation(async ({ input: _input }): Promise<Purchase> => {
      // TODO: Implement D1 update
      throw new Error('Not implemented');
    }),

  updateStatus: publicProcedure
    .input(z.object({
      id: z.string(),
      status: z.enum(['draft', 'ordered', 'received', 'cancelled']),
    }))
    .mutation(async ({ input: _input }): Promise<Purchase> => {
      // TODO: Implement status update
      throw new Error('Not implemented');
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: _input }): Promise<{ success: boolean }> => {
      // TODO: Implement D1 delete
      return { success: false };
    }),

  approve: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: _input }): Promise<Purchase> => {
      // TODO: Approve purchase order
      throw new Error('Not implemented');
    }),

  receive: publicProcedure
    .input(z.object({
      id: z.string(),
      receivedItems: z.array(z.object({
        itemId: z.string(),
        quantityReceived: z.number(),
      })),
    }))
    .mutation(async ({ input: _input }): Promise<Purchase> => {
      // TODO: Mark items as received
      throw new Error('Not implemented');
    }),
};