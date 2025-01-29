import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

import {
  useCancelOrderMutation,
  useGetUserOrdersQuery,
} from "../../../redux/features/order/order.api";

import { Loader } from "lucide-react";

import LoadingPage from "../../../components/shared/LoadingPage";
import TrackMyOrderAlertDialog from "./TrackMyOrderAlertDialog";
import ShowToast from "../../../components/reusableComponents/ShowToast";
import DashboardHeading from "../../../components/reusableComponents/DashboardHeading";

interface IProductDetails {
  _id: string;
  name: string;
  category: string;
  brand: string;
  color: string;
  price: string;
}

interface IBooking {
  quantity: number;
  product: IProductDetails;
}

const TrackMyOrder = () => {
  const { data: result, isFetching: isBookingFetching } =
    useGetUserOrdersQuery(undefined);
  const [cancelOrder] = useCancelOrderMutation();
  console.log(result);

  const cancelMyOrder = async (orderId: string) => {
    const toastId = ShowToast("Cancelling...", "#ffdf20", "loading");

    try {
      const response = await cancelOrder(orderId).unwrap();
      if (response.success) {
        ShowToast(
          "Order cencelled successfully",
          "#4CAF50",
          "success",
          toastId
        );
      }
    } catch (err) {
      console.log(err);
      ShowToast("Failed to cancel the order", "#b71c1c", "error", toastId);
    }
  };

  return (
    <>
      {/* Mobile view */}
      <div className="md:hidden">
        {isBookingFetching ? (
          <Loader />
        ) : result?.data && result.data.length > 0 ? (
          result?.data.map((order: any) =>
            order?.products
              ?.filter((qCheck: any) => qCheck.quantity > 0)
              .map((booking: IBooking) => (
                <Card className="mb-4" key={order._id}>
                  <CardHeader>
                    <CardTitle>{booking.product?.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium">Order ID</div>
                      <div className="text-sm">{order._id}</div>
                      <div className="text-sm font-medium">Category</div>
                      <div className="text-sm">{booking.product.category}</div>
                      <div className="text-sm font-medium">Brand</div>
                      <div className="text-sm">{booking.product.brand}</div>
                      <div className="text-sm font-medium">Color</div>
                      <div className="text-sm">{booking.product.color}</div>
                      <div className="text-sm font-medium">Quantity</div>
                      <div className="text-sm capitalize">
                        {booking.quantity}
                      </div>
                      <div className="text-sm font-medium">Total Price</div>
                      <div className="text-sm capitalize">
                        {order.totalPrice}
                      </div>
                      <div className="text-sm font-medium">Booking Date</div>
                      <div className="text-sm capitalize">
                        {new Date(order.createdAt).toDateString()}
                      </div>
                      <div className="text-sm font-medium">Status</div>
                      <div className="text-sm capitalize">{order.status}</div>
                      <div className="text-sm font-medium">Delivery date</div>
                      <div className="text-sm capitalize">
                        {new Date(order.deliveryDate).toDateString()}
                      </div>
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
        <div className="hidden md:block max-w-7xl mx-auto">
          <DashboardHeading title={"Track My Order"} />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Car Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total Price</TableHead>
                <TableHead>Booking Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Delivery Time</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result?.data.map((order: any) =>
                order?.products
                  ?.filter((qCheck: any) => qCheck.quantity > 0)
                  .map((booking: IBooking) => (
                    <TableRow key={order._id}>
                      <TableCell>{order._id}</TableCell>
                      <TableCell>{booking.product.name}</TableCell>
                      <TableCell>{booking.product.category}</TableCell>
                      <TableCell>{booking.product.brand}</TableCell>
                      <TableCell>{booking.product.color}</TableCell>
                      <TableCell>{booking.quantity}</TableCell>
                      <TableCell>{order.totalPrice}</TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toDateString()}
                      </TableCell>
                      <TableCell className="uppercase">
                        {order.status}
                      </TableCell>
                      <TableCell className="capitalize">
                        {order.deliveryDate
                          ? new Date(order.deliveryDate).toDateString()
                          : "Yet To Set"}
                      </TableCell>
                      <TableCell className="capitalize">
                        <TrackMyOrderAlertDialog
                          cancelMyOrder={cancelMyOrder}
                          status={order.status}
                          orderId={order._id}
                        />
                      </TableCell>
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

export default TrackMyOrder;
