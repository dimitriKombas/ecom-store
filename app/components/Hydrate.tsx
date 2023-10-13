'use client'
import { ReactNode, useEffect, useState } from "react";

/* This Hydrate component serves as a way to conditionally render children only after the app has been rehydrated by Next.js, offering a "Loading..." message in the interim. */

// Hydrate component definitio.
export default function Hydrate({ children }: { children: ReactNode }) {
    // State to determine if the component has been hydrated.
    const [isHydrated, setIsHydrated] = useState(false)

    // useEffect hook to set the component as hydrated once the component is mounted.
    // This effectively waits until Next.js rehydration is complete before rendering children.
    useEffect(() => {
        setIsHydrated(true)
    }, [])
    // Conditional rendering based on the isHydrated state.
    // If hydrated, render the children, otherwise show a "Loading..." message.
    return <> {isHydrated ? <>{children}</> : <div>Loading ...</div>}</>
}