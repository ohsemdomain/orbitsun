import type { FC } from 'react';
import { Plus, SquarePen, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getCategoryLabel } from '@shared/item';
import { formatPriceRM } from '@shared/price-utils';
import TitleSelect from '../../components/ui/title-select/TitleSelect';
import Spinner from '../../components/loader/Spinner';
import { SpinnerIcon } from '../../components/loader/SpinnerIcon';
import { useItemsState } from './hooks/useItemsState';
import ItemDetailView from './components/ItemDetailView';
import './item.css';

const ItemsPage: FC = () => {
	const navigate = useNavigate();
	
	// Use custom hook for state management
	const {
		filter,
		selectedItem,
		showMobileDetail,
		displayItems,
		totalCount,
		loading,
		loadingMore,
		searchTerm,
		listRef,
		handleFilterChange,
		handleItemClick,
		setShowMobileDetail,
	} = useItemsState();

	const filterOptions = [
		{ value: 'all', label: 'All Items' },
		{ value: 'active', label: 'Active Items' },
		{ value: 'inactive', label: 'Inactive Items' },
	];

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
					<ItemDetailView 
						item={selectedItem}
						isLoading={loading && !selectedItem}
					/>
					{displayItems.length === 0 && !loading && (
						<div style={{ padding: '20px', textAlign: 'center' }}>
							<p>No items available</p>
						</div>
					)}
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
						<ItemDetailView 
							item={selectedItem}
							isLoading={loading && !selectedItem}
						/>
						{displayItems.length === 0 && !loading && (
							<div style={{ padding: '20px', textAlign: 'center' }}>
								<p>No items available</p>
							</div>
						)}
					</div>
				</div>
			</div>
		)}
	</>
);
};

export default ItemsPage;