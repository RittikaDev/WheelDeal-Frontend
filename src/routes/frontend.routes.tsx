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
      // {
      // 	path: "cart",
      // 	element: <Cart />,
      // },
      {
        path: "checkout",
        element: <CheckOut />,
      },
      {
        path: "order/verify",
        element: <VerifyOrder />,
      },
      // {
      // 	path: "about-us",
      // 	element: <AboutUs />,
      // },
      // {
      // 	path: "product-management",
      // 	element: <ProductManagement />,
      // },
      // {
      // 	path: "order-success",
      // 	element: <OrderSuccess />,
      // },
      // {
      // 	path: "orders",
      // 	element: <OrdersPage />,
      // },
    ],
  },
];
