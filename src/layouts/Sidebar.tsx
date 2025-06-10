import { LayoutDashboard, Users, Ticket, Settings, Waves } from 'lucide-react';

interface SidebarProps {
	className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
	return (
		<aside
			className={`flex flex-col w-64 h-screen px-4 py-8 bg-white border-r dark:bg-gray-900 dark:border-gray-700 ${className}`}
		>
			<a href="#" className="mb-8">
				<div className="mr-6 flex items-center space-x-2">
					<Waves className="h-6 w-6 text-primary" />
					<span className="hidden font-bold sm:inline-block font-headline">
						SurfEdge
					</span>
				</div>
			</a>

			<nav className="flex-1">
				<a
					className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-200"
					href="#"
				>
					<LayoutDashboard className="w-5 h-5" />
					<span className="mx-4 font-medium">Dashboard</span>
				</a>

				<a
					className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
					href="#"
				>
					<Users className="w-5 h-5" />
					<span className="mx-4 font-medium">Items</span>
				</a>

				<a
					className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
					href="#"
				>
					<Ticket className="w-5 h-5" />
					<span className="mx-4 font-medium">Contacts</span>
				</a>

				<a
					className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
					href="#"
				>
					<Settings className="w-5 h-5" />
					<span className="mx-4 font-medium">Settings</span>
				</a>
			</nav>
		</aside>
	);
};

export default Sidebar;
