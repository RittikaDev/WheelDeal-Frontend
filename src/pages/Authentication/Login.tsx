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

	// TRACK SELECTED TAB (ADMIN/USER)
	const [selectedTab, setSelectedTab] = useState<"admin" | "user" | null>(null);

	useEffect(() => {
		const subscription = form.watch((values) => {
			const { email, password } = values;
			setIsButtonDisabled(!(email && password));
		});
		return () => subscription.unsubscribe();
	}, [form]);

	// PRESET CREDENTIALS FOR ADMIN AND USER
	const credentials = {
		admin: {
			email: "admin@gmail.com",
			password: "admin123",
		},
		user: {
			email: "johnsmith@gmail.com",
			password: "smith123",
		},
	};

	const handleTabClick = (role: "admin" | "user") => {
		setSelectedTab(role);
		form.reset(credentials[role]);
	};

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
		setSelectedTab(null);
	};

	return (
		<div className="max-w-7xl mx-auto">
			<div className="text-center space-y-2 mt-8 mb-12">
				<Header header={"Log In"} />
				<Subheader className="text-center" heading={"User Log In"} />
			</div>

			{/* TABS FOR ADMIN / USER */}
			<div className="flex justify-center mb-6 space-x-4">
				{["admin", "user"].map((role) => (
					<button
						key={role}
						type="button"
						onClick={() => handleTabClick(role as "admin" | "user")}
						className={`px-6 py-2 rounded-lg font-semibold ${
							selectedTab === role
								? "bg-primary text-white"
								: "bg-gray-200 text-gray-700 hover:bg-gray-300"
						}`}
					>
						{role.charAt(0).toUpperCase() + role.slice(1)}
					</button>
				))}
			</div>

			<div className="w-full lg:max-w-md mx-auto space-y-8 rounded-lg bg-white dark:bg-gray-600 p-8 shadow-lg">
				<Form {...form}>
					<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							name="email"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											className="px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
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
											className="px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
											type={isPassword ? "password" : "text"}
											placeholder="Password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
									<button
										className="absolute right-2 top-[1px] size-6 flex items-center justify-center text-gray-500 hover:text-orange-400"
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
							disabled={isButtonDisabled}
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
						className="text-orange-300 text-sm font-semibold hover:text-orange-400"
					>
						Register
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
