import Header from "../components/reusableComponents/Header";
import Subheader from "../components/reusableComponents/SubHeader";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Facebook, Instagram, Twitter } from "lucide-react";

const ContactUs = () => {
	return (
		<div className="max-w-7xl mx-auto my-10">
			{/* JOIN US FROM  */}
			<Subheader className="text-center" heading={"Contact us"} />
			<div className="grid md:grid-cols-2  py-8 justify-between">
				<div>
					<Header header={"We’d Love to Hear From You!"} />
					<p className="text-gray-700 dark:text-gray-300">
						Got any questions? We're here to help! Reach out to us using the
						contact information below.
					</p>

					<ul className="space-y-2 text-gray-700 dark:text-gray-300">
						<li>
							<strong>Address:</strong> 251, Main Street, Suite 101, Downtown,
							Brooklyn, TX 2012
						</li>
						<li>
							<strong>City:</strong> Brooklyn, TX, USA
						</li>
						<li>
							<strong>Phone:</strong> (123) 456-7890
						</li>
						<li>
							<strong>Email:</strong>{" "}
							<a href="mailto:contact@ourcompany.com" className="text-blue-600">
								contact@ourcompany.com
							</a>
						</li>
						<li>
							<strong>Operating Hours:</strong> Monday - Friday, 9:00 AM - 6:00
							PM
						</li>
						<li className="flex space-x-5">
							<strong>Social Media:</strong>
							<a
								href="https://www.instagram.com/ourcompany"
								className="text-rose-700"
							>
								<Instagram />
							</a>
							<a
								href="https://www.facebook.com/ourcompany"
								className="text-blue-900 "
							>
								<Facebook />
							</a>
							<a
								href="https://www.twitter.com/ourcompany"
								className="text-sky-700"
							>
								<Twitter />
							</a>
						</li>
					</ul>
				</div>

				<div>
					<form
						className="space-y-3 px-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md"
						action=""
					>
						<div className="flex flex-col md:flex-row gap-2 items-center">
							<Input
								type="text"
								placeholder="Full Name"
								className="w-full md:w-1/2"
							/>
							<Input
								type="email"
								placeholder="Email Address"
								className="w-full md:w-1/2"
							/>
						</div>
						<Input type="text" placeholder="Subject" className="w-full" />
						<Textarea placeholder="Your Message" className="w-full" />

						<div className="flex justify-end">
							<Button className="bg-primary text-white hover:bg-yellow-600 px-5 py-2 rounded-md">
								Send
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ContactUs;
