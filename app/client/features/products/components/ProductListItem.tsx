import type React from 'react'
import type { Product } from '~shared/types'

interface ProductListItemProps {
	product: Product
	isSelected: boolean
	onSelect: () => void
}

const ProductListItem: React.FC<ProductListItemProps> = ({ 
	product, 
	isSelected, 
	onSelect 
}) => {
	return (
		<li
			className={`p-4 cursor-pointer border-b border-gray-200 hover:bg-gray-50 transition-colors ${
				isSelected ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
			}`}
			onClick={onSelect}
		>
			<div className="flex justify-between items-start">
				<div className="flex-1">
					<h3 className="font-medium text-gray-900">{product.name}</h3>
					<p className="text-sm text-gray-600 mt-1">{product.category}</p>
					<div className="flex items-center mt-2 space-x-4">
						<span className="text-lg font-semibold text-green-600">
							${product.price.toFixed(2)}
						</span>
						<span
							className={`text-xs px-2 py-1 rounded-full ${
								product.status === 'active'
									? 'bg-green-100 text-green-800'
									: 'bg-gray-100 text-gray-800'
							}`}
						>
							{product.status === 'active' ? 'Active' : 'Inactive'}
						</span>
					</div>
				</div>
			</div>
		</li>
	)
}

export default ProductListItem