import {
	LayoutDashboard,
	ScanBarcode,
	BanknoteArrowDown,
	BanknoteArrowUp,
	Contact,
	Settings,
	Menu,
	X,
	Target,
	AlarmClockCheck,
} from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { SearchInput } from './components/search/SearchInput';
import DashboardPage from './features/dashboard/DashboardPage';
import TasksPage from './features/tasks/TasksPage';
import ItemsPage from './features/items/ItemsPage';
import InvoicesPage from './features/invoices/InvoicesPage';
import PurchasesPage from './features/purchases/PurchasesPage';
import ContactsPage from './features/contacts/ContactsPage';
import SettingsPage from './features/settings/SettingsPage';

interface NavItem {
	icon: FC<{ className?: string }>;
	label: string;
	path: string;
}

const App: FC = () => {
	const navItems: NavItem[] = [
		{ icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
		{ icon: AlarmClockCheck, label: 'Tasks', path: '/tasks' },
		{ icon: ScanBarcode, label: 'Items', path: '/items' },
		{ icon: Contact, label: 'Contacts', path: '/contacts' },
		{ icon: BanknoteArrowUp, label: 'Invoices', path: '/invoices' },
		{ icon: BanknoteArrowDown, label: 'Purchases', path: '/purchases' },
		{ icon: Settings, label: 'Settings', path: '/settings' },
	];

	const [isSideNavOpen, setIsSideNavOpen] = useState(false);

	const NavContent = () => (
		<>
			<NavLink to="/" className="mb-8" onClick={() => setIsSideNavOpen(false)}>
				<div className="flex items-center space-x-2">
					<Target className="h-5 w-5 text-blue-500" />
					<span className="text-blue-500 font-bold">ORBITSUN</span>
				</div>
			</NavLink>

			<nav className="flex-1">
				{navItems.map((item, index) => {
					const Icon = item.icon;
					return (
						<NavLink
							key={item.path}
							to={item.path}
							onClick={() => setIsSideNavOpen(false)}
							className={({ isActive }) =>
								`flex items-center px-4 py-2 ${index > 0 ? 'mt-2' : ''} ${
									isActive
										? 'text-white bg-blue-500 rounded'
										: 'text-white transition-colors duration-300 transform'
								}`
							}
						>
							<Icon className="w-5 h-5" />
							<span className="ml-3">{item.label}</span>
						</NavLink>
					);
				})}
			</nav>
		</>
	);

	return (
		<div className="flex h-screen relative font-roboto">
			{/* Desktop Sidebar */}
			<aside className="hidden lg:flex flex-col w-64 h-screen px-4 py-8 bg-gray-900">
				<NavContent />
			</aside>

			{/* Mobile Sidebar Overlay */}
			{isSideNavOpen && (
				<div
					className="fixed inset-0 bg-black/70 bg-opacity-50 z-40 lg:hidden"
					onClick={() => setIsSideNavOpen(false)}
					onKeyDown={(e) => {
						if (e.key === 'Escape') {
							setIsSideNavOpen(false);
						}
					}}
					role="button"
					tabIndex={0}
					aria-label="Close navigation"
				/>
			)}

			{/* Mobile Sidebar */}
			<aside
				id="nav-menu-1"
				className={`fixed top-0 left-0 z-50 flex flex-col w-64 h-screen px-4 py-8 bg-gray-900 transform transition-transform duration-300 lg:hidden ${
					isSideNavOpen ? 'translate-x-0' : '-translate-x-full'
				}`}
			>
				<NavContent />
			</aside>

			<div className="flex-1 flex flex-col">
				{/* Topbar */}
				<header className="flex items-center justify-between h-16 px-4 lg:px-6 bg-neutral-100 border-b border-neutral-200">
					<div className="flex items-center flex-1 max-w-md gap-4">
						{/* Mobile trigger */}
						<button
							title="Side navigation"
							type="button"
							className="lg:hidden p-2 text-white bg-primary-500 rounded transition-colors"
							aria-haspopup="menu"
							aria-label="Side navigation"
							aria-expanded={isSideNavOpen}
							aria-controls="nav-menu-1"
							onClick={() => setIsSideNavOpen(!isSideNavOpen)}
						>
							{isSideNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
						</button>
						{/* Search */}
						<div className="hidden lg:block lg:min-w-[450px]">
							<SearchInput />
						</div>
					</div>
					{/* User Profile Section */}
					<div className="flex items-center gap-3 ml-4">
						{/* Username */}
						<span className="text-sm font-medium text-gray-500">John Doe</span>

						{/* Logout Button */}
						<button
							type="button"
							onClick={() => {
								console.log('Logging out...');
							}}
							className="inline-flex items-center justify-center h-8 gap-2 px-6 text-sm font-medium tracking-wide transition duration-300 border rounded focus-visible:outline-none whitespace-nowrap border-primary-500 text-primary-500 focus:border-primary-700 focus:text-primary-700 disabled:cursor-not-allowed disabled:border-primary-300 disabled:text-primary-300 disabled:shadow-none"
						>
							<span>Signout</span>
						</button>
					</div>
				</header>

				{/* Main Area */}
				<main className="flex-1 overflow-hidden">
					<div className="h-full">
						<Routes>
							<Route path="/" element={<Navigate to="/dashboard" replace />} />
							<Route path="/dashboard" element={<DashboardPage />} />
							<Route path="/tasks" element={<TasksPage />} />
							<Route path="/items" element={<ItemsPage />} />
							<Route path="/contacts" element={<ContactsPage />} />
							<Route path="/invoices" element={<InvoicesPage />} />
							<Route path="/purchases" element={<PurchasesPage />} />
							<Route path="/settings" element={<SettingsPage />} />
						</Routes>
					</div>
				</main>
			</div>
		</div>
	);
};

export default App;
