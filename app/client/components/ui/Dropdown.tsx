import type React from 'react'
import { useState, useEffect, useRef } from 'react'

interface DropdownOption {
	value: string
	label: string
	disabled?: boolean
}

interface DropdownProps {
	trigger: React.ReactNode
	options: DropdownOption[]
	onSelect: (value: string) => void
	selectedValue?: string
	className?: string
	menuClassName?: string
	placement?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
}

export default function Dropdown({
	trigger,
	options,
	onSelect,
	selectedValue,
	className = '',
	menuClassName = '',
	placement = 'bottom-left',
}: DropdownProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [focusedIndex, setFocusedIndex] = useState(-1)
	const wrapperRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!isOpen) return

		function handleClickOutside(event: MouseEvent) {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}

		function handleKeyDown(e: KeyboardEvent) {
			switch (e.key) {
				case 'ArrowDown':
					e.preventDefault()
					setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0))
					break
				case 'ArrowUp':
					e.preventDefault()
					setFocusedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1))
					break
				case 'Enter':
					e.preventDefault()
					if (focusedIndex >= 0 && !options[focusedIndex].disabled) {
						onSelect(options[focusedIndex].value)
						setIsOpen(false)
					}
					break
				case 'Escape':
					e.preventDefault()
					setIsOpen(false)
					break
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [isOpen, focusedIndex, options, onSelect])

	const handleOptionClick = (value: string, disabled?: boolean) => {
		if (disabled) return
		onSelect(value)
		setIsOpen(false)
	}

	const placementClasses = {
		'bottom-right': 'right-0 mt-2',
		'top-left': 'left-0 bottom-full mb-2',
		'top-right': 'right-0 bottom-full mb-2',
		'bottom-left': 'left-0 mt-2',
	}

	return (
		<div className={`relative ${className}`} ref={wrapperRef}>
			<button
				type="button"
				onClick={() => {
					setIsOpen(!isOpen)
					setFocusedIndex(-1)
				}}
			>
				{trigger}
			</button>

			{isOpen && (
				<div
					className={`absolute z-20 min-w-full bg-white rounded-md shadow-lg border border-gray-200 py-1 max-h-60 overflow-auto ${placementClasses[placement]} ${menuClassName}`}
				>
					{options.map((option, index) => (
						<button
							key={option.value}
							type="button"
							onClick={() => handleOptionClick(option.value, option.disabled)}
							onMouseEnter={() => setFocusedIndex(index)}
							disabled={option.disabled}
							className={`w-full text-left px-3 py-2 text-sm transition-colors ${
								option.disabled
									? 'text-gray-400 cursor-not-allowed'
									: index === focusedIndex
										? 'bg-primary-50 text-primary-700'
										: option.value === selectedValue
											? 'bg-primary-50 text-primary-700'
											: 'text-gray-700 hover:bg-gray-100'
							}`}
						>
							{option.label}
						</button>
					))}
				</div>
			)}
		</div>
	)
}
