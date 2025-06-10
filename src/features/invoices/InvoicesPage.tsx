import type { FC } from 'react';
import ShadowScrollbars from '../../components/ShadowScrollbars';
import { Plus, SquarePen, Link, MoreHorizontal } from 'lucide-react';
import RandomText from '../../components/RandomText';
import './invoice.css';

const InvoicesPage: FC = () => {
	return (
		<div className="invoices-container">
			{/* Left Panel - Full width on mobile, 45% on lg and above */}
			<div className="invoices-left-panel">
				<div className="invoices-header">
					<div className="invoices-header-content">
						<div>
							<h2>Invoices</h2>
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
				<div className="invoices-list-wrapper">
					<ShadowScrollbars>
						<div className="invoices-list-container">
							{/* Left scrollable content goes here */}
							<div className="invoices-list">
								{/* Example content */}
								{[...Array(20)].map((_, i) => (
									<div key={i} className="invoices-list-item">
										<p>Invoice {i + 1}</p>
										<p>Invoice {i + 1}</p>
									</div>
								))}
							</div>
						</div>
					</ShadowScrollbars>
				</div>
			</div>

			{/* Right Panel - Hidden on mobile, shown on lg and above */}
			<div className="invoices-right-panel">
				<div className="invoices-detail-header">
					<div className="invoices-header-content">
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
									<Link className="w-4 h-4" />
									<span>Share</span>
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
				<div className="invoices-detail-content no-scrollbar">
					{/* Right scrollable content goes here */}
					<div className="invoices-detail-card">
						<RandomText />
					</div>
				</div>
			</div>
		</div>
	);
};

export default InvoicesPage;
