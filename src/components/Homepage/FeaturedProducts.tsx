import { Link } from "react-router-dom";

import { Button } from "../ui/button";
import LoadingPage from "../shared/LoadingPage";

import { useGetFeaturedCarsQuery } from "../../redux/features/cars/carApi";

import Header from "../reusableComponents/Header";
import Subheader from "../reusableComponents/SubHeader";

import { ICar } from "../../types";

import FeaturedProductCard from "../reusableComponents/FeaturedProductCard";

const FeaturedProducts = () => {
  const { data: result, isLoading } = useGetFeaturedCarsQuery({});
  // Product and total product count
  const getFeaturedCars = result?.data;

  console.log(getFeaturedCars);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <div className="text-center space-y-1.5 px-2 md:px-0">
        <Header header={"New Arrivals"} />
        <Subheader className="text-center" heading={"Featured Products"} />
        <p>
          Aenean Vel Elit Scelerisque Mauris Pellentesque. At Varius Vel
          Pharetra Vel Turpis.Volutpat Odio <br /> Facilisis Mauris Sit Amet
          Massa Vitae Tortor Condimentum.
        </p>
      </div>

      {/* FEATURED PRODUCTS:CARS  */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {getFeaturedCars?.map((product: ICar) => (
          <FeaturedProductCard data={product} key={product._id} />
        ))}
      </section>
      <div className="flex justify-center">
        <Link to="/cars">
          <Button>Explore More</Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;
