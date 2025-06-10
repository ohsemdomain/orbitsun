// src/components/search/SearchInput.tsx
import { useRef, useEffect } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import { useSearch } from './SearchProvider';
import { useLocation } from 'react-router-dom';

interface SearchInputProps {
	className?: string;
}

export function SearchInput({ className = '' }: SearchInputProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const { searchTerm, handleSearch, clearSearch } = useSearch();
	const location = useLocation();

	// Auto-generate placeholder from pathname with proper capitalization
	const getPlaceholder = () => {
		if (location.pathname === '/' || location.pathname === '/dashboard') {
			return 'Search ( / )';
		}

		// Extract route name and capitalize first letter
		const routeName = location.pathname.slice(1);
		const capitalizedRoute = routeName.charAt(0).toUpperCase() + routeName.slice(1);
		return `Search in ${capitalizedRoute} ( / )`;
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// Forward slash to focus search
			if (e.key === '/' && document.activeElement !== inputRef.current) {
				e.preventDefault();
				inputRef.current?.focus();
			}
			// Escape to clear search
			if (e.key === 'Escape' && document.activeElement === inputRef.current) {
				clearSearch();
				inputRef.current?.blur();
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [clearSearch]);

	return (
		<div className={`relative ${className}`}>
			<SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

			<input
				ref={inputRef}
				type="text"
				value={searchTerm}
				onChange={(e) => handleSearch(e.target.value)}
				placeholder={getPlaceholder()}
				className="block w-full pl-10 pr-10 py-2.5 border border-neutral-300 rounded-md bg-neutral-50 text-sm focus:bg-white"
			/>

			{searchTerm && (
				<button
					type="button"
					onClick={clearSearch}
					className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
				>
					<XIcon className="h-4 w-4" />
				</button>
			)}
		</div>
	);
}
