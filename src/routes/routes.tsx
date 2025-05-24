import { createBrowserRouter } from "react-router-dom";
import { frontendPageRoutes } from "./frontend.routes";
import { routeGenarator } from "../utils/routeGenerator";

import MainLayout from "../components/layout/MainLayout";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoutes from "../components/layout/ProtectedRoutes";

import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
// import CheckOut from "../pages/CheckOut";

import TrackMyOrder from "../pages/User/TrackMyOrder/TrackMyOrder";
import Overview from "../pages/User/Overview/Overview";
import ManageProfile from "../pages/User/ManageProfile";

import ManageCars from "../pages/Admin/ManageCars/ManageCars";
import ManageUsers from "../pages/Admin/ManageUsers";
import ManageOrders from "../pages/Admin/ManageOrders";
import NotFoundPage from "../pages/NotFoundPage";
import AdminOverviewPage from "../pages/Admin/AdminOverView/AdminOverviewPage";
import ManageAdminProfile from "../pages/Admin/ManageAdminProfile";

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: routeGenarator(frontendPageRoutes),
	},
	// {
	// 	path: "/checkout",
	// 	element: (
	// 		<ProtectedRoutes roles={["user"]}>
	// 			<CheckOut />
	// 		</ProtectedRoutes>
	// 	),
	// },
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/user",
		element: (
			<ProtectedRoutes roles={["user"]}>
				<DashboardLayout />
			</ProtectedRoutes>
		),
		children: [
			{
				path: "",
				element: <Overview />,
			},
			{
				path: "track-my-order",
				element: <TrackMyOrder />,
			},
			{
				path: "manage-profile",
				element: <ManageProfile />,
			},
		],
	},
	{
		path: "/admin",
		element: (
			<ProtectedRoutes roles={["admin"]}>
				<DashboardLayout />
			</ProtectedRoutes>
		),
		children: [
			{
				path: "",
				element: <AdminOverviewPage />,
			},
			{
				path: "manage-users",
				element: <ManageUsers />,
			},
			{
				path: "manage-product",
				element: <ManageCars />,
			},
			{
				path: "manage-orders",
				element: <ManageOrders />,
			},
			{
				path: "manage-profile",
				element: <ManageAdminProfile />,
			},
		],
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]);

export default router;
