import Marquee from "react-fast-marquee";
import { useTheme } from "../../hooks/useTheme";
import Header from "../reusableComponents/Header";
import Subheader from "../reusableComponents/SubHeader";
import { useGetCarBrandCatModelQuery } from "../../redux/features/cars/carApi";

const brandLogoMap: { [key: string]: string } = {
	Tesla:
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkcUsRoWQXiuSTYd62e8jFxCoDUoO3CbigoQ&s",
	BMW: "https://i.ibb.co.com/Kj1c6WZ/bmw.png",
	Chevrolet:
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLdpO9foQSpbs6ttn9Y1EdmxvEY9zekXkfNg&s",
	Audi: "https://i.ibb.co.com/zNLFL3w/audi.png",
	Ford: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKmKs_cw0wfgO6vQLLlG9hg0DNWVopHG1gQA&s",
	Toyota:
		"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cleanpng.com%2Fpng-toyota-prius-car-ford-motor-company-gander-toyota-6814436%2F&psig=AOvVaw3FakSbuTH4hdYmhoVGCWyL&ust=1748149798647000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLimto-su40DFQAAAAAdAAAAABAE",
	Nissan: "https://i.ibb.co.com/Bz4y7gd/nissan.png",
	Mazda: "https://i.ibb.co.com/MftzfQC/mazda.png",
	Volkswagen: "https://i.ibb.co.com/B221DKf/volkswagen.png",
	Porsche:
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1wbwhEpH5gQtmejCDN7iLBndJxAb3fja9SA&s",
};

const defaultLogo = "https://i.ibb.co.com/1QnQh7t/toyota.png";

const Brands = () => {
	const { theme } = useTheme();
	const { data: getBrands, isSuccess } = useGetCarBrandCatModelQuery(undefined);

	let brandNames: string[] = [];

	if (isSuccess && getBrands?.data) {
		brandNames = [...new Set(getBrands.data.map((b: any) => b.brand))];
	}

	return (
		<section className="max-w-7xl mx-auto py-24">
			<div className="container">
				<div className="text-center space-y-1.5 px-2 md:px-0">
					<Header header={"Brands"} />
					<Subheader className="text-center" heading={"Brands We Work With"} />
				</div>

				{/* First Marquee */}
				<Marquee
					speed={40}
					autoFill
					pauseOnHover
					gradient={true}
					gradientColor={theme === "light" ? "#f8f8f8" : "#161312"}
				>
					{brandNames.map((brand) => (
						<div
							key={brand}
							className="flex flex-col justify-center items-center m-2 lg:m-4 cursor-pointer"
						>
							<img
								className="object-contain w-48 h-20"
								src={brandLogoMap[brand] || defaultLogo}
								onError={(e) => {
									(e.currentTarget as HTMLImageElement).src = defaultLogo;
								}}
								alt={brand}
							/>
							<span className="text-sm mt-2">{brand}</span>
						</div>
					))}
				</Marquee>

				{/* Second Marquee - reverse */}
				<Marquee
					speed={30}
					className="mt-14"
					direction="right"
					autoFill
					pauseOnHover
					gradient={true}
					gradientColor={theme === "light" ? "#f8f8f8" : "#161312"}
				>
					{brandNames.map((brand) => (
						<div
							key={brand + "_2"}
							className="flex flex-col justify-center items-center m-2 lg:m-4 cursor-pointer"
						>
							<img
								className="object-contain w-48 h-20"
								src={brandLogoMap[brand] || defaultLogo}
								onError={(e) => {
									(e.currentTarget as HTMLImageElement).src = defaultLogo;
								}}
								alt={brand}
							/>
							<span className="text-sm mt-2">{brand}</span>
						</div>
					))}
				</Marquee>
			</div>
		</section>
	);
};

export default Brands;
