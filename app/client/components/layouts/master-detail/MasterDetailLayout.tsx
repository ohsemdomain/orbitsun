import DetailPanel from '~client/components/layouts/master-detail/DetailPanel'
import ListPanel from '~client/components/layouts/master-detail/ListPanel'
import PanelContainer from '~client/components/layouts/master-detail/PanelContainer'
import type { MasterDetailLayoutProps, Identifiable } from '~client/components/layouts/master-detail/types'

export default function MasterDetailLayout<T extends Identifiable>({
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
}: MasterDetailLayoutProps<T>) {
	return (
		<PanelContainer
			masterPanel={
				<ListPanel
					items={items}
					selectedItem={selectedItem}
					onSelectItem={onSelectItem}
					renderListItem={renderListItem}
					listTitle={listTitle}
					itemKeyExtractor={itemKeyExtractor}
					isLoading={isLoadingItems}
					headerAction={headerAction}
				/>
			}
			detailPanel={
				<DetailPanel
					selectedItem={selectedItem}
					onSelectItem={onSelectItem}
					renderDetail={renderDetail}
					detailTitle={detailTitle}
					getItemTitle={getItemTitle}
					isLoading={isLoadingDetail}
					headerAction={detailHeaderAction}
				/>
			}
			selectedItem={selectedItem}
		/>
	)
}
