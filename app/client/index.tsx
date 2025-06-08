import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductsPage from '~client/features/products/ProductPage'
import DashboardPage from '~client/features/dashboard/DashboardPage'
import { Sidebar } from '~client/components/layouts/Sidebar'
import { trpc, trpcClient } from '~client/trpc'
import '~client/index.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<HashRouter>
					<div>
						<Sidebar />
						<Routes>
							<Route path="/dashboard" element={<DashboardPage />} />
							<Route path="/products" element={<ProductsPage />} />
							<Route path="*" element={<Navigate to="/dashboard" />} />
						</Routes>
					</div>
				</HashRouter>
			</QueryClientProvider>
		</trpc.Provider>
	</StrictMode>,
)
