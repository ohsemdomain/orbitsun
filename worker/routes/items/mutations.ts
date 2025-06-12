import { z } from 'zod';
import { publicProcedure } from '../../trpc';
import { ItemStatus, itemCreateSchema, itemUpdateSchema } from '@shared/item';
import { generateItemId } from '../../utils/id-gen';
import { mapRowToItem } from './db-map';

export const itemMutations = {
  create: publicProcedure
    .input(itemCreateSchema)
    .mutation(async ({ input, ctx }) => {
      const id = await generateItemId(ctx.env.KV);
      const now = Math.floor(Date.now() / 1000);
      
      // TODO: Get user from context when auth is implemented
      const userId = 'system'; // Temporary fallback

      const result = await ctx.env.DB.prepare(`
        INSERT INTO items (
          id, item_name, item_category, item_price_cents, 
          item_description, item_unit_name, item_status, created_at, updated_at, 
          created_by, updated_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        id,
        input.item_name,
        input.item_category,
        input.item_price_cents,
        input.item_description || null,
        input.item_unit_name || null,
        ItemStatus.ACTIVE, // New items are active by default
        now,
        now,
        userId,
        userId
      ).run();

      if (!result.success) {
        throw new Error('Failed to create item');
      }

      // Return the created item
      const createdItem = await ctx.env.DB.prepare(
        'SELECT * FROM items WHERE id = ?'
      ).bind(id).first();

      return mapRowToItem(createdItem);
    }),

  update: publicProcedure
    .input(itemUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, ...updates } = input;
      const now = Math.floor(Date.now() / 1000);
      
      // TODO: Get user from context when auth is implemented
      const userId = 'system'; // Temporary fallback

      const result = await ctx.env.DB.prepare(`
        UPDATE items SET
          item_name = COALESCE(?, item_name),
          item_category = COALESCE(?, item_category),
          item_price_cents = COALESCE(?, item_price_cents),
          item_description = ?,
          item_unit_name = ?,
          item_status = COALESCE(?, item_status),
          updated_at = ?,
          updated_by = ?
        WHERE id = ?
      `).bind(
        updates.item_name ?? null,
        updates.item_category ?? null,
        updates.item_price_cents ?? null,
        updates.item_description,
        updates.item_unit_name,
        updates.item_status ?? null,
        now,
        userId,
        id
      ).run();

      if (result.meta.changes === 0) {
        throw new Error('Item not found');
      }

      // Return the updated item
      const updatedItem = await ctx.env.DB.prepare(
        'SELECT * FROM items WHERE id = ?'
      ).bind(id).first();

      return mapRowToItem(updatedItem);
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.env.DB.prepare(
        'DELETE FROM items WHERE id = ?'
      ).bind(input.id).run();

      if (result.meta.changes === 0) {
        throw new Error('Item not found');
      }

      return { success: true };
    }),
};