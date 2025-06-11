import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Input, Textarea, Select } from '../../components/ui';
import './item.css';

const ItemFormPage: FC = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const isEditing = Boolean(id);

	const [formData, setFormData] = useState({
		name: '',
		description: '',
		price: '',
		category: '',
		unitName: '',
		status: 'active',
	});

	const categoryOptions = [
		{ value: 'electronics', label: 'Electronics' },
		{ value: 'clothing', label: 'Clothing' },
		{ value: 'food', label: 'Food' },
		{ value: 'other', label: 'Other' },
	];

	const statusOptions = [
		{ value: 'active', label: 'Active' },
		{ value: 'inactive', label: 'Inactive' },
	];

	const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = evt.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleTextareaChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = evt.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleCategoryChange = (value: string) => {
		setFormData((prev) => ({
			...prev,
			category: value,
		}));
	};

	const handleStatusChange = (value: string) => {
		setFormData((prev) => ({
			...prev,
			status: value,
		}));
	};

	// Load existing item data when editing
	useEffect(() => {
		if (isEditing && id) {
			// TODO: Replace with actual API call to fetch item by id
			// For now, using mock data
			const mockItemData = {
				name: `Item ${id}`,
				description: `This is the description for item ${id}`,
				price: '29.99',
				category: 'electronics',
				unitName: 'pieces',
				status: 'active',
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
						
						{/* Name Input */}
						<Input
							id="name"
							name="name"
							type="text"
							value={formData.name}
							onChange={handleInputChange}
							label="Item Name"
						/>

						{/* Description Textarea */}
						<Textarea
							id="description"
							name="description"
							value={formData.description}
							onChange={handleTextareaChange}
							label="Description"
							rows={6}
						/>

						<div className="form-row">
							{/* Price Input */}
							<Input
								id="price"
								name="price"
								type="number"
								value={formData.price}
								onChange={handleInputChange}
								label="Price"
								step="0.01"
							/>

							{/* Unit Name Input */}
							<Input
								id="unitName"
								name="unitName"
								type="text"
								value={formData.unitName}
								onChange={handleInputChange}
								label="Unit Name"
							/>
						</div>

						{/* Category Select */}
						<Select
							id="category"
							name="category"
							value={formData.category}
							onChange={handleCategoryChange}
							options={categoryOptions}
							label="Category"
						/>

						{/* Status Select - Only show when editing */}
						{isEditing && (
							<Select
								id="status"
								name="status"
								value={formData.status}
								onChange={handleStatusChange}
								options={statusOptions}
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