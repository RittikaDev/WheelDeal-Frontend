import { Outlet } from "react-router-dom";
import { useEffect } from "react";

import { useGetCurrentUserMutation } from "../../redux/features/auth/authApi";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";

import ProfileDropdown from "../shared/ProfileDropdown";
import SideMenu from "../shared/SideMenu";

const DashboardLayout = () => {
  const userEmail = useAppSelector(selectCurrentUser);
  const [getCurrentUser, { data: currentUser }] = useGetCurrentUserMutation();

  useEffect(() => {
    if (userEmail) getCurrentUser({ email: userEmail.userEmail });
  }, [userEmail, getCurrentUser]);

  console.log(userEmail);

  return (
    <section className="flex flex-col lg:flex-row">
      <SideMenu />
      <div className="pt-20 lg:pt-6 lg:pb-6 px-2 lg:px-8 w-auto lg:w-full">
        <div className="hidden lg:flex justify-end ">
          <ProfileDropdown
            align="end"
            profileImage={currentUser?.data?.profileImage}
            name={currentUser?.data?.name}
          />
        </div>
        <Outlet />
      </div>
    </section>
  );
};

export default DashboardLayout;
