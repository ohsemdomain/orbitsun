import type { FC } from 'react';
import { useState, useRef, useEffect } from 'react';
import { Camera, ChevronDown } from 'lucide-react';
import ShadowScrollbars from '../../components/ShadowScrollbars';
import './setting.css';

const SettingsPage: FC = () => {
	const [formData, setFormData] = useState({
		businessName: '',
		businessEmail: '',
		businessPhone: '',
		businessAddress: '',
		businessWebsite: '',
		registrationNumber: '',
		taxType: '',
	});
	const [logoFile, setLogoFile] = useState<File | null>(null);
	const [logoPreview, setLogoPreview] = useState<string | null>(null);
	const [isSelectOpen, setIsSelectOpen] = useState(false);
	const selectRef = useRef<HTMLDivElement>(null);

	const taxTypeOptions = [
		{ value: 'on-total', label: 'On Total' },
		{ value: 'deducted', label: 'Deducted' },
		{ value: 'per-item', label: 'Per Item' },
		{ value: 'none', label: 'None' },
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
		const { name, value } = evt.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSelectChange = (value: string) => {
		setFormData((prev) => ({
			...prev,
			taxType: value,
		}));
		setIsSelectOpen(false);
	};

	const handleLogoChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const file = evt.target.files?.[0];
		if (file) {
			setLogoFile(file);
			// Create preview URL
			const reader = new FileReader();
			reader.onloadend = () => {
				setLogoPreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const removeLogo = () => {
		setLogoFile(null);
		setLogoPreview(null);
		// Reset the file input
		const fileInput = document.getElementById('businessLogo') as HTMLInputElement;
		if (fileInput) {
			fileInput.value = '';
		}
	};

	return (
		<div className="settings-container">
			{/* Sticky Header */}
			<div className="settings-header">
				<h1>Settings</h1>
			</div>

			{/* Scrollable Content Area */}
			<ShadowScrollbars>
				<div className="settings-content-wrapper">
					<div className="settings-content">
						<div className="settings-form-card">
							<h2 className="settings-section-title">Business Details</h2>

							{/* Business Logo Upload */}
							<div className="settings-form-group-upload">
								<div className="settings-label-static">Business Logo</div>
								<div className="relative">
									<input
										id="businessLogo"
										name="businessLogo"
										type="file"
										className="settings-upload-input"
										accept=".gif,.jpg,.png,.jpeg,.webp"
										onChange={handleLogoChange}
									/>
									<label
										htmlFor="businessLogo"
										className="settings-upload-label"
									>
										{logoPreview ? (
											<div className="settings-upload-preview-container">
												<img
													src={logoPreview}
													alt="Business logo preview"
													className="settings-upload-preview"
												/>
												<span className="settings-upload-preview-badge">
													Change
												</span>
											</div>
										) : (
											<span className="settings-upload-icon-container">
												<Camera className="w-6 h-6" />
											</span>
										)}
										<div className="settings-upload-text">
											<span className="text-blue-500 hover:text-blue-600">
												{logoPreview ? 'Change logo' : 'Upload logo'}
												<span className="text-slate-500"> or drag and drop </span>
											</span>
											<span className="text-slate-600 text-xs">
												{' '}
												PNG, JPG, GIF or WebP up to 10MB{' '}
											</span>
										</div>
									</label>
									{logoFile && (
										<div className="settings-upload-info">
											<p className="text-xs text-slate-600">
												Selected: {logoFile.name} ({(logoFile.size / 1024 / 1024).toFixed(2)} MB)
											</p>
											<button
												type="button"
												onClick={removeLogo}
												className="settings-upload-remove"
											>
												Remove
											</button>
										</div>
									)}
								</div>
							</div>

							{/* Business Name Input */}
							<div className="settings-form-group">
								<input
									id="businessName"
									type="text"
									name="businessName"
									placeholder="Business name"
									value={formData.businessName}
									className="settings-input"
									onChange={handleChange}
								/>
								<label
									htmlFor="businessName"
									className="settings-label"
								>
									Business Name
								</label>
							</div>

							{/* Business Email Input */}
							<div className="settings-form-group">
								<input
									id="businessEmail"
									type="email"
									name="businessEmail"
									placeholder="Business email"
									value={formData.businessEmail}
									className="settings-input"
									onChange={handleChange}
								/>
								<label
									htmlFor="businessEmail"
									className="settings-label"
								>
									Business Email
								</label>
							</div>

							{/* Business Phone Input */}
							<div className="settings-form-group">
								<input
									id="businessPhone"
									type="tel"
									name="businessPhone"
									placeholder="Business phone"
									value={formData.businessPhone}
									className="settings-input"
									onChange={handleChange}
								/>
								<label
									htmlFor="businessPhone"
									className="settings-label"
								>
									Business Phone
								</label>
							</div>

							{/* Business Website Input */}
							<div className="settings-form-group">
								<input
									id="businessWebsite"
									type="url"
									name="businessWebsite"
									placeholder="Business website"
									value={formData.businessWebsite}
									className="settings-input"
									onChange={handleChange}
								/>
								<label
									htmlFor="businessWebsite"
									className="settings-label"
								>
									Business Website
								</label>
							</div>

							{/* Registration Number Input */}
							<div className="settings-form-group">
								<input
									id="registrationNumber"
									type="text"
									name="registrationNumber"
									placeholder="Registration number"
									value={formData.registrationNumber}
									className="settings-input"
									onChange={handleChange}
								/>
								<label
									htmlFor="registrationNumber"
									className="settings-label"
								>
									Registration Number
								</label>
							</div>

							{/* Tax Type Select */}
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
									aria-label="Select tax type"
									className={`settings-select ${
										isSelectOpen ? 'border-blue-500' : 'border-slate-200'
									} ${formData.taxType ? 'text-slate-700' : 'text-slate-500'}`}
								>
									<div className="settings-select-content">
										<span>
											{formData.taxType
												? taxTypeOptions.find((opt) => opt.value === formData.taxType)?.label
												: 'Select tax type'}
										</span>
										<ChevronDown
											className={`settings-select-icon ${isSelectOpen ? 'rotate-180' : ''}`}
										/>
									</div>
								</button>
								<span
									className={`settings-select-label ${
										isSelectOpen ? 'text-blue-500' : 'text-slate-400'
									} ${formData.taxType || isSelectOpen ? '' : 'opacity-0'}`}
								>
									Tax Type
								</span>

								{/* Dropdown Options */}
								{isSelectOpen && (
									<div className="settings-select-dropdown">
										{taxTypeOptions.map((option) => (
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
													formData.taxType === option.value
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

							{/* Business Address Textarea */}
							<div className="settings-form-group">
								<textarea
									id="businessAddress"
									name="businessAddress"
									placeholder="Business address"
									rows={3}
									value={formData.businessAddress}
									className="settings-textarea"
									onChange={handleChange}
								/>
								<label
									htmlFor="businessAddress"
									className="settings-label"
								>
									Business Address
								</label>
							</div>

							{/* Save Button */}
							<div className="mt-8">
								<button
									type="button"
									className="settings-btn-save"
								>
									Save Changes
								</button>
							</div>
						</div>
					</div>
				</div>
			</ShadowScrollbars>
		</div>
	);
};

export default SettingsPage;