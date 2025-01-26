import { Outlet } from "react-router-dom";
// import LoadingPage from "../shared/LoadingPage";
import NavBar from "../shared/NavBar";

// import Footer from "../shared/Footer";
// import NavBar from "../shared/NavBar";
// import { useGetProductsQuery } from "@/redux/features/products/productApi";
// import LoadingPage from "../shared/LoadingPage";

const MainLayout = () => {
	// const { isLoading } = useGetProductsQuery({});
	return (
		<>
			{/* {isLoading ? ( */}
			<>{/* <LoadingPage /> */}</>

			{/* ) : ( */}
			{/* <div className="min-h-screen"> */}

			<NavBar />

			<Outlet />
			{/* </div> */}
			{/* <div className="pt-0">
		 		</div>
		 		<Footer />
		 	</div> */}
			{/* )}  */}
		</>
	);
};

export default MainLayout;
