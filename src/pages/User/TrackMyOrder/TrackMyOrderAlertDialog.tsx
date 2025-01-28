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

import { XCircleIcon } from "lucide-react";

interface ITrackMyOrderAlertDialog {
  cancelMyOrder: (orderId: string) => Promise<void>;
  status: string;
  orderId: string;
}

const TrackMyOrderAlertDialog = ({
  cancelMyOrder,
  status,
  orderId,
}: ITrackMyOrderAlertDialog) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          title="Cancel booking"
          disabled={status !== "Pending"}
          variant="outline"
          size="icon"
          className="text-red-500 duration-200 transition-all hover:bg-red-500 hover:text-white rounded-full"
        >
          <XCircleIcon size={20} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Your booking will be cancelled
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => cancelMyOrder(orderId)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TrackMyOrderAlertDialog;
