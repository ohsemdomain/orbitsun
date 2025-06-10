// src/components/search/SearchProvider.tsx
import { createContext, useContext, useState } from 'react';

interface SearchContextType {
	searchTerm: string;
	handleSearch: (term: string) => void;
	clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType>({
	searchTerm: '',
	handleSearch: () => {},
	clearSearch: () => {},
});

export const useSearch = () => {
	const context = useContext(SearchContext);
	if (!context) {
		throw new Error('useSearch must be used within a SearchProvider');
	}
	return context;
};

export function SearchProvider({ children }: { children: React.ReactNode }) {
	const [searchTerm, setSearchTerm] = useState('');

	const handleSearch = (term: string) => {
		setSearchTerm(term);
	};

	const clearSearch = () => {
		setSearchTerm('');
	};

	return (
		<SearchContext.Provider
			value={{
				searchTerm,
				handleSearch,
				clearSearch,
			}}
		>
			{children}
		</SearchContext.Provider>
	);
}
