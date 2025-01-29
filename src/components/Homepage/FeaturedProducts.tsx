import { Link } from "react-router-dom";

import { Button } from "../ui/button";

import { useGetFeaturedCarsQuery } from "../../redux/features/cars/carApi";

import { ICar } from "../../types";

import FeaturedProductCard from "../reusableComponents/FeaturedProductCard";
import Subheader from "../reusableComponents/SubHeader";
import Header from "../reusableComponents/Header";

const FeaturedProducts = () => {
	const { data: result } = useGetFeaturedCarsQuery({});
	const getFeaturedCars = result?.data;

	// console.log(getFeaturedCars);

	return (
		<div className="max-w-7xl mx-auto space-y-10">
			<div className="text-center space-y-1.5 px-2 md:px-0">
				<Header header={"New Arrivals"} />
				<Subheader className="text-center" heading={"Featured Products"} />
				<p>
					Discover our latest arrivals that are designed to elevate your
					experience. From cutting-edge automotive technology to stylish
					accessories. <br />
					Stay ahead of the curve with our innovative selections that meet your
					car's needs while keeping style and functionality in mind. Explore now
					and find the perfect additions to your ride.
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
