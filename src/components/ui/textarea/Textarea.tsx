import type { FC } from 'react';
import './textarea.css';

interface TextareaProps {
	id?: string;
	name?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
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
	label,
	rows = 3,
	className = '',
	disabled = false,
	required = false,
}) => {
	return (
		<div className={`textarea-group ${className}`}>
			{label && (
				<label htmlFor={id} className="textarea-label">
					{label}
				</label>
			)}
			<textarea
				id={id}
				name={name}
				value={value}
				onChange={onChange}
				rows={rows}
				disabled={disabled}
				required={required}
				className="textarea-field"
			/>
		</div>
	);
};

export default Textarea;
