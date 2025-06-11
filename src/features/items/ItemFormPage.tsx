import type { FC } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import Select from '../../components/ui/select/Select';
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

	const handleChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value, type } = evt.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? (evt.target as HTMLInputElement).checked : value,
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
						<div className="settings-form-group">
							<input
								id="name"
								type="text"
								name="name"
								placeholder="Item name"
								value={formData.name}
								className="settings-input"
								onChange={handleChange}
							/>
							<label
								htmlFor="name"
								className="settings-label"
							>
								Item Name
							</label>
						</div>

						{/* Description Textarea */}
						<div className="settings-form-group">
							<textarea
								id="description"
								name="description"
								placeholder="Item description"
								rows={3}
								value={formData.description}
								className="settings-textarea"
								onChange={handleChange}
							/>
							<label
								htmlFor="description"
								className="settings-label"
							>
								Description
							</label>
						</div>

						<div className="form-row">
							{/* Price Input */}
							<div className="settings-form-group">
								<input
									id="price"
									type="number"
									name="price"
									placeholder="0.00"
									step="0.01"
									value={formData.price}
									className="settings-input"
									onChange={handleChange}
								/>
								<label
									htmlFor="price"
									className="settings-label"
								>
									Price
								</label>
							</div>

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
									onChange={handleChange}
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