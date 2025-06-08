import { DailyQuotes } from './components/DailyQuotes'
import './dashboard.css'

export default function DashboardPage() {
	return (
		<div className="p-6">
			<h1>Dashboard Page</h1>
			<DailyQuotes />
		</div>
	)
}
