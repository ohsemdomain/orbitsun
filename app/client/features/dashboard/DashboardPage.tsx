import { DailyQuotes } from './components/DailyQuotes'
import './dashboard.css'

export default function DashboardPage() {
	return (
		<div className="flex flex-col h-full p-6 overflow-auto">
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
				<h1>Dashboard Page</h1>
				<DailyQuotes />
			</div>
		</div>
	)
}
