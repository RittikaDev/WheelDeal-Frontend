import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

import Subheader from "../components/reusableComponents/SubHeader";
import FlipCard from "../components/AboutUsPage/FlipCard";
import { teamDetails } from "../components/AboutUsPage/AboutPageStatic";
import BenefitSection from "../components/AboutUsPage/BenefitSection";
import Header from "../components/reusableComponents/Header";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Separator } from "../components/ui/separator";

const AboutUs = () => {
	return (
		<div>
			<div className="text-center my-10">
				<Header header={"Driving Innovation, Building Trust"} />
				<Separator className="bg-primary h-1 w-1/5 mx-auto mt-4" />

				{/* <Subheader
					className="text-center"
					heading={"Our journey, our passion, your satisfaction"}
				/> */}
			</div>

			<div className="max-w-7xl mx-auto">
				{/* WE ENDURE IN EVERY STAGES */}
				<div className="min-h-[550px] md:flex px-6 py-12 md:py-0 md:px-0 gap-12 items-center ">
					<div className="w-full md:w-2/3 space-y-6">
						<Header header={"Your Journey, Our Expertise"} />
						<p className="text-justify text-lg text-gray-700 dark:text-gray-100 leading-relaxed">
							Every car tells a story, and we’re here to make yours
							unforgettable. With a commitment to quality, performance, and
							style, we bring you the best in automotive excellence. From
							precision tuning to expert repairs, we ensure that every ride is
							smooth, powerful, and reliable.
							<br />
							<br />
							At our shop, passion meets precision. Whether you're looking for a
							performance boost, a sleek upgrade, or trusted maintenance, we’ve
							got you covered. We believe every vehicle deserves expert care,
							and every driver deserves confidence on the road.
						</p>
					</div>
					<div className="border-l-4 border-l-primary min-h-40 p-8 space-y-6 bg-white dark:bg-gray-500 shadow-lg rounded-lg w-full md:w-1/3">
						<p className="text-lg text-gray-800 dark:text-gray-100 italic">
							"Cars are more than just machines—they’re a statement of style,
							power, and adventure. Our dedication to excellence drives us to
							provide top-tier service, ensuring every vehicle runs at its
							best."
						</p>
						<p className="font-semibold text-gray-900 dark:text-gray-100">
							Barry Hanry - Founder
						</p>
					</div>
				</div>

				{/* benfit section  */}
				<BenefitSection />

				{/* team introduction  */}
				<div className="py-20 ">
					<Subheader
						className="text-center py-6"
						heading={"TEAM OF EXPERT COACHES"}
					/>

					<p className="max-w-5xl px-4 md:px-0 py-4 text-center mx-auto">
						At our core, we believe in the power of unity and teamwork. As a
						fitness team, we push each other to reach new heights, celebrate
						each victory, and tackle every challenge head-on. Together, we
						strive for greatness, knowing that our combined strength and support
						make us unstoppable. With every workout, we grow stronger, fitter,
						and more resilient, embodying the spirit of perseverance and
						camaraderie. Join us and unleash your potential, because together,
						we are stronger.
					</p>
					<div className="grid grid-cols-4 py-10 ">
						{teamDetails.map((item) => (
							<FlipCard item={item} key={item.key} />
						))}
					</div>
				</div>

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
								<a
									href="mailto:contact@ourcompany.com"
									className="text-blue-600"
								>
									contact@ourcompany.com
								</a>
							</li>
							<li>
								<strong>Operating Hours:</strong> Monday - Friday, 9:00 AM -
								6:00 PM
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
		</div>
	);
};

export default AboutUs;
