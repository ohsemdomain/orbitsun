import { z } from 'zod';
import { publicProcedure } from '../../trpc';
import type { Item } from '@shared/item';
import type { PaginatedResponse } from '@shared/common';

export const itemQueries = {
  list: publicProcedure
    .input(z.object({
      page: z.number().min(1).default(1),
      limit: z.number().min(1).max(100).default(20),
      search: z.string().optional(),
      category: z.string().optional(),
      isActive: z.boolean().optional(),
    }))
    .query(async ({ input }): Promise<PaginatedResponse<Item>> => {
      // TODO: Implement D1 query
      return {
        data: [],
        pagination: {
          page: input.page,
          limit: input.limit,
          total: 0,
          totalPages: 0,
        },
      };
    }),

  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: _input }): Promise<Item | null> => {
      // TODO: Implement D1 query
      return null;
    }),

  getByCategory: publicProcedure
    .input(z.object({ category: z.string() }))
    .query(async ({ input: _input }): Promise<Item[]> => {
      // TODO: Implement D1 query
      return [];
    }),
};