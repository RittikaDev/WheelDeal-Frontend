import { ArrowLeft, Car } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const NotFoundPage = () => {
	return (
		<section className="flex flex-col h-screen items-center justify-center bg-gray-100">
			<div className="text-center space-y-6 p-6 bg-white rounded-xl shadow-lg">
				<Car className="w-16 h-16 text-red-500 mx-auto" />
				<h1 className="text-4xl font-bold tracking-tighter text-gray-900">
					🚧 404 - Wrong Turn Ahead! 🚧
				</h1>
				<p className="text-gray-600 max-w-md mx-auto">
					Looks like you missed the exit! Don't worry, our GPS recalculating...
					or you can just hit the button below and drive back home.
				</p>

				<div className="flex items-center justify-center">
					<div>
						<p className="text-sm text-gray-500 my-4">
							Your car needs a new destination:
						</p>
						<div className="flex flex-col gap-4 min-[400px]:flex-row justify-center items-center">
							<Link to="/">
								<Button>
									<ArrowLeft className="mr-2 h-4 w-4" />
									<span>Return Home</span>
								</Button>
							</Link>

							<Link to="/cars">
								<Button variant="outline">Browse Our Garage</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default NotFoundPage;
