import { useState } from "react";
import axios from "axios";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import {
	Card,
	CardHeader,
	CardContent,
	CardFooter,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import Header from "../../../components/reusableComponents/Header";
import {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
} from "../../../components/ui/tabs";
import { useCreateProductMutation } from "../../../redux/features/cars/carApi";
import ShowToast from "../../../components/reusableComponents/ShowToast";

const AddCar = () => {
	const [carData, setCarData] = useState<{
		name: string;
		description: string;
		brand: string;
		model: string;
		type: string;
		category: string;
		year: number;
		price: number;
		rating: number;
		color: string;
		seatCapacity: number;
		isElectric: boolean;
		features: string[];
		transmission: string;
		status: string;
		stock: number;
		image: string;
		moreImages: string[];
	}>({
		name: "",
		description: "",
		brand: "",
		model: "",
		type: "",
		category: "",
		year: 0,
		price: 0,
		rating: 0,
		color: "",
		seatCapacity: 0,
		isElectric: false,
		features: [],
		transmission: "automatic",
		status: "available",
		stock: 0,
		image: "",
		moreImages: [],
	});

	const [loading, setLoading] = useState(false);

	const handleInputChange = (e: any) => {
		const { name, value, type, checked } = e.target;

		if (type === "checkbox") setCarData({ ...carData, [name]: checked });
		else setCarData({ ...carData, [name]: value });
	};

	const [createProduct] = useCreateProductMutation();

	const handleImageUpload = async (event: any) => {
		const file = event.target.files[0];
		if (file) {
			setLoading(true);
			const formData = new FormData();
			formData.append("file", file);
			formData.append("upload_preset", "WheelDeal");

			try {
				const res = await axios.post(
					`https://api.cloudinary.com/v1_1/dxm5tpw0l/image/upload`,
					formData
				);
				const imageUrl = res.data.secure_url;
				setCarData({ ...carData, image: imageUrl });
				setLoading(false);
			} catch (err) {
				console.error("Error uploading image", err);
				setLoading(false);
			}
		}
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const toastId = ShowToast("Adding...", "#ffdf20", "loading");
		setLoading(true);
		try {
			const updatedCarData = {
				...carData,
				year: Number(carData.year),
				seatCapacity: Number(carData.seatCapacity),
				stock: Number(carData.stock),
			};

			const result = await createProduct(updatedCarData);
			console.log(result);
			ShowToast("Car created successfully:", "#4CAF50", "success", toastId);
			setLoading(false);
		} catch (err) {
			console.log(err);
			ShowToast("Failed to add", "#b71c1c", "error", toastId);
			setLoading(false);
		}
	};

	return (
		<div className=" bg-white shadow-lg rounded-lg">
			<Card>
				<CardHeader>
					<div className="text-center space-y-1.5 px-2 md:px-0">
						<Header header={"Add New Car"} />
						<p>Add new car details here.</p>
					</div>
				</CardHeader>

				<CardContent>
					<Tabs defaultValue="basic-details">
						<TabsList className="flex flex-wrap justify-center gap-3 mb-8 overflow-x-auto">
							<TabsTrigger value="basic-details">Basic Details</TabsTrigger>
							<TabsTrigger value="pricing">Pricing & Availability</TabsTrigger>
							<TabsTrigger value="images">Images</TabsTrigger>
							<TabsTrigger value="features">Features</TabsTrigger>
						</TabsList>

						<TabsContent value="basic-details">
							<div className="space-y-4">
								{/* Car Name & Description */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
									<div className="space-y-1">
										<Label htmlFor="name">Car Name</Label>
										<Input
											id="name"
											name="name"
											value={carData.name}
											onChange={handleInputChange}
											placeholder="Car Name"
										/>
									</div>
									<div className="space-y-1">
										<Label htmlFor="description">Description</Label>
										<Input
											id="description"
											name="description"
											value={carData.description}
											onChange={handleInputChange}
											placeholder="Description"
										/>
									</div>
									<div className="space-y-1">
										<Label htmlFor="description">Rating</Label>
										<Input
											id="rating"
											name="rating"
											value={carData.rating}
											onChange={handleInputChange}
											placeholder="Rating"
										/>
									</div>
								</div>

								{/* Brand, Model, and Type */}
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									<div className="space-y-1">
										<Label htmlFor="brand">Brand</Label>
										<Input
											id="brand"
											name="brand"
											value={carData.brand}
											onChange={handleInputChange}
											placeholder="Brand"
										/>
									</div>
									<div className="space-y-1">
										<Label htmlFor="model">Model</Label>
										<Input
											id="model"
											name="model"
											value={carData.model}
											onChange={handleInputChange}
											placeholder="Model"
										/>
									</div>
									<div className="space-y-1">
										<Label htmlFor="type">Type</Label>
										<Input
											id="type"
											name="type"
											value={carData.type}
											onChange={handleInputChange}
											placeholder="Type"
										/>
									</div>
								</div>
							</div>
						</TabsContent>

						<TabsContent value="pricing">
							<div className="space-y-4">
								{/* Category, Year, Price */}
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									<div className="space-y-1">
										<Label htmlFor="category">Category</Label>
										<Input
											id="category"
											name="category"
											value={carData.category}
											onChange={handleInputChange}
											placeholder="Category"
										/>
									</div>
									<div className="space-y-1">
										<Label htmlFor="year">Year</Label>
										<Input
											id="year"
											name="year"
											type="number"
											value={carData.year}
											onChange={handleInputChange}
											placeholder="Year"
										/>
									</div>
									<div className="space-y-1">
										<Label htmlFor="price">Price</Label>
										<Input
											id="price"
											name="price"
											type="number"
											value={carData.price}
											onChange={handleInputChange}
											placeholder="Price"
										/>
									</div>
								</div>

								{/* Color, Seat Capacity, Stock */}
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									<div className="space-y-1">
										<Label htmlFor="color">Color</Label>
										<Input
											id="color"
											name="color"
											value={carData.color}
											onChange={handleInputChange}
											placeholder="Color"
										/>
									</div>
									<div className="space-y-1">
										<Label htmlFor="seatCapacity">Seat Capacity</Label>
										<Input
											id="seatCapacity"
											name="seatCapacity"
											type="number"
											value={carData.seatCapacity}
											onChange={handleInputChange}
											placeholder="Seat Capacity"
										/>
									</div>
									<div className="space-y-1">
										<Label htmlFor="stock">Stock</Label>
										<Input
											id="stock"
											name="stock"
											type="number"
											value={carData.stock}
											onChange={handleInputChange}
											placeholder="Stock"
										/>
									</div>
								</div>
							</div>
						</TabsContent>

						<TabsContent value="images">
							<div className="space-y-4">
								{/* Image Upload */}
								<div className="space-y-1">
									<Label htmlFor="image">Image</Label>
									<input
										id="image"
										type="file"
										onChange={handleImageUpload}
										className="block w-full p-2 border border-gray-300 rounded-md"
									/>
									{loading && (
										<p className="text-sm text-gray-500 mt-2">Uploading...</p>
									)}
								</div>
							</div>
						</TabsContent>

						<TabsContent value="features">
							<div className="space-y-4">
								{/* Features */}
								<div className="space-y-1">
									<Label htmlFor="features">Features</Label>
									<Input
										id="features"
										name="features"
										value={carData.features.join(", ")}
										onChange={(e) =>
											setCarData({
												...carData,
												features: e.target.value
													.split(",")
													.map((f) => f.trim()),
											})
										}
										placeholder="Enter features separated by commas"
									/>
								</div>

								{/* Is Electric */}
								<div className="space-y-1">
									<Label htmlFor="isElectric">Is Electric</Label>
									<input
										id="isElectric"
										type="checkbox"
										name="isElectric"
										checked={carData.isElectric}
										onChange={handleInputChange}
										className="h-5 w-5"
									/>
								</div>
							</div>
						</TabsContent>
					</Tabs>
				</CardContent>

				<CardFooter className="flex justify-center">
					<Button onClick={handleSubmit} disabled={loading}>
						{loading ? "Submitting..." : "Submit"}
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default AddCar;
