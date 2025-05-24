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
  discountedPrice?: number; // Optional, in case there's no discount
}

interface UseCartDataResult {
  cartsProducts: TCartsProductsItems[];
  currentCarts: TCartState & PersistPartial;
  totalAmount: number;
  totalCartItems: number;
}

// Assume couponData comes from somewhere (props, context, redux, etc.)
// For example, you can import or receive it here:

const useCartData = (): UseCartDataResult => {
  const currentCarts = useAppSelector(useCurrentCar);

  const cartsProducts: TCartsProductsItems[] = currentCarts.items.map(
    (cartItem: TCartItem) =>
      ({
        ...cartItem,
      } as TCartsProductsItems)
  );

  const totalCartItems = cartsProducts.reduce(
    (total: number, item: TCartsProductsItems) => total + item.quantity,
    0
  );

  const totalAmount = cartsProducts.reduce(
    (total: number, item: TCartsProductsItems) => {
      console.log(item);
      const priceToUse = item.discountedPrice ?? item.price;
      console.log(total + priceToUse * item.quantity);
      return total + priceToUse * item.quantity;
    },
    0
  );

  return { cartsProducts, currentCarts, totalAmount, totalCartItems };
};

export default useCartData;
