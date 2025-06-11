import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryState {
	hasError: boolean
	error?: Error
	errorInfo?: ErrorInfo
}

interface ErrorBoundaryProps {
	children: ReactNode
	fallback?: ReactNode
	onError?: (error: Error, errorInfo: ErrorInfo) => void
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error }
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		this.setState({ errorInfo })
		this.props.onError?.(error, errorInfo)

		// Log error to console in development
		if (process.env.NODE_ENV === 'development') {
			console.error('ErrorBoundary caught an error:', error, errorInfo)
		}
	}

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback
			}

			return (
				<div className="min-h-screen flex items-center justify-center bg-gray-50">
					<div className="max-w-md w-full mx-auto p-6">
						<div className="bg-white rounded-lg shadow-lg p-6 text-center">
							<div className="mb-4">
								<svg
									className="mx-auto h-16 w-16 text-red-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-label="Error"
									role="img"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 18.5c-.77.833.192 2.5 1.732 2.5z"
									/>
								</svg>
							</div>
							<h2 className="text-xl font-semibold text-gray-900 mb-2">
								Something went wrong
							</h2>
							<p className="text-gray-600 mb-4">
								An unexpected error occurred. Please try refreshing the page.
							</p>
							{process.env.NODE_ENV === 'development' && this.state.error && (
								<details className="mt-4 text-left">
									<summary className="cursor-pointer text-sm text-red-600 hover:text-red-800">
										Error Details (Development)
									</summary>
									<pre className="mt-2 text-xs bg-red-50 p-2 rounded border overflow-auto">
										{this.state.error.toString()}
										{this.state.errorInfo?.componentStack}
									</pre>
								</details>
							)}
							<button
								type="button"
								onClick={() => window.location.reload()}
								className="mt-4 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors"
							>
								Refresh Page
							</button>
						</div>
					</div>
				</div>
			)
		}

		return this.props.children
	}
}

export default ErrorBoundary
