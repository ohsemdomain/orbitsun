import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Daily sales data for 31 days (only first 9 days have values)
const dailySalesData = [
	{ day: 1, sales: 1250 },
	{ day: 2, sales: 1890 },
	{ day: 3, sales: 2150 },
	{ day: 4, sales: 1780 },
	{ day: 5, sales: 2390 },
	{ day: 6, sales: 3200 },
	{ day: 7, sales: 2800 },
	{ day: 8, sales: 1650 },
	{ day: 9, sales: 2100 },
	{ day: 10, sales: 0 },
	{ day: 11, sales: 0 },
	{ day: 12, sales: 0 },
	{ day: 13, sales: 0 },
	{ day: 14, sales: 0 },
	{ day: 15, sales: 0 },
	{ day: 16, sales: 0 },
	{ day: 17, sales: 0 },
	{ day: 18, sales: 0 },
	{ day: 19, sales: 0 },
	{ day: 20, sales: 0 },
	{ day: 21, sales: 0 },
	{ day: 22, sales: 0 },
	{ day: 23, sales: 0 },
	{ day: 24, sales: 0 },
	{ day: 25, sales: 0 },
	{ day: 26, sales: 0 },
	{ day: 27, sales: 0 },
	{ day: 28, sales: 0 },
	{ day: 29, sales: 0 },
	{ day: 30, sales: 0 },
	{ day: 31, sales: 0 },
];

export const DailySalesChart = () => (
	<div className="w-full overflow-x-auto overflow-y-hidden -mx-4 px-4 mt-16">
		{' '}
		{/* Negative margin to extend to card edges */}
		<div className="min-w-[700px] h-[300px]">
			{' '}
			{/* Minimum width to prevent shrinking */}
			<ResponsiveContainer width="100%" height="100%">
				<BarChart data={dailySalesData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
					<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
					<XAxis
						dataKey="day"
						tick={{ fill: '#6b7280', fontSize: 10 }}
						axisLine={{ stroke: '#e5e7eb' }}
						interval={0}
						angle={-45}
						textAnchor="end"
						height={35}
					/>
					<YAxis tick={{ fill: '#6b7280' }} axisLine={{ stroke: '#e5e7eb' }} />
					<Tooltip
						contentStyle={{
							backgroundColor: '#fff',
							border: '1px solid #e5e7eb',
							borderRadius: '2px',
						}}
						formatter={(value) => `RM${value}`}
						labelFormatter={(label) => `Day ${label}`}
					/>
					<Bar dataKey="sales" fill="#3b82f6" radius={[2, 2, 0, 0]} barSize={16} />
				</BarChart>
			</ResponsiveContainer>
		</div>
	</div>
);
