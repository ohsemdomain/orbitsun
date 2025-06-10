import type { FC } from 'react';
import { Plus, SquarePen, Tag } from 'lucide-react';
import RandomText from '../../components/RandomText';
import './item.css';

const ItemsPage: FC = () => {
	return (
		<div className="items-container">
			{/* Left Panel - Full width on mobile, 45% on lg and above */}
			<div className="items-left-panel">
				<div className="items-header">
					<div className="items-header-content">
						<div>
							<h2>Items</h2>
						</div>
						<div>
							<button type="button" className="btn-primary-icon">
								<Plus className="w-4 h-4" />
							</button>
						</div>
					</div>
				</div>
				<div className="items-list no-scrollbar">
					{/* Left scrollable content goes here */}
					<div className="items-list-container">
						{/* Example content */}
						{[...Array(20)].map((_, i) => (
							<div key={i} className="items-list-item">
								<p>Item {i + 1}</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Right Panel - Hidden on mobile, shown on lg and above */}
			<div className="items-right-panel">
				<div className="items-detail-header">
					<div className="items-header-content no-scrollbar">
						<div>
							<h1>Detail</h1>
						</div>
						<div>
							<div className="btn-group">
								<button type="button" className="btn-neutral">
									<SquarePen className="w-4 h-4" />
									<span>Edit</span>
								</button>
								<button type="button" className="btn-neutral">
									<Tag className="w-4 h-4" />
									<span>Mark as Inactive</span>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="items-detail-content">
					{/* Right scrollable content goes here */}
					<div>
						<RandomText />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ItemsPage;
