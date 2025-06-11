import type { FC } from 'react';
import { Plus, SquarePen, Phone } from 'lucide-react';
import RandomText from '../../components/RandomText';
import './contact.css';

const ContactsPage: FC = () => {
	return (
		<div className="contacts-container">
			{/* Left Panel - Full width on mobile, 45% on lg and above */}
			<div className="contacts-left-panel">
				<div className="contacts-header">
					<div className="contacts-header-content">
						<div>
							<h2>Contacts</h2>
						</div>
						<div>
							<button type="button" className="btn-primary-icon">
								<Plus className="w-4 h-4" />
							</button>
						</div>
					</div>
				</div>
				<div className="contacts-list no-scrollbar">
					{/* Left scrollable content goes here */}
					<div className="contacts-list-container">
						{/* Example content */}
						{Array.from({ length: 20 }, (_, i) => ({ 
							id: i + 1, 
							name: `Contact ${i + 1}`, 
							email: `contact${i + 1}@example.com`,
							phone: `+1 (555) ${String(i + 1).padStart(3, '0')}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`
						})).map((contact) => (
							<div key={contact.id} className="contacts-list-item">
								<p className="font-medium">{contact.name}</p>
								<p className="text-sm text-gray-600">{contact.email}</p>
								<p className="text-sm text-gray-500">{contact.phone}</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Right Panel - Hidden on mobile, shown on lg and above */}
			<div className="contacts-right-panel">
				<div className="contacts-detail-header">
					<div className="contacts-header-content">
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
									<Phone className="w-4 h-4" />
									<span>Call</span>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="contacts-detail-content">
					{/* Right scrollable content goes here */}
					<div>
						<RandomText />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactsPage;