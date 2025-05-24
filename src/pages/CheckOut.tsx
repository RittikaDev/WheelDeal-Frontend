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
import {
  applyDiscountToCart,
  removeCarFromCart,
} from "../redux/features/cars/carSlice";
import { useCreateOrderMutation } from "../redux/features/order/order.api";
import { useGetCurrentUserMutation } from "../redux/features/auth/authApi";
import { selectCurrentUser } from "../redux/features/auth/authSlice";

import { IOrder } from "../types/order.type";

import Header from "../components/reusableComponents/Header";
import ShowToast from "../components/reusableComponents/ShowToast";
import { useApplyCouponMutation } from "../redux/features/coupon/coupon.api";

const CheckOut = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponData, setCouponData] = useState<{
    code: string;
    discountAmount: number;
    discountType: string;
    expiryDate: string;
    appliedToCarId: string;
  } | null>(null);

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
  const [applyCoupon] = useApplyCouponMutation();

  const { cartsProducts, currentCarts, totalAmount } = useCartData();

  useEffect(() => {
    if (userEmail) getCurrentUser({ email: userEmail.userEmail });
  }, [userEmail, getCurrentUser]);

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
    const productsPayload = currentCarts.items.map((item) => {
      const isDiscounted =
        couponData?.discountType === "percentage" &&
        couponData?.appliedToCarId === item.carId;
      const discountPercent = isDiscounted ? couponData.discountAmount : 0;
      const discountedPricePerUnit =
        (item?.price ?? 0) * (1 - discountPercent / 100);

      return {
        product: item.carId,
        quantity: item.quantity,
        pricePerUnit: discountedPricePerUnit.toFixed(2),
      };
    });

    const payload = {
      products: productsPayload,
      address: {
        phone: orderData.phone,
        address: orderData.address,
        city: orderData.city,
      },
    };
    console.log(payload);
    const result = await createOrder(payload);

    if (result?.data?.success) {
      ShowToast(result?.data?.message, "#4CAF50", "success");
      if (result?.data?.data)
        setTimeout(() => {
          window.location.href = result?.data?.data;
        }, 500);

      const productIdsToRemove = currentCarts?.items.map((item) => item.carId);
      dispatch(removeCarFromCart(productIdsToRemove));
      navigate("/order-success");
      setIsEditing(false);
    } else {
      ShowToast("Failed to place order", "#b71c1c", "error");
    }
  };

  const handleApplyCoupon = async () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) {
      setCouponError("Please enter a coupon code");
      return;
    }

    try {
      const { data } = await applyCoupon({
        code,
        carIds: currentCarts.items.map((item) => item.carId),
      });
      if (data?.success) {
        setCouponData(data.data);
        setCouponError("");
        ShowToast(
          `Coupon applied! ${data.data.discountAmount}% off on applicable car`,
          "#4CAF50",
          "success"
        );

        // Dispatch update to Redux cart with discounted prices
        dispatch(
          applyDiscountToCart({
            appliedToCarId: data.data.appliedToCarId,
            discountPercent: data.data.discountAmount,
          })
        );
      } else {
        setCouponData(null);
        setCouponError("Invalid or expired coupon");
      }
    } catch (error) {
      console.error("Coupon validation failed", error);
      setCouponData(null);
      setCouponError("Error validating coupon. Try again later.");
    }
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
            <Label className="flex pt-4 max-w-[10vw] hover:text-primary cursor-pointer">
              <Link className="flex gap-4 items-center" to="/cars">
                <ArrowLeftFromLine /> Return to Cars Page
              </Link>
            </Label>
          </div>

          <div className="bg-primary/5 p-10 w-full space-y-6 bg-opacity-30">
            <p>Checkout Summary</p>

            {cartsProducts
              ?.filter((item) => item.quantity > 0)
              .map((item, i) => {
                const isDiscounted =
                  couponData?.discountType === "percentage" &&
                  couponData?.appliedToCarId === item._id;
                const discountPercent = isDiscounted
                  ? couponData.discountAmount
                  : 0;

                const discountedPricePerUnit =
                  item.price * (1 - discountPercent / 100);
                const totalPriceForItem =
                  discountedPricePerUnit * item.quantity;

                return (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                      <div className="relative">
                        <Link to={`/cars/${item._id}`}>
                          <img
                            className="w-20 object-cover h-20 rounded-lg"
                            src={item?.image ?? "#"}
                            alt="Product Image"
                          />
                        </Link>
                        <p className="w-6 absolute -top-2 -right-2.5 text-[12px] h-6 p-1 text-center rounded-full bg-primary text-black">
                          {item.quantity}
                        </p>
                      </div>
                      <div>
                        <p>{item?.name?.slice(0, 50) ?? ""}</p>
                        <p className="text-[12px]">{item.category}</p>
                        {isDiscounted && (
                          <p className="text-green-600 text-[12px]">
                            {discountPercent}% discount applied!
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      {isDiscounted ? (
                        <>
                          <p className="line-through text-gray-500 text-sm">
                            ${item.price.toFixed(2)}
                          </p>
                          <p className="font-semibold text-lg text-primary">
                            ${totalPriceForItem.toFixed(2)}
                          </p>
                        </>
                      ) : (
                        <p className="font-semibold text-lg">
                          ${totalPriceForItem.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}

            {/* total info */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p>Subtotal</p>
                <p>
                  $
                  <span>
                    {couponData?.discountType === "percentage"
                      ? (
                          totalAmount -
                          ((cartsProducts.find(
                            (item) => item._id === couponData.appliedToCarId
                          )?.price ?? 0) *
                            (couponData.discountAmount / 100) *
                            (cartsProducts.find(
                              (item) => item._id === couponData.appliedToCarId
                            )?.quantity ?? 0) || 0)
                        ).toFixed(2)
                      : totalAmount.toFixed(2)}
                  </span>
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p>Shipping</p>
                <p>Free</p>
              </div>
              <div className="flex justify-between items-center">
                <p>Estimated taxes</p>
                <p>Free</p>
              </div>
              <div className="space-y-2">
                <p>Have a coupon?</p>
                <div className="flex gap-2">
                  <Input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                  />
                  <Button type="button" onClick={handleApplyCoupon}>
                    Apply
                  </Button>
                </div>
                {couponError && (
                  <p className="text-red-600 text-sm">{couponError}</p>
                )}
              </div>

              <div className="flex text-xl py-4 justify-between items-center">
                <p>Total</p>
                <p>
                  $
                  {couponData?.discountType === "percentage"
                    ? (
                        totalAmount -
                        ((cartsProducts.find(
                          (item) => item._id === couponData.appliedToCarId
                        )?.price ?? 0) *
                          (couponData.discountAmount / 100) *
                          (cartsProducts.find(
                            (item) => item._id === couponData.appliedToCarId
                          )?.quantity ?? 0) || 0)
                      ).toFixed(2)
                    : totalAmount.toFixed(2)}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center"></div>
                  <div className="flex justify-end items-center gap-2">
                    <Button
                      disabled={!isValid || !isEditing}
                      type="submit"
                      className="w-40"
                    >
                      Place order
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
