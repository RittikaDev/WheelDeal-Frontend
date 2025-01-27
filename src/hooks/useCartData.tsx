// import LoadingPage from "@/components/shared/LoadingPage";
// import { useGetCartsProductsQuery } from "@/redux/features/products/productApi";
// import {
// 	TCartState,
// 	useCurrentCart,
// } from "@/redux/features/products/productSlice";
// import { useAppSelector } from "@/redux/hook";

import { PersistPartial } from "redux-persist/es/persistReducer";
import { TCartItem } from "../types";
import { TCartState, useCurrentCar } from "../redux/features/cars/carSlice";
import { useAppSelector } from "../redux/hooks";

interface TCartsProductsItems extends TCartItem {
	_id: string;
	name: string;
	category: string;
	image: string;
	price: number;
	stock: number;
}

interface UseCartDataResult {
	cartsProducts: TCartsProductsItems[];
	currentCarts: TCartState & PersistPartial;
	totalAmount: number;
	totalCartItems: number;
}

// const useCartData = (): UseCartDataResult => {
// 	const currentCarts = useAppSelector(useCurrentCart);
// 	const productIds = currentCarts.items.map((product) => product.productId);
// 	const { data, isLoading } = useGetCartsProductsQuery(productIds);

// 	if (isLoading) {
// 		<>
// 			<LoadingPage />
// 		</>;
// 	}

// 	const getCartsProducts = data?.data;

// 	// combined cart
// 	const cartsProducts: TCartsProductsItems[] = currentCarts.items.map(
// 		(cartItem) => {
// 			const products = getCartsProducts?.find(
// 				(product: TProduct) => product._id === cartItem.productId
// 			);
// 			return {
// 				...cartItem,
// 				...products,
// 			} as TCartsProductsItems;
// 		}
// 	);

// 	const totalCartItems = cartsProducts?.reduce(
// 		(total: number, item: TCartsProductsItems) => {
// 			return total + item.quantity;
// 		},
// 		0
// 	);

// 	const totalAmount = cartsProducts?.reduce(
// 		(total: number, item: TCartsProductsItems) => {
// 			return total + item.price * item.quantity;
// 		},
// 		0
// 	);

// 	return { cartsProducts, currentCarts, totalAmount, totalCartItems };
// };

// export default useCartData;

const useCartData = (): UseCartDataResult => {
	const currentCarts = useAppSelector(useCurrentCar);

	const cartsProducts: TCartsProductsItems[] = currentCarts.items.map(
		(cartItem: TCartItem) => {
			return {
				...cartItem, // Use cached product details already stored in the cart
			} as TCartsProductsItems;
		}
	);

	const totalCartItems = cartsProducts?.reduce(
		(total: number, item: TCartsProductsItems) => total + item.quantity,
		0
	);

	const totalAmount = cartsProducts?.reduce(
		(total: number, item: TCartsProductsItems) =>
			total + item.price * item.quantity,
		0
	);

	return { cartsProducts, currentCarts, totalAmount, totalCartItems };
};
export default useCartData;
