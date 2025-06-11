// src/features/dashboard/DashboardPage.tsx
import type { FC } from 'react';
import RandomText from '../../components/RandomText';
import { DailySalesChart } from './charts/DailySalesChart';

const DashboardPage: FC = () => {
	return (
		<div className="h-full flex flex-col">
			{/* Sticky Header */}
			<div className="flex-shrink-0 bg-gradient-to-b from-blue-50 to-white z-10 px-4 lg:px-6 py-2 lg:py-4">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					{/* Left side - Title and description */}
					<div>
						<h1 className="text-2xl sm:text-3xl">Dashboard</h1>
						<p className="text-gray-500 text-sm sm:text-base">Overview of your data</p>
					</div>

					{/* Right side - Button group */}
					<div className="flex items-center gap-2 flex-wrap">
						<button
							type="button"
							className="inline-flex items-center justify-center h-9 gap-2 px-4 sm:px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-primary-500 focus:bg-primary-700 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300 disabled:shadow-none"
						>
							<span>Announcements</span>
						</button>
						<button
							type="button"
							className="inline-flex items-center justify-center h-9 gap-2 px-4 sm:px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-primary-500 focus:bg-primary-700 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300 disabled:shadow-none"
						>
							<span>Tutorial</span>
						</button>
					</div>
				</div>
			</div>

			{/* Scrollable Content */}
			<div className="flex-1 overflow-y-auto no-scrollbar">
				<div className="p-4 lg:p-6">
					{/* Small Cards */}
					<div className="mb-4 grid grid-cols-1 lg:grid-cols-5 gap-4">
						<div className="bg-white p-4 rounded-md border border-neutral-300">
							<p className="text-sm text-gray-600">This Month Revenue</p>
							<p className="font-geist text-2xl font-semibold mt-1">RM12,345</p>
							<p className="text-xs text-green-600 mt-2">
								<span className="font-geist">+8%</span> from last month
							</p>
						</div>

						<div className="bg-white p-4 rounded-md border border-neutral-300">
							<p className="text-sm text-gray-600">This Year Revenue</p>
							<p className="font-geist text-2xl font-semibold mt-1">RM79,103</p>
							<p className="text-xs text-red-600 mt-2">
								<span className="font-geist">-8%</span> from last year
							</p>
						</div>

						<div className="bg-white p-4 rounded-md border border-neutral-300">
							<p className="text-sm text-gray-600">Total Customers</p>
							<p className="font-geist text-2xl font-semibold mt-1">1,234</p>
							<p className="text-xs text-green-600 mt-2">
								<span className="font-geist">+12%</span> from last month
							</p>
						</div>

						<div className="bg-white p-4 rounded-md border border-neutral-300">
							<p className="text-sm text-gray-600">Orders</p>
							<p className="font-geist text-2xl font-semibold mt-1">456</p>
							<p className="text-xs text-red-600 mt-2">
								<span className="font-geist">-3%</span> from last month
							</p>
						</div>

						<div className="bg-red-50 p-4 rounded-md border border-red-300">
							<p className="text-sm text-gray-600">Pending Order</p>
							<p className="font-geist text-2xl font-semibold mt-1">89</p>
						</div>
					</div>

					{/* Medium Cards */}
					<div className="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
						<div className="bg-white p-4 rounded-md border border-neutral-300">
							<h3 className="font-semibold mb-3">Sales Stats</h3>
							<div className="space-y-3">
								<div className="flex justify-between items-center">
									<span className="text-sm">New user registered</span>
									<span className="text-xs text-gray-500">
										<span className="font-geist">2</span> hours ago
									</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm">
										Order <span className="font-geist">#1234</span> completed
									</span>
									<span className="text-xs text-gray-500">
										<span className="font-geist">3</span> hours ago
									</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm">New item added</span>
									<span className="text-xs text-gray-500">
										<span className="font-geist">5</span> hours ago
									</span>
								</div>
							</div>
						</div>

						<div className="bg-white p-4 rounded-md border border-neutral-300">
							<h3 className="font-semibold mb-3">Customers Service Stats</h3>
							<div className="space-y-3">
								<div className="flex justify-between items-center">
									<span className="text-sm">Conversion Rate</span>
									<span className="font-geist text-sm font-semibold">3.2%</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm">Avg. Order Value</span>
									<span className="font-geist text-sm font-semibold">RM27.50</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm">Avg. Reply Time</span>
									<span className="font-geist text-sm font-semibold">7 Minutes</span>
								</div>
							</div>
						</div>
					</div>

					{/* Example Chart Cards */}
					<div className="mb-4 grid grid-cols-1 lg:grid-cols-1 gap-4">
						<div className="bg-white p-4 rounded-md border border-neutral-300">
							<h3 className="font-semibold mb-4">Daily Sales Performance</h3>
							<DailySalesChart />
						</div>
					</div>

					{/* Random Text Cards */}
					<div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
						<div className="bg-white p-4 rounded-md border border-neutral-300">
							<RandomText />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;
