export function XIcon({
	className = '',
	ariaLabel = 'Close',
	strokeWidth = 1.5,
	...props
}) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={strokeWidth}
			stroke="currentColor"
			className={className}
			aria-label={ariaLabel}
			role="img"
			{...props}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M6 18L18 6M6 6l12 12"
			/>
		</svg>
	)
}

export function ChevronDownIcon({
	className = '',
	ariaLabel = 'Expand',
	strokeWidth = 2,
	...props
}) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={strokeWidth}
			stroke="currentColor"
			className={className}
			aria-label={ariaLabel}
			role="img"
			{...props}
		>
			<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
		</svg>
	)
}

export function SearchIcon({
	className = '',
	ariaLabel = 'Search',
	strokeWidth = 1.5,
	...props
}) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={strokeWidth}
			stroke="currentColor"
			className={className}
			aria-label={ariaLabel}
			role="img"
			{...props}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
			/>
		</svg>
	)
}

export function SpinnerIcon({
	className = 'w-8 h-8 text-primary-500',
	ariaLabel = 'Loading',
	...props
}) {
	return (
		<svg
			className={`animate-spin ${className}`}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			aria-label={ariaLabel}
			role="img"
			{...props}
		>
			<circle
				className="opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="4"
			/>
			<path
				className="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			/>
		</svg>
	)
}

export function ArrowLeftIcon({
	className = '',
	ariaLabel = 'Back',
	strokeWidth = 1.5,
	...props
}) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={strokeWidth}
			stroke="currentColor"
			className={className}
			aria-label={ariaLabel}
			role="img"
			{...props}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
			/>
		</svg>
	)
}
