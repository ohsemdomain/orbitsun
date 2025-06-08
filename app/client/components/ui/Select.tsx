import Dropdown from '~client/components/ui/Dropdown'
import { ChevronDownIcon } from '~client/assets/Icons'

interface SelectOption {
	value: string
	label: string
	disabled?: boolean
}

interface SelectProps {
	id: string
	name: string
	value: string
	onChange: (value: string) => void
	options: SelectOption[]
	placeholder?: string
	required?: boolean
	disabled?: boolean
	className?: string
	error?: string
}

export default function Select({
	id,
	name,
	value,
	onChange,
	options,
	placeholder = 'Select an option',
	required = false,
	disabled = false,
	className = '',
	error,
}: SelectProps) {
	const selectedOption = options.find((option) => option.value === value)

	return (
		<div className="w-full">
			<Dropdown
				trigger={
					<button
						type="button"
						id={id}
						disabled={disabled}
						className={`w-full px-3 py-2 text-left bg-white border rounded-md shadow-sm ${
							error ? 'border-red-300' : 'border-gray-300'
						} ${
							disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''
						} ${className}`}
					>
						<div className="flex items-center justify-between">
							<span
								className={selectedOption ? 'text-gray-900' : 'text-gray-500'}
							>
								{selectedOption ? selectedOption.label : placeholder}
							</span>
							<ChevronDownIcon className="w-4 h-4 text-gray-400" />
						</div>
					</button>
				}
				options={options}
				onSelect={onChange}
				selectedValue={value}
				menuClassName="min-w-full"
			/>

			<input type="hidden" name={name} value={value} required={required} />

			{error && <p className="mt-1 text-sm text-red-600">{error}</p>}
		</div>
	)
}
