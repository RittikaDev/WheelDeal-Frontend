import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../components/ui/table";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";

import { useGetUserOrdersQuery } from "../../redux/features/order/order.api";

import { Loader } from "lucide-react";
import LoadingPage from "../../components/shared/LoadingPage";

interface IProductDetails {
	_id: string;
	name: string;
	category: string;
	brand: string;
	color: string;
	seatCapacity: string;
}

const ViewOrders = () => {
	const { data: result, isFetching: isBookingFetching } =
		useGetUserOrdersQuery(undefined);
	console.log(result);

	return (
		<>
			{/* Mobile view */}
			<div className="md:hidden">
				{isBookingFetching ? (
					<Loader />
				) : result?.data && result.data.length > 0 ? (
					result.data.map((order) =>
						order.products.map((booking: { product: IProductDetails }) => (
							<Card className="mb-4" key={booking.product._id}>
								<CardHeader>
									<CardTitle>{booking.product.name}</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-2 gap-2">
										<div className="text-sm font-medium">Category</div>
										<div className="text-sm">{booking.product.category}</div>
										<div className="text-sm font-medium">Brand</div>
										<div className="text-sm">{booking.product.brand}</div>
										<div className="text-sm font-medium">Color</div>
										<div className="text-sm">{booking.product.color}</div>
										<div className="text-sm font-medium">Seat Capacity</div>
										<div className="text-sm capitalize">
											{booking.product.seatCapacity}
										</div>
										<div className="text-sm font-medium">Booking Date</div>
										<div className="text-sm capitalize">
											{new Date(order.createdAt).toDateString()}
										</div>
										<div className="text-sm font-medium">Status</div>
										<div className="text-sm capitalize">{order.status}</div>
									</div>
								</CardContent>
							</Card>
						))
					)
				) : (
					<p className="text-center text-gray-500">No bookings available</p>
				)}
			</div>

			{/* Desktop view */}
			{isBookingFetching ? (
				<LoadingPage />
			) : result?.data && result.data.length > 0 ? (
				<div className="hidden md:block">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Car Name</TableHead>
								<TableHead>Category</TableHead>
								<TableHead>Brand</TableHead>
								<TableHead>Color</TableHead>
								<TableHead>Seat Capacity</TableHead>
								<TableHead>Booking Date</TableHead>
								<TableHead>Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{result.data.map((order) =>
								order.products.map((booking: { product: IProductDetails }) => (
									<TableRow key={booking.product._id}>
										<TableCell>{booking.product.name}</TableCell>
										<TableCell>{booking.product.category}</TableCell>
										<TableCell>{booking.product.brand}</TableCell>
										<TableCell>{booking.product.color}</TableCell>
										<TableCell className="capitalize">
											{booking.product.seatCapacity}
										</TableCell>
										<TableCell className="capitalize">
											{new Date(order.createdAt).toDateString()}
										</TableCell>
										<TableCell className="capitalize">{order.status}</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
			) : (
				<div className="hidden md:block text-center text-gray-500">
					No bookings available
				</div>
			)}
		</>
	);
};

export default ViewOrders;
