import { useRef, useEffect } from "react";
import { SearchIcon, XIcon } from "lucide-react";
import { useSearch } from "./SearchProvider";

interface SearchInputProps {
	className?: string;
	placeholder?: string;
}

export function SearchInput({ 
	className = "",
	placeholder = "Search..."
}: SearchInputProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const { searchTerm, handleSearch, clearSearch } = useSearch();

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// Cmd/Ctrl + K to focus search
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault();
				inputRef.current?.focus();
			}
			// Escape to clear search
			if (e.key === "Escape" && document.activeElement === inputRef.current) {
				clearSearch();
				inputRef.current?.blur();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [clearSearch]);

	return (
		<div className={`relative ${className}`}>
			<SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

			<input
				ref={inputRef}
				type="text"
				value={searchTerm}
				onChange={(e) => handleSearch(e.target.value)}
				placeholder={placeholder}
				className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:bg-white focus:border-primary-500"
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