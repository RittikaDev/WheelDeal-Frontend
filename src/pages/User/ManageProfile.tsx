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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import Header from "../../components/reusableComponents/Header";
import {
  useChangePasswordMutation,
  useGetCurrentUserMutation,
  useUpdateProfileMutation,
} from "../../redux/features/auth/authApi";
import ShowToast from "../../components/reusableComponents/ShowToast";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";

export function ManageProfile() {
  const [profileData, setProfileData] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [changePassword] = useChangePasswordMutation();
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
    console.log(id, value);
    // const { id, value } = e.target;
    setProfileData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [id]: value }));
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
        "#FF6347",
        "error",
        toastId
      );
    }
  };

  const updatePassword = async () => {
    const toastId = ShowToast("Updating Password...", "#ffdf20", "loading");

    try {
      const result = await changePassword(passwordData).unwrap();
      ShowToast(result.message, "#4CAF50", "success", toastId);
      window.location.href = "/login";
    } catch (error) {
      console.error("Error updating password:", error);
      ShowToast(
        "Failed to update password. Please try again.",
        "#FF6347",
        "error",
        toastId
      );
    }
  };

  const handleProfileUpdate = () => {
    // Validation logic can be added here
    updateProfileInfo();
  };

  const handlePasswordUpdate = () => {
    updatePassword();
  };

  // Check if all profile fields are filled
  const isProfileComplete = Object.values(profileData).every(
    (field) => field !== ""
  );

  // Check if all password fields are filled
  const isPasswordComplete =
    passwordData.oldPassword !== "" && passwordData.newPassword !== "";

  return (
    <Tabs defaultValue="account" className="w-full max-w-4xl mx-auto p-6">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="account">Profile</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>

      {/* Profile Tab */}
      <TabsContent value="account">
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
      </TabsContent>

      {/* Password Tab */}
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <div className="text-center space-y-1.5 px-2 md:px-0">
              <Header header={"Password"} />
              <p>Change your password. After saving, you'll be logged out.</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="oldPassword">Old Password</Label>
              <Input
                id="oldPassword"
                type="password"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
                placeholder="Enter old password"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              onClick={handlePasswordUpdate}
              disabled={!isPasswordComplete}
            >
              Save Password
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default ManageProfile;
