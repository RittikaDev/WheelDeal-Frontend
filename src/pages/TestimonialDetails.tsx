// components/Testimonial.tsx
import React from "react";

interface TestimonialItem {
	name: string;
	title: string;
	message: string;
	image?: string;
}

const testimonials: TestimonialItem[] = [
	{
		name: "Sarah Johnson",
		title: "Marketing Manager, ABC Corp",
		message:
			"This platform made our car buying process incredibly smooth and transparent!",
		image: "https://randomuser.me/api/portraits/women/44.jpg",
	},
	{
		name: "James Williams",
		title: "Car Enthusiast",
		message:
			"A great selection and amazing customer service. Highly recommended!",
		image: "https://randomuser.me/api/portraits/men/32.jpg",
	},
	{
		name: "Alicia Brown",
		title: "Fleet Manager, XYZ Logistics",
		message:
			"Professional, reliable, and easy to use. A perfect solution for our company.",
		image: "https://randomuser.me/api/portraits/women/65.jpg",
	},
	{
		name: "Michael Chen",
		title: "Entrepreneur",
		message:
			"I was able to find the perfect electric car for my startup needs. Love the support!",
		image: "https://randomuser.me/api/portraits/men/78.jpg",
	},
	{
		name: "Priya Mehra",
		title: "IT Consultant",
		message:
			"The range of vehicles and filter options made the process quick and stress-free.",
		image: "https://randomuser.me/api/portraits/women/68.jpg",
	},
	{
		name: "David Miller",
		title: "Operations Head, AutoDrive",
		message:
			"Our fleet upgrade was seamless thanks to their bulk buying service and expert advice.",
		image: "https://randomuser.me/api/portraits/men/83.jpg",
	},
	{
		name: "Nina García",
		title: "Freelancer",
		message:
			"Super intuitive interface and reliable information. I’d definitely use this again.",
		image: "https://randomuser.me/api/portraits/women/23.jpg",
	},
	{
		name: "Liam O'Connor",
		title: "Sales Executive",
		message:
			"Great platform for exploring car models before heading to the dealership. Saved me time.",
		image: "https://randomuser.me/api/portraits/men/49.jpg",
	},
	{
		name: "Hassan Al-Farsi",
		title: "Vehicle Importer",
		message:
			"Excellent inventory and clear specifications. This platform has transformed how I source cars.",
		image: "https://randomuser.me/api/portraits/men/25.jpg",
	},
];

const TestimonialDetails: React.FC = () => {
	return (
		<section className="bg-gray-100 py-12 px-4">
			<div className="max-w-6xl mx-auto text-center">
				<h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
				<div className="grid md:grid-cols-3 gap-6">
					{testimonials.map((testimonial, index) => (
						<div
							key={index}
							className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
						>
							{testimonial.image && (
								<img
									src={testimonial.image}
									alt={testimonial.name}
									className="w-16 h-16 mx-auto rounded-full mb-4 object-cover"
								/>
							)}
							<p className="text-gray-700 italic mb-4">
								"{testimonial.message}"
							</p>
							<h4 className="text-lg font-semibold">{testimonial.name}</h4>
							<p className="text-sm text-gray-500">{testimonial.title}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default TestimonialDetails;
