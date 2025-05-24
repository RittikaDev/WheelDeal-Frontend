import { useState, useEffect } from "react";
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
import { ICar } from "../../../types";
import { useUpdateProductMutation } from "../../../redux/features/cars/carApi";
import ShowToast from "../../../components/reusableComponents/ShowToast";

const UpdateCar = (props: { car: ICar }) => {
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
	}>({
		name: "",
		description: "",
		brand: "",
		model: "",
		type: "",
		category: "",
		year: 2025,
		price: 35000,
		rating: 5,
		color: "",
		seatCapacity: 5,
		isElectric: false,
		features: [],
		transmission: "automatic",
		status: "available",
		stock: 40,
	});

	const [loading, setLoading] = useState(false);
	const [updateProduct] = useUpdateProductMutation();

	// Populate carData with props.car when the component is mounted
	useEffect(() => {
		if (props.car) {
			setCarData({
				name: props.car.name || "",
				description: props.car.description || "",
				brand: props.car.brand || "",
				model: props.car.model || "",
				type: props.car.type || "",
				category: props.car.category || "",
				year: props.car.year || 2025,
				price: props.car.price || 35000,
				rating: props.car.rating || 5,
				color: props.car.color || "",
				seatCapacity: props.car.seatCapacity || 5,
				isElectric: props.car.isElectric || false,
				features: props.car.features || [],
				transmission: props.car.transmission || "automatic",
				status: props.car.status || "available",
				stock: props.car.stock || 40,
			});
		}
	}, [props.car]);

	const handleInputChange = (e: any) => {
		const { name, value, type, checked } = e.target;

		if (type === "checkbox") setCarData({ ...carData, [name]: checked });
		else setCarData({ ...carData, [name]: value });
	};

	const handleSubmit = async (e: any) => {
		const toastId = ShowToast("Updating...", "#ffdf20", "loading");

		e.preventDefault();
		setLoading(true);
		try {
			const result = await updateProduct({ id: props.car._id, carData });
			ShowToast(result?.data.message, "#4CAF50", "success", toastId);
			setLoading(false);
		} catch (err) {
			console.error("Error updating car:", err);
			ShowToast("Failed to update", "#b71c1c", "error", toastId);
			setLoading(false);
		}
	};

	return (
		<div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
			<Card>
				<CardHeader>
					<div className="text-center space-y-1.5 px-2 md:px-0">
						<Header header={"Update Car Details"} />
						<p>Modify car details as required.</p>
					</div>
				</CardHeader>

				<CardContent>
					<Tabs defaultValue="basic-details">
						<TabsList className="flex justify-center space-x-12 mb-12">
							<TabsTrigger value="basic-details">Basic Details</TabsTrigger>
							<TabsTrigger value="pricing">Pricing & Availability</TabsTrigger>
							<TabsTrigger value="features">Features</TabsTrigger>
						</TabsList>

						<TabsContent value="basic-details">
							{/* Basic Details Tab */}
							<div className="space-y-4">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
										<Label htmlFor="rating">Rating</Label>
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
						{loading ? "Updating..." : "Update"}
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default UpdateCar;
