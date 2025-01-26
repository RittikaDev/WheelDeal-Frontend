import Logo from "../reusableComponents/Logo";

const LoadingPage = () => {
	return (
		<div className="flex justify-center items-center h-screen">
			<div>
				<div className="flex  justify-center  items-center">
					<img
						className="w-[20rem] relative md:w-full"
						src="https://media.tenor.com/a50iRmlJ_dEAAAAi/convertible-driving.gif"
						alt=""
					/>
					<div className="animate-pulse absolute md:right-96 md:top-24 2xl:top-60 2xl:right-[700px] top-80 right-14">
						<Logo />
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoadingPage;
