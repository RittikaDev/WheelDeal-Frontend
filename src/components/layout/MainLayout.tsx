import { Outlet } from "react-router-dom";

import NavBar from "../shared/NavBar";
import Footer from "../shared/Footer";

import { useGetFeaturedCarsQuery } from "../../redux/features/cars/carApi";
import LoadingPage from "../shared/LoadingPage";

const MainLayout = () => {
  const { isLoading } = useGetFeaturedCarsQuery({});

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <NavBar />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};

export default MainLayout;
