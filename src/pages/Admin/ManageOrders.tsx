import { Input } from "../../components/ui/input";
import { Label } from "@radix-ui/react-label";
import { CalendarIcon, Search } from "lucide-react";

import { Toaster } from "sonner";
import { ChangeEvent, useState } from "react";
import LoadingPage from "../../components/shared/LoadingPage";
import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../redux/features/order/order.api";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "../../components/ui/select"; // Assuming you have Select from shadcn
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Calendar } from "../../components/ui/calendar";
import { format } from "date-fns";
import ShowToast from "../../components/reusableComponents/ShowToast";
import DeleteAlertDialog from "./ManageOrders/DeleteAlertDialog";
import PaginationData from "./ManageOrders/Pagination";
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

const ManageOrders = () => {
  const [filters, setFilters] = useState<TFilters>(initialFilterValues);
  const [status, setStatus] = useState("Pending");
  const { data: getResults, isLoading } = useGetOrdersQuery(filters);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const orders = getResults?.data;
  console.log(orders);
  //   orders?.map((order: any) => {
  //     console.log(order);
  //     order.products.map((product: any) => console.log(product));
  //   });

  //   order.products.map((product: any, index: any) => ()

  const [selectedDate, setSelectedDate] = useState<Map<string, Date>>(
    new Map()
  );

  const handleDateChange = (orderId: string, selectDate: Date) => {
    // console.log(selectedDate.get(orderId));
    // setSelectedDate((prev) => new Map(prev).set(orderId, selectDate));

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectDate < today) {
      ShowToast("Cannot select a past date", "#b71c1c", "error");
      return;
    }

    setSelectedDate((prev) => new Map(prev).set(orderId, selectDate));
  };

  if (isLoading) {
    return (
      <>
        {" "}
        <LoadingPage />{" "}
      </>
    );
  }

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFilters((prevValues) => ({ ...prevValues, [name]: value }));
  };

  // handle page change
  const handlePageChange = (page: number) => {
    setFilters((prevValues) => ({
      ...prevValues,
      currentPage: page,
    }));
  };

  const totalorders = getResults?.meta?.total || 0;
  const startIndex = (filters.page - 1) * filters.limit + 1;
  const endIndex = Math.min(startIndex + filters.limit - 1, totalorders);
  const totalPages = getResults?.meta?.totalPages;

  const handleStatusChange = async (_orderId: string, status: string) => {
    setStatus(status);
  };

  const handleViewOrder = (orderId: string) => {
    const toastId = ShowToast("Updating...", "#ffdf20", "loading");
    try {
      updateOrderStatus({
        orderId,
        statusDelTime: {
          status,
          deliveryDate: selectedDate.get(orderId),
        },
      });
      ShowToast(
        "Updated status and delivery date",
        "#4CAF50",
        "success",
        toastId
      );
    } catch (err) {
      console.error("Error updating car:", err);
      ShowToast("Failed to update", "#b71c1c", "error", toastId);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      const toastId = ShowToast("Deleting order...", "#ffdf20", "loading");
      await deleteOrder(orderId);
      ShowToast("Order deleted successfully", "#4CAF50", "success", toastId);
    } catch (err) {
      console.error("Error deleting order:", err);
      ShowToast("Failed to delete order", "#b71c1c", "error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <DashboardHeading title={"Manage Orders"} />
      <Toaster />
      <div className="container px-4 2xl:px-0 mx-auto py-4">
        <div className="flex items-center gap-10 justify-between">
          <form className="md:flex items-center w-full justify-between">
            {orders && (
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
                  Showing {startIndex}–{endIndex} of {totalorders} results
                </p>
              </div>
            )}

            {/* Search here  */}
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
          </form>
        </div>

        {/* order table  */}
        {(orders?.length ?? 0) > 0 ? (
          <div className="py-6">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 w-8 py-3">
                      {" "}
                      #{" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Pick a Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Payment Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Transaction Method
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order: any, i: number) => (
                    <tr
                      key={i}
                      className="odd:bg-orange-100 odd:dark:bg-primary-900 even:bg-primary-500 even:dark:bg-gray-800 dark:dark:bg-gray-600 border-b dark:border-gray-700"
                    >
                      <th scope="row" className="px-6 py-3">
                        {i + 1}
                      </th>
                      <td className="px-6 py-3">
                        {order?.products
                          ?.filter((qCheck: any) => qCheck?.quantity > 0)
                          .map((product: any, index: any) => (
                            <div key={index}>
                              <img
                                src={product?.product?.image}
                                alt={product?.product?.name}
                                width={50}
                                height={50}
                              />
                              <div>{product?.product?.name}</div>
                              <div>{product?.product?.description}</div>
                              <div>Quantity: {product?.quantity}</div>
                            </div>
                          ))}
                      </td>
                      <td className="px-6 py-3">{order?.totalPrice}</td>
                      <td className="px-6 py-3">
                        {/* Adding Select dropdown here */}
                        <Select
                          onValueChange={(value) =>
                            handleStatusChange(order?._id, value)
                          }
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue
                              placeholder={order?.status || "Select Status"}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Processing">
                              Processing
                            </SelectItem>
                            <SelectItem value="Shipped">Shipped</SelectItem>
                            <SelectItem value="Delivered">Delivered</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-6 py-3">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[200px] justify-start text-left font-normal",
                                !selectedDate.get(order._id) &&
                                  "text-muted-foreground" // Placeholder styling
                              )}
                            >
                              <CalendarIcon className="mr-2" />
                              {selectedDate.get(order._id) ? (
                                format(selectedDate.get(order._id)!, "PPP") // Display selected date from Map
                              ) : order.deliveryDate ? (
                                format(new Date(order.deliveryDate), "PPP") // Fallback to deliveryDate
                              ) : (
                                <span>Pick a date</span> // Placeholder text
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={selectedDate.get(order._id)} // Preselect existing delivery date
                              onSelect={(date) =>
                                handleDateChange(order._id, date!)
                              } // Handle date changes
                              disabled={(date) =>
                                date < new Date(new Date().setHours(0, 0, 0, 0))
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </td>
                      <td className="px-6 py-3">
                        {order?.transaction?.bank_status}
                      </td>
                      <td className="px-6 py-3">
                        {order?.transaction?.method}
                      </td>
                      <td className="px-6 py-3">
                        <button
                          className="text-white bg-amber-700 hover:bg-amber-900 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-300"
                          onClick={() => handleViewOrder(order?._id)}
                        >
                          Save
                        </button>
                      </td>
                      <td className="px-6 py-3">
                        <DeleteAlertDialog
                          handleDeleteOrder={handleDeleteOrder}
                          id={order?._id}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className=" w-full py-2 mt-5">
                <PaginationData
                  handlePageChange={handlePageChange}
                  filters={filters}
                  totalorders={totalorders}
                  totalPages={totalPages}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <p>orders are not available</p>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;
