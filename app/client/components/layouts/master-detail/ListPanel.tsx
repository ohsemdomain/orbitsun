import Spinner from '~client/components/loader/Spinner'
import type { ListPanelProps, Identifiable } from '~client/components/layouts/master-detail/types'

export default function ListPanel<T extends Identifiable>({
	items,
	selectedItem,
	onSelectItem,
	renderListItem,
	listTitle,
	itemKeyExtractor,
	isLoading = false,
	className = '',
	headerAction,
}: ListPanelProps<T>) {
	return (
		<div className={`flex flex-col h-full ${className}`}>
			<header className="bg-gray-50 p-4 border-b border-gray-200">
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-semibold text-gray-700">{listTitle}</h2>
					{headerAction}
				</div>
			</header>

			{isLoading ? (
				<div className="flex-grow flex items-center justify-center">
					<Spinner />
				</div>
			) : items.length === 0 ? (
				<div className="flex-grow flex items-center justify-center text-gray-500">
					No items available.
				</div>
			) : (
				<ul className="overflow-y-auto flex-grow">
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
}
