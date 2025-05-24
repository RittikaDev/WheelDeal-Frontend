import { useEffect, useState } from "react";
import { ICar } from "../types";
import FeaturedProductCard from "../components/reusableComponents/FeaturedProductCard";
import { useGetAllCarsQuery } from "../redux/features/cars/carApi";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
	PaginationLink,
	PaginationNext,
} from "../components/ui/pagination";
import LoadingPage from "../components/shared/LoadingPage";
import Header from "../components/reusableComponents/Header";
import { Separator } from "../components/ui/separator";
import { useParams } from "react-router-dom";

interface TFilterValues {
	brand?: string;
	category?: string;
	sort: string;
	limit: number;
	page: number;
}

const MegaMenuProducts = () => {
	// Get params: type can be "brand" or "category", id is the value for either
	const { type, id } = useParams<{ type: "brand" | "category"; id: string }>();

	// Initialize filters: only one of brand or category is set based on URL params
	const initialFilters: TFilterValues = {
		brand: type === "brand" ? id : undefined,
		category: type === "category" ? id : undefined,
		sort: "price",
		limit: 6,
		page: 1,
	};

	const [filters, setFilters] = useState<TFilterValues>(initialFilters);

	// When URL params change, update filters (and reset to page 1)
	useEffect(() => {
		setFilters({
			brand: type === "brand" ? id : undefined,
			category: type === "category" ? id : undefined,
			sort: "price",
			limit: 6,
			page: 1,
		});
	}, [type, id]);

	// Fetch products filtered by brand or category + pagination + sort
	const { data: results, isLoading } = useGetAllCarsQuery(filters);

	if (isLoading) return <LoadingPage />;

	const products = results?.data || [];
	const totalProducts = results?.meta?.total || 0;
	const totalPages = results?.meta?.totalPages || 0;
	const startIndex = (filters.page - 1) * filters.limit + 1;
	const endIndex = Math.min(startIndex + filters.limit - 1, totalProducts);

	// Handle sort dropdown change
	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFilters((prev) => ({ ...prev, sort: e.target.value, page: 1 }));
	};

	// Handle page change
	const handlePageChange = (page: number) => {
		setFilters((prev) => ({ ...prev, page }));
	};

	return (
		<>
			<div className="text-center mt-10 mb-6">
				<Header header={"Our Products"} />
				<Separator className="bg-primary h-1 w-1/5 mx-auto mt-4" />
			</div>

			<section className="max-w-7xl mx-auto py-10 px-4 md:px-0">
				<div className="flex items-center justify-between mb-6">
					<p>
						Showing {startIndex}–{endIndex} of {totalProducts} results for{" "}
						{filters.brand ? (
							<>
								brand: <strong>{filters.brand}</strong>
							</>
						) : filters.category ? (
							<>
								category: <strong>{filters.category}</strong>
							</>
						) : (
							<strong>all</strong>
						)}
					</p>

					<select
						name="sort"
						value={filters.sort}
						onChange={handleSortChange}
						className="text-black font-medium border bg-opacity-10 text-sm rounded-lg p-2"
					>
						<option value="price">Price: Low to High</option>
						<option value="-price">Price: High to Low</option>
					</select>
				</div>

				{products.length === 0 ? (
					<p className="text-center py-10">
						No products found for{" "}
						{filters.brand
							? `brand "${filters.brand}"`
							: filters.category
							? `category "${filters.category}"`
							: "your criteria"}
					</p>
				) : (
					<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
						{products.map((product: ICar) => (
							<FeaturedProductCard key={product._id} data={product} />
						))}
					</div>
				)}

				{/* Pagination */}
				{totalPages > 1 && (
					<Pagination className="pt-8">
						<PaginationContent className="flex gap-2 justify-center items-center">
							<PaginationItem>
								<PaginationPrevious
									onClick={() =>
										handlePageChange(Math.max(filters.page - 1, 1))
									}
									className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
								>
									Previous
								</PaginationPrevious>
							</PaginationItem>

							{[...Array(totalPages).keys()].map((i) => (
								<PaginationItem key={i}>
									<PaginationLink
										href="#"
										onClick={() => handlePageChange(i + 1)}
										className={`px-4 py-2 rounded-md ${
											filters.page === i + 1
												? "bg-blue-500 text-white"
												: "bg-gray-200"
										} hover:bg-blue-400 hover:text-white transition`}
									>
										{i + 1}
									</PaginationLink>
								</PaginationItem>
							))}

							<PaginationItem>
								<PaginationNext
									onClick={() =>
										handlePageChange(Math.min(filters.page + 1, totalPages))
									}
									className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
								>
									Next
								</PaginationNext>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				)}
			</section>
		</>
	);
};

export default MegaMenuProducts;
