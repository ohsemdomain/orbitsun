import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { MenuIcon } from '~client/assets/Icons'

interface BaseLayoutProps {
	children: React.ReactNode
	className?: string
}

export default function BaseLayout({
	children,
	className = '',
}: BaseLayoutProps) {
	const [isMobileOpen, setIsMobileOpen] = useState(false)

	const toggleMobileSidebar = () => {
		setIsMobileOpen(!isMobileOpen)
	}

	return (
		<div className="flex h-screen bg-gray-100">
			<Sidebar isMobileOpen={isMobileOpen} toggleMobileSidebar={toggleMobileSidebar} />
			
			{/* Main content area */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Mobile menu button */}
				<div className="lg:hidden bg-white border-b border-gray-200 px-4 py-2">
					<button
						type="button"
						onClick={toggleMobileSidebar}
						className="text-gray-500 hover:text-gray-700"
					>
						<MenuIcon className="w-6 h-6" />
					</button>
				</div>

				<Topbar />
				
				{/* Page content */}
				<main className={`flex-1 overflow-auto scrollbar-modern ${className}`}>
					{children}
				</main>
			</div>
		</div>
	)
}
