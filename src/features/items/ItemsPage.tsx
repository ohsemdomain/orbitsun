import type { FC } from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSearch } from '../../components/search/SearchProvider';
import { Plus, SquarePen, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { type Item, getCategoryLabel, getStatusLabel } from '@shared/item';
import { formatPriceRM } from '@shared/price-utils';
import { formatDateTime } from '../../utils/formatter';
import TitleSelect from '../../components/ui/title-select/TitleSelect';
import Spinner from '../../components/loader/Spinner';
import { SpinnerIcon } from '../../components/loader/SpinnerIcon';
import { trpc } from '../../trpc';
import './item.css';

const ItemsPage: FC = () => {
	const navigate = useNavigate();
	const listRef = useRef<HTMLDivElement>(null);
	const { searchTerm } = useSearch();

	// State management
	const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('active');
	const [selectedItem, setSelectedItem] = useState<Item | null>(null);
	const [showMobileDetail, setShowMobileDetail] = useState(false);

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

	// Calculate total count based on current filter
	const totalCount = searchTerm.trim() 
		? displayItems.length
		: allItemsCache.filter(item => {
				if (filter === 'all') return true;
				if (filter === 'active') return item.item_status === 1;
				if (filter === 'inactive') return item.item_status === 0;
				return true;
			}).length;

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

	// Auto-select first item when items change
	useEffect(() => {
		if (displayItems.length > 0 && !selectedItem) {
			setSelectedItem(displayItems[0]);
		}
		// If selected item is no longer in the list, select the first one
		if (selectedItem && displayItems.length > 0) {
			const isStillInList = displayItems.some(item => item.id === selectedItem.id);
			if (!isStillInList) {
				setSelectedItem(displayItems[0]);
			}
		}
		// Clear selection if no items
		if (displayItems.length === 0) {
			setSelectedItem(null);
		}
	}, [displayItems, selectedItem]);

	// Handle filter change
	const handleFilterChange = (newFilter: string) => {
		if (searchTerm) return; // Don't allow filter change during search
		setFilter(newFilter as 'all' | 'active' | 'inactive');
	};

	// Handle item click
	const handleItemClick = (item: Item) => {
		setSelectedItem(item);
		// Show mobile detail panel on mobile
		setShowMobileDetail(true);
	};

	// Handle edit button
	const handleEditItem = () => {
		if (selectedItem) {
			navigate(`/items/${selectedItem.id}/edit`);
		}
	};




	return (
		<>
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
						<div className="flex items-center gap-2">
							<span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
								Total {totalCount} Rows
							</span>
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
							<div className="py-8">
								<Spinner />
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
									<button 
										key={item.id} 
										type="button"
										className={`items-list-item ${selectedItem?.id === item.id ? 'bg-blue-50' : ''} w-full text-left`}
										onClick={() => handleItemClick(item)}
									>
										<div className="item-content">
											<div className="item-left">
												<h4 className="item-name">{item.item_name}</h4>
												<span className="item-category">{getCategoryLabel(item.item_category)}</span>
											</div>
											<span className="item-price">{formatPriceRM(item.item_price_cents)}</span>
										</div>
									</button>
								))}
								{loadingMore && (
									<div className="flex items-center justify-center py-4 gap-2">
										<SpinnerIcon className="w-4 h-4 text-slate-500" />
										<span className="text-slate-500 text-sm">Loading more...</span>
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
							<h1>
								{loading && !selectedItem ? 'Loading...' : 
								 selectedItem ? selectedItem.item_name : 'Detail'}
							</h1>
						</div>
						{selectedItem && (
							<div>
								<div className="btn-group">
									<button 
										type="button" 
										className="btn-neutral"
										onClick={handleEditItem}
									>
										<SquarePen className="w-4 h-4" />
										<span className="hidden lg:inline">Edit</span>
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
				<div className="items-detail-content">
					{loading && !selectedItem ? (
						<div className="py-20">
							<Spinner iconClassName="w-8 h-8 text-slate-400" />
						</div>
					) : selectedItem ? (
						<div style={{ padding: '20px' }}>
							<p><strong>ID:</strong> {selectedItem.id}</p>
							<p><strong>Name:</strong> {selectedItem.item_name}</p>
							<p><strong>Category:</strong> {getCategoryLabel(selectedItem.item_category)}</p>
							<p><strong>Price:</strong> {formatPriceRM(selectedItem.item_price_cents)}</p>
							<p><strong>Description:</strong> {selectedItem.item_description || 'No description'}</p>
							<p><strong>Unit Name:</strong> {selectedItem.item_unit_name || 'No unit specified'}</p>
							<p><strong>Status:</strong> {getStatusLabel(selectedItem.item_status)}</p>
							<p><strong>Created At:</strong> {formatDateTime(selectedItem.created_at)}</p>
							<p><strong>Updated At:</strong> {formatDateTime(selectedItem.updated_at)}</p>
							<p><strong>Created By:</strong> {selectedItem.created_by}</p>
							<p><strong>Updated By:</strong> {selectedItem.updated_by}</p>
						</div>
					) : displayItems.length === 0 ? (
						<div style={{ padding: '20px', textAlign: 'center' }}>
							<p>No items available</p>
						</div>
					) : null}
				</div>
			</div>
		</div>

		{/* Mobile Detail Panel - Slides in from right */}
		{showMobileDetail && (
			<div className="fixed inset-0 z-50 lg:hidden">
				{/* Backdrop */}
				<div 
					className="absolute inset-0 bg-black/50" 
					onClick={() => setShowMobileDetail(false)}
					onKeyDown={(e) => {
						if (e.key === 'Escape') {
							setShowMobileDetail(false);
						}
					}}
					role="button"
					tabIndex={0}
					aria-label="Close detail panel"
				/>
				
				{/* Panel */}
				<div className="absolute top-0 right-0 w-full h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
					{/* Header - Mobile 2-row layout */}
					<div className="items-detail-header">
						<div className="items-header-content flex-col lg:flex-row">
							{/* Row 1: Back button + Title */}
							<div className="flex items-center gap-3">
								<button 
									type="button" 
									className="btn-ghost-icon"
									onClick={() => setShowMobileDetail(false)}
								>
									<ArrowLeft className="w-5 h-5" />
								</button>
								<h1>
									{loading && !selectedItem ? 'Loading...' : 
									 selectedItem ? selectedItem.item_name : 'Detail'}
								</h1>
							</div>
							
							{/* Row 2: Buttons (mobile) / Same row (desktop) */}
							{selectedItem && (
								<div className="mt-3 lg:mt-0">
									<button 
										type="button" 
										className="btn-neutral"
										onClick={handleEditItem}
									>
										<SquarePen className="w-4 h-4" />
										<span className="hidden lg:inline">Edit</span>
									</button>
								</div>
							)}
						</div>
					</div>
					
					{/* Content */}
					<div className="items-detail-content">
						{loading && !selectedItem ? (
							<div className="py-20">
								<Spinner iconClassName="w-8 h-8 text-slate-400" />
							</div>
						) : selectedItem ? (
							<div style={{ padding: '20px' }}>
								<p><strong>ID:</strong> {selectedItem.id}</p>
								<p><strong>Name:</strong> {selectedItem.item_name}</p>
								<p><strong>Category:</strong> {getCategoryLabel(selectedItem.item_category)}</p>
								<p><strong>Price:</strong> {formatPriceRM(selectedItem.item_price_cents)}</p>
								<p><strong>Description:</strong> {selectedItem.item_description || 'No description'}</p>
								<p><strong>Unit Name:</strong> {selectedItem.item_unit_name || 'No unit specified'}</p>
								<p><strong>Status:</strong> {getStatusLabel(selectedItem.item_status)}</p>
								<p><strong>Created At:</strong> {formatDateTime(selectedItem.created_at)}</p>
								<p><strong>Updated At:</strong> {formatDateTime(selectedItem.updated_at)}</p>
								<p><strong>Created By:</strong> {selectedItem.created_by}</p>
								<p><strong>Updated By:</strong> {selectedItem.updated_by}</p>
							</div>
						) : displayItems.length === 0 ? (
							<div style={{ padding: '20px', textAlign: 'center' }}>
								<p>No items available</p>
							</div>
						) : null}
					</div>
				</div>
			</div>
		)}
	</>
);
};

export default ItemsPage;
