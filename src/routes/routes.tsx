import { createBrowserRouter } from "react-router-dom";
import { frontendPageRoutes } from "./frontend.routes";
import { routeGenarator } from "../utils/routeGenerator";

import MainLayout from "../components/layout/MainLayout";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";

import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoutes from "../components/layout/ProtectedRoutes";

import TrackMyOrder from "../pages/User/TrackMyOrder/TrackMyOrder";
import Overview from "../pages/User/Overview/Overview";
import ManageProfile from "../pages/User/ManageProfile";

import ManageCars from "../pages/Admin/ManageCars/ManageCars";
import ManageUsers from "../pages/Admin/ManageUsers";
import ManageOrders from "../pages/Admin/ManageOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: routeGenarator(frontendPageRoutes),
  },
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
    ],
  },
]);

export default router;
