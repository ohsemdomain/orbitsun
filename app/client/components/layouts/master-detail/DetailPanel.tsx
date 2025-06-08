import { ArrowLeftIcon } from '~client/assets/Icons'
import Spinner from '~client/components/loader/Spinner'
import type { DetailPanelProps, Identifiable } from '~client/components/layouts/master-detail/types'

export default function DetailPanel<T extends Identifiable>({
	selectedItem,
	onSelectItem,
	renderDetail,
	detailTitle,
	getItemTitle,
	isLoading = false,
	showMobileHeader = true,
	className = '',
	headerAction,
}: DetailPanelProps<T>) {
	if (!selectedItem) {
		return (
			<div className="flex h-full w-full items-center justify-center">
				<Spinner />
			</div>
		)
	}

	return (
		<div className={`flex flex-col h-full ${className}`}>
			{/* Mobile Header */}
			{showMobileHeader && (
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
			)}

			{/* Desktop Header */}
			<header className="hidden lg:block bg-gray-50 p-4 border-b border-gray-200">
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-semibold text-gray-700">
						{detailTitle}: {getItemTitle(selectedItem)}
					</h2>
					{headerAction}
				</div>
			</header>

			{/* Content */}
			<div className="p-6 overflow-y-auto flex-grow">
				{isLoading ? (
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