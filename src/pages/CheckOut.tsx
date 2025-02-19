import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Label } from "@radix-ui/react-label";
import { ArrowLeftFromLine } from "lucide-react";
import { Toaster } from "sonner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

import useCartData from "../hooks/useCartData";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { removeCarFromCart } from "../redux/features/cars/carSlice";
import { useCreateOrderMutation } from "../redux/features/order/order.api";
import { useGetCurrentUserMutation } from "../redux/features/auth/authApi";
import { selectCurrentUser } from "../redux/features/auth/authSlice";

import { IOrder } from "../types/order.type";

import Header from "../components/reusableComponents/Header";
import ShowToast from "../components/reusableComponents/ShowToast";

const CheckOut = () => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IOrder>({ mode: "onChange" });

  const userEmail = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const [createOrder] = useCreateOrderMutation();
  const [getCurrentUser, { data: currentUser }] = useGetCurrentUserMutation();
  const { cartsProducts, currentCarts, totalAmount } = useCartData();

  useEffect(() => {
    if (userEmail) getCurrentUser({ email: userEmail.userEmail });
  }, [userEmail, getCurrentUser]);

  console.log(isEditing, cartsProducts);

  useEffect(() => {
    if (currentUser?.data)
      reset({
        name: currentUser.data.name || undefined,
        email: currentUser.data.email || undefined,
        phone: currentUser.data.phone || undefined,
        address: currentUser.data.address || undefined,
        city: currentUser.data.city || undefined,
      });
  }, [currentUser, reset]);

  const handdleOrderPlacement = async (orderData: any) => {
    const orderBData = {
      products: currentCarts.items.map((item) => ({
        product: item.carId,
        quantity: item.quantity,
      })),
    };
    const payload = {
      products: orderBData.products,
      address: {
        phone: orderData.phone,
        address: orderData.address,
        city: orderData.city,
      },
    };

    const result = await createOrder(payload);
    // console.log(result.data.data);

    if (result?.data?.success) {
      ShowToast(result?.data?.message, "#4CAF50", "success");
      if (result?.data?.data)
        setTimeout(() => {
          window.location.href = result?.data?.data;
        }, 500);

      const productIdsToRemove = currentCarts?.items.map((item) => item.carId);
      dispatch(removeCarFromCart(productIdsToRemove)); // TESTING: COMMENT OUT
      navigate("/order-success");
      setIsEditing(false);
    } else ShowToast("Failed to place order", "#b71c1c", "error");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <div className="text-center space-y-1.5 px-2 md:px-0 md:py-12">
        <Header header={"Checkout Page"} />
      </div>
      <Toaster />
      <form
        onChange={() => setIsEditing(true)}
        onSubmit={handleSubmit(handdleOrderPlacement)}
      >
        <div className="container mx-auto md:flex justify-between gap-6">
          <div className="p-10 space-y-4 w-full py-14">
            <p>Contact</p>
            <Input
              type="name"
              {...register("name", { required: true })}
              placeholder="Name"
            />
            {errors.name && (
              <span className="text-red-600 text-[12px]">name is required</span>
            )}
            <Input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-red-600 text-[12px]">
                Email is required
              </span>
            )}
            <Input
              type="phone"
              {...register("phone", { required: true })}
              placeholder="Phone Number"
            />
            {errors.phone && (
              <span className="text-red-600 text-[12px]">
                Phone number is required
              </span>
            )}
            <Input
              type="address"
              {...register("address", { required: true })}
              placeholder="Address"
            />
            {errors.address && (
              <span className="text-red-600 text-[12px]">
                Address is required
              </span>
            )}
            <Input
              type="city"
              {...register("city", { required: true })}
              placeholder="City"
            />
            {errors.city && (
              <span className="text-red-600 text-[12px]">City is required</span>
            )}
            {/* <ShippingAddress register={register} errors={errors} /> */}
            <Label className="flex pt-4 max-w-[10vw] hover:text-primary cursor-pointer">
              <Link className="flex gap-4 items-center" to="/cars">
                <ArrowLeftFromLine /> Return to Cars Page
              </Link>
            </Label>
          </div>
          <div className="bg-primary/5 p-10 w-full space-y-6 bg-opacity-30">
            <p>Checkout Summary</p>

            <div>
              {cartsProducts
                ?.filter((item) => item.quantity > 0) // Filter out items with quantity 0 or less
                .map((item, i) => (
                  <div key={i} className="flex justify-between  items-center">
                    <div className="flex gap-4 items-center">
                      <div className="relative">
                        <Link to={`/cars/${item._id}`}>
                          <img
                            className="w-20  object-cover h-20 rounded-lg"
                            src={item?.image ?? "#"}
                            alt="Product Image"
                          />
                        </Link>
                        <p className=" w-6 absolute -top-2 -right-2.5 text-[12px] h-6 p-1 text-center rounded-full bg-primary text-black">
                          {item.quantity}
                        </p>
                      </div>
                      <div>
                        <p>{item?.name?.slice(0, 50) ?? ""}</p>
                        <p className="text-[12px]">{item.category}</p>
                      </div>
                    </div>

                    <p>${item.price * item.quantity}</p>
                  </div>
                ))}
            </div>

            {/* total info  */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p>Subtotal</p>
                <p>
                  $<span>{totalAmount}</span>{" "}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p>Shipping</p>
                <p>
                  <span>{"Free"}</span>{" "}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p>Estimated taxes</p>
                <p>
                  <span>{"Free"}</span>{" "}
                </p>
              </div>
              <div className="flex text-xl py-4 justify-between items-center">
                <p>Total</p>
                <p>
                  $<span>{totalAmount}</span>{" "}
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center"></div>
                  <div className="flex justify-end mt-4">
                    <Button
                      disabled={!isValid}
                      onClick={() => setIsEditing(false)}
                      type="submit"
                    >
                      Order Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckOut;
