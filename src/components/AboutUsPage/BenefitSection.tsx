import Subheader from "../reusableComponents/SubHeader";
import BenefitCard from "./BanefitCard";

const BenefitSection = () => {
	const benefits = [
		{
			id: 1,
			title: "Premium Quality & Durability",
			description:
				"Our products are built with top-tier materials, ensuring long-lasting performance and reliability. Designed to handle the toughest conditions, they provide unmatched durability.",
			image:
				"https://img.freepik.com/free-photo/back-red-lights-red-sport-car_114579-4395.jpg",
		},
		{
			id: 2,
			title: "Ergonomic & User-Friendly",
			description:
				"Designed with comfort in mind, our products feature intuitive designs that enhance usability and prevent strain. Experience effortless functionality with every use.",
			image:
				"https://img.freepik.com/free-photo/3d-car-with-vibrant-colors_23-2150797028.jpg",
		},
		{
			id: 3,
			title: "Diverse Selection",
			description:
				"From cutting-edge tech to classic essentials, we offer a wide range of products to fit every lifestyle. Whether you're a professional or an enthusiast, we have something for you.",
			image:
				"https://img.freepik.com/free-photo/3d-car-with-vibrant-colors_23-2150796964.jpg",
		},
		{
			id: 4,
			title: "Competitive Pricing",
			description:
				"We believe in affordability without compromise. Enjoy premium products at reasonable prices, making quality accessible to everyone.",
			image:
				"https://img.freepik.com/free-photo/3d-car-vibrant-city-night_23-2150796936.jpg",
		},
		{
			id: 5,
			title: "Expert Support & Guidance",
			description:
				"Our dedicated team is always ready to assist you. Whether you need product recommendations or technical support, we're here to help.",
			image:
				"https://img.freepik.com/free-photo/3d-car-city-street_23-2150796864.jpg",
		},
	];

	return (
		<div className="container mt-10 mx-auto">
			<Subheader className="text-center" heading={"Why Choose Us?"} />

			<div className="mt-14">
				<BenefitCard benefits={benefits} />
			</div>
		</div>
	);
};

export default BenefitSection;
