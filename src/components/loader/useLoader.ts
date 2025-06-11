import { useCallback, useEffect, useRef, useState } from 'react'

interface UseLoaderState<T> {
	data: T | null
	loading: boolean
	error: Error | null
}

interface UseLoaderOptions {
	immediate?: boolean
	delay?: number
}

export function useLoader<T>(
	asyncFunction: () => Promise<T> | T,
	dependencies: React.DependencyList = [],
	options: UseLoaderOptions = {},
): UseLoaderState<T> & { refetch: () => Promise<void> } {
	const { immediate = true, delay = 0 } = options
	const [state, setState] = useState<UseLoaderState<T>>({
		data: null,
		loading: immediate,
		error: null,
	})

	// Store the latest function reference to avoid stale closures
	const asyncFunctionRef = useRef(asyncFunction)
	asyncFunctionRef.current = asyncFunction

	const execute = useCallback(async () => {
		setState((prev) => ({ ...prev, loading: true, error: null }))

		try {
			if (delay > 0) {
				await new Promise((resolve) => setTimeout(resolve, delay))
			}

			// Always call the latest function reference
			const result = await Promise.resolve(asyncFunctionRef.current())
			setState({ data: result, loading: false, error: null })
		} catch (error) {
			setState({
				data: null,
				loading: false,
				error: error instanceof Error ? error : new Error(String(error)),
			})
		}
	}, [delay, ...dependencies])

	useEffect(() => {
		if (immediate) {
			execute()
		}
	}, [execute, immediate])

	return {
		...state,
		refetch: execute,
	}
}
