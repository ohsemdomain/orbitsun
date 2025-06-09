import { useState, useEffect } from 'react'
import type { Product } from '~shared/types'

export const useProducts = () => {
	const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		// Simulate API call with mock data
		const fetchProducts = async () => {
			try {
				setLoading(true)
				// Simulate network delay
				await new Promise(resolve => setTimeout(resolve, 500))
				
				// Mock products data
				const mockProducts: Product[] = [
					{
						id: '1',
						name: 'Wireless Headphones',
						price: 99.99,
						description: 'High-quality wireless headphones with noise cancellation',
						category: 'Electronics',
						inStock: true,
						sku: 'WH-001'
					},
					{
						id: '2',
						name: 'Smart Watch',
						price: 249.99,
						description: 'Feature-rich smartwatch with health monitoring',
						category: 'Electronics',
						inStock: true,
						sku: 'SW-002'
					},
					{
						id: '3',
						name: 'Coffee Maker',
						price: 79.99,
						description: 'Programmable coffee maker with thermal carafe',
						category: 'Appliances',
						inStock: false,
						sku: 'CM-003'
					},
					{
						id: '4',
						name: 'Running Shoes',
						price: 129.99,
						description: 'Lightweight running shoes with advanced cushioning',
						category: 'Sports',
						inStock: true,
						sku: 'RS-004'
					},
					{
						id: '5',
						name: 'Desk Lamp',
						price: 39.99,
						description: 'LED desk lamp with adjustable brightness',
						category: 'Office',
						inStock: true,
						sku: 'DL-005'
					},
					{
						id: '6',
						name: 'Yoga Mat',
						price: 29.99,
						description: 'Non-slip yoga mat with extra cushioning',
						category: 'Sports',
						inStock: true,
						sku: 'YM-006'
					},
					{
						id: '7',
						name: 'Bluetooth Speaker',
						price: 59.99,
						description: 'Portable bluetooth speaker with 360° sound',
						category: 'Electronics',
						inStock: false,
						sku: 'BS-007'
					},
					{
						id: '8',
						name: 'Water Bottle',
						price: 19.99,
						description: 'Insulated stainless steel water bottle',
						category: 'Sports',
						inStock: true,
						sku: 'WB-008'
					}
				]
				
				setProducts(mockProducts)
				setError(null)
			} catch (err) {
				setError('Failed to fetch products')
			} finally {
				setLoading(false)
			}
		}

		fetchProducts()
	}, [])

	return { products, loading, error }
}