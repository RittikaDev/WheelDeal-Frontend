import { Input } from "../../../components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Search } from "lucide-react";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "../../../components/ui/pagination";

import { Toaster, toast } from "sonner";
import { Link } from "react-router-dom";
import { ChangeEvent, useState } from "react";

import LoadingPage from "../../../components/shared/LoadingPage";
import { ICar } from "../../../types";

import {
	useDeleteProductMutation,
	useGetAllCarsQuery,
} from "../../../redux/features/cars/carApi";
import ActionMenu from "../../../components/reusableComponents/ActionMenu";
import AddNewCarModal from "./AddNewCarModel";
import ShowToast from "../../../components/reusableComponents/ShowToast";

interface TFilters {
	search: string;
	limit: number;
	page: number;
}

const initialFilterValues: TFilters = {
	search: "",
	limit: 5,
	page: 1,
};

const ManageCars = () => {
	const [deleteProduct] = useDeleteProductMutation();
	const [filters, setFilters] = useState<TFilters>(initialFilterValues);
	const { data: getResults, isLoading } = useGetAllCarsQuery(filters);

	const products = getResults?.data;

	if (isLoading) {
		return (
			<>
				<LoadingPage />
			</>
		);
	}

	const handleDeletedProduct = (id: string) => {
		const toastId = ShowToast("Logging in...", "#ffdf20", "loading");
		try {
			const res = deleteProduct(id);
			console.log(res);
			ShowToast("Product Deleted", "#4CAF50", "success", toastId);
		} catch (err) {
			console.log(err);
			ShowToast("Failed to delete", "#FF6347", "error", toastId);
		}
	};

	const handleFilterChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		e.preventDefault();
		const { name, value } = e.target;
		setFilters((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	// handle page change
	const handlePageChange = (page: number) => {
		setFilters((prevValues) => ({
			...prevValues,
			currentPage: page,
		}));
	};

	// pagination calculate
	//   console.log(getResults);
	const totalProducts = getResults?.meta?.total || 0;
	const startIndex = (filters.page - 1) * filters.limit + 1;
	const endIndex = Math.min(startIndex + filters.limit - 1, totalProducts);
	const totalPages = getResults?.meta?.totalPages;

	return (
		<div className="2xl:mt-24">
			<Toaster />
			<div className="container px-4 2xl:px-0 mx-auto py-4">
				{/* navbar product manage  */}
				{/* /menu  */}
				{/* <DasdboardMenu /> */}

				<div className="flex items-center gap-10 justify-between">
					<form className="flex items-center w-full justify-between">
						{products && (
							<div className="flex gap-3">
								<Label>Limit</Label>

								<select
									defaultValue={5}
									className="text-black"
									name="pageLimit"
									onChange={handleFilterChange}
									id=""
								>
									<option value={2}>2</option>
									<option value={5}>5</option>
									<option value={10}>10</option>
									<option value={20}>20</option>
								</select>
								<p>
									Showing {startIndex}–{endIndex} of {totalProducts} results
								</p>
							</div>
						)}

						{/* Search here  */}
						<div className="xl:flex hidden items-center relative">
							<Input
								name="search"
								className="rounded-sm w-60 hover:border-primary"
								type="text"
								placeholder="Search"
								onChange={handleFilterChange}
							/>
							<button className="absolute hover:text-primary right-2">
								<Search />
							</button>
						</div>
					</form>
					<div>
						{" "}
						<AddNewCarModal />{" "}
					</div>
				</div>

				{/* product table  */}
				{(products?.length ?? 0) > 0 ? (
					<div className="py-6">
						<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
							<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
								<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
									<tr>
										<th scope="col" className="px-6 w-8  py-3">
											#
										</th>
										<th scope="col" className="px-2 py-3">
											Product Image
										</th>
										<th scope="col" className="px-6 py-3">
											Product name
										</th>
										<th scope="col" className="px-6 py-3">
											Category
										</th>
										<th scope="col" className="px-6 py-3">
											Stock
										</th>

										<th scope="col" className="px-6 py-3">
											Price
										</th>
										<th scope="col" className="px-6 py-3">
											Action
										</th>
									</tr>
								</thead>
								<tbody>
									{products?.map((product: ICar, i: number) => (
										<tr
											key={i}
											className="odd:bg-orange-100 odd:dark:bg-primary-900 even:bg-primary-500 even:dark:bg-gray-800 dark:dark:bg-gray-600 border-b dark:border-gray-700"
										>
											<th scope="row" className="px-6 py-4 font-medium ">
												{i + 1}
											</th>
											<th scope="row" className="px-2 py-4 font-medium ">
												<Link to={`/products/${product._id}`}>
													<img
														className="h-20 w-20 hover:resize-150  hover:scale-150 object-cover"
														src={product.image}
														alt=""
													/>
												</Link>
											</th>
											<th
												scope="row"
												className="px-6 py-4 font-medium max-w-60"
											>
												<Link to={`/products/${product._id}`}>
													{product.name}
												</Link>
											</th>

											<td className="px-6 py-4">{product.category}</td>
											<td className="px-6 py-4">{product.stock}</td>
											<td className="px-6 py-4">${product.price}</td>
											<td className="px-6 py-4">
												<ActionMenu
													product={product}
													handleDeletedProduct={handleDeletedProduct}
													toast={toast}
												/>
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<div className=" w-full py-2 mt-5">
								<Pagination>
									<PaginationContent>
										<PaginationItem>
											<PaginationPrevious
												onClick={() =>
													handlePageChange(Math.max(filters.page - 1, 1))
												}
											/>
										</PaginationItem>
										{[
											...Array(Math.ceil(totalProducts / filters.limit)).keys(),
										].map((i) => (
											<PaginationItem key={i}>
												<PaginationLink
													href="#"
													onClick={() => handlePageChange(i + 1)}
												>
													{i + 1}
												</PaginationLink>
											</PaginationItem>
										))}
										<PaginationItem>
											<PaginationEllipsis />
										</PaginationItem>
										<PaginationItem>
											<PaginationNext
												onClick={() =>
													handlePageChange(
														Math.min(filters.page + 1, totalPages || 0)
													)
												}
											/>
										</PaginationItem>
									</PaginationContent>
								</Pagination>
							</div>
						</div>
					</div>
				) : (
					<>{/* <NotFound text={"Products are not available"} /> */}</>
				)}
			</div>
		</div>
	);
};

export default ManageCars;
