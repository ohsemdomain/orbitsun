import { z } from 'zod';
import { publicProcedure } from '../../trpc';
import { ItemStatus, itemCreateSchema, itemUpdateSchema, type Item } from '@shared/item';
import { generateItemId } from '../../utils/id-gen';

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

      return createdItem as unknown as Item;
    }),

  update: publicProcedure
    .input(itemUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, ...updates } = input;
      const now = Math.floor(Date.now() / 1000);
      
      // TODO: Get user from context when auth is implemented
      const userId = 'system'; // Temporary fallback

      // Build dynamic update query
      const updateFields: string[] = [];
      const params: any[] = [];

      if (updates.item_name !== undefined) {
        updateFields.push('item_name = ?');
        params.push(updates.item_name);
      }

      if (updates.item_category !== undefined) {
        updateFields.push('item_category = ?');
        params.push(updates.item_category);
      }

      if (updates.item_price_cents !== undefined) {
        updateFields.push('item_price_cents = ?');
        params.push(updates.item_price_cents);
      }

      if (updates.item_description !== undefined) {
        updateFields.push('item_description = ?');
        params.push(updates.item_description);
      }

      if (updates.item_unit_name !== undefined) {
        updateFields.push('item_unit_name = ?');
        params.push(updates.item_unit_name);
      }

      if (updates.item_status !== undefined) {
        updateFields.push('item_status = ?');
        params.push(updates.item_status);
      }

      if (updateFields.length === 0) {
        throw new Error('No fields to update');
      }

      // Always update timestamp and user
      updateFields.push('updated_at = ?', 'updated_by = ?');
      params.push(now, userId);

      const query = `
        UPDATE items 
        SET ${updateFields.join(', ')}
        WHERE id = ?
      `;
      params.push(id);

      const result = await ctx.env.DB.prepare(query).bind(...params).run();

      if (result.meta.changes === 0) {
        throw new Error('Item not found');
      }

      // Return the updated item
      const updatedItem = await ctx.env.DB.prepare(
        'SELECT * FROM items WHERE id = ?'
      ).bind(id).first();

      return updatedItem as unknown as Item;
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