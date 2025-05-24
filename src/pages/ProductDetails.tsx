import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import {
	Car,
	Tag,
	Palette,
	Users,
	Settings,
	Battery,
	Calendar,
	Key,
	CheckCircle,
	ShoppingCart,
	Clock,
	DollarSign,
	Gift,
	Hand,
	Truck,
	Calendar1,
	Locate,
} from "lucide-react";

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../components/ui/tabs";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useGetSingleCarQuery } from "../redux/features/cars/carApi";
import { addCarCart, useCurrentCar } from "../redux/features/cars/carSlice";

import { ICar, ICarGalleryImage } from "../types";

import ImageMagnifier from "../components/Products/ImageMagnifier";
import LoadingPage from "../components/shared/LoadingPage";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import Header from "../components/reusableComponents/Header";
import FeaturedProductCard from "../components/reusableComponents/FeaturedProductCard";

const ProductDetails = () => {
	const { id } = useParams();
	const [mainImgIndex, setMainImg] = useState(0);

	const { data: product, isLoading } = useGetSingleCarQuery(id!);
	const dispatch = useAppDispatch();
	const cartsItems = useAppSelector(useCurrentCar);

	const cartItem = cartsItems?.items.find((item) => item.carId === id);

	if (isLoading) return <>{<LoadingPage />}</>;

	// console.log("Product Details:", product);
	if (!product) return <>Product Not found</>;

	const {
		name,
		description,
		category,
		moreImages,
		price,
		brand,
		stock,
		type,
		year,
		color,
		seatCapacity,
		isElectric,
		features,
		transmission,
		model,
		_id,
		rating,
	} = product?.data?.result as ICar;

	const productDetails = product?.data?.result as ICar;
	const suggestedCars = product?.data?.suggestedCars as ICar[];
	const ifcart = cartItem ? cartItem.quantity : 0;

	const handleAddToCart = (carId: string, qty: number) => {
		dispatch(addCarCart({ carId: carId, quantity: qty, ...productDetails }));
	};

	return (
		<div>
			<div className="text-center mt-10 mb-6">
				<Header header={"Products Details"} />
				<Separator className="bg-primary h-1 w-1/5 mx-auto mt-4" />
			</div>
			{/* PRODUCT DETAILS SECTION  */}
			<section className="py-10 max-w-7xl mx-auto px-16">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="flex flex-col md:flex-row gap-2">
						<div className="space-y-3 flex md:flex-col overflow-y-auto md:overflow-x-hidden scrollbar-hide justify-center md:min-w-[150px] max-h-[520px]">
							{moreImages?.map((image: ICarGalleryImage, i: number) => (
								<img
									key={i}
									onClick={() => setMainImg(i)}
									className={`w-24 h-24 md:w-28 md:h-28 rounded-lg object-cover cursor-pointer border-2 transition-transform duration-300
            ${
							mainImgIndex === i
								? "border-blue-600 scale-105 shadow-lg"
								: "border-gray-300 hover:scale-105 hover:shadow-md"
						}`}
									src={image.url}
								/>
							))}
						</div>

						{/* MAIN IMAGE */}
						<div className="flex-grow flex items-center justify-center h-[520px] overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-700">
							<ImageMagnifier
								key={mainImgIndex}
								src={moreImages[mainImgIndex]?.url}
								alt="car-image"
								width={600}
								height={600}
								className="rounded-xl object-cover w-full h-full max-w-[90%] transition-transform duration-500 hover:scale-110"
							/>
						</div>
					</div>

					{/* PRODUCT DETAILS */}
					<div className="space-y-4 p-4 md:p-20">
						<h3 className="text-2xl font-semibold flex items-center gap-2">
							{name}
							{rating !== undefined && (
								<div className="flex items-center">
									{[...Array(5)].map((_, i) => (
										<svg
											key={i}
											xmlns="http://www.w3.org/2000/svg"
											fill={i < rating ? "#facc15" : "none"}
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="#facc15"
											className="w-5 h-5"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M11.48 3.499a.75.75 0 011.04 0l2.548 2.588 3.432.5a.75.75 0 01.416 1.28l-2.48 2.438.585 3.414a.75.75 0 01-1.088.79l-3.072-1.615-3.072 1.615a.75.75 0 01-1.088-.79l.585-3.414-2.48-2.438a.75.75 0 01.416-1.28l3.432-.5L11.48 3.5z"
											/>
										</svg>
									))}
								</div>
							)}
						</h3>

						<p className="text-gray-600">{description?.slice(0, 100)}...</p>

						<p className="flex items-center text-sm text-gray-500 gap-2">
							<ShoppingCart />
							<span>
								{Math.floor(Math.random() * (50 - 10 + 1)) + 10} items sold in
								the last 24 hours
							</span>
						</p>
						<div className="text-xl font-bold">
							${price.toFixed(2)}
							<span className="line-through text-gray-400 text-lg ml-2">
								${(price + 350).toFixed(2)}
							</span>
						</div>
						<p className="text-sm text-gray-600">
							Sub Total: $
							{ifcart ? (price * ifcart).toFixed(2) : price.toFixed(2)}
						</p>
						<p className="text-sm text-gray-500">Category: {category}</p>

						<div className="flex flex-col md:flex-row items-center gap-4">
							<p
								className={`text-sm px-4 py-2 rounded-md font-medium text-center ${
									stock > 0
										? "bg-green-100 text-green-600"
										: "bg-red-100 text-red-600"
								}`}
							>
								{stock > 0 ? `${stock - ifcart} in stock` : "Out of Stock"}
							</p>
							{ifcart > 0 && (
								<p className="text-sm text-gray-600">
									You have {ifcart} of this item in your cart.
								</p>
							)}
						</div>

						{stock > 0 && (
							<>
								<div className="flex items-center gap-6">
									<div className="flex items-center border rounded-md px-3 py-1">
										<button
											disabled={ifcart <= 0}
											onClick={() => handleAddToCart(_id, -1)}
											className="px-2 py-1 text-lg text-gray-600 hover:text-black disabled:text-gray-300"
										>
											-
										</button>
										<span className="px-4">{ifcart > 0 ? ifcart : 0}</span>
										<button
											disabled={stock === 0 || stock - ifcart === 0}
											onClick={() => handleAddToCart(_id, 1)}
											className="px-2 py-1 text-lg text-gray-600 hover:text-black disabled:text-gray-300"
										>
											+
										</button>
									</div>
								</div>
								<div className="flex">
									{/* <Link to="/cars" className="pe-4">
                    <Button>View Cart</Button>
                  </Link> */}
									{!(stock === 0 || ifcart == 0) ? (
										<Link to="/checkout">
											<Button>Buy Now</Button>
										</Link>
									) : (
										<Button disabled>Buy Now</Button>
									)}
								</div>
							</>
						)}
					</div>
				</div>

				{/* DESCRIPTION */}
				<section className="py-10 mx-5">
					<Tabs defaultValue="description" className="w-full">
						<TabsList className="bg-blue-900 mb-5 bg-opacity-10 max-w-96 flex gap-10 text-left">
							<TabsTrigger
								className="md:text-md text-sm hover:text-primary"
								value="description"
							>
								Description
							</TabsTrigger>
							<TabsTrigger
								className="md:text-md text-sm hover:text-primary"
								value="ship"
							>
								Shipping Information
							</TabsTrigger>
						</TabsList>

						<TabsContent value="description">
							<div className="space-y-6 py-6 px-20 rounded-lg shadow transition-colors duration-300 bg-white dark:bg-gray-800">
								<h2 className="text-xl font-bold border-b pb-2 dark:text-gray-100">
									About the Product
								</h2>
								<p className="text-gray-600 dark:text-gray-300">
									{description}
								</p>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
									<div className="space-y-3">
										<p className="text-sm font-medium flex items-center gap-2 dark:text-gray-200">
											<Tag className="w-4 h-4 text-gray-500 dark:text-gray-400" />
											<span className="font-semibold">Brand:</span> {brand}
										</p>
										<p className="text-sm font-medium flex items-center gap-2 dark:text-gray-200">
											<Car className="w-4 h-4 text-gray-500 dark:text-gray-400" />
											<span className="font-semibold">Model:</span> {model}
										</p>
										<p className="text-sm font-medium flex items-center gap-2 dark:text-gray-200">
											<Settings className="w-4 h-4 text-gray-500 dark:text-gray-400" />
											<span className="font-semibold">Type:</span> {type}
										</p>
										<p className="text-sm font-medium flex items-center gap-2 dark:text-gray-200">
											<Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
											<span className="font-semibold">Year:</span> {year}
										</p>
										<p className="text-sm font-medium flex items-center gap-2 dark:text-gray-200">
											<Palette className="w-4 h-4 text-gray-500 dark:text-gray-400" />
											<span className="font-semibold">Color:</span> {color}
										</p>
									</div>

									<div className="space-y-3">
										<p className="text-sm font-medium flex items-center gap-2 dark:text-gray-200">
											<Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
											<span className="font-semibold">Seat Capacity:</span>{" "}
											{seatCapacity}
										</p>
										<p className="text-sm font-medium flex items-center gap-2 dark:text-gray-200">
											<Key className="w-4 h-4 text-gray-500 dark:text-gray-400" />
											<span className="font-semibold">Transmission:</span>{" "}
											{transmission}
										</p>
										<p className="text-sm font-medium flex items-center gap-2 dark:text-gray-200">
											<Battery className="w-4 h-4 text-gray-500 dark:text-gray-400" />
											<span className="font-semibold">Electric:</span>{" "}
											{isElectric ? "Yes" : "No"}
										</p>
									</div>
								</div>

								<div className="mt-4">
									<h3 className="text-lg font-semibold border-b pb-2 dark:text-gray-100">
										Key Features
									</h3>
									<ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mt-2">
										{features.map((feature, index) => (
											<li key={index} className="flex items-center gap-2">
												<CheckCircle className="w-4 h-4 text-gray-500 dark:text-gray-400" />
												{feature}
											</li>
										))}
									</ul>
								</div>
							</div>
						</TabsContent>

						<TabsContent className="text-justify" value="ship">
							<div className="space-y-6 py-6 px-20 rounded-lg shadow transition-colors duration-300 bg-white dark:bg-gray-800">
								<h2 className="text-xl font-bold border-b pb-2 dark:text-gray-100">
									Shipping Information
								</h2>
								<p className="text-gray-600 dark:text-gray-300">
									Here is the shipping information for the product:
								</p>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
									<div className="space-y-3">
										<p className="text-sm font-medium flex items-center gap-2 dark:text-gray-200">
											<Truck className="w-4 h-4 text-gray-500 dark:text-gray-400" />
											<span className="font-semibold">Shipping Method:</span>{" "}
											Standard Shipping
										</p>
										<p className="text-sm font-medium flex items-center gap-2 dark:text-gray-200">
											<Locate className="w-4 h-4 text-gray-500 dark:text-gray-400" />
											<span className="font-semibold">Shipping Location:</span>{" "}
											New York, USA
										</p>
										<p className="text-sm font-medium flex items-center gap-2 dark:text-gray-200">
											<Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
											<span className="font-semibold">
												Estimated Delivery Time:
											</span>{" "}
											5-7 Business Days
										</p>
										<p className="text-sm font-medium flex items-center gap-2 dark:text-gray-200">
											<DollarSign className="w-4 h-4 text-gray-500 dark:text-gray-400" />
											<span className="font-semibold">Shipping Cost:</span>{" "}
											$10.00
										</p>
									</div>

									<div className="space-y-3">
										<p className="text-sm font-medium flex items-center gap-2 dark:text-gray-200">
											<Gift className="w-4 h-4 text-gray-500 dark:text-gray-400" />
											<span className="font-semibold">Gift Wrapping:</span>{" "}
											Available
										</p>
										<p className="text-sm font-medium flex items-center gap-2 dark:text-gray-200">
											<Hand className="w-4 h-4 text-gray-500 dark:text-gray-400" />
											<span className="font-semibold">Handling Time:</span> 1-2
											Business Days
										</p>
										<p className="text-sm font-medium flex items-center gap-2 dark:text-gray-200">
											<Calendar1 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
											<span className="font-semibold">Return Policy:</span>{" "}
											30-Day Return
										</p>
									</div>
								</div>
							</div>
						</TabsContent>
					</Tabs>
				</section>

				{/* SUGGESTED CARS */}
				<div className="text-center space-y-1.5 px-2 md:px-0">
					<Header header={"Suggestions"} />
				</div>
				<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
					{suggestedCars?.map((product: ICar) => (
						<FeaturedProductCard data={product} key={product._id} />
					))}
				</section>
			</section>
		</div>
	);
};

export default ProductDetails;
