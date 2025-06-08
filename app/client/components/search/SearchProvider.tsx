import { createContext, useContext, useState } from 'react'

export type SearchScope = 'products' | 'contacts' | 'global'

export interface SearchResult {
	id: string
	title: string
	type: SearchScope
	url: string
}

interface SearchContextType {
	searchTerm: string
	searchScope: SearchScope
	isSearching: boolean
	results: SearchResult[]
	setSearchTerm: (term: string) => void
	setSearchScope: (scope: SearchScope) => void
	handleSearch: (term: string) => void
	clearSearch: () => void
}

const SearchContext = createContext<SearchContextType>({
	searchTerm: '',
	searchScope: 'global',
	isSearching: false,
	results: [],
	setSearchTerm: () => {},
	setSearchScope: () => {},
	handleSearch: () => {},
	clearSearch: () => {},
})

export const useSearch = () => {
	const context = useContext(SearchContext)
	if (!context) {
		throw new Error('useSearch must be used within a SearchProvider')
	}
	return context
}

interface SearchProviderProps {
	children: React.ReactNode
}

export function SearchProvider({ children }: SearchProviderProps) {
	const [searchTerm, setSearchTerm] = useState('')
	const [searchScope, setSearchScope] = useState<SearchScope>('global')
	const [isSearching, setIsSearching] = useState(false)
	const [results, setResults] = useState<SearchResult[]>([])

	const handleSearch = (term: string) => {
		setSearchTerm(term)

		if (term.trim()) {
			setIsSearching(true)
			setTimeout(() => {
				const mockResults: SearchResult[] = [
					{
						id: '1',
						title: `Search result for "${term}"`,
						type: searchScope,
						url: '#',
					},
				]
				setResults(mockResults)
				setIsSearching(false)
			}, 300)
		} else {
			clearSearch()
		}
	}

	const clearSearch = () => {
		setSearchTerm('')
		setResults([])
		setIsSearching(false)
	}

	return (
		<SearchContext.Provider
			value={{
				searchTerm,
				searchScope,
				isSearching,
				results,
				setSearchTerm,
				setSearchScope,
				handleSearch,
				clearSearch,
			}}
		>
			{children}
		</SearchContext.Provider>
	)
}
