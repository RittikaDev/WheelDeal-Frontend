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
						ZfitX - Empowering Your Fitness Journey
					</p>
					<p className="text-sm ">© 2024 ZfitX. All rights reserved.</p>
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
					<h4 className="text-2xl font-bold ">Information</h4>
					<ul className="space-y-3 text-gray-600">
						<li>
							<Link
								to="/product-management"
								className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
							>
								Dashboard
							</Link>
						</li>
						<li>
							<Link
								to="/orders"
								className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
							>
								Order Status
							</Link>
						</li>
						<li>
							<Link
								to="/about-us"
								className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
							>
								About Us
							</Link>
						</li>
						<li>
							<Link
								to="/"
								className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
							>
								Privacy Policy
							</Link>
						</li>
					</ul>
				</div>

				{/* Contact Section */}
				<div className="space-y-5 border-b md:border-b-0 md:border-r border-primary pb-10 md:pb-0">
					<h4 className="text-2xl font-bold ">Contact Us</h4>
					<ul className="space-y-3 text-gray-600">
						<li className="flex gap-3 items-center">
							<MapPin className="text-primary" />
							<span>Dhaka, Bangladesh</span>
						</li>
						<li className="flex gap-3 items-center">
							<Phone className="text-primary" />
							<span>+880-1614-123456</span>
						</li>
						<li className="flex gap-3 items-center">
							<Mail className="text-primary" />
							<span>info@zfitx.com</span>
						</li>
					</ul>
				</div>

				{/* Subscribe Section */}
				<div className="space-y-5">
					<h4 className="text-2xl font-bold text-gray-800">Subscribe Us</h4>
					<p className="text-gray-600">
						Subscribe to our mailbox to receive exclusive offers and updates.
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
					<div className="flex items-center justify-between pt-5">
						<p>We accept only</p>
						<img
							className="h-10"
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png"
							alt="Stripe Logo"
						/>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
