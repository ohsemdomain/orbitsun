import type { FC } from 'react';
import ShadowScrollbars from '../../components/ShadowScrollbars';
import { Plus, SquarePen, Link, MoreHorizontal } from 'lucide-react';
import RandomText from '../../components/RandomText';

const InvoicesPage: FC = () => {
	return (
		<div className="h-full flex">
			{/* Left Panel - Full width on mobile, 45% on lg and above */}
			<div className="w-full lg:w-[35%] h-full flex flex-col overflow-hidden border-r border-neutral-200">
				<div className="flex-shrink-0 px-4 lg:px-6 py-6">
					<div className="flex items-center justify-between">
						<div>
							<h2>Invoices</h2>
						</div>
						<div>
							<button
								type="button"
								className="inline-flex items-center justify-center h-9 w-9 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-primary-500 focus:bg-primary-700 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300 disabled:shadow-none"
							>
								<Plus className="w-4 h-4" />
							</button>
						</div>
					</div>
				</div>
				<div className="flex-1 overflow-hidden">
					<ShadowScrollbars>
						<div className="pt-0 pb-6">
							{/* Left scrollable content goes here */}
							<div className="space-y-0 border-t border-neutral-100">
								{/* Example content */}
								{[...Array(20)].map((_, i) => (
									<div key={i} className="py-4 px-4 lg:px-6 border-b border-neutral-100">
										<p>Invoice {i + 1}</p>
										<p>Invoice {i + 1}</p>
									</div>
								))}
							</div>
						</div>
					</ShadowScrollbars>
				</div>
			</div>

			{/* Right Panel - Hidden on mobile, shown on lg and above */}
			<div className="hidden lg:flex flex-1 h-full flex-col overflow-hidden">
				<div className="flex-shrink-0 px-8 py-6">
					<div className="flex items-center justify-between">
						<div>
							<h1>Detail</h1>
						</div>
						<div>
							<div className="inline-flex overflow-hidden divide-x rounded divide-neutral-100">
								<button
									type="button"
									className="inline-flex items-center justify-center h-9 gap-2 px-4 sm:px-5 text-sm font-medium tracking-wide text-white transition duration-300 whitespace-nowrap bg-neutral-500 focus:bg-neutral-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-neutral-300 disabled:bg-neutral-300 disabled:shadow-none"
								>
									<SquarePen className="w-4 h-4" />
									<span>Edit</span>
								</button>
								<button
									type="button"
									className="inline-flex items-center justify-center h-9 gap-2 px-4 sm:px-5 text-sm font-medium tracking-wide text-white transition duration-300 whitespace-nowrap bg-neutral-500 focus:bg-neutral-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-neutral-300 disabled:bg-neutral-300 disabled:shadow-none"
								>
									<Link className="w-4 h-4" />
									<span>Share</span>
								</button>
								<button
									type="button"
									className="inline-flex items-center justify-center h-9 w-9 gap-2 text-sm font-medium tracking-wide text-white transition duration-300 whitespace-nowrap bg-neutral-500 focus:bg-neutral-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-neutral-300 disabled:bg-neutral-300 disabled:shadow-none"
								>
									<MoreHorizontal className="w-4 h-4" />
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="flex-1 overflow-y-auto p-8 pt-0 no-scrollbar">
					{/* Right scrollable content goes here */}
					<div className="p-6 rounded-md border border-neutral-200">
						<RandomText />
					</div>
				</div>
			</div>
		</div>
	);
};

export default InvoicesPage;
