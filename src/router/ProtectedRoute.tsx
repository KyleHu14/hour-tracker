// [ Imports ]
// React Router
import { Outlet } from "react-router-dom"

// Session
import { useSession } from "../context/SessionContext"

// Not Found Page
import NotFoundPage from "@/pages/404NotFound"

const ProtectedRoute = () => {
    const { session } = useSession()

    if (!session) {
        return <NotFoundPage />
    }

    return <Outlet />
}

export default ProtectedRoute
