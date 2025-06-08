import { useResponsive } from '~client/components/layouts/useResponsive'
import type { PanelContainerProps } from '~client/components/layouts/master-detail/types'

export default function PanelContainer({
	masterPanel,
	detailPanel,
	selectedItem,
	className = '',
}: PanelContainerProps) {
	const { isMobile } = useResponsive()
	const showDetail = selectedItem !== null && isMobile

	return (
		<div
			className={`relative flex flex-col lg:flex-row lg:gap-x-6 h-full ${className}`}
		>
			{/* Master Panel */}
			<div
				className={`
					w-full bg-white shadow-lg rounded-lg
					transition-all duration-300
					${showDetail ? 'absolute -translate-x-full opacity-0' : ''}
					lg:w-2/5 lg:static lg:translate-x-0 lg:opacity-100
				`}
			>
				{masterPanel}
			</div>

			{/* Detail Panel */}
			<div
				className={`
					fixed inset-0 z-50 bg-white shadow-xl
					transition-transform duration-300
					${selectedItem ? 'translate-x-0' : 'translate-x-full'}
					lg:static lg:z-auto lg:w-3/5 lg:shadow-lg lg:rounded-lg lg:translate-x-0
				`}
			>
				{detailPanel}
			</div>
		</div>
	)
}
