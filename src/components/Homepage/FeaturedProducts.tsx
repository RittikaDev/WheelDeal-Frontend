// import FeatureProductCard from "../reusableComponents/FeatureProductCard";
// import MainTttle from "../reusableComponents/MainTttle";
// import TagTitle from "../reusableComponents/TagTitle";
import LoadingPage from "../shared/LoadingPage";
// import { TProduct } from "@/types/Interface";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useGetFeaturedCarsQuery } from "../../redux/features/cars/carApi";

const FeaturedProducts = () => {
	const { data: getFeaturedCars, isLoading } = useGetFeaturedCarsQuery({});
	console.log(getFeaturedCars);
	// Product and total product count
	// const products = getResults?.data?.result;

	if (isLoading) {
		return <LoadingPage />;
	}

	return (
		<div className="space-y-10">
			<div className="text-center space-y-1.5 px-2 md:px-0">
				{/* <TagTitle tagTitle={"New Arrivals"} />
				<MainTttle className="text-center" title={"Featured Products"} /> */}
				<p>
					Aenean Vel Elit Scelerisque Mauris Pellentesque. At Varius Vel
					Pharetra Vel Turpis.Volutpat Odio <br /> Facilisis Mauris Sit Amet
					Massa Vitae Tortor Condimentum.
				</p>
			</div>

			{/* product list section  */}
			<section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 px-2 md:px-4 xl:px-0 items-center container gap-2 md:gap-4 xl:gap-10">
				{/* {products?.slice(0, 8).map((product: TProduct) => (
					<FeatureProductCard data={product} key={product._id} />
				))} */}
			</section>
			<div className="flex justify-center">
				<Link to="/products">
					<Button>Explore More</Button>
				</Link>
			</div>
		</div>
	);
};

export default FeaturedProducts;
