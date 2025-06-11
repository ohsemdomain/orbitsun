import type { FC } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Input, Textarea, Select } from '../../components/ui';
import './item.css';

const ItemFormPage: FC = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: '',
		description: '',
		price: '',
		category: '',
		isActive: true,
	});

	const categoryOptions = [
		{ value: 'electronics', label: 'Electronics' },
		{ value: 'clothing', label: 'Clothing' },
		{ value: 'food', label: 'Food' },
		{ value: 'other', label: 'Other' },
	];

	const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type } = evt.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? evt.target.checked : value,
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

	return (
		<div className="forms-container">
			<div className="forms-header">
				<div className="forms-header-content">
					<button type="button" className="btn-ghost-icon" onClick={() => navigate('/items')}>
						<ArrowLeft className="w-5 h-5" />
					</button>
					<h1 className="forms-title">Create Item</h1>
				</div>
			</div>

			<div className="forms-content">
				<form className="forms-form">
					<div className="form-section">
						<h2 className="form-section-title">Basic Information</h2>
						
						{/* Name Input */}
						<Input
							id="name"
							name="name"
							type="text"
							value={formData.name}
							onChange={handleInputChange}
							placeholder="Item name"
							label="Item Name"
						/>

						{/* Description Textarea */}
						<Textarea
							id="description"
							name="description"
							value={formData.description}
							onChange={handleTextareaChange}
							placeholder="Item description"
							label="Description"
							rows={3}
						/>

						<div className="form-row">
							{/* Price Input */}
							<Input
								id="price"
								name="price"
								type="number"
								value={formData.price}
								onChange={handleInputChange}
								placeholder="0.00"
								label="Price"
								step="0.01"
							/>

							{/* Category Select */}
							<Select
								id="category"
								name="category"
								value={formData.category}
								onChange={handleCategoryChange}
								options={categoryOptions}
								placeholder="Select category"
								label="Category"
							/>
						</div>

						<div className="form-checkbox-group">
							<label className="form-checkbox-label">
								<input
									type="checkbox"
									name="isActive"
									className="form-checkbox"
									checked={formData.isActive}
									onChange={handleInputChange}
								/>
								<span>Active</span>
							</label>
						</div>
					</div>

					<div className="form-actions">
						<button type="button" className="btn-secondary" onClick={() => navigate('/items')}>
							Cancel
						</button>
						<button type="submit" className="btn-primary">
							<Save className="w-4 h-4" />
							<span>Save Item</span>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ItemFormPage;