import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../../components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";

import { useLoginMutation } from "../../redux/features/auth/authApi";
import { setUser } from "../../redux/features/auth/authSlice";

import { Eye, EyeOff } from "lucide-react";
import { useAppDispatch } from "../../redux/hooks";

import { verifyToken } from "../../utils/verifyToken";
import { TError } from "../../types";
import { TUser } from "../../types/auth.type";
import Header from "../../components/reusableComponents/Header";
import Subheader from "../../components/reusableComponents/SubHeader";
import ShowToast from "../../components/reusableComponents/ShowToast";

const Login = () => {
	const [isPassword, setIsPassword] = useState(true);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [Login] = useLoginMutation();

	const form = useForm<TUser>({
		defaultValues: { email: "", password: "" },
	});

	const [isButtonDisabled, setIsButtonDisabled] = useState(true);

	useEffect(() => {
		const { email, password } = form.getValues();
		setIsButtonDisabled(!(email && password));
	}, [form.getValues().email, form.getValues().password]);

	const onSubmit = async (data: TUser) => {
		const toastId = ShowToast("Logging in...", "#ffdf20", "loading");

		try {
			const result = await Login(data).unwrap();
			if (result.success) {
				const user = verifyToken(result?.data?.token as string);
				dispatch(setUser({ user: user, token: result.data?.token as string }));

				ShowToast(result?.message, "#4CAF50", "success", toastId);

				navigate("/");
			} else ShowToast(result?.message, "#b71c1c", "error", toastId);
		} catch (err) {
			const error = err as TError;
			ShowToast(
				error?.data?.message || "Something went wrong",
				"#b71c1c",
				"error",
				toastId
			);
		}

		form.reset();
	};

	return (
		<div className="max-w-7xl mx-auto">
			<div className="text-center space-y-2 mb-12">
				<Header header={"Log In"} />
				<Subheader className="text-center" heading={"User Log In"} />
			</div>
			<div className="w-full lg:max-w-md mx-auto space-y-8 rounded-lg bg-white p-8 shadow-lg">
				<Form {...form}>
					<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							name="email"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											className="px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
											placeholder="Email"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="password"
							control={form.control}
							render={({ field }) => (
								<FormItem className="relative">
									<FormControl>
										<Input
											className="px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
											type={isPassword ? "password" : "text"}
											placeholder="Password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
									<button
										className="absolute right-2 top-[1px] size-6 flex items-center justify-center text-gray-500 hover:text-indigo-500"
										onClick={() => setIsPassword(!isPassword)}
										type="button"
									>
										{isPassword ? <Eye size={16} /> : <EyeOff size={16} />}
									</button>
								</FormItem>
							)}
						/>
						<Button
							size={"lg"}
							type="submit"
							className="w-full bg-primary hover:bg-orange-400 text-white font-semibold rounded-lg py-3 shadow-md"
							disabled={isButtonDisabled} // Disable if email or password is empty
						>
							Log In
						</Button>
					</form>
				</Form>

				<Separator className="my-6" />

				<div className="flex justify-center space-x-1">
					<span className="text-center text-sm">Don't have an account?</span>
					<Link
						to="/register"
						className="text-indigo-600 text-sm font-semibold hover:text-indigo-700"
					>
						Register
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
