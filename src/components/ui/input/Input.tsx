import type { FC } from 'react';
import './input.css';

interface InputProps {
	id?: string;
	name?: string;
	type?: 'text' | 'email' | 'tel' | 'url' | 'number' | 'password';
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	label?: string;
	step?: string;
	className?: string;
	disabled?: boolean;
	required?: boolean;
	error?: string;
}

const Input: FC<InputProps> = ({
	id,
	name,
	type = 'text',
	value,
	onChange,
	label,
	step,
	className = '',
	disabled = false,
	required = false,
	error,
}) => {
	return (
		<div className={`input-group ${className}`}>
			{label && (
				<label htmlFor={id} className="input-label">
					{label}
				</label>
			)}
			<input
				id={id}
				name={name}
				type={type}
				value={value}
				onChange={onChange}
				step={step}
				disabled={disabled}
				required={required}
				className={`input-field ${error ? 'input-error' : ''}`}
			/>
			{error && (
				<span className="input-error-message">{error}</span>
			)}
		</div>
	);
};

export default Input;
