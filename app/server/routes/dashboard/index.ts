import { z } from 'zod';
import { router, publicProcedure } from '~server/trpc';

export const dashboardRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.name || 'World'}!`,
      };
    }),
});