import Sidebar from './layouts/Sidebar';
import Topbar from './layouts/Topbar';
import MainArea from './layouts/MainArea';

function App() {
	return (
		<>
			<div>
				<Sidebar />
				<div>
					<Topbar />
					<MainArea />
				</div>
			</div>
		</>
	);
}

export default App;
