"use client"
import { StoreProvider } from "../../redux"

export default function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <StoreProvider>
            {children}
        </StoreProvider>
    )
}