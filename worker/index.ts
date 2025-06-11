import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import type { Context } from './trpc';
import { appRouter } from './routes';

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const url = new URL(request.url);

        // Handle tRPC API requests
        if (url.pathname.startsWith('/trpc')) {
            return fetchRequestHandler({
                endpoint: '/trpc',
                req: request,
                router: appRouter,
                createContext: (): Context => ({ env, executionCtx: ctx }),
            });
        }

        // Serve static assets for everything else
        return env.ASSETS.fetch(request);
    },
} satisfies ExportedHandler<Env>;

// Environment interface (add your bindings here if needed)
interface Env {
    ASSETS: Fetcher;
    DB: D1Database;
    KV: KVNamespace;
    R2: R2Bucket;
}