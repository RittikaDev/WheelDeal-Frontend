const WhyChooseUs = () => {
	return (
		<section className="py-16 px-6 ">
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-12">
				{/* Left Section */}
				<div className="text-center md:text-left">
					<h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100">
						Why Choose Us
					</h2>
					<p className="text-lg mb-4 text-gray-600 dark:text-gray-300">
						For over a decade, we've been a proud service provider, earning and
						maintaining the trust of the community..
					</p>
					<div className="flex gap-6 justify-center md:justify-start">
						<a
							href="#call"
							className="text-red-600 dark:text-red-400 font-medium text-lg hover:underline"
						>
							Call Now
						</a>
						<a
							href="#estimate"
							className="text-red-600 dark:text-red-400 font-medium text-lg hover:underline"
						>
							Book Free Estimate
						</a>
					</div>
				</div>

				{/* Vertical Line Separator */}
				<div className="hidden md:block w-[2px] bg-gray-300 dark:bg-gray-700 h-full mx-auto"></div>

				{/* Right Section with Boxes */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-6">
					{/* Box 1 */}
					<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm transform translate-y-12">
						<div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-500 rounded-full p-3 mb-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-6 h-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 8v4m0 0v4m0-4h4m-4 0H8m-5 7h14a2 2 0 002-2V7a2 2 0 00-2-2H3a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
						</div>
						<h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
							Competitive Pricing
						</h3>
						<p className="text-gray-600 dark:text-gray-300 mt-2">
							Experience quality without breaking the bank—we offer fair and
							competitive pricing.
						</p>
					</div>

					{/* Box 2 */}
					<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm transform translate-y-2">
						<div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-500 rounded-full p-3 mb-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-6 h-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 8v4m0 0v4m0-4h4m-4 0H8m-5 7h14a2 2 0 002-2V7a2 2 0 00-2-2H3a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
						</div>
						<h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
							Easy Financing
						</h3>
						<p className="text-gray-600 dark:text-gray-300 mt-2">
							Don't let budget constraints stop you—explore our hassle-free
							financing options.
						</p>
					</div>

					{/* Horizontal Divider between top and bottom boxes */}
					<div className="hidden sm:block col-span-2 h-[2px] bg-gray-300 dark:bg-gray-700 mx-auto"></div>

					{/* Box 3 */}
					<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm transform -translate-y-2">
						<div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-500 rounded-full p-3 mb-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-6 h-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 8v4m0 0v4m0-4h4m-4 0H8m-5 7h14a2 2 0 002-2V7a2 2 0 00-2-2H3a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
						</div>
						<h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
							Certified Experts
						</h3>
						<p className="text-gray-600 dark:text-gray-300 mt-2">
							Choose WheelDeal for proven excellence backed by certified
							professionals.
						</p>
					</div>

					{/* Box 4 */}
					<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm transform -translate-y-12">
						<div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-500 rounded-full p-3 mb-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-6 h-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 8v4m0 0v4m0-4h4m-4 0H8m-5 7h14a2 2 0 002-2V7a2 2 0 00-2-2H3a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
						</div>
						<h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
							100% Satisfaction
						</h3>
						<p className="text-gray-600 dark:text-gray-300 mt-2">
							Don’t just take our word for it—see what homeowners of Saskatoon
							say about WheelDeal.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default WhyChooseUs;
