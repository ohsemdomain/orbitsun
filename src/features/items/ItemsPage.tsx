import type { FC } from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSearch } from '../../components/search/SearchProvider';
import { Plus, SquarePen, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ItemCategory } from '@shared/item';
import { formatCurrency } from '@shared/price-utils';
import RandomText from '../../components/RandomText';
import TitleSelect from '../../components/ui/title-select/TitleSelect';
import { trpc } from '../../trpc';
import './item.css';

const ItemsPage: FC = () => {
	const navigate = useNavigate();
	const listRef = useRef<HTMLDivElement>(null);
	const { searchTerm } = useSearch();

	// State management
	const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('active');

	const filterOptions = [
		{ value: 'all', label: 'All Items' },
		{ value: 'active', label: 'Active Items' },
		{ value: 'inactive', label: 'Inactive Items' },
	];

	// tRPC queries
	const { 
		data: itemsData, 
		isLoading: loading, 
		isFetchingNextPage: loadingMore,
		fetchNextPage,
		hasNextPage
	} = trpc.item.list.useInfiniteQuery(
		{ status: filter, limit: 20 },
		{
			getNextPageParam: (lastPage) => lastPage.nextCursor,
			enabled: !searchTerm, // Only fetch when not searching
		}
	);

	const { data: allItemsCache = [] } = trpc.item.getAllForSearch.useQuery(
		undefined,
		{
			staleTime: 5 * 60 * 1000, // Cache for 5 minutes
		}
	);

	// Compute display items based on search or tRPC data
	const displayItems = searchTerm.trim() 
		? allItemsCache.filter(item =>
				item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
			)
		: itemsData?.pages.flatMap(page => page.items) ?? [];

	// Handle lazy loading on scroll
	useEffect(() => {
		const handleScroll = () => {
			if (!listRef.current || searchTerm || !hasNextPage || loadingMore) return;

			const { scrollTop, scrollHeight, clientHeight } = listRef.current;
			const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

			if (distanceFromBottom < 100) {
				fetchNextPage();
			}
		};

		const listElement = listRef.current;
		if (listElement) {
			listElement.addEventListener('scroll', handleScroll);
			return () => listElement.removeEventListener('scroll', handleScroll);
		}
	}, [hasNextPage, loadingMore, searchTerm, fetchNextPage]);

	// Handle search behavior - return to 'active' when search is cleared
	useEffect(() => {
		if (!searchTerm.trim()) {
			setFilter('active');
		}
	}, [searchTerm]);

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
