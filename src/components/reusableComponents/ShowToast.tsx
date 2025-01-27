import { toast } from "sonner";

// Reusable Toast component
// const ShowToast = (message: string, backgroundColor: string) => {
// 	toast.success(message, {
// 		duration: 2000,
// 		position: "top-right",
// 		style: {
// 			backgroundColor: backgroundColor,
// 			color: "#fff", // White text color
// 			borderRadius: "8px", // Rounded corners
// 			padding: "10px", // Padding inside the toast
// 		},
// 	});
// };

const ShowToast = (
  message: string,
  backgroundColor: string,
  type: "success" | "error" | "loading",
  toastId?: string | number
) => {
  const toastOptions = {
    duration: 2000,
    id: toastId ? toastId : "",
    position: "top-right" as const,
    style: {
      backgroundColor: backgroundColor,
      color: "#fff",
      borderRadius: "8px",
      padding: "10px",
    },
  };

  let id: string | number = "";

  if (type === "success") toast.success(message, toastOptions);
  else if (type === "error") toast.error(message, toastOptions);
  else if (type === "loading") {
    id = toast.loading(message, toastOptions);
  }
  return id;
};

export default ShowToast;
