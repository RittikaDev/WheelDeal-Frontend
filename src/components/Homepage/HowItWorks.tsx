import Header from "../reusableComponents/Header";
import Subheader from "../reusableComponents/SubHeader";

const processSteps = [
	{
		title: "1. Filter & Browse",
		description:
			"Choose your car by filtering through brand, category, or color to find exactly what fits your needs.",
	},
	{
		title: "2. View Car Details",
		description:
			"See in-depth details of your selected car including specifications, features, and more.",
	},
	{
		title: "3. Add to Cart",
		description:
			"Add your favorite cars to the cart to review or compare later before proceeding.",
	},
	{
		title: "4. Checkout & Pay",
		description:
			"Securely checkout using ShurjoPay, Bangladesh’s trusted payment gateway.",
	},
];

const HowItWorks = () => {
	return (
		<section className="max-w-6xl mx-auto py-24 px-4">
			<div className="text-center space-y-1.5 px-2 md:px-0 pb-8">
				<Header
					header={
						"Follow these simple steps to find and purchase your ideal car."
					}
				/>
				<Subheader className="text-center" heading={"How It Works"} />
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
				{processSteps.map((step, index) => (
					<div
						key={index}
						className="border border-primary bg-card text-card-foreground dark:bg-zinc-800 
								hover:bg-primary hover:text-white hover:border-white 
								transition-all duration-200 p-6 rounded-xl shadow-sm text-center"
					>
						<h3 className="text-xl font-semibold mb-2">{step.title}</h3>
						<p className="text-sm">{step.description}</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default HowItWorks;
