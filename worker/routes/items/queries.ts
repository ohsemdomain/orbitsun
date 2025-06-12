import { z } from 'zod';
import { publicProcedure } from '../../trpc';
import { itemListSchema, type Item } from '@shared/item';
import type { PaginatedResponse } from '@shared/common';

export const itemQueries = {
  list: publicProcedure
    .input(itemListSchema)
    .query(async ({ input, ctx }) => {
      const { page, limit, search, category, status } = input;
      const offset = (page - 1) * limit;

      // Build WHERE clause
      const whereConditions: string[] = [];
      const params: any[] = [];

      if (search) {
        whereConditions.push('item_name LIKE ?');
        params.push(`%${search}%`);
      }

      if (category !== undefined) {
        whereConditions.push('item_category = ?');
        params.push(category);
      }

      if (status !== undefined) {
        whereConditions.push('item_status = ?');
        params.push(status);
      }

      const whereClause = whereConditions.length > 0 
        ? `WHERE ${whereConditions.join(' AND ')}`
        : '';

      // Get total count
      const countQuery = `SELECT COUNT(*) as total FROM items ${whereClause}`;
      const countResult = await ctx.env.DB.prepare(countQuery).bind(...params).first<{ total: number }>();
      const total = countResult?.total || 0;

      // Get items
      const itemsQuery = `
        SELECT * FROM items 
        ${whereClause}
        ORDER BY created_at DESC 
        LIMIT ? OFFSET ?
      `;
      const itemsResult = await ctx.env.DB.prepare(itemsQuery)
        .bind(...params, limit, offset)
        .all();

      const items = itemsResult.results as unknown as Item[];

      return {
        data: items,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      } as PaginatedResponse<Item>;
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const item = await ctx.env.DB.prepare(
        'SELECT * FROM items WHERE id = ?'
      ).bind(input.id).first();

      if (!item) {
        throw new Error('Item not found');
      }

      return item as unknown as Item;
    }),
};