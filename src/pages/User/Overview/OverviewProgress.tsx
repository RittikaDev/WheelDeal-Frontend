import { Card, CardContent } from "../../../components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "../../../components/ui/chart";
import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	XAxis,
	YAxis,
} from "recharts";

export const description = "A bar chart with custom labels for bookings";

// Updated chart configuration for each booking type
const chartConfig = {
	total: {
		label: "Total Bookings",
		color: "hsl(var(--primary))",
	},
	pending: {
		label: "Pending Bookings",
		color: "hsl(var(--primary))",
	},
	completed: {
		label: "Completed Bookings",
		color: "hsl(var(--primary))",
	},
	canceled: {
		label: "Canceled Bookings",
		color: "hsl(var(--primary))",
	},
	label: {
		color: "hsl(var(--background))",
	},
} satisfies ChartConfig;

interface IProps {
	total: number;
	pending: number;
	completed: number;
	cancelled: number;
	shipped: number;
	processing: number;
}

const OverviewProgress: React.FC<IProps> = ({
	total,
	pending,
	completed,
	cancelled,
	shipped,
	processing,
}) => {
	// Updated chart data for bookings
	const chartData = [
		{ bookingType: "Total", count: total },
		{ bookingType: "Pending", count: pending },
		{ bookingType: "Completed", count: completed },
		{ bookingType: "Cancelled", count: cancelled },
		{ bookingType: "Shipped", count: shipped },
		{ bookingType: "Processing", count: processing },
	];
	return (
		<Card>
			<CardContent className="pt-4">
				<ChartContainer config={chartConfig}>
					<BarChart
						className="p-0"
						accessibilityLayer
						data={chartData}
						layout="vertical"
						margin={{ right: 16 }}
					>
						<CartesianGrid horizontal={false} />
						<YAxis
							dataKey="bookingType"
							type="category"
							tickLine={false}
							tickMargin={0}
							axisLine={false}
							tickFormatter={(value) => value}
							hide
						/>
						<XAxis dataKey="count" type="number" hide />
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="line" />}
						/>
						{/* Different bars for each booking type with custom labels */}
						<Bar
							dataKey="count"
							layout="vertical"
							radius={4}
							fill="var(--color-total)"
						>
							<LabelList
								dataKey="bookingType"
								position="insideLeft"
								offset={8}
								className="fill-[--color-label]"
								fontSize={12}
							/>
							<LabelList
								dataKey="count"
								position="right"
								offset={8}
								className="fill-foreground"
								fontSize={12}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default OverviewProgress;
