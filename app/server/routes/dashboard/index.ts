import { initTRPC } from '@trpc/server';
import type { Context } from '~shared/types';

const t = initTRPC.context<Context>().create();
const router = t.router;
const publicProcedure = t.procedure;

export const dashboardRouter = router({
  hello: publicProcedure
    .query(() => {
      return {
        greeting: 'Hello World!',
      };
    }),
});