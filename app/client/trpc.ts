import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from '~server/trpc';
import { API_ENDPOINTS } from '~shared/types';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: API_ENDPOINTS.TRPC,
    }),
  ],
});