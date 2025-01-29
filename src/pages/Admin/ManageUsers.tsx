import { Input } from "../../components/ui/input";
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
} from "../../components/ui/pagination";

import { Toaster } from "sonner";
import { Link } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";

import LoadingPage from "../../components/shared/LoadingPage";

import ShowToast from "../../components/reusableComponents/ShowToast";
import {
	useGetAllUsersQuery,
	useManageStatusMutation,
} from "../../redux/features/auth/authApi";
import { Switch } from "../../components/ui/switch";
import DashboardHeading from "../../components/reusableComponents/DashboardHeading";

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

const ManageUsers = () => {
	const [filters, setFilters] = useState<TFilters>(initialFilterValues);
	const { data: getResults, isLoading } = useGetAllUsersQuery(filters);
	const [manageStatus] = useManageStatusMutation();

	const users = getResults?.data;
	const [userStatus, setUserStatus] = useState<{ [key: string]: boolean }>({});

	useEffect(() => {
		if (users) {
			// Set initial user statuses based on the `isBlocked` field in the users array
			const initialStatus = users.reduce(
				(acc: { [key: string]: boolean }, user) => {
					// If user is blocked (inactive), set the status to false
					acc[user._id] = !user.isBlocked; // true means active, false means blocked (inactive)
					return acc;
				},
				{}
			);
			setUserStatus(initialStatus);
		}
	}, [users]);

	// Handle toggle block/unblock
	const handleToggle = async (userId: string, value: boolean) => {
		const updatedStatus = { ...userStatus, [userId]: value };
		setUserStatus(updatedStatus);

		try {
			await manageStatus({
				userId,
				status: !value,
			});

			// Show success toast
			ShowToast("User status updated successfully", "#4CAF50", "success");
		} catch (err) {
			console.log(err);
			// Revert the status if the update fails (to keep UI in sync with database)
			const updatedStatus = { ...userStatus, [userId]: !value };
			setUserStatus(updatedStatus);
			// Show error toast
			ShowToast("Failed to update status", "#b71c1c", "error");
		}
	};

	if (isLoading) {
		return (
			<>
				<LoadingPage />
			</>
		);
	}
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
	const totalusers = getResults?.meta?.total || 0;
	const startIndex = (filters.page - 1) * filters.limit + 1;
	const endIndex = Math.min(startIndex + filters.limit - 1, totalusers);
	const totalPages = getResults?.meta?.totalPages;

	return (
		<div className="max-w-7xl mx-auto">
			<DashboardHeading title={"Manage Users"} />
			<Toaster />
			<div className="container px-4 2xl:px-0 mx-auto py-4">
				<div className="flex items-center gap-10 justify-between flex-col sm:flex-row">
					<form className="flex items-center w-full justify-between flex-col sm:flex-row">
						{users && (
							<div className="flex gap-3 flex-col sm:flex-row w-full sm:w-auto">
								{/* Search Input */}
								<div className="w-full sm:w-72 md:w-80 lg:w-96 mb-4 sm:mb-0 relative">
									<Input
										name="search"
										className="rounded-sm w-full hover:border-primary pl-10" // Added padding-left to leave space for the icon
										type="text"
										placeholder="Search"
										onChange={handleFilterChange}
									/>
									{/* Search Icon */}
									<button className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:text-primary">
										<Search />
									</button>
								</div>

								{/* Limit Dropdown and Result Text */}
								<div className="flex gap-3 items-center w-full sm:w-auto">
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
										Showing {startIndex}–{endIndex} of {totalusers} results
									</p>
								</div>
							</div>
						)}
					</form>
				</div>

				{/* user table  */}
				{(users?.length ?? 0) > 0 ? (
					<div className="py-6">
						<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
							<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
								<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
									<tr>
										<th scope="col" className="px-6 w-8  py-3">
											#
										</th>
										<th scope="col" className="px-2 py-3">
											User Name
										</th>
										<th scope="col" className="px-6 py-3">
											Email
										</th>
										<th scope="col" className="px-6 py-3">
											Phone
										</th>
										<th scope="col" className="px-6 py-3">
											Address
										</th>
										<th scope="col" className="px-6 py-3">
											City
										</th>
										<th scope="col" className="px-6 py-3">
											Status
										</th>
										<th scope="col" className="px-6 py-3">
											Action
										</th>
									</tr>
								</thead>
								<tbody>
									{users?.map((user, i: number) => (
										<tr
											key={i}
											className="odd:bg-orange-100 odd:dark:bg-primary-900 even:bg-primary-500 even:dark:bg-gray-800 dark:dark:bg-gray-600 border-b dark:border-gray-700"
										>
											<th scope="row" className="px-6 py-4 font-medium ">
												{i + 1}
											</th>
											<th
												scope="row"
												className="px-6 py-4 font-medium max-w-60"
											>
												<Link to={`/users/${user.name}`}>{user.name}</Link>
											</th>

											<td className="px-6 py-4">{user.email}</td>
											<td className="px-6 py-4">{user.phone}</td>
											<td className="px-6 py-4">{user.address}</td>
											<td className="px-6 py-4">{user.city}</td>
											<td className="px-6 py-4">
												{userStatus[user._id] ? "Active" : "Deactivated"}
											</td>
											<td className="px-6 py-4">
												<Switch
													checked={userStatus[user._id]}
													onCheckedChange={(value) =>
														handleToggle(user._id, value)
													}
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
											...Array(Math.ceil(totalusers / filters.limit)).keys(),
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
					<>{/* <NotFound text={"users are not available"} /> */}</>
				)}
			</div>
		</div>
	);
};

export default ManageUsers;
