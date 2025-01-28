import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../../../components/ui/dialog";

import { Edit } from "lucide-react";

import { ICar } from "../../../types";
import UpdateCar from "./UpdateCars";

interface TEditProductProps {
	product: ICar;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	toast: any;
}

const EditCarModal = ({ product }: TEditProductProps) => {
	// const { name, description, category, image, price, stock, _id } = product;

	// usePageRefreshWaring(
	// 	isEditing,
	// 	"Are you sure you want to leave? Your changes may not be saved."
	// );

	return (
		<Dialog>
			<DialogTrigger>
				<button className="flex hover:text-primary gap-2 items-center ">
					{" "}
					<Edit /> Edit{" "}
				</button>
			</DialogTrigger>
			<DialogContent className="max-w-5xl mx-auto">
				<DialogHeader>
					<DialogTitle className="text-2xl">Edit Product</DialogTitle>
					<DialogDescription className="py-5 overflow-x-auto flex flex-col justify-between h-[80vh]">
						<UpdateCar car={product} />
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default EditCarModal;
