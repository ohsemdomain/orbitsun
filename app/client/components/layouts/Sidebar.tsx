import { NavLink } from 'react-router-dom'
import { XIcon } from '~client/assets/Icons'

interface SidebarProps {
	isMobileOpen: boolean
	toggleMobileSidebar: () => void
}

export default function Sidebar({
	isMobileOpen,
	toggleMobileSidebar,
}: SidebarProps) {
	const navItems = [
		{ to: '/', label: 'Dashboard', end: true },
		{ to: '/products', label: 'Products' },
	]

	return (
		<>
			{/* Mobile backdrop */}
			{isMobileOpen && (
				<button
					type="button"
					className="fixed inset-0 bg-black/50 bg-opacity-50 z-30 lg:hidden"
					onClick={toggleMobileSidebar}
					aria-label="Close sidebar"
				/>
			)}

			{/* Sidebar */}
			<aside
				className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 text-white p-4
          transition-transform duration-300
          lg:static lg:translate-x-0
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
			>
				<div className="flex justify-between items-center mb-4">
					<NavLink to="/" className="text-2xl font-bold">
						Explorer
					</NavLink>
					<button
						type="button"
						onClick={toggleMobileSidebar}
						className="lg:hidden"
					>
						<XIcon className="w-6 h-6" />
					</button>
				</div>

				<nav>
					{navItems.map((item) => (
						<NavLink
							key={item.to}
							to={item.to}
							end={item.end}
							className={({ isActive }) =>
								`block px-4 py-3 rounded-lg mb-2 ${
									isActive
										? 'bg-primary-500 text-white font-semibold'
										: 'text-gray-300 hover:bg-primary-700'
								}`
							}
							onClick={isMobileOpen ? toggleMobileSidebar : undefined}
						>
							{item.label}
						</NavLink>
					))}
				</nav>

				<div className="mt-auto text-center text-xs text-gray-500">
					Version 1.0.1
				</div>
			</aside>
		</>
	)
}
