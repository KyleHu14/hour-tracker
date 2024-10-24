// [ Imports ]
// React Router Dom
import { createBrowserRouter } from "react-router-dom"

// Pages
import DashboardPage from "@/pages/Dashboard.tsx"
import HomePage from "../pages/Home.tsx"
import Root from "../pages/Root.tsx"
import NotFoundPage from "@/pages/404NotFound.tsx"
import ProtectedRoute from "./ProtectedRoute.tsx"

const router = createBrowserRouter([
    // I recommend you reflect the routes here in the pages folder
    {
        path: "/",
        element: <Root />,
        children: [
            // Public routes
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/",
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/dashboard",
                        element: <DashboardPage />,
                    },
                ],
            },
        ],
    },

    {
        path: "*",
        element: <NotFoundPage />,
    },
])

export default router
