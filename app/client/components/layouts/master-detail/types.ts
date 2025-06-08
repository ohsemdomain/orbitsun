import type { ReactNode } from 'react'

// Generic type for MasterDetailLayout items, ensuring they have an 'id'
export interface Identifiable {
	id: string | number
}

// Props for MasterDetailLayout
export interface MasterDetailLayoutProps<T extends Identifiable> {
	items: T[]
	selectedItem: T | null
	onSelectItem: (item: T | null) => void
	renderListItem: (item: T, isSelected: boolean, onSelect: () => void) => ReactNode
	renderDetail: (item: T) => ReactNode
	listTitle: string
	detailTitle: string
	itemKeyExtractor: (item: T) => string | number
	getItemTitle: (item: T) => string
	isLoadingItems?: boolean
	isLoadingDetail?: boolean
	headerAction?: ReactNode
	detailHeaderAction?: ReactNode
}

// Props for ListPanel
export interface ListPanelProps<T extends Identifiable> {
	items: T[]
	selectedItem: T | null
	onSelectItem: (item: T | null) => void
	renderListItem: (item: T, isSelected: boolean, onSelect: () => void) => ReactNode
	listTitle: string
	itemKeyExtractor: (item: T) => string | number
	isLoading?: boolean
	className?: string
	headerAction?: ReactNode
}

// Props for DetailPanel
export interface DetailPanelProps<T extends Identifiable> {
	selectedItem: T | null
	onSelectItem: (item: T | null) => void
	renderDetail: (item: T) => ReactNode
	detailTitle: string
	getItemTitle: (item: T) => string
	isLoading?: boolean
	showMobileHeader?: boolean
	className?: string
	headerAction?: ReactNode
}

// Props for PanelContainer
export interface PanelContainerProps {
	masterPanel: ReactNode
	detailPanel: ReactNode
	selectedItem: unknown
	className?: string
}