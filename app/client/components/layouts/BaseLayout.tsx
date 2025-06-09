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
	return (
		<div className="flex h-screen bg-gray-100">
			<Sidebar />
			
			{/* Main content area */}
			<div className="flex-1 flex flex-col overflow-hidden">
				<Topbar />
				
				{/* Page content */}
				<main className={`flex-1 overflow-auto scrollbar-modern ${className}`}>
					{children}
				</main>
			</div>
		</div>
	)
}
