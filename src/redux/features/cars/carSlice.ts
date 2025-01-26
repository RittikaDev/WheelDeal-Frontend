import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCartItem } from "../../../types";
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
	name: "carts",
	initialState,
	reducers: {
		addCarCart: (state, action: PayloadAction<TCartItem>) => {
			const { carId, quantity } = action.payload;

			const exitstingItem = state.items.find(
				(item: { carId: any }) => item.carId === carId
			);
			if (exitstingItem) exitstingItem.quantity += quantity;
			else state.items.push({ carId, quantity });
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
