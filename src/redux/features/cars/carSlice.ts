import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICar, TCartItem } from "../../../types";
import { RootState } from "../../store";

export type TCartState = {
	items: TCartItem[];
	loading: boolean;
	error: string | null;
	appliedCoupon: {
		code: string;
		discountAmount: number;
		discountType: string;
		appliedToCarId: string;
	} | null;
};

const initialState: TCartState = {
	items: [],
	loading: false,
	error: null,
	appliedCoupon: null,
};

const carSlice = createSlice({
	name: "car",
	initialState,
	reducers: {
		addCarCart: (state, action: PayloadAction<TCartItem & ICar>) => {
			const { carId, quantity, ...productDetails } = action.payload;

			const exitstingItem = state.items.find(
				(item: { carId: string }) => item.carId === carId
			);
			if (exitstingItem) exitstingItem.quantity += quantity;
			else state.items.push({ carId, quantity, ...productDetails });
		},
		removeCarFromCart: (state, action: PayloadAction<string[]>) => {
			state.items = state.items.filter(
				(item: { carId: string }) => !action.payload.includes(item.carId)
			);
		},
		applyDiscountToCart: (
			state,
			action: PayloadAction<{ appliedToCarId: string; discountPercent: number }>
		) => {
			const { appliedToCarId, discountPercent } = action.payload;
			// console.log(
			//   `Applying discount of ${discountPercent}% to car with ID: ${appliedToCarId}`
			// );
			state.items = state.items.map((item) => {
				if (item.carId === appliedToCarId) {
					return {
						...item,
						discountedPrice: +(
							(item.price ?? 0) *
							(1 - discountPercent / 100)
						).toFixed(2),
					};
				}
				return item;
			});
		},
		applyCouponToCart: (
			state,
			action: PayloadAction<{
				code: string;
				discountAmount: number;
				discountType: string;
				appliedToCarId: string;
			}>
		) => {
			state.appliedCoupon = action.payload;
		},
		removeAppliedCoupon: (state) => {
			state.appliedCoupon = null;
		},
	},
});

export const {
	addCarCart,
	removeCarFromCart,
	applyDiscountToCart,
	applyCouponToCart,
	removeAppliedCoupon,
} = carSlice.actions;

export default carSlice.reducer;

export const useCurrentCar = (state: RootState) => state.car;
