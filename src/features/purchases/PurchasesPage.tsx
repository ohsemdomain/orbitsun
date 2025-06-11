import type { FC } from 'react';
import ShadowScrollbars from '../../components/ShadowScrollbars';
import { Plus, SquarePen, Download, MoreHorizontal } from 'lucide-react';
import RandomText from '../../components/RandomText';
import './purchase.css';

const PurchasesPage: FC = () => {
	return (
		<div className="purchases-container">
			{/* Left Panel - Full width on mobile, 45% on lg and above */}
			<div className="purchases-left-panel">
				<div className="purchases-header">
					<div className="purchases-header-content">
						<div>
							<h2>Purchases</h2>
						</div>
						<div>
							<button
								type="button"
								className="btn-primary-icon"
							>
								<Plus className="w-4 h-4" />
							</button>
						</div>
					</div>
				</div>
				<div className="purchases-list-wrapper">
					<ShadowScrollbars>
						<div className="purchases-list-container">
							{/* Left scrollable content goes here */}
							<div className="purchases-list">
								{/* Example content */}
								{Array.from({ length: 20 }, (_, i) => ({ id: i + 1, name: `Purchase ${i + 1}` })).map((purchase) => (
									<div key={purchase.id} className="purchases-list-item">
										<p>{purchase.name}</p>
										<p>Vendor: Supplier {purchase.id}</p>
									</div>
								))}
							</div>
						</div>
					</ShadowScrollbars>
				</div>
			</div>

			{/* Right Panel - Hidden on mobile, shown on lg and above */}
			<div className="purchases-right-panel">
				<div className="purchases-detail-header">
					<div className="purchases-header-content">
						<div>
							<h1>Detail</h1>
						</div>
						<div>
							<div className="btn-group">
								<button
									type="button"
									className="btn-neutral"
								>
									<SquarePen className="w-4 h-4" />
									<span>Edit</span>
								</button>
								<button
									type="button"
									className="btn-neutral"
								>
									<Download className="w-4 h-4" />
									<span>Download</span>
								</button>
								<button
									type="button"
									className="btn-neutral-icon"
								>
									<MoreHorizontal className="w-4 h-4" />
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="purchases-detail-content">
					{/* Right scrollable content goes here */}
					<div className="purchases-detail-card">
						<RandomText />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PurchasesPage;