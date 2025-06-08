import { useEffect, useState } from 'react'

interface ResponsiveState {
    isMobile: boolean
    isTablet: boolean
    isDesktop: boolean
    width: number
}

const BREAKPOINTS = {
    mobile: 768,
    tablet: 1024,
} as const

export function useResponsive(): ResponsiveState {
    const [state, setState] = useState<ResponsiveState>(() => {
        if (typeof window === 'undefined') {
            return {
                isMobile: false,
                isTablet: false,
                isDesktop: true,
                width: 1024,
            }
        }

        const width = window.innerWidth
        return {
            isMobile: width < BREAKPOINTS.mobile,
            isTablet: width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet,
            isDesktop: width >= BREAKPOINTS.tablet,
            width,
        }
    })

    useEffect(() => {
        if (typeof window === 'undefined') return

        const handleResize = () => {
            const width = window.innerWidth
            setState({
                isMobile: width < BREAKPOINTS.mobile,
                isTablet: width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet,
                isDesktop: width >= BREAKPOINTS.tablet,
                width,
            })
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return state
}
