import { z } from 'zod';
import { publicProcedure } from '../../trpc';
import { invoiceSchema, type Invoice } from '@shared/invoice';

export const invoiceMutations = {
  create: publicProcedure
    .input(invoiceSchema)
    .mutation(async ({ input }): Promise<Invoice> => {
      // TODO: Implement D1 insert
      const newInvoice: Invoice = {
        id: crypto.randomUUID(),
        ...input,
        created_at: Date.now(),
        updated_at: Date.now(),
      };
      return newInvoice;
    }),

  update: publicProcedure
    .input(z.object({
      id: z.string(),
      data: invoiceSchema.partial(),
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