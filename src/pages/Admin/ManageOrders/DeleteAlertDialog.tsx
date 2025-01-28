import { TrashIcon } from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import { Button } from "../../../components/ui/button";

interface DeleteAlertDialogProps {
	id: string;
	handleDeleteOrder: (id: string) => void;
}

const DeleteAlertDialog = ({
	id,
	handleDeleteOrder,
}: DeleteAlertDialogProps) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="outline">
					<TrashIcon className="w-5 h-5 text-red-600 hover:text-red-800" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						account.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={() => handleDeleteOrder(id)}>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteAlertDialog;
