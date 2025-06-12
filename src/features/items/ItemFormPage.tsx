// src/features/items/ItemFormPage.tsx
import type { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Input, Textarea, Select } from '../../components/ui';
import { CATEGORY_OPTIONS, STATUS_OPTIONS } from '@shared/item';
import { getFieldError } from '../../utils/validation';
import Spinner from '../../components/loader/Spinner';
import { useItemForm } from './hooks/useItemForm';
import './item.css';

const ItemFormPage: FC = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const isEditing = Boolean(id);

	// Use custom form hook
	const { formData, isSubmitting, errors, isLoadingItem, handleSubmit, updateFormData } =
		useItemForm({ id, isEditing });

	if (isEditing && isLoadingItem) {
		return (
			<div className="forms-container">
				<div className="h-full flex items-center justify-center">
					<Spinner />
				</div>
			</div>
		);
	}

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
				<form className="forms-form" onSubmit={handleSubmit}>
					<div className="form-section">
						<Input
							id="item_name"
							name="item_name"
							type="text"
							value={formData.item_name}
							onChange={(e) => updateFormData('item_name', e.target.value)}
							label="Item Name"
							error={getFieldError(errors, 'item_name')}
						/>

						<Textarea
							id="item_description"
							name="item_description"
							value={formData.item_description}
							onChange={(e) => updateFormData('item_description', e.target.value)}
							label="Description"
							rows={6}
							error={getFieldError(errors, 'item_description')}
						/>

						<div className="form-row">
							<Input
								id="item_price"
								name="item_price"
								type="number"
								value={formData.item_price}
								onChange={(e) => updateFormData('item_price', e.target.value)}
								label="Price"
								step="0.01"
								error={getFieldError(errors, 'item_price_cents')}
							/>

							<Input
								id="item_unit_name"
								name="item_unit_name"
								type="text"
								value={formData.item_unit_name}
								onChange={(e) => updateFormData('item_unit_name', e.target.value)}
								label="Unit Name"
								error={getFieldError(errors, 'item_unit_name')}
							/>
						</div>

						<Select
							id="item_category"
							name="item_category"
							value={formData.item_category.toString()}
							onChange={(value) => updateFormData('item_category', value)}
							options={CATEGORY_OPTIONS}
							label="Category"
							error={getFieldError(errors, 'item_category')}
						/>

						{isEditing && (
							<Select
								id="item_status"
								name="item_status"
								value={formData.item_status.toString()}
								onChange={(value) => updateFormData('item_status', value)}
								options={STATUS_OPTIONS}
								label="Status"
								error={getFieldError(errors, 'item_status')}
							/>
						)}
					</div>

					<div className="form-actions">
						<button type="button" className="btn-secondary" onClick={() => navigate('/items')}>
							Cancel
						</button>
						<button type="submit" className="btn-primary" disabled={isSubmitting}>
							<Save className="w-4 h-4" />
							<span>
								{isSubmitting
									? isEditing
										? 'Updating...'
										: 'Saving...'
									: isEditing
										? 'Update Item'
										: 'Save Item'}
							</span>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ItemFormPage;
