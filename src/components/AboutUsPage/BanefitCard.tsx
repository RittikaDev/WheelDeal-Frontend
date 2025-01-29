import React from "react";
import Header from "../reusableComponents/Header";

export interface TBenefit {
	id: number;
	title: string;
	description: string;
	image: string;
}

export interface TBenifitProps {
	benefits: TBenefit[];
}

const BenefitCard = ({ benefits }: TBenifitProps) => {
	const [benefit, setBenefit] = React.useState(benefits[0]);
	const [isActive, setIsActive] = React.useState(benefit.id);

	const handleClick = (benefit: TBenefit) => {
		setBenefit(benefit);
		setIsActive(benefit.id);
	};

	return (
		<div className="md:grid flex flex-col-reverse grid-cols-1 md:grid-cols-3 gap-0">
			{/* Left Section - Text */}
			<div className="flex items-center px-4 md:pr-10">
				<div className="space-y-5 pt-10 md:pt-0">
					<Header header={benefit?.title} />
					<p className="text-justify">{benefit.description}</p>
				</div>
			</div>

			{/* Middle Section - Centered Navigation */}
			<div className="flex flex-col justify-center bg-primary/10 ">
				<ul className="space-y-3 p-10 text-2xl">
					{benefits?.map((benefit) => (
						<li key={benefit.title} className="py-3 border-b-2 text-center">
							<button
								onClick={() => handleClick(benefit)}
								className={`hover:text-primary ${
									benefit.id === isActive ? "text-primary font-semibold" : ""
								}`}
							>
								{benefit.title}
							</button>
						</li>
					))}
				</ul>
			</div>

			{/* Right Section - Image */}
			<div>
				<img
					src={benefit?.image}
					alt={benefit?.title}
					className="w-full h-[600px] object-cover object-center"
				/>
			</div>
		</div>
	);
};

export default BenefitCard;
