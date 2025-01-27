import { toast } from "sonner";

// Reusable Toast component
const ShowToast = (message: string, backgroundColor: string) => {
	toast.success(message, {
		duration: 2000,
		position: "top-right",
		style: {
			backgroundColor: backgroundColor,
			color: "#fff", // White text color
			borderRadius: "8px", // Rounded corners
			padding: "10px", // Padding inside the toast
		},
	});
};

export default ShowToast;
