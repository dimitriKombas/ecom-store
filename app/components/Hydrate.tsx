'use client'
import { useThemeStore } from "@/store"
import { ReactNode, useEffect, useState } from "react"
import { SessionProvider } from "next-auth/react"

/* This Hydrate component serves as a way to conditionally render children only after the app has been rehydrated by Next.js, offering a "Loading..." message in the interim. */

// Hydrate component definition.
export default function Hydrate({ children }: { children: ReactNode }) {
    // State to determine if the component has been hydrated.
    const [isHydrated, setIsHydrated] = useState(false)
    const themeStore = useThemeStore()

    // useEffect hook to set the component as hydrated once the component is mounted.
    // This effectively waits until Next.js rehydration is complete before rendering children.
    useEffect(() => {
        setIsHydrated(true)
    }, [])
    // Conditional rendering based on the isHydrated state.
    // If hydrated, render the children, otherwise show a "Loading..." message.
    return (
        <SessionProvider>
            {isHydrated ? (
                <body
                    className="px-4 lg:px-48 font-roboto"
                    data-theme={themeStore.mode}
                >
                    {children}
                </body>
            ) : (
                <body></body>
            )}
        </SessionProvider>
    )
}
