import { z } from 'zod';
import { publicProcedure } from '../../trpc';
import { invoiceSchema } from '../../../shared/types';
import type { Invoice } from '../../../shared/types';

export const invoiceMutations = {
  create: publicProcedure
    .input(invoiceSchema.omit({ id: true, createdAt: true, updatedAt: true }))
    .mutation(async ({ input }): Promise<Invoice> => {
      // TODO: Implement D1 insert
      const newInvoice: Invoice = {
        id: crypto.randomUUID(),
        ...input,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return newInvoice;
    }),

  update: publicProcedure
    .input(z.object({
      id: z.string(),
      data: invoiceSchema.partial().omit({ id: true, createdAt: true }),
    }))
    .mutation(async ({ input: _input }): Promise<Invoice> => {
      // TODO: Implement D1 update
      throw new Error('Not implemented');
    }),

  updateStatus: publicProcedure
    .input(z.object({
      id: z.string(),
      status: z.enum(['draft', 'sent', 'paid', 'overdue', 'cancelled']),
    }))
    .mutation(async ({ input: _input }): Promise<Invoice> => {
      // TODO: Implement status update
      throw new Error('Not implemented');
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: _input }): Promise<{ success: boolean }> => {
      // TODO: Implement D1 delete
      return { success: false };
    }),

  send: publicProcedure
    .input(z.object({
      id: z.string(),
      email: z.string().email(),
    }))
    .mutation(async ({ input: _input }): Promise<{ success: boolean }> => {
      // TODO: Send invoice via email
      return { success: false };
    }),

  generatePDF: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: _input }): Promise<{ url: string }> => {
      // TODO: Generate PDF and store in R2
      throw new Error('Not implemented');
    }),
};