import { createTRPCReact } from '@trpc/react-query';
import { createTRPCClient as createVanillaTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../worker/routes';

// Create the tRPC React hooks
export const trpc = createTRPCReact<AppRouter>();

// Create the vanilla tRPC client (for use outside React components)
export const trpcClient = createVanillaTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: '/api/trpc',
      // Add auth headers here if needed
      // headers() {
      //   return {
      //     Authorization: `Bearer ${getAuthToken()}`,
      //   };
      // },
    }),
  ],
});

// tRPC client factory for React Query integration
export const createTRPCClientFactory = () => {
  return createVanillaTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: '/api/trpc',
      }),
    ],
  });
};