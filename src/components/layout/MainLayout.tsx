import { Outlet } from "react-router-dom";
// import LoadingPage from "../shared/LoadingPage";
import NavBar from "../shared/NavBar";

const MainLayout = () => {
  // const { isLoading } = useGetProductsQuery({});
  return (
    <>
      {/* {isLoading ? ( */}
      <>{/* <LoadingPage /> */}</>

      {/* ) : ( */}

      <NavBar />
      <Outlet />
    </>
  );
};

export default MainLayout;
