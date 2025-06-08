import { useState } from 'react'
import { trpc } from '@client/trpc'

export default function DashboardPage() {
	const [userName, setUserName] = useState('')
	
	const { data: helloData, refetch: refetchHello } = trpc.dashboard.hello.useQuery(
		{ name: userName || undefined },
		{ enabled: false }
	)

	return (
		<div>
			<h1>Dashboard Page</h1>
			<div className="card">
				<div className="mb-4">
					<input
						type="text"
						placeholder="Enter your name"
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
						className="border p-2 mr-2"
					/>
					<button
						type="button"
						onClick={() => refetchHello()}
						aria-label="get greeting"
						className="bg-blue-500 text-white px-4 py-2 rounded"
					>
						Get Greeting
					</button>
				</div>
				
				{helloData && (
					<p className="mb-4">
						<strong>Greeting:</strong> {helloData.greeting}
					</p>
				)}
			</div>
		</div>
	)
}
