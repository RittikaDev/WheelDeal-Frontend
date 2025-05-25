import { useGetCouponQuery } from "../../redux/features/coupon/coupon.api";

const GetCoupon = () => {
	const { data: coupons, isLoading, error } = useGetCouponQuery(null);

	if (isLoading) return <div>Loading coupons...</div>;
	if (error) return <div>Error loading coupons.</div>;

	return (
		<div className="p-6 max-w-4xl mx-auto space-y-6">
			<h2 className="text-3xl font-bold text-primary">Coupons</h2>

			<div className="overflow-x-auto">
				<table className="min-w-full text-sm border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden">
					<thead className="bg-primary text-primary-foreground">
						<tr>
							{["Code", "Amount", "Type", "Expiry", "Car"].map((head) => (
								<th key={head} className="px-4 py-2 text-left">
									{head}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{coupons?.coupons?.map((coupon: any) => (
							<tr key={coupon._id} className="border-t dark:border-gray-700">
								<td className="px-4 py-2">{coupon.code}</td>
								<td className="px-4 py-2">{coupon.discountAmount}</td>
								<td className="px-4 py-2">{coupon.discountType}</td>
								<td className="px-4 py-2">
									{new Date(coupon.expiryDate).toLocaleDateString()}
								</td>
								<td className="px-4 py-2">
									{coupon.carId?.name || coupon.carId || "-"}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default GetCoupon;
