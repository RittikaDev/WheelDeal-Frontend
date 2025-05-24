import { useGetCarBrandCatModelQuery } from "../../redux/features/cars/carApi";
import Header from "../reusableComponents/Header";
import Subheader from "../reusableComponents/SubHeader";

const Categories = () => {
	const { data: getBrands, isSuccess } = useGetCarBrandCatModelQuery(undefined);

	let categoryNames: string[] = [];

	if (isSuccess && getBrands?.data) {
		const allCategories = getBrands.data.map((item: any) => item.category);
		categoryNames = [...new Set(allCategories)];
	}

	return (
		<section className="max-w-7xl mx-auto py-24 px-4">
			<div className="text-center pb-9 space-y-1.5 px-2 md:px-0">
				<Header header={"Categories"} />
				<Subheader
					className="text-center"
					heading={"Explore Cars by Category"}
				/>
			</div>

			<div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
				{categoryNames.map((category, idx) => (
					<div
						key={idx}
						className="border border-primary bg-card text-card-foreground dark:bg-zinc-800 
								   hover:bg-primary  hover:border-white 
								   transition-all duration-200 p-4 rounded-xl text-center cursor-pointer"
					>
						<p className="text-lg font-semibold capitalize hover:text-white">
							{category}
						</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default Categories;
