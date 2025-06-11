import type { FC } from 'react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, ChevronDown } from 'lucide-react';
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
	const [isSelectOpen, setIsSelectOpen] = useState(false);
	const selectRef = useRef<HTMLDivElement>(null);

	const categoryOptions = [
		{ value: 'electronics', label: 'Electronics' },
		{ value: 'clothing', label: 'Clothing' },
		{ value: 'food', label: 'Food' },
		{ value: 'other', label: 'Other' },
	];

	// Close select when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
				setIsSelectOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value, type } = evt.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? (evt.target as HTMLInputElement).checked : value,
		}));
	};

	const handleSelectChange = (value: string) => {
		setFormData((prev) => ({
			...prev,
			category: value,
		}));
		setIsSelectOpen(false);
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
							<div className="settings-select-container" ref={selectRef}>
								<button
									type="button"
									onClick={() => setIsSelectOpen(!isSelectOpen)}
									onKeyDown={(e) => {
										if (e.key === 'Enter' || e.key === ' ') {
											e.preventDefault();
											setIsSelectOpen(!isSelectOpen);
										}
									}}
									aria-expanded={isSelectOpen}
									aria-label="Select category"
									className={`settings-select ${
										isSelectOpen ? 'border-blue-500' : 'border-slate-200'
									} ${formData.category ? 'text-slate-700' : 'text-slate-500'}`}
								>
									<div className="settings-select-content">
										<span>
											{formData.category
												? categoryOptions.find((opt) => opt.value === formData.category)?.label
												: 'Select category'}
										</span>
										<ChevronDown
											className={`settings-select-icon ${isSelectOpen ? 'rotate-180' : ''}`}
										/>
									</div>
								</button>
								<span
									className={`settings-select-label ${
										isSelectOpen ? 'text-blue-500' : 'text-slate-400'
									} ${formData.category || isSelectOpen ? '' : 'opacity-0'}`}
								>
									Category
								</span>

								{/* Dropdown Options */}
								{isSelectOpen && (
									<div className="settings-select-dropdown">
										{categoryOptions.map((option) => (
											<button
												key={option.value}
												type="button"
												onClick={() => handleSelectChange(option.value)}
												onKeyDown={(e) => {
													if (e.key === 'Enter' || e.key === ' ') {
														e.preventDefault();
														handleSelectChange(option.value);
													}
												}}
												className={`settings-select-option ${
													formData.category === option.value
														? 'bg-blue-50 text-blue-600'
														: 'text-slate-700'
												}`}
											>
												{option.label}
											</button>
										))}
									</div>
								)}
							</div>
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