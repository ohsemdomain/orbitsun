import { z } from 'zod';
import { publicProcedure } from '../../trpc';
import { itemSchema } from '../../../shared/types';
import type { Item } from '../../../shared/types';

export const itemMutations = {
  create: publicProcedure
    .input(itemSchema.omit({ id: true, createdAt: true, updatedAt: true }))
    .mutation(async ({ input }): Promise<Item> => {
      // TODO: Implement D1 insert
      const newItem: Item = {
        id: crypto.randomUUID(),
        ...input,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return newItem;
    }),

  update: publicProcedure
    .input(z.object({
      id: z.string(),
      data: itemSchema.partial().omit({ id: true, createdAt: true }),
    }))
    .mutation(async ({ input: _input }): Promise<Item> => {
      // TODO: Implement D1 update
      throw new Error('Not implemented');
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: _input }): Promise<{ success: boolean }> => {
      // TODO: Implement D1 delete
      return { success: false };
    }),

  bulkDelete: publicProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input: _input }): Promise<{ deleted: number }> => {
      // TODO: Implement D1 bulk delete
      return { deleted: 0 };
    }),
};