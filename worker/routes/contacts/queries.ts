import { z } from 'zod';
import { publicProcedure } from '../../trpc';
import type { Contact, PaginatedResponse } from '../../../shared/types';

export const contactQueries = {
  list: publicProcedure
    .input(z.object({
      page: z.number().min(1).default(1),
      limit: z.number().min(1).max(100).default(20),
      search: z.string().optional(),
      type: z.enum(['customer', 'supplier', 'both']).optional(),
    }))
    .query(async ({ input }): Promise<PaginatedResponse<Contact>> => {
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
    .query(async ({ input: _input }): Promise<Contact | null> => {
      // TODO: Implement D1 query
      return null;
    }),

  search: publicProcedure
    .input(z.object({ 
      query: z.string().min(2),
      limit: z.number().max(10).default(5),
    }))
    .query(async ({ input: _input }): Promise<Contact[]> => {
      // TODO: Implement D1 search with FTS
      return [];
    }),
};