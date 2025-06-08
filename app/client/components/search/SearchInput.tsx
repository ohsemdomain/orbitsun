import { useRef, useState, useEffect } from 'react'
import { SearchIcon, XIcon } from '~client/assets/Icons'
import { useSearchContext } from './useSearchContext'

interface SearchInputProps {
	className?: string
}

export default function SearchInput({ className = '' }: SearchInputProps) {
	const [searchTerm, setSearchTerm] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)
	const searchContext = useSearchContext()

	useEffect(() => {
		// Use useEffect directly, not React.useEffect
		const handleKeyDown = (e: KeyboardEvent) => {
			if (
				e.key === searchContext.shortcut &&
				document.activeElement?.tagName !== 'INPUT'
			) {
				e.preventDefault()
				inputRef.current?.focus()
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [searchContext.shortcut])

	return (
		<div className={`relative ${className}`}>
			<SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

			<input
				ref={inputRef}
				type="text"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder={searchContext.placeholder}
				className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:bg-white focus:border-primary-500"
			/>

			{searchTerm && (
				<button
					type="button"
					onClick={() => setSearchTerm('')}
					className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
				>
					<XIcon className="h-4 w-4" />
				</button>
			)}
		</div>
	)
}
