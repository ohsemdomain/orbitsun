import { useState } from 'react'
import MasterDetailLayout from '~client/components/layouts/master-detail/MasterDetailLayout'

interface Product {
	id: string
	name: string
	price: number
	description: string
	category: string
	inStock: boolean
	sku: string
}

const products: Product[] = [
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
	}
]

export default function ProductsPage() {
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

	const renderListItem = (product: Product, isSelected: boolean, onSelect: () => void) => (
		<li
			key={product.id}
			className={`p-4 cursor-pointer border-b border-gray-200 hover:bg-gray-50 ${
				isSelected ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
			}`}
			onClick={onSelect}
		>
			<div className="flex justify-between items-start">
				<div className="flex-1">
					<h3 className="font-medium text-gray-900">{product.name}</h3>
					<p className="text-sm text-gray-600 mt-1">{product.category}</p>
					<div className="flex items-center mt-2 space-x-4">
						<span className="text-lg font-semibold text-green-600">${product.price}</span>
						<span className={`text-xs px-2 py-1 rounded-full ${
							product.inStock 
								? 'bg-green-100 text-green-800' 
								: 'bg-red-100 text-red-800'
						}`}>
							{product.inStock ? 'In Stock' : 'Out of Stock'}
						</span>
					</div>
				</div>
			</div>
		</li>
	)

	const renderDetail = (product: Product) => (
		<div className="space-y-6">
			<div className="border-b border-gray-200 pb-6">
				<h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
				<p className="text-sm text-gray-500 mt-1">SKU: {product.sku}</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="space-y-4">
					<div>
						<h3 className="text-sm font-medium text-gray-700">Price</h3>
						<p className="text-3xl font-bold text-green-600">${product.price}</p>
					</div>
					
					<div>
						<h3 className="text-sm font-medium text-gray-700">Category</h3>
						<p className="text-lg text-gray-900">{product.category}</p>
					</div>
					
					<div>
						<h3 className="text-sm font-medium text-gray-700">Availability</h3>
						<span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
							product.inStock 
								? 'bg-green-100 text-green-800' 
								: 'bg-red-100 text-red-800'
						}`}>
							{product.inStock ? 'In Stock' : 'Out of Stock'}
						</span>
					</div>
				</div>

				<div className="space-y-4">
					<div>
						<h3 className="text-sm font-medium text-gray-700">Description</h3>
						<p className="text-gray-900 leading-relaxed">{product.description}</p>
					</div>
				</div>
			</div>

			<div className="border-t border-gray-200 pt-6">
				<div className="flex space-x-3">
					<button 
						className={`flex-1 py-2 px-4 rounded-md font-medium ${
							product.inStock
								? 'bg-blue-600 text-white hover:bg-blue-700'
								: 'bg-gray-300 text-gray-500 cursor-not-allowed'
						}`}
						disabled={!product.inStock}
					>
						Add to Cart
					</button>
					<button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
						Edit Product
					</button>
				</div>
			</div>
		</div>
	)

	const headerAction = (
		<button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">
			Add Product
		</button>
	)

	return (
		<div className="p-6">
			<MasterDetailLayout
				items={products}
				selectedItem={selectedProduct}
				onSelectItem={setSelectedProduct}
				renderListItem={renderListItem}
				renderDetail={renderDetail}
				listTitle="Products"
				detailTitle="Product Details"
				itemKeyExtractor={(product) => product.id}
				getItemTitle={(product) => product.name}
				headerAction={headerAction}
			/>
		</div>
	)
}
