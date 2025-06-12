// src/features/items/components/ItemDetailView.tsx
import type { FC } from 'react';
import { type Item, getCategoryLabel, getStatusLabel } from '@shared/item';
import { formatPriceRM } from '@shared/price-utils';
import { formatDateTime } from '../../../utils/formatter';
import Spinner from '../../../components/loader/Spinner';

interface ItemDetailViewProps {
	item: Item | null;
	isLoading: boolean;
}

const ItemDetailView: FC<ItemDetailViewProps> = ({ item, isLoading }) => {
	if (isLoading && !item) {
		return (
			<div className="h-full flex items-center justify-center">
				<Spinner />
			</div>
		);
	}

	if (!item) {
		return (
			<div className="h-full flex items-center justify-center">
				<p className="text-slate-500">Select an item to view details</p>
			</div>
		);
	}

	return (
		<div style={{ padding: '20px' }}>
			<p>
				<strong>ID:</strong> {item.id}
			</p>
			<p>
				<strong>Name:</strong> {item.item_name}
			</p>
			<p>
				<strong>Category:</strong> {getCategoryLabel(item.item_category)}
			</p>
			<p>
				<strong>Price:</strong> {formatPriceRM(item.item_price_cents)}
			</p>
			<p>
				<strong>Description:</strong> {item.item_description || 'No description'}
			</p>
			<p>
				<strong>Unit Name:</strong> {item.item_unit_name || 'No unit specified'}
			</p>
			<p>
				<strong>Status:</strong> {getStatusLabel(item.item_status)}
			</p>
			<p>
				<strong>Created At:</strong> {formatDateTime(item.created_at)}
			</p>
			<p>
				<strong>Updated At:</strong> {formatDateTime(item.updated_at)}
			</p>
			<p>
				<strong>Created By:</strong> {item.created_by}
			</p>
			<p>
				<strong>Updated By:</strong> {item.updated_by}
			</p>
		</div>
	);
};

export default ItemDetailView;
