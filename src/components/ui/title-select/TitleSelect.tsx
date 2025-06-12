import type { FC } from 'react';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import './title-select.css';

interface SelectOption {
	value: string;
	label: string;
}

interface TitleSelectProps {
	value: string;
	onChange: (value: string) => void;
	options: SelectOption[];
	disabled?: boolean;
	className?: string;
}

const TitleSelect: FC<TitleSelectProps> = ({
	value,
	onChange,
	options,
	disabled = false,
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
		<div ref={selectRef} className={`title-select ${className}`}>
			<button
				type="button"
				onClick={() => !disabled && setIsOpen(!isOpen)}
				disabled={disabled}
				aria-expanded={isOpen}
				className={`title-select-button ${disabled ? 'title-select-disabled' : ''}`}
			>
				<h2 className="title-select-text">
					{selectedOption ? selectedOption.label : 'Select an option'}
				</h2>
				<ChevronDown className={`title-select-icon ${isOpen ? 'rotate-180' : ''}`} />
			</button>

			{/* Dropdown Options */}
			{isOpen && !disabled && (
				<div className="title-select-dropdown">
					{options.map((option) => (
						<button
							key={option.value}
							type="button"
							onClick={() => handleSelect(option.value)}
							className={`title-select-option ${
								value === option.value ? 'title-select-option-active' : ''
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

export default TitleSelect;
