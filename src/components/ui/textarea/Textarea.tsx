import type { FC } from 'react';
import './textarea.css';

interface TextareaProps {
	id?: string;
	name?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	placeholder?: string;
	label?: string;
	rows?: number;
	className?: string;
	disabled?: boolean;
	required?: boolean;
}

const Textarea: FC<TextareaProps> = ({
	id,
	name,
	value,
	onChange,
	placeholder,
	label,
	rows = 3,
	className = '',
	disabled = false,
	required = false,
}) => {
	return (
		<div className={`textarea-group ${className}`}>
			<textarea
				id={id}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={label ? ' ' : placeholder}
				rows={rows}
				disabled={disabled}
				required={required}
				className="textarea-field"
			/>
			{label && (
				<label htmlFor={id} className="textarea-label">
					{label}
				</label>
			)}
		</div>
	);
};

export default Textarea;
