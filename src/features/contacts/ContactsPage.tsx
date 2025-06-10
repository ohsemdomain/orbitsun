import type { FC } from 'react';

const ContactsPage: FC = () => {
	return (
		<div className="h-full flex flex-col bg-red-50">
			<div>
				<h1>Contacts</h1>
				<p>Left Area</p>
			</div>
			<div>
				<p>Right Area</p>
			</div>
		</div>
	);
};

export default ContactsPage;
