import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "@/context/SessionContext"
import { Outlet } from "react-router-dom"

const Root = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <SessionProvider>
                <Outlet />
            </SessionProvider>
        </ThemeProvider>
    )
}

export default Root
