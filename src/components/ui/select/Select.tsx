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
	placeholder?: string;
	label?: string;
	id?: string;
	name?: string;
	className?: string;
}

const Select: FC<SelectProps> = ({
	value,
	onChange,
	options,
	placeholder = 'Select an option',
	label,
	id,
	name,
	className = '',
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
		<div className={`settings-select-container ${className}`} ref={selectRef}>
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
				aria-label={label || placeholder}
				className={`settings-select ${
					isOpen ? 'border-blue-500' : 'border-slate-200'
				} ${value ? 'text-slate-700' : 'text-slate-500'}`}
			>
				<div className="settings-select-content">
					<span>{selectedOption ? selectedOption.label : placeholder}</span>
					<ChevronDown className={`settings-select-icon ${isOpen ? 'rotate-180' : ''}`} />
				</div>
			</button>
			
			{label && (
				<span
					className={`settings-select-label ${
						isOpen ? 'text-blue-500' : 'text-slate-400'
					} ${value || isOpen ? '' : 'opacity-0'}`}
				>
					{label}
				</span>
			)}

			{/* Dropdown Options */}
			{isOpen && (
				<div className="settings-select-dropdown">
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
							className={`settings-select-option ${
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
	);
};

export default Select;