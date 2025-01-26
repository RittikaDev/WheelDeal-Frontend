import HomePage from "../pages/HomePage";

export const frontendPageRoutes = [
	{
		path: "/",
		element: <HomePage />,

		children: [
			{
				path: "products",
				element: <HomePage />,
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
