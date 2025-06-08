interface BaseLayoutProps {
	children: React.ReactNode
	className?: string
}

export default function BaseLayout({
	children,
	className = '',
}: BaseLayoutProps) {
	return <div className={`h-full w-full ${className}`}>{children}</div>
}
