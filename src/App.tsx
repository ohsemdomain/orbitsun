import { useState } from 'react'
import { Waves } from 'lucide-react'

function App() {
	const [count, setCount] = useState(0)

	return (
		<>
			<div>
				<div className="mr-6 flex items-center space-x-2">
					<Waves className="h-6 w-6 text-primary" />
					<span className="hidden font-bold sm:inline-block font-headline">
						SurfEdge
					</span>
				</div>
			</div>
			<h1>Vite + React Items Management</h1>
			<p className="font-geist">1234567890</p>
			<div className="card">
				<button type="button" onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	)
}

export default App
