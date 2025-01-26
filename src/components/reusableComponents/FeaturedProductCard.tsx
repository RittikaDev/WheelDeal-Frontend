import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";

import { useState } from "react";
import { Link } from "react-router-dom";
import { ICar } from "../../types";

interface ICardDataProps {
	data: ICar;
}

const FeaturedProductCard = ({ data }: ICardDataProps) => {
	const { name, category, image, price, stock, status, _id } = data;
	const [hovered, setHovered] = useState(false);

	return (
		<Card
			className="p-4 bg-opacity-10 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<CardHeader className="p-0"></CardHeader>
			<CardContent className="relative overflow-hidden">
				<div className="max-h-44 md:max-h-48 overflow-hidden">
					<img
						className={`transition-transform duration-500 ${
							hovered ? "scale-110" : "scale-100"
						} w-full h-full object-cover`}
						src={image}
						alt={name}
					/>
					{status == "unavailable" && (
						<p className="absolute top-3 left-3 text-sm text-white p-1 px-2 rounded-md bg-red-800">
							Sold Out
						</p>
					)}
				</div>
				{hovered && (
					<div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white bg-black/30">
						<p className="bg-primary/80 text-white rounded-full px-4 py-2">
							Stock: {stock || "N/A"}
						</p>
					</div>
				)}
			</CardContent>

			<div className="space-y-2 mt-3">
				<div className="flex justify-between items-center">
					<p className="text-primary text-xs uppercase">{category}</p>
					<p className="text-primary text-lg font-semibold">BDT {price}</p>
				</div>
				<div className="flex justify-between items-center">
					<h3 className="text-black text-sm md:text-md font-medium">
						{name.slice(0, 30)}
						{name.length > 30 && <span>...</span>}
					</h3>
					<div>
						<Link to={`/products/${_id}`}>
							<Button className="px-3 py-1 text-sm">View Details</Button>
						</Link>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default FeaturedProductCard;
