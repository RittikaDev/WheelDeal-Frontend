import { ChartBarIcon } from "lucide-react";
import { motion } from "motion/react";
import { SlideLeft } from "../../utils/animation";
// import { useTheme } from "../../hooks/useTheme";

const OfferData = [
	{
		id: 1,
		title: "Lorem ipsum dolor sit amet",
		desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugitdolores inventore, maxime voluptates modi nisi?",
		icon: <ChartBarIcon className="opacity-0" size={24} />,
		delay: 0.3,
	},
	{
		id: 2,
		title: "Lorem ipsum dolor sit amet",
		desc: "Lorem  amet consectetur adipisicing elit. Fugitdolores inventore, maxime voluptates modi nisi?",
		icon: <ChartBarIcon className="opacity-0" size={24} />,
		delay: 0.3,
	},
	{
		id: 3,
		title: "Lorem ipsum dolor sit amet",
		desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ?",
		icon: <ChartBarIcon className="opacity-0" size={24} />,
		delay: 0.3,
	},
];

const WhatWeOffer = () => {
	return (
		<div className="max-w-7xl mx-auto py-24">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
				<div className="space-y-4 p-6">
					<h1 className="text-3xl md:text-4xl font-bold">What We Offer You</h1>
					<p className="text-grey-500">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
						dolores inventore, maxime voluptates modi nisi?
					</p>
				</div>
				{OfferData.map((item) => {
					return (
						<motion.div
							variants={SlideLeft(item.delay)}
							initial="hidden"
							whileInView="visible"
							className="space-y-4 p-6 bg-[#fbfbfb] dark:bg-gray-800 hover:bg-white dark:hover:bg-slate-900 rounded-xl hover:shadow-[0_0_22px_0_rgba(0,0,0,0.15)]"
							key={item.id}
						>
							<div className="text-4xl">{item.icon}</div>
							<p className="text-2xl font-semibold">{item.title}</p>
							<p className="text-grey-500">{item.desc}</p>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
};

export default WhatWeOffer;
