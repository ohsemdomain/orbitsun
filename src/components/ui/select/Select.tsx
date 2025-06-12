import type { FC } from 'react';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import './select.css';

interface SelectOption {
	value: string;
	label: string;
}

interface SelectProps {
	value: string;
	onChange: (value: string) => void;
	options: SelectOption[];
	label?: string;
	id?: string;
	name?: string;
	className?: string;
	error?: string;
}

const Select: FC<SelectProps> = ({
	value,
	onChange,
	options,
	label,
	id,
	name,
	className = '',
	error,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const selectRef = useRef<HTMLDivElement>(null);

	// Close select when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleSelect = (optionValue: string) => {
		onChange(optionValue);
		setIsOpen(false);
	};

	const selectedOption = options.find((opt) => opt.value === value);

	return (
		<div className={`select-container ${className}`}>
			{label && (
				<label className="select-label">
					{label}
				</label>
			)}
			<div ref={selectRef} className="relative">
				<button
					type="button"
					id={id}
					name={name}
					onClick={() => setIsOpen(!isOpen)}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							setIsOpen(!isOpen);
						}
					}}
					aria-expanded={isOpen}
					aria-label={label}
					className={`select-button ${
						isOpen ? 'border-blue-500' : 'border-slate-200'
					} ${value ? 'text-slate-700' : 'text-slate-500'}`}
				>
					<div className="select-content">
						<span>{selectedOption ? selectedOption.label : 'Select an option'}</span>
						<ChevronDown className={`select-icon ${isOpen ? 'rotate-180' : ''}`} />
					</div>
				</button>

				{/* Dropdown Options */}
				{isOpen && (
					<div className="select-dropdown">
						{options.map((option) => (
							<button
								key={option.value}
								type="button"
								onClick={() => handleSelect(option.value)}
								onKeyDown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault();
										handleSelect(option.value);
									}
								}}
								className={`select-option ${
									value === option.value
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
			{error && (
				<span className="select-error-message">{error}</span>
			)}
		</div>
	);
};

export default Select;