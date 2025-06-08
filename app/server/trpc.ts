import { initTRPC } from '@trpc/server';
import type { Context } from '../shared/types';
import { dashboardRouter } from './routes/dashboard';

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  dashboard: dashboardRouter,
});

export type AppRouter = typeof appRouter;