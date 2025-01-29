import HeroImg from "/wheelDeal-logo-banner.png";

import { motion } from "motion/react";
import { DriveFromRight, SlideRight } from "../../utils/animation";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { Button } from "../ui/button";

const HeroSection = () => {
	return (
		<section>
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 min-h-screen relative">
				{/* BRAND INFO */}
				<div className="flex flex-col justify-center py-14 md:py-0">
					<div className="text-center md:text-left spacy-y-6">
						<motion.h1
							variants={SlideRight(0.6)}
							initial="hidden"
							animate="visible"
							className="text-5xl lg:text-6xl font-bold leading-relaxed xl:leading-normal"
						>
							Drive the Future with{" "}
							<span className="text-primary">WheelDeal</span>
						</motion.h1>
						<motion.p
							variants={SlideRight(1.2)}
							initial="hidden"
							animate="visible"
							className="text-grey-600 xl:max-w-[500px]"
						>
							Find the perfect ride at unbeatable prices. Whether you're looking
							for speed, comfort, or efficiency – we’ve got you covered!
						</motion.p>
					</div>
					{/* BUTTON SECTION */}
					<motion.div
						variants={SlideRight(1.5)}
						initial="hidden"
						animate="visible"
						className="flex justify-center gap-8 md:justify-start"
					>
						<Link to="/cars">
							<button className="primary-btn flex items-center gap-2 mt-4">
								Order Now
							</button>
						</Link>
						<a
							href="https://www.youtube.com/watch?v=8cUL_EkO7mU"
							target="_blank"
							rel="noopener noreferrer"
						>
							{/* <button className="flex justify-center items-center gap-2 my-6 ">
								<Play className="text-primary" /> Watch Our Collection
							</button> */}
							<Button size={"lg"} variant="outline" className="mt-5">
								<Play className="text-red-600" />
								Watch Now
							</Button>
						</a>
					</motion.div>
				</div>
				{/* HERO IMAGE */}
				<motion.div
					variants={DriveFromRight(1.6)} // Apply the driving animation
					initial="hidden"
					animate="visible"
					className="flex justify-center items-center"
				>
					<img
						src={HeroImg}
						alt=""
						className="w-[350px] md:w-[550px] xl:w-[700px]"
					/>
				</motion.div>
			</div>
		</section>
	);
};

export default HeroSection;
