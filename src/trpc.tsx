import { useState, type FC, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import { observable } from '@trpc/server/observable';
import type { AppRouter } from '../worker/routes';

// Create tRPC React hooks
export const trpc = createTRPCReact<AppRouter>();

// Custom delay link - ALWAYS delay to prevent flickering
const delayLink = (delay = 200) => {
  return () => {
    return ({ next, op }: any) => {
      return observable((observer) => {
        const timer = setTimeout(() => {
          next(op).subscribe(observer);
        }, delay); // Always delay, no conditions

        return () => {
          clearTimeout(timer);
        };
      });
    };
  };
};

interface TRPCProviderProps {
	children: ReactNode;
}

export const TRPCProvider: FC<TRPCProviderProps> = ({ children }) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60 * 1000, // 1 minute
						refetchOnWindowFocus: false,
					},
					mutations: {
						// You can add mutation defaults here
					},
				},
			}),
	);

	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				delayLink(200),
				httpBatchLink({
					url: '/trpc',
				}),
			],
		}),
	);

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</trpc.Provider>
	);
};
