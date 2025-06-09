import type React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Product } from '~shared/types'
import MasterLayout from '~client/components/layouts/MasterLayout'
import ProductDetail from './components/ProductDetail'
import ProductListItem from './components/ProductListItem'
import { useProducts } from './hooks/useProducts'

const ProductsPage: React.FC = () => {
	const navigate = useNavigate()
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
	const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false)

	// Use custom hook for data fetching
	const { products, loading: isLoading } = useProducts()

	const handleAddProduct = () => {
		navigate('/products/new')
	}

	const handleEditProduct = () => {
		if (selectedProduct) {
			navigate(`/products/${selectedProduct.id}/edit`)
		}
	}

	const handleSelectProduct = useCallback(
		(product: Product | null) => {
			if (product) {
				// Only set loading detail if it's a new product or no product was selected
				if (selectedProduct?.id !== product.id || !selectedProduct) {
					setSelectedProduct(product)
					setIsLoadingDetail(true)
					const detailTimer = setTimeout(() => {
						setIsLoadingDetail(false)
					}, 500) // Simulate detail fetch delay
					return () => clearTimeout(detailTimer)
				}
				// If same product is clicked again, ensure detail is shown without reloading
				setSelectedProduct(product)
				setIsLoadingDetail(false)
			} else {
				setSelectedProduct(null)
				setIsLoadingDetail(false)
			}
		},
		[selectedProduct],
	)

	// Auto-select first product after initial data is loaded, ONLY ON DESKTOP
	useEffect(() => {
		if (
			!isLoading &&
			products &&
			products.length > 0 &&
			!selectedProduct &&
			typeof window !== 'undefined' &&
			window.innerWidth >= 1024 // Tailwind's 'lg' breakpoint - only auto-select on desktop
		) {
			handleSelectProduct(products[0])
		}
	}, [isLoading, products, selectedProduct, handleSelectProduct])

	const renderListItem = useCallback(
		(product: Product, isSelected: boolean, onSelect: () => void) => (
			<ProductListItem
				key={product.id}
				product={product}
				isSelected={isSelected}
				onSelect={onSelect}
			/>
		),
		[],
	)

	const renderDetail = useCallback(
		(product: Product) => <ProductDetail product={product} />,
		[],
	)

	const itemKeyExtractor = useCallback((product: Product) => product.id, [])
	const getItemTitle = useCallback((product: Product) => product.name, [])

	const headerAction = (
		<button
			type="button"
			onClick={handleAddProduct}
			className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-lg transition-colors"
			aria-label="Add Product"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="w-5 h-5"
				aria-hidden="true"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M12 4.5v15m7.5-7.5h-15"
				/>
			</svg>
		</button>
	)

	const detailHeaderAction = selectedProduct ? (
		<button
			type="button"
			onClick={handleEditProduct}
			className="bg-amber-600 hover:bg-amber-700 text-white p-2 rounded-lg transition-colors"
			aria-label="Edit Product"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="w-5 h-5"
				aria-hidden="true"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
				/>
			</svg>
		</button>
	) : null

	return (
		<div className="flex flex-col h-full p-6">
			{/* Mobile Add Button - Fixed Position */}
			<button
				type="button"
				onClick={handleAddProduct}
				className="lg:hidden fixed bottom-6 right-6 z-20 bg-primary-600 hover:bg-primary-700 text-white rounded-full p-4 shadow-lg transition-colors"
				aria-label="Add Product"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={2}
					stroke="currentColor"
					className="w-6 h-6"
					aria-hidden="true"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 4.5v15m7.5-7.5h-15"
					/>
				</svg>
			</button>

			<MasterLayout<Product>
				items={products || []}
				selectedItem={selectedProduct}
				onSelectItem={handleSelectProduct}
				renderListItem={renderListItem}
				renderDetail={renderDetail}
				listTitle="All Products"
				detailTitle="Product Details"
				itemKeyExtractor={itemKeyExtractor}
				getItemTitle={getItemTitle}
				isLoadingItems={isLoading}
				isLoadingDetail={isLoading || isLoadingDetail}
				headerAction={headerAction}
				detailHeaderAction={detailHeaderAction}
			/>
		</div>
	)
}

export default ProductsPage