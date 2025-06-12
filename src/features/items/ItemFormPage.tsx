// src/features/items/ItemFormPage.tsx
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Input, Textarea, Select } from '../../components/ui';
import { ItemCategory, ItemStatus, type ItemFormData, CATEGORY_OPTIONS, STATUS_OPTIONS } from '@shared/item';
import { priceStringToCents, priceCentsToString } from '@shared/price-utils';
import { trpc } from '../../trpc';
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
		item_unit_name: '',
		item_status: ItemStatus.ACTIVE,
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	// Get utils for query invalidation
	const utils = trpc.useUtils();

	// tRPC mutations
	const createMutation = trpc.item.create.useMutation({
		onSuccess: () => {
			// Invalidate and refetch item queries
			utils.item.list.invalidate();
			utils.item.getAllForSearch.invalidate();
			navigate('/items');
		},
		onError: (error) => {
			console.error('Failed to create item:', error);
			alert('Failed to create item. Please try again.');
		},
	});

	const updateMutation = trpc.item.update.useMutation({
		onSuccess: () => {
			// Invalidate and refetch item queries
			utils.item.list.invalidate();
			utils.item.getAllForSearch.invalidate();
			navigate('/items');
		},
		onError: (error) => {
			console.error('Failed to update item:', error);
			alert('Failed to update item. Please try again.');
		},
	});

	// Get item data when editing
	const { data: existingItem, isLoading: isLoadingItem } = trpc.item.getById.useQuery(
		{ id: id! },
		{
			enabled: isEditing && Boolean(id),
		}
	);

	// Load existing item data when editing
	useEffect(() => {
		if (existingItem) {
			setFormData({
				item_name: existingItem.item_name,
				item_description: existingItem.item_description || '',
				item_price: priceCentsToString(existingItem.item_price_cents),
				item_category: existingItem.item_category,
				item_unit_name: existingItem.item_unit_name || '',
				item_status: existingItem.item_status,
			});
		}
	}, [existingItem]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
		if (isSubmitting) return;
		
		// Basic validation
		if (!formData.item_name.trim()) {
			alert('Item name is required');
			return;
		}
		
		if (!formData.item_price.trim()) {
			alert('Price is required');
			return;
		}

		setIsSubmitting(true);

		try {
			const priceInCents = priceStringToCents(formData.item_price);
			
			if (isEditing && id) {
				// Update existing item
				await updateMutation.mutateAsync({
					id,
					item_name: formData.item_name.trim(),
					item_description: formData.item_description.trim() || undefined,
					item_price_cents: priceInCents,
					item_category: formData.item_category,
					item_unit_name: formData.item_unit_name.trim() || undefined,
					item_status: formData.item_status,
				});
			} else {
				// Create new item
				await createMutation.mutateAsync({
					item_name: formData.item_name.trim(),
					item_description: formData.item_description.trim() || undefined,
					item_price_cents: priceInCents,
					item_category: formData.item_category,
					item_unit_name: formData.item_unit_name.trim() || undefined,
				});
			}
		} catch (error) {
			console.error('Form submission error:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isEditing && isLoadingItem) {
		return (
			<div className="forms-container">
				<div className="flex items-center justify-center py-8">
					<div className="text-slate-500">Loading item...</div>
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

							<Input
								id="item_unit_name"
								name="item_unit_name"
								type="text"
								value={formData.item_unit_name}
								onChange={(e) => setFormData((prev) => ({ ...prev, item_unit_name: e.target.value }))}
								label="Unit Name"
							/>
						</div>

						<Select
							id="item_category"
							name="item_category"
							value={formData.item_category.toString()}
							onChange={(value) =>
								setFormData((prev) => ({ ...prev, item_category: Number(value) as ItemCategory }))
							}
							options={CATEGORY_OPTIONS}
							label="Category"
						/>

						{isEditing && (
							<Select
								id="item_status"
								name="item_status"
								value={formData.item_status.toString()}
								onChange={(value) =>
									setFormData((prev) => ({ ...prev, item_status: Number(value) as ItemStatus }))
								}
								options={STATUS_OPTIONS}
								label="Status"
							/>
						)}
					</div>

					<div className="form-actions">
						<button type="button" className="btn-secondary" onClick={() => navigate('/items')}>
							Cancel
						</button>
						<button 
							type="submit" 
							className="btn-primary"
							disabled={isSubmitting}
						>
							<Save className="w-4 h-4" />
							<span>
								{isSubmitting 
									? (isEditing ? 'Updating...' : 'Saving...') 
									: (isEditing ? 'Update Item' : 'Save Item')
								}
							</span>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ItemFormPage;
