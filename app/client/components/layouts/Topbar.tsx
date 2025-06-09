import SearchInput from '~client/components/search/SearchInput'
import UserMenu from '~client/components/layouts/UserMenu'
import { MenuIcon } from '~client/assets/Icons'

interface TopBarProps {
	className?: string
	toggleMobileSidebar?: () => void
}

export default function TopBar({ 
	className = '',
	toggleMobileSidebar
}: TopBarProps) {
	return (
		<header
			className={`bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4 ${className}`}
		>
			{/* Mobile menu button */}
			{toggleMobileSidebar && (
				<button
					type="button"
					onClick={toggleMobileSidebar}
					className="lg:hidden text-gray-500 hover:text-gray-700 p-1"
				>
					<MenuIcon className="w-6 h-6" />
				</button>
			)}

			{/* Search Input - takes remaining space */}
			<div className="flex-1 max-w-md">
				<SearchInput />
			</div>

			{/* Right Section - User Actions */}
			<div className="flex items-center gap-4">
				<UserMenu />
			</div>
		</header>
	)
}
