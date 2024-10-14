import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home.tsx"
import Root from "../pages/Root.tsx"
// import SignInPage from "../pages/auth/SignInPage.tsx"
// import SignUpPage from "../pages/auth/SignUpPage.tsx"
// import ProtectedPage from "../pages/ProtectedPage.tsx"
// import NotFoundPage from "../pages/404Page.tsx"
// import AuthProtectedRoute from "./AuthProtectedRoute.tsx"
// import Providers from "../Providers.tsx"

const router = createBrowserRouter([
	// I recommend you reflect the routes here in the pages folder
	{
		path: "/",
		element: <Root />,
		children: [
			// Public routes
			{
				path: "/",
				element: <Home />,
			},
			// {
			// 	path: "/auth/sign-in",
			// 	element: <SignInPage />,
			// },
			// {
			// 	path: "/auth/sign-up",
			// 	element: <SignUpPage />,
			// },
			// // Auth Protected routes
			// {
			// 	path: "/",
			// 	element: <AuthProtectedRoute />,
			// 	children: [
			// 		{
			// 			path: "/protected",
			// 			element: <ProtectedPage />,
			// 		},
			// 	],
			// },
		],
	},
	// {
	// 	path: "*",
	// 	element: <NotFoundPage />,
	// },
])

export default router
