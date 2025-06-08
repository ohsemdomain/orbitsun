import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProductsPage from '@src/features/products/ProductPage'
import DashboardPage from '@src/features/dashboard/DashboardPage'
import { Sidebar } from '@src/components/layouts/Sidebar'
import '@src/index.css'

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
