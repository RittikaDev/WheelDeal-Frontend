import {
  BookCheckIcon,
  CheckCheck,
  CircleCheck,
  CircleEllipsis,
  CircleX,
} from "lucide-react";

import LoadingPage from "../../../components/shared/LoadingPage";
import OverviewCard from "./OverviewCard";
import OverviewProgress from "./OverviewProgress";

import { useGetUserOrdersQuery } from "../../../redux/features/order/order.api";

const Overview = () => {
  const { data: result, isLoading } = useGetUserOrdersQuery(undefined);
  const Orders = result?.data;

  const pendingOrders = {
    data: Orders?.filter(
      (booking: { status: string }) => booking.status === "Pending"
    ),
  };

  const processingOrders = {
    data: Orders?.filter(
      (booking: { status: string }) => booking.status === "Processing"
    ),
  };

  const shippedOrders = {
    data: Orders?.filter(
      (booking: { status: string }) => booking.status === "Shipped"
    ),
  };

  const cancelledOrders = {
    data: Orders?.filter(
      (booking: { status: string }) => booking.status === "Cancelled"
    ),
  };
  const deliveredOrders = {
    data: Orders?.filter(
      (booking: { status: string }) => booking.status === "Delivered"
    ),
  };

  const totalOrdersCount =
    (pendingOrders?.data?.length || 0) +
      (processingOrders?.data?.length || 0) +
      (shippedOrders?.data?.length || 0) +
      (cancelledOrders?.data?.length || 0) +
      deliveredOrders?.data?.length || 0;

  const userOverview = [
    {
      icon: <BookCheckIcon size={32} />,
      count: totalOrdersCount,
      label: "Total Orders",
    },
    {
      icon: <CircleEllipsis size={32} />,
      count: pendingOrders?.data?.length || 0,
      label: "Pending",
    },
    {
      icon: <CheckCheck size={32} />,
      count: shippedOrders?.data?.length || 0,
      label: "Shipped",
    },
    {
      icon: <CircleCheck size={32} />,
      count: processingOrders?.data?.length || 0,
      label: "In Processing",
    },
    {
      icon: <CircleX size={32} />,
      count: deliveredOrders?.data?.length || 0,
      label: "Delivered",
    },
    {
      icon: <CircleX size={32} />,
      count: cancelledOrders?.data?.length || 0,
      label: "Cancelled",
    },
  ];

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* <DashboardSectionTitle title="Overview" /> */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="grid grid-cols-2 gap-4 lg:col-span-2">
          {userOverview.map((item, index) => (
            <OverviewCard key={index} {...item} />
          ))}
        </div>
        <OverviewProgress
          total={totalOrdersCount}
          pending={pendingOrders?.data?.length || 0}
          completed={deliveredOrders?.data?.length || 0}
          shipped={shippedOrders?.data?.length || 0}
          processing={processingOrders?.data?.length || 0}
          cancelled={cancelledOrders?.data?.length || 0}
        />
      </div>
    </div>
  );
};

export default Overview;
