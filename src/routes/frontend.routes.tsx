import ProtectedRoutes from "../components/layout/ProtectedRoutes";
import AboutUs from "../pages/AboutUs";
import CheckOut from "../pages/CheckOut";
import ContactUs from "../pages/ContactUs";
import HomePage from "../pages/HomePage";
import MegaMenuProducts from "../pages/MegaMenuProducts";
import ProductDetails from "../pages/ProductDetails";
import ProductsPage from "../pages/Products";
import TestimonialDetails from "../pages/TestimonialDetails";
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
				path: "mega/:type/:id",
				element: <MegaMenuProducts />,
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
				path: "testimonial",
				element: <TestimonialDetails />,
			},
			{
				path: "contact-us",
				element: <ContactUs />,
			},
			{
				path: "order/verify",
				element: <VerifyOrder />,
			},
		],
	},
];
