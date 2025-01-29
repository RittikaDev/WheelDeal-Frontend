// import PageBanner from "@/components/reusableComponents/PageBanner";
// import LoadingPage from "@/components/shared/LoadingPage";
// import NotFound from "@/components/shared/NotFound";
// import ProductsSidebar from "@/components/shared/ProductsSidebar";

import { FormEvent, useState } from "react";
import { useLocation } from "react-router-dom";
import { ICar } from "../types";
import FeaturedProductCard from "../components/reusableComponents/FeaturedProductCard";
import {
	useGetAllCarsQuery,
	useGetCarBrandCatModelQuery,
} from "../redux/features/cars/carApi";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
	PaginationLink,
	PaginationEllipsis,
	PaginationNext,
} from "../components/ui/pagination";
import ProductsSidebar from "../components/Products/ProductsSidebar";
import LoadingPage from "../components/shared/LoadingPage";
import Header from "../components/reusableComponents/Header";
import { Separator } from "../components/ui/separator";

export interface TFilterValues {
	search: string;
	sort: string;
	sortOrder: string;
	limit: number;
	page: number;
	filter: string[];
}

const ProductsPage = () => {
	const { data: getBrands, isSuccess } = useGetCarBrandCatModelQuery(undefined);

	let brandNames: string[] = [];
	let modelNames: string[] = [];
	let categoryNames: string[] = [];
	if (isSuccess && getBrands?.data) {
		getBrands.data.forEach((brands) => {
			brandNames.push(brands.brand);
			modelNames.push(brands.model);
			categoryNames.push(brands.category);
		});

		brandNames = [...new Set(brandNames)];
		modelNames = [...new Set(modelNames)];
		categoryNames = [...new Set(categoryNames)];
	}

	const location = useLocation();
	const brand = location.state as string;
	console.log(brand);
	const initialFilterValues: TFilterValues = {
		search: "",
		sort: "price",
		sortOrder: "",
		limit: 6,
		page: 1,
		filter: [],
	};

	const [filters, setFilters] = useState<TFilterValues>(initialFilterValues);
	const [selectedBrand, setSelectedBrand] = useState<string[]>([
		`${brand ? brand : ""}`,
	]);
	const [selectedModel, setSelectedModel] = useState<string[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [stockStatus, setStockStatus] = useState<string>("available");
	const { data: getResults, isLoading } = useGetAllCarsQuery(filters);

	//   console.log(stockStatus);
	// Product and total product count
	const products = getResults?.data;

	if (isLoading) {
		return <>{<LoadingPage />}</>;
	}

	const handleFilterChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFilters((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	const handleCheckboxChange = (brand: string) => {
		const isBrandSelected = selectedBrand.includes(brand);
		const updatedBrands = isBrandSelected
			? selectedBrand.filter((item) => item !== brand)
			: [...selectedBrand, brand];

		setSelectedBrand(updatedBrands);

		// Update the filters based on the updated selectedBrand
		setFilters((prevFilters) => ({
			...prevFilters,
			brand: updatedBrands, // Assuming 'filter' should hold the selected brands
		}));
	};

	const handleCatChange = (category: string) => {
		const isCatSelected = selectedCategory.includes(category);
		const updatedCat = isCatSelected
			? selectedCategory.filter((item) => item !== category)
			: [...selectedCategory, category];

		setSelectedCategory(updatedCat);

		// Update the filters based on the updated selectedBrand
		setFilters((prevFilters) => ({
			...prevFilters,
			category: updatedCat, // Assuming 'filter' should hold the selected brands
		}));
	};
	const handleModelChange = (model: string) => {
		const isModelSelected = selectedModel.includes(model);
		const updatedModel = isModelSelected
			? selectedModel.filter((item) => item !== model)
			: [...selectedModel, model];

		setSelectedModel(updatedModel);

		// Update the filters based on the updated selectedBrand
		setFilters((prevFilters) => ({
			...prevFilters,
			model: updatedModel, // Assuming 'filter' should hold the selected brands
		}));
	};

	const handleRadioChange = (stock: string) => {
		setStockStatus(stock);

		// Update the filters based on the updated stockStatus
		setFilters((prevFilters) => ({
			...prevFilters,
			status: stock, // Assuming 'filter' should hold the selected brands
		}));
	};

	// handle page change
	const handlePageChange = (page: number) => {
		setFilters((prevValues) => ({
			...prevValues,
			page: page,
		}));
	};

	const resetFilters = () => {
		setSelectedBrand([]);
		setFilters({
			search: "",
			sort: "",
			sortOrder: "",
			limit: 6,
			page: 1,
			filter: [],
		});
	};

	// pagination calculate
	//   console.log(getResults);
	const totalProducts = getResults?.meta?.total || 0;
	const startIndex = (filters.page - 1) * filters.limit + 1;
	const endIndex = Math.min(startIndex + filters.limit - 1, totalProducts);
	const totalPages = getResults?.meta?.totalPages;

	const handleFilterSubmit = (e: FormEvent) => {
		e.preventDefault();
	};

	return (
		<>
			<div className="text-center mt-10 mb-6">
				<Header header={"Our Products"} />
				<Separator className="bg-primary h-1 w-1/5 mx-auto mt-4" />
			</div>
			<section className="max-w-7xl mx-auto py-10 px-4 md:px-0 md:grid md:grid-cols-5 gap-4">
				<ProductsSidebar
					filters={filters}
					handleFilterSubmit={handleFilterSubmit}
					handleFilterChange={handleFilterChange}
					handleCheckboxChange={handleCheckboxChange}
					handleModelChange={handleModelChange}
					handleCatChange={handleCatChange}
					handleRadioChange={handleRadioChange}
					selectedbrands={selectedBrand}
					selectedmodels={selectedModel}
					selectedcat={selectedCategory}
					brands={brandNames}
					model={modelNames}
					category={categoryNames}
					resetFilters={resetFilters}
				/>

				{/* product grid */}
				{!products ? (
					<>
						{" "}
						<div className="flex justify-center items-center pb-10 col-span-4">
							{/* <NotFound text={"Products are Not available!"} /> */}
						</div>
					</>
				) : (
					<div className="col-span-4">
						<div className="flex items-center py-2 p-2   mb-7 justify-between">
							<p>
								Showing {startIndex}–{endIndex} of {totalProducts} results
							</p>

							<select
								name="sort"
								className="text-black font-medium border bg-opacity-10 text-sm rounded-lg  block p-2.5               "
								value={filters.sort || "Sort By Price"}
								onChange={handleFilterChange}
							>
								<option className="p-2 h-20" value="price">
									Low to High
								</option>
								<option className="p-2" value="-price">
									High to Low
								</option>
							</select>
							{/* </form> */}
						</div>

						<div className="grid w-full grid-cols-2 md:grid-cols-3 gap-3">
							{/* Todo product card */}
							{products?.map((product: ICar) => (
								<FeaturedProductCard key={product._id} data={product} />
							))}
						</div>
						{/* pagination */}
						<Pagination className="pt-8">
							<PaginationContent className="flex gap-2 justify-center items-center">
								<PaginationItem>
									<PaginationPrevious
										onClick={() =>
											handlePageChange(Math.max(filters.page - 1, 1))
										}
										className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white transition-all duration-200"
									>
										Previous
									</PaginationPrevious>
								</PaginationItem>

								{[
									...Array(Math.ceil(totalProducts / filters.limit)).keys(),
								].map((i) => (
									<PaginationItem key={i}>
										<PaginationLink
											href="#"
											onClick={() => handlePageChange(i + 1)}
											className={`px-4 py-2 rounded-md ${
												filters.page === i + 1
													? "bg-blue-500 text-white dark:bg-blue-700 dark:text-white"
													: "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
											} hover:bg-blue-400 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white transition-all duration-200`}
										>
											{i + 1}
										</PaginationLink>
									</PaginationItem>
								))}

								<PaginationItem>
									<PaginationEllipsis className="text-gray-500 dark:text-gray-400 px-2">
										...
									</PaginationEllipsis>
								</PaginationItem>

								<PaginationItem>
									<PaginationNext
										onClick={() =>
											handlePageChange(
												Math.min(filters.page + 1, totalPages || 0)
											)
										}
										className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white transition-all duration-200"
									>
										Next
									</PaginationNext>
								</PaginationItem>
							</PaginationContent>
						</Pagination>

						{/* if no prduct  */}
						{!products && (
							<>{/* <NotFound text={"Products are Not available!"} /> */}</>
						)}
					</div>
				)}
			</section>
		</>
	);
};

export default ProductsPage;
