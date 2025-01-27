import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICar, TCartItem } from "../../../types";
import { RootState } from "../../store";

export type TCartState = {
	items: TCartItem[];
	loading: boolean;
	error: string | null;
};

const initialState: TCartState = {
	items: [],
	loading: false,
	error: null,
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
	},
});

export const { addCarCart, removeCarFromCart } = carSlice.actions;

export default carSlice.reducer;

export const useCurrentCar = (state: RootState) => state.car;
