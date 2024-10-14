import { SessionProvider } from "@/context/SessionContext"
import { Outlet } from "react-router-dom"

const Root = () => {
    return (
        <SessionProvider>
            <Outlet />
        </SessionProvider>
    )
}

export default Root
