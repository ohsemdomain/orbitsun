import Dropdown from '~client/components/ui/Dropdown'
import { ChevronDownIcon } from '~client/assets/Icons'

interface UserMenuProps {
	className?: string
}

export default function UserMenu({ className = '' }: UserMenuProps) {
	const user = {
		name: 'John Doe',
		email: 'john.doe@example.com',
		initials: 'JD',
	}

	const handleMenuAction = (action: string) => {
		console.log(`${action} clicked`)
	}

	const menuOptions = [
		{ value: 'profile', label: 'Profile Settings' },
		{ value: 'account', label: 'Account Settings' },
		{ value: 'help', label: 'Help & Support' },
		{ value: 'logout', label: 'Sign Out' },
	]

	return (
		<Dropdown
			trigger={
				<button
					type="button"
					className="flex items-center gap-3 p-2 text-sm bg-white border border-gray-300 rounded-lg"
				>
					<div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
						{user.initials}
					</div>
					<span className="hidden sm:block text-gray-700 font-medium">
						{user.name}
					</span>
					<ChevronDownIcon className="w-4 h-4 text-gray-400" />
				</button>
			}
			options={menuOptions}
			onSelect={handleMenuAction}
			placement="bottom-right"
			className={className}
			menuClassName="w-64"
		/>
	)
}
