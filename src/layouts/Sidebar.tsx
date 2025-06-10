import { LayoutDashboard, Users, Ticket, Settings, Waves } from 'lucide-react';

interface SidebarProps {
	className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
	return (
		<aside
			className={`flex flex-col w-64 h-screen px-4 py-8 bg-white border-r dark:bg-gray-900 dark:border-gray-700 ${className}`}
		>
			<a href="/" className="mb-8">
				<div className="mr-6 flex items-center space-x-2">
					<Waves className="h-6 w-6 text-primary" />
					<span className="hidden font-bold sm:inline-block font-headline">Orbitsun</span>
				</div>
			</a>

			<nav className="flex-1">
				<a className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md" href="#">
					<LayoutDashboard className="w-5 h-5" />
					<span>Dashboard</span>
				</a>

				<a
					className="flex items-center px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-gray-100 hover:text-gray-700"
					href="#"
				>
					<Users className="w-5 h-5" />
					<span>Items</span>
				</a>

				<a
					className="flex items-center px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-gray-100 hover:text-gray-700"
					href="#"
				>
					<Ticket className="w-5 h-5" />
					<span>Contacts</span>
				</a>

				<a
					className="flex items-center px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-gray-100 hover:text-gray-700"
					href="#"
				>
					<Settings className="w-5 h-5" />
					<span>Settings</span>
				</a>
			</nav>
		</aside>
	);
};

export default Sidebar;
