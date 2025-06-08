import { SpinnerIcon } from '~client/assets/Icons'

export default function Spinner({
	iconClassName = 'w-10 h-10 text-primary-600',
}) {
	return (
		<output className="flex items-center justify-center" aria-busy="true">
			<SpinnerIcon className={iconClassName} />
			<span className="sr-only">Loading</span>
		</output>
	)
}
