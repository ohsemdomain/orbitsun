import { z } from 'zod';
import { publicProcedure } from '../../trpc';
import { itemListSchema, type Item, type ItemListResponse } from '@shared/item';
import { mapRowToItem, mapRowsToItems } from './db-map';

export const itemQueries = {
  // Main list with lazy loading - for displaying filtered items
  list: publicProcedure
    .input(itemListSchema)
    .query(async ({ input, ctx }): Promise<ItemListResponse> => {
      const { status, cursor, limit } = input;

      // Build WHERE clause
      const whereConditions: string[] = [];
      const params: any[] = [];

      // Status filter
      if (status === 'active') {
        whereConditions.push('item_status = 1');
      } else if (status === 'inactive') {
        whereConditions.push('item_status = 0');
      }
      // 'all' = no status filter

      // Cursor for pagination
      if (cursor) {
        whereConditions.push('id < ?');
        params.push(cursor);
      }

      const whereClause = whereConditions.length > 0
        ? `WHERE ${whereConditions.join(' AND ')}`
        : '';

      // Get items + 1 to check if there's more
      const itemsResult = await ctx.env.DB.prepare(`
        SELECT * FROM items 
        ${whereClause}
        ORDER BY id DESC 
        LIMIT ?
      `).bind(...params, limit + 1).all();

      const items = mapRowsToItems(itemsResult.results);

      // Check if there are more items
      let nextCursor: string | undefined;
      if (items.length > limit) {
        nextCursor = items[limit - 1].id;
        items.pop(); // Remove the extra item
      }

      return {
        items,
        nextCursor,
      };
    }),

  // Get all items for search - returns minimal data for performance
  getAllForSearch: publicProcedure
    .query(async ({ ctx }): Promise<Item[]> => {
      const itemsResult = await ctx.env.DB.prepare(`
        SELECT * FROM items 
        ORDER BY item_name ASC
      `).all();

      return mapRowsToItems(itemsResult.results);
    }),

  // Get single item by ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }): Promise<Item> => {
      const item = await ctx.env.DB.prepare(
        'SELECT * FROM items WHERE id = ?'
      ).bind(input.id).first();

      if (!item) {
        throw new Error('Item not found');
      }

      return mapRowToItem(item);
    }),
};