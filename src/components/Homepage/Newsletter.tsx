/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLocation } from "react-router-dom";
import { useGetNewslettersQuery } from "../../redux/features/newsletter/newsletter.api";
import Subheader from "../reusableComponents/SubHeader";
import { Button } from "../ui/button";
import Header from "../reusableComponents/Header";

export default function NewsLetter() {
	const { pathname } = useLocation();
	const isFullPage = pathname === "/newsletter";

	const {
		data: newsletters,
		isLoading,
		isError,
	} = useGetNewslettersQuery(null);

	if (isLoading)
		return (
			<p className="text-center text-yellow-600 font-semibold mt-10">
				Loading newsletters...
			</p>
		);

	if (isError)
		return (
			<p className="text-center text-red-600 font-semibold mt-10">
				Failed to load newsletters.
			</p>
		);

	const allNewsletters = newsletters.data ?? [];
	const displayNewsletters = isFullPage
		? allNewsletters
		: allNewsletters.slice(0, 3);

	return (
		<section className="py-24 max-w-6xl mx-auto px-6">
			<div className="text-center mb-10">
				<Header header={"Stay informed with our latest updates and insights"} />
				<Subheader className="text-center" heading={"Latest Newsletters"} />
			</div>

			<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
				{displayNewsletters.map((nl: any) => (
					<li
						key={nl._id}
						className="bg-white rounded-xl shadow-md hover:shadow-yellow-400 transition-shadow duration-300 p-6 border border-yellow-100 hover:scale-[1.02] transform transition-transform"
					>
						<div>
							<h3 className="text-xl font-semibold text-yellow-600 mb-2">
								{nl.title}
							</h3>
							<p
								className="text-gray-700 text-sm mb-3 leading-relaxed line-clamp-4"
								style={{
									WebkitLineClamp: 4,
									display: "-webkit-box",
									WebkitBoxOrient: "vertical",
									overflow: "hidden",
								}}
							>
								{nl.content}
							</p>
						</div>
						<small className="text-gray-400 text-xs italic block mt-auto text-right">
							{new Date(nl.createdAt).toLocaleDateString()}
						</small>
					</li>
				))}
			</ul>

			{/* Show "Read More" button only if not already on /newsletter page */}
			{!isFullPage && (
				<div className="flex justify-center my-10">
					<Link to="/newsletter">
						<Button>Read More &raquo;</Button>
					</Link>
				</div>
			)}
		</section>
	);
}
