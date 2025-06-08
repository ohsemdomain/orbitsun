import { initTRPC } from '@trpc/server';
import type { Context, Quote } from '~shared/types';

const t = initTRPC.context<Context>().create();
const router = t.router;
const publicProcedure = t.procedure;

export const quotesRouter = router({
  getDailyQuote: publicProcedure.query(async ({ ctx }) => {
    try {
      if (!ctx.env.QUOTES_KV) {
        throw new Error('KV not configured');
      }

      const quotesData = await ctx.env.QUOTES_KV.get('all_quotes');
      if (!quotesData) {
        throw new Error('No quotes found');
      }

      const quotes: Quote[] = JSON.parse(quotesData);
      const currentDay = new Date().getDate();
      const quoteIndex = (currentDay - 1) % quotes.length;
      
      return quotes[quoteIndex];
    } catch {
      return {
        quote: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
      };
    }
  }),
});