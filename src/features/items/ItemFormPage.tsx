// src/features/items/ItemFormPage.tsx
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Input, Textarea, Select } from '../../components/ui';
import { ItemCategory, ItemStatus, type ItemFormData } from '../../../shared/item';
import './item.css';

const ItemFormPage: FC = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const isEditing = Boolean(id);

	const [formData, setFormData] = useState<ItemFormData>({
		item_name: '',
		item_description: '',
		item_price: '',
		item_category: ItemCategory.OTHER,
		item_status: ItemStatus.ACTIVE,
	});

	// Load existing item data when editing
	useEffect(() => {
		if (isEditing && id) {
			// TODO: Replace with actual API call
			const mockItemData: ItemFormData = {
				item_name: `Item ${id}`,
				item_description: `This is the description for item ${id}`,
				item_price: '29.99',
				item_category: ItemCategory.PACKAGING,
				item_status: ItemStatus.ACTIVE,
			};
			setFormData(mockItemData);
		}
	}, [isEditing, id]);

	return (
		<div className="forms-container">
			<div className="forms-header">
				<div className="forms-header-content">
					<button type="button" className="btn-ghost-icon" onClick={() => navigate('/items')}>
						<ArrowLeft className="w-5 h-5" />
					</button>
					<h1 className="forms-title">{isEditing ? 'Edit Item' : 'Create Item'}</h1>
				</div>
			</div>

			<div className="forms-content">
				<form className="forms-form">
					<div className="form-section">
						<Input
							id="item_name"
							name="item_name"
							type="text"
							value={formData.item_name}
							onChange={(e) => setFormData((prev) => ({ ...prev, item_name: e.target.value }))}
							label="Item Name"
						/>

						<Textarea
							id="item_description"
							name="item_description"
							value={formData.item_description}
							onChange={(e) =>
								setFormData((prev) => ({ ...prev, item_description: e.target.value }))
							}
							label="Description"
							rows={6}
						/>

						<div className="form-row">
							<Input
								id="item_price"
								name="item_price"
								type="number"
								value={formData.item_price}
								onChange={(e) => setFormData((prev) => ({ ...prev, item_price: e.target.value }))}
								label="Price"
								step="0.01"
							/>

							<Select
								id="item_category"
								name="item_category"
								value={formData.item_category.toString()}
								onChange={(value) =>
									setFormData((prev) => ({ ...prev, item_category: Number(value) as ItemCategory }))
								}
								options={[
									{ value: ItemCategory.PACKAGING.toString(), label: 'Packaging' },
									{ value: ItemCategory.LABEL.toString(), label: 'Label' },
									{ value: ItemCategory.OTHER.toString(), label: 'Other' },
								]}
								label="Category"
							/>
						</div>

						{isEditing && (
							<Select
								id="item_status"
								name="item_status"
								value={formData.item_status.toString()}
								onChange={(value) =>
									setFormData((prev) => ({ ...prev, item_status: Number(value) as ItemStatus }))
								}
								options={[
									{ value: ItemStatus.ACTIVE.toString(), label: 'Active' },
									{ value: ItemStatus.INACTIVE.toString(), label: 'Inactive' },
								]}
								label="Status"
							/>
						)}
					</div>

					<div className="form-actions">
						<button type="button" className="btn-secondary" onClick={() => navigate('/items')}>
							Cancel
						</button>
						<button type="submit" className="btn-primary">
							<Save className="w-4 h-4" />
							<span>{isEditing ? 'Update Item' : 'Save Item'}</span>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ItemFormPage;
