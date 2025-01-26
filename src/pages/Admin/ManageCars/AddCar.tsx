import { useState } from "react";
import axios from "axios";

const AddCar = () => {
	// const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleImageUpload = async (event: any) => {
		const file = event.target.files[0];
		if (file) {
			setLoading(true);

			// Upload image to Cloudinary
			const formData = new FormData();
			formData.append("file", file);
			formData.append("upload_preset", "WheelDeal"); // Set your upload preset here

			try {
				const res = await axios.post(
					`https://api.cloudinary.com/v1_1/dxm5tpw0l/image/upload`,
					formData
				);

				// Get image URL from Cloudinary response
				const imageUrl = res.data.secure_url;
				console.log("Uploaded image URL:", imageUrl);

				// Save this URL to MongoDB (send to your backend)
				// await axios.post("/api/save-product", { imageUrl });
				setLoading(false);
			} catch (err) {
				console.error("Error uploading image", err);
				setLoading(false);
			}
		}
	};
	return (
		<div>
			<input type="file" onChange={handleImageUpload} />
			{loading && <p>Uploading...</p>}
		</div>
	);
};

export default AddCar;
