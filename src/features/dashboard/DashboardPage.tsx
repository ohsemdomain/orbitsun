import { useState } from 'react'

export default function DashboardPage() {
	const [name, setName] = useState('unknown')

	return (
		<div>
			<h1>Dashboard Page</h1>
			<div className="card">
				<button
					type="button"
					onClick={() => {
						fetch('/api/')
							.then((res) => res.json() as Promise<{ name: string }>)
							.then((data) => setName(data.name))
					}}
					aria-label="get name"
				>
					Name from API is: {name}
				</button>
				<p>
					Edit <code>api/index.ts</code> to change the name
				</p>
			</div>
		</div>
	)
}
