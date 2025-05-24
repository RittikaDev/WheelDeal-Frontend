import {
	BookCheckIcon,
	Check,
	CheckCheck,
	CircleCheck,
	CircleEllipsis,
	CircleX,
} from "lucide-react";

import LoadingPage from "../../../components/shared/LoadingPage";

import { useGetOrdersQuery } from "../../../redux/features/order/order.api";
import DashboardHeading from "../../../components/reusableComponents/DashboardHeading";
import OverviewProgress from "../../User/Overview/OverviewProgress";
import OverviewCard from "../../User/Overview/OverviewCard";

const AdminOverviewPage = () => {
	const { data: result, isLoading } = useGetOrdersQuery(undefined);
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
			iconClassName: "text-blue-600",
		},
		{
			icon: <CircleEllipsis size={32} />,
			count: pendingOrders?.data?.length || 0,
			label: "Pending",
			iconClassName: "text-primary",
		},
		{
			icon: <Check size={32} />,
			count: shippedOrders?.data?.length || 0,
			label: "Shipped",
			iconClassName: "text-green-400",
		},
		{
			icon: <CircleCheck size={32} />,
			count: processingOrders?.data?.length || 0,
			label: "In Processing",
			iconClassName: "text-sky-600",
		},
		{
			icon: <CheckCheck size={32} />,
			count: deliveredOrders?.data?.length || 0,
			label: "Delivered",
			iconClassName: "text-green-600",
		},
		{
			icon: <CircleX size={32} />,
			count: cancelledOrders?.data?.length || 0,
			label: "Cancelled",
			iconClassName: "text-red-600",
		},
	];

	if (isLoading) {
		return <LoadingPage />;
	}

	return (
		<div className="max-w-7xl mx-auto">
			<DashboardHeading title={"Overview"} />
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 ">
				{userOverview.map((item, index) => (
					<OverviewCard
						key={index}
						{...item}
						iconClassName={item.iconClassName}
					/>
				))}
			</div>
			<div className="mt-6 ">
				<OverviewProgress
					total={totalOrdersCount}
					pending={pendingOrders?.data?.length || 0}
					delivered={deliveredOrders?.data?.length || 0}
					shipped={shippedOrders?.data?.length || 0}
					processing={processingOrders?.data?.length || 0}
					cancelled={cancelledOrders?.data?.length || 0}
				/>
			</div>
		</div>
	);
};

export default AdminOverviewPage;
