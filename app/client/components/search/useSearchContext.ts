import { useLocation } from 'react-router-dom'
import type { SearchScope } from './SearchProvider'

interface SearchContextConfig {
	scope: SearchScope
	placeholder: string
	shortcut: string
}

export function useSearchContext(): SearchContextConfig {
	const location = useLocation()

	switch (location.pathname) {
		case '/products':
			return {
				scope: 'products',
				placeholder: 'Search in Products (/)',
				shortcut: '/',
			}
		case '/contacts':
			return {
				scope: 'contacts',
				placeholder: 'Search in Contacts (/)',
				shortcut: '/',
			}
		default:
			return {
				scope: 'global',
				placeholder: 'Search (/)',
				shortcut: '/',
			}
	}
}