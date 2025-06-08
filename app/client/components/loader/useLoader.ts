import { useCallback, useEffect, useState } from 'react'

interface UseLoaderOptions {
	immediate?: boolean
	delay?: number
}

interface UseLoaderState<T> {
	data: T | null
	loading: boolean
	error: Error | null
}

export function useLoader<T>(
	asyncFunction: () => Promise<T> | T,
	dependencies: React.DependencyList = [],
	options: UseLoaderOptions = {}
) {
	const { immediate = true, delay = 0 } = options
	const [state, setState] = useState<UseLoaderState<T>>({
		data: null,
		loading: immediate,
		error: null,
	})

	const execute = useCallback(async () => {
		setState({ data: null, loading: true, error: null })

		try {
			if (delay > 0) {
				await new Promise(resolve => setTimeout(resolve, delay))
			}

			const result = await Promise.resolve(asyncFunction())
			setState({ data: result, loading: false, error: null })
		} catch (error) {
			setState({
				data: null,
				loading: false,
				error: error instanceof Error ? error : new Error(String(error)),
			})
		}
	}, [asyncFunction, delay, ...dependencies])

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