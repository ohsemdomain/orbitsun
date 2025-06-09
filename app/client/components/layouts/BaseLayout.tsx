import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

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
				<Topbar toggleMobileSidebar={toggleMobileSidebar} />
				
				{/* Page content */}
				<main className={`flex-1 overflow-auto scrollbar-modern ${className}`}>
					{children}
				</main>
			</div>
		</div>
	)
}
