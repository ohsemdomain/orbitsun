import type { FC } from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSearch } from '../../components/search/SearchProvider';
import { Plus, SquarePen, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ItemCategory, ItemStatus, type Item } from '@shared/item';
import { formatCurrency } from '@shared/price-utils';
import RandomText from '../../components/RandomText';
import TitleSelect from '../../components/ui/title-select/TitleSelect';
import './item.css';

const ItemsPage: FC = () => {
	const navigate = useNavigate();
	const listRef = useRef<HTMLDivElement>(null);
	const { searchTerm } = useSearch();

	// State management
	const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('active');
	const [displayItems, setDisplayItems] = useState<Item[]>([]);
	const [allItemsCache, setAllItemsCache] = useState<Item[]>([]);
	const [cursor, setCursor] = useState<string | undefined>();
	const [loading, setLoading] = useState(false);
	const [loadingMore, setLoadingMore] = useState(false);

	const filterOptions = [
		{ value: 'all', label: 'All Items' },
		{ value: 'active', label: 'Active Items' },
		{ value: 'inactive', label: 'Inactive Items' },
	];

	// Generate fake items data (temporary until tRPC is connected)
	const generateFakeItems = (): Item[] => {
		const categories = [ItemCategory.PACKAGING, ItemCategory.LABEL, ItemCategory.OTHER];
		const statuses = [ItemStatus.ACTIVE, ItemStatus.INACTIVE];
		const itemNames = [
			'Premium Box',
			'Shipping Label',
			'Storage Container',
			'Product Tag',
			'Gift Wrapper',
			'Safety Label',
			'Delivery Box',
			'Return Label',
		];

		return Array.from({ length: 20 }, (_, i) => ({
			id: `item-${i + 1}`,
			item_name: `${itemNames[i % itemNames.length]} ${i + 1}`,
			item_category: categories[i % categories.length],
			item_price_cents: Math.floor(Math.random() * 10000) + 500,
			item_description:
				i % 3 === 0
					? `High-quality ${itemNames[i % itemNames.length].toLowerCase()} for professional use`
					: null,
			item_unit_name: ['pieces', 'kg', 'liters', 'boxes', 'units'][i % 5],
			item_status: statuses[i % 4 === 0 ? 1 : 0],
			created_at: Date.now() - i * 86400000,
			updated_at: Date.now() - i * 43200000,
			created_by: 'user-1',
			updated_by: 'user-1',
		}));
	};

	// Cache all items on mount for search functionality
	useEffect(() => {
		const initializeCache = async () => {
			// TODO: Replace with actual tRPC call
			// const allItems = await trpc.item.getAllForSearch.query();
			const allItems = generateFakeItems();
			setAllItemsCache(allItems);
		};
		
		initializeCache();
	}, []);

	// Load items when filter changes (and not searching)
	useEffect(() => {
		if (!searchTerm) {
			loadItemsWithFilter(filter);
		}
	}, [filter]);

	// Handle search behavior
	useEffect(() => {
		if (searchTerm.trim()) {
			// Auto-switch to "all" when searching and disable filter
			const filtered = allItemsCache.filter(item =>
				item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setDisplayItems(filtered);
			setCursor(undefined); // Reset cursor for search
		} else {
			// Return to "active" filter when search is cleared
			setFilter('active');
		}
	}, [searchTerm, allItemsCache]);

	// Load items with specific filter
	const loadItemsWithFilter = async (filterStatus: 'all' | 'active' | 'inactive', isLoadMore = false) => {
		if (isLoadMore) {
			setLoadingMore(true);
		} else {
			setLoading(true);
			setDisplayItems([]);
			setCursor(undefined);
		}

		try {
			// TODO: Replace with actual tRPC call
			// const response = await trpc.item.list.query({ 
			//   status: filterStatus, 
			//   cursor: isLoadMore ? cursor : undefined 
			// });
			
			// Simulate backend filtering for now
			const allItems = generateFakeItems();
			let filteredItems: Item[];
			
			if (filterStatus === 'active') {
				filteredItems = allItems.filter(item => item.item_status === ItemStatus.ACTIVE);
			} else if (filterStatus === 'inactive') {
				filteredItems = allItems.filter(item => item.item_status === ItemStatus.INACTIVE);
			} else {
				filteredItems = allItems;
			}

			if (isLoadMore) {
				setDisplayItems(prev => [...prev, ...filteredItems]);
			} else {
				setDisplayItems(filteredItems);
			}

			// Simulate pagination cursor
			setCursor(filteredItems.length > 0 ? `cursor-${Date.now()}` : undefined);
		} catch (error) {
			console.error('Failed to load items:', error);
		} finally {
			setLoading(false);
			setLoadingMore(false);
		}
	};

	// Handle lazy loading on scroll
	useEffect(() => {
		const handleScroll = () => {
			if (!listRef.current || searchTerm || !cursor || loadingMore) return;

			const { scrollTop, scrollHeight, clientHeight } = listRef.current;
			const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

			if (distanceFromBottom < 100) {
				loadItemsWithFilter(filter, true);
			}
		};

		const listElement = listRef.current;
		if (listElement) {
			listElement.addEventListener('scroll', handleScroll);
			return () => listElement.removeEventListener('scroll', handleScroll);
		}
	}, [filter, cursor, loadingMore, searchTerm]);


	// Handle filter change
	const handleFilterChange = (newFilter: string) => {
		if (searchTerm) return; // Don't allow filter change during search
		setFilter(newFilter as 'all' | 'active' | 'inactive');
	};

	const getCategoryLabel = (category: ItemCategory): string => {
		switch (category) {
			case ItemCategory.PACKAGING:
				return 'Packaging';
			case ItemCategory.LABEL:
				return 'Label';
			case ItemCategory.OTHER:
				return 'Other';
			default:
				return 'Unknown';
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
							<TitleSelect
								value={filter}
								onChange={handleFilterChange}
								options={filterOptions}
								disabled={!!searchTerm} // Disable when searching
							/>
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
				<div className="items-list no-scrollbar" ref={listRef}>
					<div className="items-list-container">
						{loading && displayItems.length === 0 ? (
							<div className="flex items-center justify-center py-8">
								<div className="text-slate-500">Loading items...</div>
							</div>
						) : displayItems.length === 0 ? (
							<div className="flex items-center justify-center py-8">
								<div className="text-slate-500">
									{searchTerm ? 'No items found matching your search.' : 'No items found.'}
								</div>
							</div>
						) : (
							<>
								{displayItems.map((item) => (
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
								{loadingMore && (
									<div className="flex items-center justify-center py-4">
										<div className="text-slate-500 text-sm">Loading more...</div>
									</div>
								)}
							</>
						)}
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
