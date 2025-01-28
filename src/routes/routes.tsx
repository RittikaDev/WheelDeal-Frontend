import { createBrowserRouter } from "react-router-dom";
import { frontendPageRoutes } from "./frontend.routes";
// import App from "../App";
import { routeGenarator } from "../utils/routeGenerator";
import MainLayout from "../components/layout/MainLayout";
import Login from "../pages/Authentication/Login";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoutes from "../components/layout/ProtectedRoutes";
import ViewOrders from "../pages/User/ViewOrders";
import ManageProfile from "../pages/User/ManageProfile";
import AddCar from "../pages/Admin/ManageCars/AddCar";
import ManageCars from "../pages/Admin/ManageCars/ManageCars";
import ManageUsers from "../pages/Admin/ManageUsers";
import ManageOrders from "../pages/Admin/ManageOrders";
import OrderProgressBar from "../pages/User/Overview";
import Overview from "../pages/User/Overview";

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
	{
		path: "/user",
		element: (
			<ProtectedRoutes roles={["user"]}>
				<DashboardLayout />
			</ProtectedRoutes>
		),
		children: [
			{
				path: "overview",
				element: <Overview />,
			},
			{
				path: "view-orders",
				element: <ViewOrders />,
			},
			{
				path: "manage-profile",
				element: <ManageProfile />,
			},
			//   {
			//     path: "manage-bookings",
			//     element: <ManageUserBookings />,
			//   },
			//   {
			//     path: "manage-payments",
			//     element: <ManagePayments />,
			//   },
			//   {
			//     path: "payments-history",
			//     element: <PaymentsHistory />,
			//   },
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
				path: "add-product",
				element: <AddCar />,
			},
			{
				path: "manage-product",
				element: <ManageCars />,
			},
			{
				path: "manage-users",
				element: <ManageUsers />,
			},
			{
				path: "manage-orders",
				element: <ManageOrders />,
			},
		],
	},
]);

export default router;
