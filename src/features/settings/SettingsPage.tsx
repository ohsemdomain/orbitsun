import type { FC } from 'react';
import { useState, useRef, useEffect } from 'react';
import { Camera, ChevronDown } from 'lucide-react';
import ShadowScrollbars from '../../components/ShadowScrollbars';

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
		<div className="h-full flex flex-col overflow-hidden">
			{/* Sticky Header */}
			<div className="flex-shrink-0 px-4 lg:px-6 lg:py-4 py-2 bg-white border-b border-neutral-200">
				<h1>Settings</h1>
			</div>

			{/* Scrollable Content Area */}
			<ShadowScrollbars>
				<div className="flex-1 overflow-y-auto">
					<div className="px-4 lg:px-6 py-4 lg:py-6">
						<div className="w-full lg:w-[50%] border rounded-md border-neutral-200 p-4 lg:p-6">
							<h2 className="mb-6">Business Details</h2>

							{/* Business Logo Upload */}
							<div className="mb-8">
								<div className="block text-sm font-medium text-gray-700 mb-2">Business Logo</div>
								<div className="relative">
									<input
										id="businessLogo"
										name="businessLogo"
										type="file"
										className="hidden peer"
										accept=".gif,.jpg,.png,.jpeg,.webp"
										onChange={handleLogoChange}
									/>
									<label
										htmlFor="businessLogo"
										className="flex flex-col items-center gap-4 px-6 py-8 text-center border-2 border-dashed rounded-md cursor-pointer border-slate-300 hover:border-blue-400 transition-colors"
									>
										{logoPreview ? (
											<div className="relative group">
												<img
													src={logoPreview}
													alt="Business logo preview"
													className="h-20 w-20 object-cover rounded-md"
												/>
												<span className="absolute -top-2 -right-2 text-xs bg-blue-500 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
													Change
												</span>
											</div>
										) : (
											<span className="inline-flex items-center self-center justify-center h-12 w-12 rounded bg-slate-100/70 text-slate-400">
												<Camera className="w-6 h-6" />
											</span>
										)}
										<div className="flex flex-col items-center justify-center gap-1 text-sm">
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
										<div className="mt-2 flex items-center justify-between">
											<p className="text-xs text-slate-600">
												Selected: {logoFile.name} ({(logoFile.size / 1024 / 1024).toFixed(2)} MB)
											</p>
											<button
												type="button"
												onClick={removeLogo}
												className="text-xs text-red-500 hover:text-red-700 underline"
											>
												Remove
											</button>
										</div>
									)}
								</div>
							</div>

							{/* Business Name Input */}
							<div className="relative my-6">
								<input
									id="businessName"
									type="text"
									name="businessName"
									placeholder="Business name"
									value={formData.businessName}
									className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
									onChange={handleChange}
								/>
								<label
									htmlFor="businessName"
									className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-blue-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
								>
									Business Name
								</label>
							</div>

							{/* Business Email Input */}
							<div className="relative my-6">
								<input
									id="businessEmail"
									type="email"
									name="businessEmail"
									placeholder="Business email"
									value={formData.businessEmail}
									className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
									onChange={handleChange}
								/>
								<label
									htmlFor="businessEmail"
									className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-blue-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
								>
									Business Email
								</label>
							</div>

							{/* Business Phone Input */}
							<div className="relative my-6">
								<input
									id="businessPhone"
									type="tel"
									name="businessPhone"
									placeholder="Business phone"
									value={formData.businessPhone}
									className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
									onChange={handleChange}
								/>
								<label
									htmlFor="businessPhone"
									className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-blue-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
								>
									Business Phone
								</label>
							</div>

							{/* Business Website Input */}
							<div className="relative my-6">
								<input
									id="businessWebsite"
									type="url"
									name="businessWebsite"
									placeholder="Business website"
									value={formData.businessWebsite}
									className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
									onChange={handleChange}
								/>
								<label
									htmlFor="businessWebsite"
									className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-blue-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
								>
									Business Website
								</label>
							</div>

							{/* Registration Number Input */}
							<div className="relative my-6">
								<input
									id="registrationNumber"
									type="text"
									name="registrationNumber"
									placeholder="Registration number"
									value={formData.registrationNumber}
									className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
									onChange={handleChange}
								/>
								<label
									htmlFor="registrationNumber"
									className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-blue-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
								>
									Registration Number
								</label>
							</div>

							{/* Tax Type Select */}
							<div className="relative my-6" ref={selectRef}>
								<div
									onClick={() => setIsSelectOpen(!isSelectOpen)}
									className={`relative h-10 w-full rounded border px-4 text-sm cursor-pointer transition-all outline-none ${
										isSelectOpen ? 'border-blue-500' : 'border-slate-200'
									} ${formData.taxType ? 'text-slate-700' : 'text-slate-500'}`}
								>
									<div className="flex items-center justify-between h-full">
										<span>
											{formData.taxType
												? taxTypeOptions.find((opt) => opt.value === formData.taxType)?.label
												: 'Select tax type'}
										</span>
										<ChevronDown
											className={`w-4 h-4 transition-transform ${isSelectOpen ? 'rotate-180' : ''}`}
										/>
									</div>
								</div>
								<label
									className={`absolute left-2 -top-2 z-[1] px-2 text-xs transition-all bg-white ${
										isSelectOpen ? 'text-blue-500' : 'text-slate-400'
									} ${formData.taxType || isSelectOpen ? '' : 'opacity-0'}`}
								>
									Tax Type
								</label>

								{/* Dropdown Options */}
								{isSelectOpen && (
									<div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded shadow-lg z-10">
										{taxTypeOptions.map((option) => (
											<div
												key={option.value}
												onClick={() => handleSelectChange(option.value)}
												className={`px-4 py-2 text-sm cursor-pointer transition-colors hover:bg-slate-50 ${
													formData.taxType === option.value
														? 'bg-blue-50 text-blue-600'
														: 'text-slate-700'
												}`}
											>
												{option.label}
											</div>
										))}
									</div>
								)}
							</div>

							{/* Business Address Textarea */}
							<div className="relative my-6">
								<textarea
									id="businessAddress"
									name="businessAddress"
									placeholder="Business address"
									rows={3}
									value={formData.businessAddress}
									className="peer relative w-full px-4 py-2 text-sm placeholder-transparent transition-all border rounded outline-none focus-visible:outline-none border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
									onChange={handleChange}
								/>
								<label
									htmlFor="businessAddress"
									className="cursor-text peer-focus:cursor-default absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
								>
									Business Address
								</label>
							</div>

							{/* Save Button */}
							<div className="mt-8">
								<button
									type="button"
									className="inline-flex items-center justify-center h-10 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none"
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
