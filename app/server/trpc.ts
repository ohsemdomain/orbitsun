import { initTRPC } from '@trpc/server';
import type { Context } from '~shared/types';
import { dashboardRouter } from './routes/dashboard';
import { quotesRouter } from './routes/quotes';

const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  dashboard: dashboardRouter,
  quotes: quotesRouter,
});

export type AppRouter = typeof appRouter;