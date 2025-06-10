import { LayoutDashboard, Users, Ticket, Settings, Waves } from 'lucide-react';
import type { FC } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import DashboardPage from './features/dashboard/DashboardPage';
import ItemsPage from './features/items/ItemsPage';
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
		{ icon: Users, label: 'Items', path: '/items' },
		{ icon: Ticket, label: 'Contacts', path: '/contacts' },
		{ icon: Settings, label: 'Settings', path: '/settings' },
	];

	return (
		<div className="flex h-screen">
			<aside className="flex flex-col w-64 h-screen px-4 py-8 bg-gray-900">
				<NavLink to="/" className="mb-8">
					<div className="mr-6 flex items-center space-x-2">
						<Waves className="h-5 w-5 text-blue-500" />
						<span className="text-blue-500 hidden font-bold sm:inline-block font-headline">ORBITSUN</span>
					</div>
				</NavLink>

				<nav className="flex-1">
					{navItems.map((item, index) => {
						const Icon = item.icon;
						return (
							<NavLink
								key={item.path}
								to={item.path}
								className={({ isActive }) =>
									`flex items-center px-4 py-2 ${index > 0 ? 'mt-5' : ''} ${
										isActive
											? 'text-white bg-blue-500 rounded-md'
											: 'text-white transition-colors duration-300 transform hover:bg-gray-100 hover:text-gray-700'
									}`
								}
							>
								<Icon className="w-5 h-5" />
								<span className="ml-3">{item.label}</span>
							</NavLink>
						);
					})}
				</nav>
			</aside>

			<div className="flex-1 flex flex-col">
				{/* Topbar */}
				<header className="flex items-center justify-between h-16 px-6 bg-white border-b">
					<div className="flex items-center flex-1 max-w-md">
						<div className="relative w-full">
							<input
								type="text"
								placeholder="Search..."
								className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
								aria-label="Search"
							/>
						</div>
					</div>
					<div className="flex items-center">
						<button
							type="button"
							className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
							aria-label="Action button"
						>
							Action Button
						</button>
					</div>
				</header>

				{/* Main Area with Routes */}
				<main className="flex-1 overflow-auto">
					<Routes>
						<Route path="/" element={<Navigate to="/dashboard" replace />} />
						<Route path="/dashboard" element={<DashboardPage />} />
						<Route path="/items" element={<ItemsPage />} />
						<Route path="/contacts" element={<ContactsPage />} />
						<Route path="/settings" element={<SettingsPage />} />
					</Routes>
				</main>
			</div>
		</div>
	);
};

export default App;
