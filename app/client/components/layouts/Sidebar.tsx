import { Link } from 'react-router-dom'

export function Sidebar() {
	return (
		<nav>
			<Link to="/dashboard">Dashboard</Link> | <Link to="/products">Products</Link>
		</nav>
	)
}
