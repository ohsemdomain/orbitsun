import { initTRPC } from '@trpc/server';

// Environment interface for Cloudflare Workers
interface Env {
	ASSETS: Fetcher;
	DB: D1Database;
	KV: KVNamespace;
	R2: R2Bucket;
}

// Context for tRPC
export interface Context {
	env: Env;
	executionCtx: ExecutionContext;
}

// Initialize tRPC
const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;