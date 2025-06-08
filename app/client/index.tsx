import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProductsPage from '@client/features/products/ProductPage'
import DashboardPage from '@client/features/dashboard/DashboardPage'
import { Sidebar } from '@client/components/layouts/Sidebar'
import '@client/index.css'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
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
	</StrictMode>,
)
