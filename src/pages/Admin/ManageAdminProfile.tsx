import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Tabs } from "../../components/ui/tabs";
import Header from "../../components/reusableComponents/Header";
import {
	useGetCurrentUserMutation,
	useUpdateProfileMutation,
} from "../../redux/features/auth/authApi";
import ShowToast from "../../components/reusableComponents/ShowToast";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import DashboardHeading from "../../components/reusableComponents/DashboardHeading";

export function ManageAdminProfile() {
	const [profileData, setProfileData] = useState({
		name: "",
		address: "",
		city: "",
		phone: "",
	});

	const [updateProfile] = useUpdateProfileMutation();

	const userEmail = useAppSelector(selectCurrentUser);
	const [getCurrentUser, { data: currentUser }] = useGetCurrentUserMutation();

	useEffect(() => {
		if (userEmail) {
			getCurrentUser({ email: userEmail.userEmail });
		}
	}, [userEmail, getCurrentUser]);

	// Auto-fill profile data with current user if available
	useEffect(() => {
		// console.log(currentUser?.data);
		if (currentUser && currentUser.data) {
			setProfileData({
				name: currentUser.data.name || "",
				address: currentUser.data.address || "",
				city: currentUser.data.city || "",
				phone: currentUser.data.phone || "",
			});
		}
	}, [currentUser]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		// console.log(id, value);
		// const { id, value } = e.target;
		setProfileData((prev) => ({ ...prev, [id]: value }));
	};

	const updateProfileInfo = async () => {
		const toastId = ShowToast("Updating Profile...", "#ffdf20", "loading");
		try {
			const result = await updateProfile(profileData).unwrap();
			ShowToast(result.message, "#4CAF50", "success", toastId);
		} catch (error) {
			console.error("Error updating profile:", error);
			ShowToast(
				"Failed to update profile. Please try again.",
				"#b71c1c",
				"error",
				toastId
			);
		}
	};

	const handleProfileUpdate = () => {
		// Validation logic can be added here
		updateProfileInfo();
	};

	// Check if all profile fields are filled
	const isProfileComplete = Object.values(profileData).every(
		(field) => field !== ""
	);

	return (
		<div className="max-w-4xl mx-auto">
			<DashboardHeading title={"Manage Admin Profile"} />
			<Tabs defaultValue="account" className="w-full  p-6">
				<Card>
					<CardHeader>
						<div className="text-center space-y-1.5 px-2 md:px-0">
							<Header header={"Profile"} />
							<p>Update your personal information and contact details here.</p>
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-1">
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								value={profileData.name}
								onChange={handleInputChange}
								placeholder="Your name"
							/>
						</div>
						<div className="space-y-1">
							<Label htmlFor="address">Address</Label>
							<Input
								id="address"
								type="address"
								value={profileData.address}
								onChange={handleInputChange}
								placeholder="Your Address"
							/>
						</div>
						<div className="space-y-1">
							<Label htmlFor="city">City</Label>
							<Input
								id="city"
								type="city"
								value={profileData.city}
								onChange={handleInputChange}
								placeholder="Your City"
							/>
						</div>
						<div className="space-y-1">
							<Label htmlFor="phone">Phone</Label>
							<Input
								id="phone"
								value={profileData.phone}
								onChange={handleInputChange}
								placeholder="Your phone number"
							/>
						</div>
					</CardContent>
					<CardFooter className="flex justify-center">
						<Button onClick={handleProfileUpdate} disabled={!isProfileComplete}>
							Update Profile
						</Button>
					</CardFooter>
				</Card>
			</Tabs>
		</div>
	);
}

export default ManageAdminProfile;
