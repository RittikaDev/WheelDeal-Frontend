import "../../lib/css/FlipCard.css";

export interface TAboutItem {
	key: number;
	empImage: string;
	designation: string;
	empName: string;
	icon: JSX.Element;
	quote?: string; // New property for a short quote
}

interface FlipCardProps {
	item: TAboutItem;
}

const FlipCard = ({ item }: FlipCardProps) => {
	return (
		<div className="group relative w-full h-[420px] perspective">
			<div className="relative w-full h-full transform-style-3d transition-transform duration-700 ease-in-out group-hover:rotate-y-180">
				{/* Front side */}
				<div className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl border border-yellow-300 dark:border-gray-800 bg-white/10 backdrop-blur-lg">
					<img
						className="object-cover h-full w-full transition-opacity duration-300 group-hover:opacity-80"
						src={item.empImage}
						alt=""
					/>
				</div>

				{/* Back side */}
				<div className="absolute inset-0 flex flex-col items-center justify-center text-center rounded-2xl border border-yellow-400 dark:border-gray-700 bg-gradient-to-br from-yellow-100 to-yellow-300 dark:from-gray-800 dark:to-gray-900 p-6 shadow-2xl transform rotate-y-180 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
					<p className="text-yellow-600 dark:text-primary text-5xl drop-shadow-md">
						{item.icon}
					</p>
					<h3 className="font-extrabold text-2xl mt-3 text-yellow-700 dark:text-gray-200">
						{item.empName}
					</h3>
					<p className="text-sm font-medium mt-2 text-yellow-800 dark:text-gray-300">
						{item.designation}
					</p>
					{item.quote && (
						<p className="mt-4 text-xs italic text-yellow-600 dark:text-gray-400">
							“{item.quote}”
						</p>
					)}
				</div>
			</div>

			{/* Glow Effect */}
			<div className="absolute inset-0 rounded-2xl border border-transparent transition-all duration-300 group-hover:border-yellow-400 dark:group-hover:border-primary group-hover:shadow-[0px_0px_15px_5px_rgba(255,215,0,0.5)] dark:group-hover:shadow-[0px_0px_15px_5px_rgba(59,130,246,0.5)]"></div>
		</div>
	);
};

export default FlipCard;
