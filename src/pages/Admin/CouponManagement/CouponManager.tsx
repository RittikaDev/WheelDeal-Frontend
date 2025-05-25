/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
	useGetCouponQuery,
	useCreateCouponMutation,
	useUpdateCouponMutation,
} from "../../../redux/features/coupon/coupon.api";
import { useGetAllCarsQuery } from "../../../redux/features/cars/carApi";
import { toast } from "sonner";
import Header from "../../../components/reusableComponents/Header";

const CouponManager = () => {
	const { data: coupons, isLoading, error } = useGetCouponQuery(null);
	const { data: carsData, isLoading: carsLoading } = useGetAllCarsQuery(null);

	const [createCoupon] = useCreateCouponMutation();
	const [updateCoupon] = useUpdateCouponMutation();

	// Form state for new coupon
	const [newCoupon, setNewCoupon] = useState({
		code: "",
		discountAmount: "",
		discountType: "percentage", // or "fixed"
		expiryDate: "",
		carId: "",
	});

	// State to track editing coupon (id) and its changes
	const [editCouponId, setEditCouponId] = useState<string | null>(null);
	const [editCouponData, setEditCouponData] = useState<{
		code?: string;
		discountAmount?: string | number;
		discountType?: string;
		expiryDate?: string;
		carId?: string;
	}>({});

	const handleNewChange = (e: any) => {
		const { name, value } = e.target;
		setNewCoupon((prev) => ({ ...prev, [name]: value }));
	};

	const handleEditChange = (e: any) => {
		const { name, value } = e.target;
		setEditCouponData((prev) => ({ ...prev, [name]: value }));
	};

	const handleCreate = async () => {
		try {
			// console.log({
			// 	...newCoupon,
			// 	discountAmount: parseFloat(newCoupon.discountAmount),
			// });
			const expiryDate = new Date(newCoupon.expiryDate);
			const formattedDate = expiryDate.toISOString();

			await createCoupon({
				...newCoupon,
				expiryDate: formattedDate,
				discountAmount: parseFloat(newCoupon.discountAmount),
			}).unwrap();

			setNewCoupon({
				code: "",
				discountAmount: "",
				discountType: "percentage",
				expiryDate: "",
				carId: "",
			});
			toast.success("Coupon created successfully");
		} catch (err: any) {
			toast.error(
				"Error creating coupon: " + (err.data?.message || err.message)
			);
		}
	};

	const handleUpdate = async (id: any) => {
		try {
			await updateCoupon({
				id,
				...editCouponData,
				expiryDate: editCouponData.expiryDate
					? new Date(editCouponData.expiryDate).toISOString()
					: undefined,
				discountAmount: parseFloat(
					editCouponData.discountAmount !== undefined
						? String(editCouponData.discountAmount)
						: ""
				),
			}).unwrap();
			setEditCouponId(null);
			setEditCouponData({});
			toast.success("Coupon updated successfully");
		} catch (err: any) {
			toast.error(
				"Error updating coupon: " + (err.data?.message || err.message)
			);
		}
	};

	if (isLoading) return <div>Loading coupons...</div>;
	if (error) return <div>Error loading coupons.</div>;
	// console.log(coupons);
	return (
		<div className="p-6 max-w-4xl mx-auto space-y-6">
			<div className="text-center space-y-1.5 px-2 mb-8 md:px-0">
				<Header header={"Coupon Manager"} />
			</div>

			{/* New Coupon Form */}
			<div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow border border-gray-200 dark:border-gray-700 space-y-4">
				<h3 className="text-xl font-semibold text-primary">Add New Coupon</h3>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
					<input
						placeholder="Code"
						name="code"
						value={newCoupon.code}
						onChange={handleNewChange}
						className="input-style"
					/>
					<input
						placeholder="Discount Amount"
						name="discountAmount"
						type="number"
						value={newCoupon.discountAmount}
						onChange={handleNewChange}
						className="input-style"
					/>
					<select
						name="discountType"
						value={newCoupon.discountType}
						onChange={handleNewChange}
						className="input-style"
					>
						<option value="percentage">Percentage</option>
						<option value="fixed">Fixed</option>
					</select>
					<input
						type="date"
						name="expiryDate"
						value={newCoupon.expiryDate}
						onChange={handleNewChange}
						className="input-style"
					/>
					{carsLoading ? (
						<div className="col-span-full text-sm text-gray-500">
							Loading cars...
						</div>
					) : (
						<select
							name="carId"
							value={newCoupon.carId}
							onChange={handleNewChange}
							className="input-style"
						>
							<option value="">Select Car</option>
							{carsData?.data?.map((car: any) => (
								<option key={car._id} value={car._id}>
									{car.name}
								</option>
							))}
						</select>
					)}
				</div>
				<div>
					<button
						onClick={handleCreate}
						className="bg-primary hover:opacity-90 text-primary-foreground px-4 py-2 rounded-lg font-semibold"
					>
						Create Coupon
					</button>
				</div>
			</div>

			{/* List & Edit Coupons */}
			<div className="overflow-x-auto">
				<table className="min-w-full text-sm border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden">
					<thead className="bg-primary text-primary-foreground">
						<tr>
							{["Code", "Amount", "Type", "Expiry", "Car", "Actions"].map(
								(head) => (
									<th key={head} className="px-4 py-2 text-left">
										{head}
									</th>
								)
							)}
						</tr>
					</thead>
					<tbody>
						{coupons.coupons?.map((coupon: any) => {
							const isEditing = editCouponId === coupon._id;
							return (
								<tr key={coupon._id} className="border-t dark:border-gray-700">
									<td className="px-4 py-2">
										{isEditing ? (
											<input
												name="code"
												value={editCouponData.code ?? coupon.code}
												onChange={handleEditChange}
												className="input-style"
											/>
										) : (
											coupon.code
										)}
									</td>
									<td className="px-4 py-2">
										{isEditing ? (
											<input
												name="discountAmount"
												type="number"
												value={
													editCouponData.discountAmount ?? coupon.discountAmount
												}
												onChange={handleEditChange}
												className="input-style w-24"
											/>
										) : (
											coupon.discountAmount
										)}
									</td>
									<td className="px-4 py-2">
										{isEditing ? (
											<select
												name="discountType"
												value={
													editCouponData.discountType ?? coupon.discountType
												}
												onChange={handleEditChange}
												className="input-style"
											>
												<option value="percentage">Percentage</option>
												<option value="fixed">Fixed</option>
											</select>
										) : (
											coupon.discountType
										)}
									</td>
									<td className="px-4 py-2">
										{isEditing ? (
											<input
												type="date"
												name="expiryDate"
												value={
													editCouponData.expiryDate
														? editCouponData.expiryDate.split("T")[0]
														: coupon.expiryDate.split("T")[0]
												}
												onChange={handleEditChange}
												className="input-style"
											/>
										) : (
											new Date(coupon.expiryDate).toLocaleDateString()
										)}
									</td>
									<td className="px-4 py-2">
										{isEditing ? (
											<input
												name="carId"
												value={editCouponData.carId ?? coupon.carId?._id ?? ""}
												onChange={handleEditChange}
												className="input-style w-32"
											/>
										) : (
											coupon.carId?.name || coupon.carId || "-"
										)}
									</td>
									<td className="px-4 py-2">
										{isEditing ? (
											<div className="flex gap-2">
												<button
													onClick={() => handleUpdate(coupon._id)}
													className="bg-green-600 text-white px-3 py-1 rounded-md"
												>
													Save
												</button>
												<button
													onClick={() => {
														setEditCouponId(null);
														setEditCouponData({});
													}}
													className="bg-gray-400 text-white px-3 py-1 rounded-md"
												>
													Cancel
												</button>
											</div>
										) : (
											<button
												onClick={() => {
													setEditCouponId(coupon._id);
													setEditCouponData({
														code: coupon.code,
														discountAmount: coupon.discountAmount,
														discountType: coupon.discountType,
														expiryDate: coupon.expiryDate.split("T")[0],
														carId: coupon.carId?._id ?? "",
													});
												}}
												className="bg-primary text-primary-foreground px-3 py-1 rounded-md"
											>
												Edit
											</button>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default CouponManager;
