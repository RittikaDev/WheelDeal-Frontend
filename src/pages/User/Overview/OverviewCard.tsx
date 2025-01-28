import React from "react";

interface BookingCardProps {
	icon: React.ReactNode;
	count: number;
	label: string;
}

const OverviewCard: React.FC<BookingCardProps> = ({ icon, count, label }) => {
	return (
		<div className="border p-6 rounded-md space-y-2">
			<div className="flex items-center space-x-2">
				<div className="text-primary">{icon}</div>
				<h2 className="text-2xl font-semibold">
					{count?.toString()?.padStart(2, "0")}
				</h2>
			</div>
			<p className="font-medium text-xs lg:text-base">{label}</p>
		</div>
	);
};

export default OverviewCard;
