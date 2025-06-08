import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '~server/trpc';
import type { Env, Context } from '~shared/types';
import { API_ENDPOINTS } from '~shared/types';

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname.startsWith(API_ENDPOINTS.TRPC)) {
			return fetchRequestHandler({
				endpoint: API_ENDPOINTS.TRPC,
				req: request,
				router: appRouter,
				createContext: (): Context => ({
					env,
					request,
				}),
			});
		}

		return new Response(null, { status: 404 });
	},
} satisfies ExportedHandler<Env>;