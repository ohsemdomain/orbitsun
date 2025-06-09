import type React from 'react'
import type { Product } from '~shared/types'

interface ProductDetailProps {
	product: Product
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
	return (
		<div className="space-y-6">
			<div className="border-b border-gray-200 pb-6">
				<h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
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
						<h3 className="text-sm font-medium text-gray-700">Status</h3>
						<span
							className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
								product.status === 'active'
									? 'bg-green-100 text-green-800'
									: 'bg-gray-100 text-gray-800'
							}`}
						>
							{product.status === 'active' ? 'Active' : 'Inactive'}
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

		</div>
	)
}

export default ProductDetail