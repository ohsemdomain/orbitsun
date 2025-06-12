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
      <div className="py-20">
        <Spinner iconClassName="w-8 h-8 text-slate-400" />
      </div>
    );
  }

  if (!item) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>No items available</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <p><strong>ID:</strong> {item.id}</p>
      <p><strong>Name:</strong> {item.item_name}</p>
      <p><strong>Category:</strong> {getCategoryLabel(item.item_category)}</p>
      <p><strong>Price:</strong> {formatPriceRM(item.item_price_cents)}</p>
      <p><strong>Description:</strong> {item.item_description || 'No description'}</p>
      <p><strong>Unit Name:</strong> {item.item_unit_name || 'No unit specified'}</p>
      <p><strong>Status:</strong> {getStatusLabel(item.item_status)}</p>
      <p><strong>Created At:</strong> {formatDateTime(item.created_at)}</p>
      <p><strong>Updated At:</strong> {formatDateTime(item.updated_at)}</p>
      <p><strong>Created By:</strong> {item.created_by}</p>
      <p><strong>Updated By:</strong> {item.updated_by}</p>
    </div>
  );
};

export default ItemDetailView;