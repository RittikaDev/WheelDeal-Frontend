import Logo from "../reusableComponents/Logo";
import {
	MapPin,
	Phone,
	Mail,
	Facebook,
	Instagram,
	Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Footer = () => {
	return (
		<footer className="bg-primary/5 bg-opacity-70 border-t border-primary py-10">
			<div className="max-w-7xl mx-auto px-4 md:px-0 grid grid-cols-1 md:grid-cols-4 gap-10">
				{/* Logo Section */}
				<div className="space-y-5 border-b md:border-b-0 md:border-r border-primary pb-10 md:pb-0">
					<Logo />
					<p className="text-lg font-semibold ">
						WheelDeal - Driving Innovation, Building Trust
					</p>
					<p className="text-sm ">© WheelDeal. All rights reserved.</p>
					<ul className="flex gap-5 ">
						<li>
							<Facebook className="hover:text-primary cursor-pointer" />
						</li>
						<li>
							<Instagram className="hover:text-primary cursor-pointer" />
						</li>
						<li>
							<Youtube className="hover:text-primary cursor-pointer" />
						</li>
					</ul>
				</div>

				{/* Information Links */}
				<div className="space-y-5 border-b md:border-b-0 md:border-r border-primary pb-10 md:pb-0">
					<h4 className="text-2xl font-bold ">Quick Access</h4>
					<ul className="space-y-3 text-gray-600">
						<li>
							<Link
								to="/"
								className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								to="/cars"
								className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
							>
								Cars
							</Link>
						</li>
						<li>
							<Link
								to="/about-us"
								className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
							>
								About
							</Link>
						</li>
						<li>
							<Link
								to="/testimonial"
								className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
							>
								Testimonial
							</Link>
						</li>
						<li>
							<Link
								to="/contact-us"
								className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
							>
								Contact
							</Link>
						</li>
					</ul>
				</div>

				{/* Contact Section */}
				<div className="space-y-5 border-b md:border-b-0 md:border-r border-primary pb-10 md:pb-0">
					<h4 className="text-2xl font-bold">Where to Find Us</h4>
					<ul className="space-y-3 text-gray-600">
						<li className="flex gap-3 items-center">
							<MapPin className="text-primary" />
							<span>Dhaka, Bangladesh</span>
						</li>
						<li className="flex gap-3 items-center">
							<Phone className="text-primary" />
							<span>+880-1000-123456</span>
						</li>
						<li className="flex gap-3 items-center">
							<Mail className="text-primary" />
							<span>info@wheelDeal.com</span>
						</li>
					</ul>
				</div>

				{/* Subscribe Section */}
				<div className="space-y-5">
					<h4 className="text-2xl font-bold text-gray-800">Subscribe</h4>
					<p className="text-gray-600">
						Subscribe to receive exclusive offers and updates.
					</p>
					<div className="flex items-center gap-3">
						{/* Replace with your Input component */}
						<input
							type="email"
							placeholder="Enter your email"
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
						/>
						<Button>SUBSCRIBE</Button>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
