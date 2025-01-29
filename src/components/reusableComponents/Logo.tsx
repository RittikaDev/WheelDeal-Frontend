// import { Link } from "react-router-dom";

const Logo = () => {
	return (
		// <Link to="/">
		<div className="flex items-center gap-1">
			<img className="w-10" src="/wheelDeal-logo.png" alt="zfitx-logo" />
			<h1 className="text-3xl">
				<span className="font-bold text-primary">W</span>heel
				<span className="text-primary">Deal</span>{" "}
			</h1>
		</div>
		// </Link>
	);
};

export default Logo;
