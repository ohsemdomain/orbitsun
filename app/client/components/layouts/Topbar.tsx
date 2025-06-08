import SearchInput from '~client/components/search/SearchInput'
import UserMenu from '~client/components/layouts/UserMenu'

interface TopBarProps {
	className?: string
}

export default function TopBar({ className = '' }: TopBarProps) {
	return (
		<header
			className={`bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between ${className}`}
		>
			{/* Left Section - Search */}
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
