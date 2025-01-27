import { createBrowserRouter } from "react-router-dom";
import { frontendPageRoutes } from "./frontend.routes";
// import App from "../App";
import { routeGenarator } from "../utils/routeGenerator";
import MainLayout from "../components/layout/MainLayout";
import Login from "../pages/Authentication/Login";

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: routeGenarator(frontendPageRoutes),
	},
	{
		path: "/login",
		element: <Login />, // The login page component
	},
]);

export default router;
