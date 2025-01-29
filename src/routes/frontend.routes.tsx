import ProtectedRoutes from "../components/layout/ProtectedRoutes";
import AboutUs from "../pages/AboutUs";
import CheckOut from "../pages/CheckOut";
import HomePage from "../pages/HomePage";
import ProductDetails from "../pages/ProductDetails";
import ProductsPage from "../pages/Products";
import VerifyOrder from "../pages/VerifyOrder";

export const frontendPageRoutes = [
  {
    path: "/",
    element: <HomePage />,

    children: [
      {
        path: "cars",
        element: <ProductsPage />,
      },
      {
        path: "cars/:id",
        element: <ProductDetails />,
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoutes roles={["user"]}>
            <CheckOut />
          </ProtectedRoutes>
        ),
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "order/verify",
        element: <VerifyOrder />,
      },
    ],
  },
];
