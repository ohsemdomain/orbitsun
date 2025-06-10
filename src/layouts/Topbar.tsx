interface TopbarProps {
	className?: string;
}

const Topbar: React.FC<TopbarProps> = ({ className = '' }) => {
	return (
		<div
			className={`flex items-center justify-between h-16 px-6 bg-white border-b ${className}`}
		>
			{/* Left side */}
			<div className="flex items-center flex-1 max-w-md">
				<div className="relative w-full">
					<input type="text" placeholder="Search..." />
				</div>
			</div>

			{/* Right side */}
			<div className="flex items-center">
				<button
					type="button"
					className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
				>
					Action Button
				</button>
			</div>
		</div>
	);
};

export default Topbar;
