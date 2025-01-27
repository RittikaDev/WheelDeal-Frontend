import { Label } from "@radix-ui/react-label";
import { ArrowLeftFromLine } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import useCartData from "../hooks/useCartData";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { removeCarFromCart } from "../redux/features/cars/carSlice";
import { useForm } from "react-hook-form";
import { useCreateOrderMutation } from "../redux/features/order/order.api";
import { IOrder } from "../types/order.type";
import { useGetCurrentUserMutation } from "../redux/features/auth/authApi";
import Header from "../components/reusableComponents/Header";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import ShowToast from "../components/reusableComponents/ShowToast";

const CheckOut = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IOrder>({ mode: "onChange" });

  const dispatch = useAppDispatch();

  const [createOrder] = useCreateOrderMutation();

  const userEmail = useAppSelector(selectCurrentUser);
  const [getCurrentUser, { data: currentUser }] = useGetCurrentUserMutation();
  useEffect(() => {
    if (userEmail) getCurrentUser({ email: userEmail.userEmail });
  }, [userEmail, getCurrentUser]);

  const { cartsProducts, currentCarts, totalAmount } = useCartData();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  console.log(isEditing);

  // usePageRefreshWaring(
  // 	isEditing,
  // 	"Are you sure you want to leave? Your changes may not be saved."
  // );

  useEffect(() => {
    if (currentUser?.data)
      reset({
        name: currentUser.data.name || "",
        email: currentUser.data.email || "",
        phone: currentUser.data.phone || "",
        address: currentUser.data.address || "",
        city: currentUser.data.city || "",
      });
  }, [currentUser, reset]);

  const handdleOrderPlacement = async (orderData) => {
    const orderBData = {
      products: currentCarts.items.map((item) => ({
        product: item.carId, // Assuming `_id` corresponds to the product ID
        quantity: item.quantity,
      })),
    };
    const payload = {
      products: orderBData.products, // Ensure products are sent as an array
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
        }, 1000);

      const productIdsToRemove = currentCarts?.items.map((item) => item.carId);
      // dispatch(removeCarFromCart(productIdsToRemove)); // TESTING: COMMENT OUT
      // navigate("/order-success");
      setIsEditing(false);
    } else ShowToast("Failed to place order", "#FF6347", "error");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <div className="text-center space-y-1.5 px-2 md:px-0 md:py-12">
        {/* <PageBanner bannerTitle="Check Out" img={CheckOutImg} /> */}
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
              <Link className="flex gap-4 items-center" to="/cart">
                <ArrowLeftFromLine /> Return to cart
              </Link>
            </Label>
          </div>
          <div className="bg-primary/5 p-10 w-full space-y-6 bg-opacity-30">
            <p>Checkout Summary</p>

            <div>
              {cartsProducts?.map((item, i) => (
                <div key={i} className="flex justify-between  items-center">
                  <div className="flex gap-4 items-center">
                    <div className="relative">
                      <Link to={`/products/${item._id}`}>
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
