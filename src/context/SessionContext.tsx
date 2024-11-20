// [ IMPORTS ]
// React
import { createContext, useContext, useState, useEffect } from "react"

// Importing Session Type from Supabase
import { Session } from "@supabase/supabase-js"
import supabase from "@/supabase/client"

// Import loading page
import LoadingPage from "@/pages/Loading"

// 1. Create the Session Context
const SessionContext = createContext<{ session: Session | null }>({
    session: null,
})

// 2. Create a hook for easy access of the session
export const useSession = () => {
    const context = useContext(SessionContext)

    if (!context) {
        throw new Error("useSession must be used within a SessionProvider")
    }

    return context
}

// 3. Create the Provider that will initialize the session context for the app
interface SessionProviderProps {
    children: React.ReactNode
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
    const [session, setSession] = useState<Session | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const authStateListener = supabase.auth.onAuthStateChange(
            async (_, session) => {
                setSession(session)
                setIsLoading(false)
            },
        )

        return () => {
            authStateListener.data.subscription.unsubscribe()
        }
    }, [supabase])

    return (
        <SessionContext.Provider value={{ session }}>
            {isLoading ? <LoadingPage /> : children}
        </SessionContext.Provider>
    )
}
