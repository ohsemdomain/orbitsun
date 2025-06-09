import type React from 'react'
import type { Product } from '~shared/types'

interface ProductDetailProps {
	product: Product
	onEdit?: () => void
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onEdit }) => {
	return (
		<div className="space-y-6">
			<div className="border-b border-gray-200 pb-6">
				<h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
				<p className="text-sm text-gray-500 mt-1">SKU: {product.sku}</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="space-y-4">
					<div>
						<h3 className="text-sm font-medium text-gray-700">Price</h3>
						<p className="text-3xl font-bold text-green-600">
							${product.price.toFixed(2)}
						</p>
					</div>

					<div>
						<h3 className="text-sm font-medium text-gray-700">Category</h3>
						<p className="text-lg text-gray-900">{product.category}</p>
					</div>

					<div>
						<h3 className="text-sm font-medium text-gray-700">Availability</h3>
						<span
							className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
								product.inStock
									? 'bg-green-100 text-green-800'
									: 'bg-red-100 text-red-800'
							}`}
						>
							{product.inStock ? 'In Stock' : 'Out of Stock'}
						</span>
					</div>
				</div>

				<div className="space-y-4">
					<div>
						<h3 className="text-sm font-medium text-gray-700">Description</h3>
						<p className="text-gray-900 leading-relaxed">
							{product.description}
						</p>
					</div>
				</div>
			</div>

			<div className="border-t border-gray-200 pt-6">
				<div className="flex space-x-3">
					<button
						type="button"
						className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
							product.inStock
								? 'bg-blue-600 text-white hover:bg-blue-700'
								: 'bg-gray-300 text-gray-500 cursor-not-allowed'
						}`}
						disabled={!product.inStock}
					>
						Add to Cart
					</button>
					{onEdit && (
						<button 
							type="button"
							onClick={onEdit}
							className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
						>
							Edit Product
						</button>
					)}
				</div>
			</div>
		</div>
	)
}

export default ProductDetail