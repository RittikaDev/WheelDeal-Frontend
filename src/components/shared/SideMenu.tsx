import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useAppSelector } from "../../redux/hooks";
import {
  selectCurrentUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { useGetCurrentUserMutation } from "../../redux/features/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";

import ProfileDropdown from "./ProfileDropdown";
import { ThemeSwitcher } from "../themeSwitch/ThemeSwitcher";

import { Button } from "../../components/ui/button";
import {
  Car,
  Edit,
  Home,
  LayoutDashboard,
  Menu,
  UsersRound,
  X,
} from "lucide-react";

import logo from "../../../public/wheelDeal-logo.png";

const SideMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation(); // Get the current path
  const token = useAppSelector(useCurrentToken);
  const userEmail = useAppSelector(selectCurrentUser);

  const user = verifyToken(token as string) as { role: "user" | "admin" };
  const role: "user" | "admin" = user.role;

  const [getCurrentUser, { data: currentUser }] = useGetCurrentUserMutation();

  useEffect(() => {
    if (userEmail) getCurrentUser({ email: userEmail.userEmail });
  }, [userEmail, getCurrentUser]);

  const isActive = (path: string) => location.pathname === path;

  const userLinks = (
    <>
      <li>
        <Link to="/user">
          <Button
            variant={isActive("/user") ? "default" : "secondary"}
            size="lg"
            className="flex items-center justify-start space-x-2 w-full"
          >
            <LayoutDashboard size={16} />
            <span>Overview</span>
          </Button>
        </Link>
      </li>
      <li>
        <Link to="/user/track-my-order">
          <Button
            variant={isActive("/user/track-my-order") ? "default" : "secondary"}
            size="lg"
            className="flex items-center justify-start space-x-2 w-full"
          >
            <LayoutDashboard size={16} />
            <span>Track My Order</span>
          </Button>
        </Link>
      </li>
      <li>
        <Link to="/user/manage-profile">
          <Button
            variant={isActive("/user/manage-profile") ? "default" : "secondary"}
            size="lg"
            className="flex items-center justify-start space-x-2 w-full"
          >
            <Edit size={16} />
            <span>Manage Profile</span>
          </Button>
        </Link>
      </li>
    </>
  );

  const adminLinks = (
    <>
      <li>
        <Link to="/admin">
          <Button
            variant={isActive("/admin") ? "default" : "secondary"}
            size="lg"
            className="flex items-center justify-start space-x-2 w-full"
          >
            <UsersRound size={16} />
            <span>Manage Users</span>
          </Button>
        </Link>
      </li>
      <li>
        <Link to="/admin/manage-product">
          <Button
            variant={
              isActive("/admin/manage-product") ? "default" : "secondary"
            }
            size="lg"
            className="flex items-center justify-start space-x-2 w-full"
          >
            <Car size={16} />
            <span>Manage Products</span>
          </Button>
        </Link>
      </li>
      <li>
        <Link to="/admin/manage-orders">
          <Button
            variant={isActive("/admin/manage-orders") ? "default" : "secondary"}
            size="lg"
            className="flex items-center justify-start space-x-2 w-full"
          >
            <UsersRound size={16} />
            <span>Manage Orders</span>
          </Button>
        </Link>
      </li>
    </>
  );

  return (
    <div className="lg:basis-[20%] basis-full lg:h-screen bg-background border-b lg:border-b-0 lg:border-r border-r-0 fixed top-0 lg:sticky w-full z-10">
      <div className="px-2 py-3 lg:p-4 flex items-center justify-between">
        <Link to="/" className="hidden lg:flex items-center space-x-1">
          <img src={logo} alt="logo" className="h-10 w-10 mt-2" />
          <span className="text-2xl font-semibold">WheelDeal</span>
        </Link>
        <div className="lg:hidden ml-1">
          <ProfileDropdown
            size="10"
            align="start"
            profileImage={currentUser?.data?.profileImage}
            name={currentUser?.data?.name}
            email={currentUser?.data?.email}
          />
        </div>

        <div className="flex items-center space-x-2">
          <ThemeSwitcher />
          <button
            className="lg:hidden active:scale-95 transition duration-150"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <nav
        className={`lg:block transition-all duration-300 ease-in-out px-2 lg:px-4 py-2 ${
          isMenuOpen ? "right-0" : "right-full"
        } absolute lg:static top-20  w-full bg-background lg:bg-transparent h-screen lg:h-auto`}
      >
        <ul className="lg:p-0 space-y-2">
          <li>
            <Link to="/">
              <Button
                variant={isActive("/") ? "default" : "secondary"}
                size="lg"
                className="flex items-center justify-start space-x-2 w-full"
              >
                <Home size={16} />
                <span>Home</span>
              </Button>
            </Link>
          </li>
          {role === "admin" ? adminLinks : userLinks}
        </ul>
      </nav>
    </div>
  );
};

export default SideMenu;
