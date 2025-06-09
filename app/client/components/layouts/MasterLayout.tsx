import type { ReactNode } from 'react'
import { ArrowLeftIcon } from '~client/assets/Icons'
import Spinner from '~client/components/loader/Spinner'

// Generic type for MasterLayout items, ensuring they have an 'id'
export interface Identifiable {
	id: string | number
}

// Props for MasterLayout
export interface MasterLayoutProps<T extends Identifiable> {
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

export default function MasterLayout<T extends Identifiable>({
	items,
	selectedItem,
	onSelectItem,
	renderListItem,
	renderDetail,
	listTitle,
	detailTitle,
	itemKeyExtractor,
	getItemTitle,
	isLoadingItems = false,
	isLoadingDetail = false,
	headerAction,
	detailHeaderAction,
}: MasterLayoutProps<T>) {
	// List Panel Component (inline)
	const ListPanel = () => (
		<div className="flex flex-col h-full">
			<header className="bg-gray-50 p-4 border-b border-gray-200">
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-semibold text-gray-700">{listTitle}</h2>
					{headerAction}
				</div>
			</header>

			{isLoadingItems ? (
				<div className="flex-grow flex items-center justify-center">
					<Spinner />
				</div>
			) : items.length === 0 ? (
				<div className="flex-grow flex items-center justify-center text-gray-500">
					No items available.
				</div>
			) : (
				<ul className="overflow-y-auto flex-grow scrollbar-modern">
					{items.map((item: T) =>
						renderListItem(
							item,
							!!(selectedItem &&
								itemKeyExtractor(item) === itemKeyExtractor(selectedItem)),
							() => onSelectItem(item),
						),
					)}
				</ul>
			)}
		</div>
	)

	// Detail Panel Component (inline)
	const DetailPanel = () => {
		if (!selectedItem) {
			return (
				<div className="flex h-full w-full items-center justify-center">
					<Spinner />
				</div>
			)
		}

		return (
			<div className="flex flex-col h-full">
				{/* Mobile Header */}
				<header className="lg:hidden bg-gray-50 p-4 border-b border-gray-200 flex items-center sticky top-0 z-10">
					<button
						type="button"
						onClick={() => onSelectItem(null)}
						className="p-1 mr-3 text-primary-600 hover:text-primary-800 rounded-full hover:bg-gray-100"
					>
						<ArrowLeftIcon className="w-6 h-6" />
					</button>
					<h2 className="text-lg font-semibold text-gray-700 truncate">
						{getItemTitle(selectedItem)}
					</h2>
				</header>

				{/* Desktop Header */}
				<header className="hidden lg:block bg-gray-50 p-4 border-b border-gray-200">
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-semibold text-gray-700">
							{detailTitle}: {getItemTitle(selectedItem)}
						</h2>
						{detailHeaderAction}
					</div>
				</header>

				{/* Content */}
				<div className="p-6 overflow-y-auto flex-grow scrollbar-modern">
					{isLoadingDetail ? (
						<div className="flex h-full w-full items-center justify-center">
							<Spinner />
						</div>
					) : (
						renderDetail(selectedItem)
					)}
				</div>
			</div>
		)
	}

	// Main Layout with CSS Grid/Flexbox (replaces useResponsive logic)
	return (
		<div className="relative flex flex-col lg:flex-row lg:gap-x-6 h-full">
			{/* Master Panel */}
			<div className={`
				w-full bg-white shadow-lg rounded-lg
				transition-all duration-300
				${selectedItem ? 'max-lg:absolute max-lg:-translate-x-full max-lg:opacity-0' : ''}
				lg:w-2/5 lg:static lg:translate-x-0 lg:opacity-100
			`}>
				<ListPanel />
			</div>

			{/* Detail Panel */}
			<div className={`
				bg-white shadow-xl
				transition-transform duration-300
				${selectedItem ? 'max-lg:fixed max-lg:inset-0 max-lg:z-50 max-lg:translate-x-0' : 'max-lg:fixed max-lg:inset-0 max-lg:z-50 max-lg:translate-x-full'}
				lg:static lg:z-auto lg:w-3/5 lg:shadow-lg lg:rounded-lg lg:translate-x-0
			`}>
				<DetailPanel />
			</div>
		</div>
	)
}