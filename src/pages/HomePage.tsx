// import CategorySection from '@/components/homepage/CategorySection';
// import FeaturedProduct from '@/components/homepage/FeaturedProduct';
// import Hero from '@/components/homepage/Hero';

import { useState, useEffect } from "react";
import HeroSection from "../components/Homepage/HeroSection";
import WhatWeOffer from "../components/Homepage/WhatWeOffer";
import WhyChooseUs from "../components/Homepage/WhyChooseUs";
import { useTheme } from "../hooks/useTheme";

import BgImage from "/hero-bg.png";
import Footer from "../components/shared/Footer";
import FeaturedProducts from "../components/Homepage/FeaturedProducts";

// import ImageGallery from '@/components/reusableComponents/ImageGallery';

// import BenefitSection from './../components/homepage/BenefitSection';

const HomePage = () => {
	const { theme } = useTheme(); // Get the current theme from context

	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		if (theme === "system") {
			const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
			const handleChange = (e: any) => {
				setIsDarkMode(e.matches);
			};

			handleChange(mediaQuery); // Initialize on mount
			mediaQuery.addEventListener("change", handleChange);

			return () => mediaQuery.removeEventListener("change", handleChange);
		} else {
			setIsDarkMode(theme === "dark");
		}
	}, [theme]);
	return (
		<>
			<div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
				<div
					className="overflow-x-hidden"
					style={{
						backgroundImage: isDarkMode
							? "linear-gradient(to right, rgb(18, 18, 18), rgb(17 0 44))"
							: `url(${BgImage})`,
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundAttachment: "fixed",
					}}
				>
					<HeroSection />
				</div>
			</div>
			<div className="space-y-20">
				<WhatWeOffer />
				<FeaturedProducts />
				<WhyChooseUs />
				<Footer />

				{/* <Hero />
      <CategorySection />
      <FeaturedProduct />
      <BenefitSection />
      <ImageGallery /> */}
			</div>
		</>
	);
};

export default HomePage;
