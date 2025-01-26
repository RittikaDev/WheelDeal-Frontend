import { createBrowserRouter } from "react-router-dom";
import { frontendPageRoutes } from "./frontend.routes";
// import App from "../App";
import { routeGenarator } from "../utils/routeGenerator";
import MainLayout from "../components/layout/MainLayout";

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: routeGenarator(frontendPageRoutes),
	},
]);

export default router;
