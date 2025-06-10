// src/features/dashboard/DashboardPage.tsx
import type { FC } from 'react';
import RandomText from '../../components/RandomText';

const DashboardPage: FC = () => {
	return (
		<div className="">
			<div className="sticky top-0 bg-gradient-to-b from-neutral-200 to-white z-10 px-6 py-4">
				<h1>Dashboard</h1>
				<p className="text-gray-500">Overview of your data</p>
			</div>

			<div className="p-6 pb-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
				<div className="bg-white p-4 rounded-md border">
					<p className="text-sm text-gray-600">Total Customers</p>
					<p className="font-geist text-2xl font-semibold mt-1">1,234</p>
					<p className="font-geist text-xs text-green-600 mt-2">+12% from last month</p>
				</div>

				<div className="bg-white p-4 rounded-md border">
					<p className="text-sm text-gray-600">Revenue</p>
					<p className="text-2xl font-semibold mt-1">$12,345</p>
					<p className="text-xs text-green-600 mt-2">+8% from last month</p>
				</div>

				<div className="bg-white p-4 rounded-md border">
					<p className="text-sm text-gray-600">Orders</p>
					<p className="text-2xl font-semibold mt-1">456</p>
					<p className="text-xs text-red-600 mt-2">-3% from last month</p>
				</div>

				<div className="bg-white p-4 rounded-md border">
					<p className="text-sm text-gray-600">Active Items</p>
					<p className="text-2xl font-semibold mt-1">89</p>
					<p className="text-xs text-gray-600 mt-2">No change</p>
				</div>
			</div>

			{/* Content Cards */}
			<div className="px-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
				<div className="bg-white p-4 rounded-md border">
					<h3 className="font-semibold mb-3">Recent Activity</h3>
					<div className="space-y-3">
						<div className="flex justify-between items-center">
							<span className="text-sm">New user registered</span>
							<span className="text-xs text-gray-500">2 hours ago</span>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-sm">Order #1234 completed</span>
							<span className="text-xs text-gray-500">3 hours ago</span>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-sm">New item added</span>
							<span className="text-xs text-gray-500">5 hours ago</span>
						</div>
					</div>
				</div>

				<div className="bg-white p-4 rounded-md border">
					<h3 className="font-semibold mb-3">Quick Stats</h3>
					<div className="space-y-3">
						<div className="flex justify-between items-center">
							<span className="text-sm">Conversion Rate</span>
							<span className="text-sm font-semibold">3.2%</span>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-sm">Avg. Order Value</span>
							<span className="text-sm font-semibold">$27.50</span>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-sm">Total Products</span>
							<span className="text-sm font-semibold">156</span>
						</div>
					</div>
				</div>
			</div>

			{/* Random Text Cards */}
			<div className="p-6 grid grid-cols-1 lg:grid-cols-1 gap-4">
				<div className="bg-white p-4 rounded-md border">
					<RandomText />
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;
