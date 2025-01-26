import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/Products";

export const frontendPageRoutes = [
	{
		path: "/",
		element: <HomePage />,

		children: [
			{
				path: "cars",
				element: <ProductsPage />,
			},
			// {
			// 	path: "products/:id",
			// 	element: <ProductDetails />,
			// },
			// {
			// 	path: "cart",
			// 	element: <Cart />,
			// },
			// {
			// 	path: "checkout",
			// 	element: <Checkout />,
			// },
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
