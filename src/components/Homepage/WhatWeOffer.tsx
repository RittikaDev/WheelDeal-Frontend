import { motion } from "motion/react";
import { SlideLeft } from "../../utils/animation";

const OfferData = [
	{
		id: 1,
		title: "Car Maintenance & Repairs",
		desc: "Get your vehicle serviced with the best auto repair professionals. From oil changes to brake services, we’ve got you covered.",
		delay: 0.3,
	},
	{
		id: 2,
		title: "New & Used Car Sales",
		desc: "Browse our wide selection of new and certified pre-owned vehicles. Find your perfect car at a great price.",
		delay: 0.3,
	},
	{
		id: 3,
		title: "Car Accessories & Parts",
		desc: "From floor mats to custom rims, we offer a variety of car accessories to suit every need and style.",
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
						At our car shop, we provide a comprehensive range of services to
						ensure your vehicle stays in top condition. From routine maintenance
						to major repairs, our team of skilled professionals is here to help.
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
