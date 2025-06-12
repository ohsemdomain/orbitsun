import type { FC } from 'react';
import { Plus, SquarePen, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ItemCategory, ItemStatus, type Item } from '@shared/item';
import { formatCurrency } from '@shared/price-utils';
import RandomText from '../../components/RandomText';
import './item.css';

const ItemsPage: FC = () => {
	const navigate = useNavigate();

	// Generate fake items data
	const generateFakeItems = (): Item[] => {
		const categories = [ItemCategory.PACKAGING, ItemCategory.LABEL, ItemCategory.OTHER];
		const statuses = [ItemStatus.ACTIVE, ItemStatus.INACTIVE];
		const itemNames = ['Premium Box', 'Shipping Label', 'Storage Container', 'Product Tag', 'Gift Wrapper', 'Safety Label', 'Delivery Box', 'Return Label'];
		
		return Array.from({ length: 20 }, (_, i) => ({
			id: `item-${i + 1}`,
			item_name: `${itemNames[i % itemNames.length]} ${i + 1}`,
			item_category: categories[i % categories.length],
			item_price_cents: Math.floor(Math.random() * 10000) + 500, // $5.00 to $100.00
			item_description: i % 3 === 0 ? `High-quality ${itemNames[i % itemNames.length].toLowerCase()} for professional use` : null,
			item_unit_name: ['pieces', 'kg', 'liters', 'boxes', 'units'][i % 5],
			item_status: statuses[i % 4 === 0 ? 1 : 0], // Mostly active, some inactive
			created_at: Date.now() - (i * 86400000), // Days ago
			updated_at: Date.now() - (i * 43200000), // Half days ago
			created_by: 'user-1',
			updated_by: 'user-1',
		}));
	};

	const fakeItems = generateFakeItems();

	const getCategoryLabel = (category: ItemCategory): string => {
		switch (category) {
			case ItemCategory.PACKAGING: return 'Packaging';
			case ItemCategory.LABEL: return 'Label';
			case ItemCategory.OTHER: return 'Other';
			default: return 'Unknown';
		}
	};

	const formatPrice = (cents: number): string => {
		return formatCurrency(cents, 'MYR').replace('MYR', 'RM');
	};

	return (
		<div className="items-container">
			{/* Left Panel - Full width on mobile, 45% on lg and above */}
			<div className="items-left-panel">
				<div className="items-header">
					<div className="items-header-content">
						<div>
							<h2>Active Items</h2>
						</div>
						<div>
							<button
								type="button"
								className="btn-primary-icon"
								onClick={() => navigate('/items/new')}
							>
								<Plus className="w-4 h-4" />
							</button>
						</div>
					</div>
				</div>
				<div className="items-list no-scrollbar">
					<div className="items-list-container">
						{fakeItems.map((item) => (
							<div key={item.id} className="items-list-item">
								<div className="item-content">
									<div className="item-left">
										<h4 className="item-name">{item.item_name}</h4>
										<span className="item-category">{getCategoryLabel(item.item_category)}</span>
									</div>
									<span className="item-price">{formatPrice(item.item_price_cents)}</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Right Panel - Hidden on mobile, shown on lg and above */}
			<div className="items-right-panel">
				<div className="items-detail-header">
					<div className="items-header-content no-scrollbar">
						<div>
							<h1>Detail</h1>
						</div>
						<div>
							<div className="btn-group">
								<button 
									type="button" 
									className="btn-neutral"
									onClick={() => navigate('/items/1/edit')}
								>
									<SquarePen className="w-4 h-4" />
									<span>Edit</span>
								</button>
								<button type="button" className="btn-neutral">
									<Tag className="w-4 h-4" />
									<span>Mark as Inactive</span>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="items-detail-content">
					{/* Right scrollable content goes here */}
					<div>
						<RandomText />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ItemsPage;
