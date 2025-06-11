import type React from 'react';
import { SpinnerIcon } from './SpinnerIcon';

interface SpinnerProps {
	iconClassName?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ iconClassName = 'w-10 h-10 text-primary-600' }) => {
	return (
		<output className="flex items-center justify-center" aria-live="polite" aria-busy="true">
			<SpinnerIcon className={iconClassName} />
			<span className="sr-only">Loading</span>
		</output>
	);
};

export default Spinner;
