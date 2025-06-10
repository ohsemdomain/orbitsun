import { Search } from 'lucide-react';

interface TopbarProps {
	className?: string;
}

const Topbar: React.FC<TopbarProps> = ({ className = '' }) => {
	return (
		<div
			className={`flex items-center justify-between h-16 px-6 bg-white border-b dark:bg-gray-900 dark:border-gray-700 ${className}`}
		>
			{/* Left side - Search input */}
			<div className="flex items-center flex-1 max-w-md">
				<div className="relative w-full">
					<span className="absolute inset-y-0 left-0 flex items-center pl-3">
						<Search className="w-5 h-5 text-gray-400" />
					</span>
					<input
						type="text"
						className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-2 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none"
						placeholder="Search..."
					/>
				</div>
			</div>

			{/* Right side - Placeholder button */}
			<div className="flex items-center">
				<button
					type="button"
					className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
				>
					Action Button
				</button>
			</div>
		</div>
	);
};

export default Topbar;
