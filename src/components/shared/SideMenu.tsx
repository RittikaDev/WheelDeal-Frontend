import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../../components/ui/button";
import {
  BookAIcon,
  Car,
  CarFront,
  CreditCard,
  Edit,
  History,
  Home,
  LayoutDashboard,
  Menu,
  UsersRound,
  X,
} from "lucide-react";

import { useAppSelector } from "../../redux/hooks";
import {
  selectCurrentUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { useGetCurrentUserMutation } from "../../redux/features/auth/authApi";

import { verifyToken } from "../../utils/verifyToken";

import ProfileDropdown from "./ProfileDropdown";
import { ThemeSwitcher } from "../themeSwitch/ThemeSwitcher";

import logo from "../../../public/zfitx-logo-icon.png";

const SideMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const token = useAppSelector(useCurrentToken);
  const userEmail = useAppSelector(selectCurrentUser);

  const user = verifyToken(token as string) as { role: "user" | "admin" };
  const role: "user" | "admin" = user.role;

  const [getCurrentUser, { data: currentUser }] = useGetCurrentUserMutation();

  useEffect(() => {
    if (userEmail) getCurrentUser({ email: userEmail.userEmail });
  }, [userEmail, getCurrentUser]);

  const userLinks = (
    <>
      <li>
        <Link className="block w-full" to={"/user/overview"}>
          <Button
            variant={"secondary"}
            size={"lg"}
            className="flex items-center justify-start space-x-2 w-full"
          >
            <LayoutDashboard size={16} />
            <span>Overview</span>
          </Button>
        </Link>
      </li>
      <li>
        <Link className="block w-full" to={"/user/manage-profile"}>
          <Button
            variant="secondary"
            size={"lg"}
            className="flex items-center justify-start space-x-2 w-full"
          >
            <Edit size={16} />
            <span>Manage Profile</span>
          </Button>
        </Link>
      </li>
      <li>
        <Link className="block w-full" to={"/user/manage-payments"}>
          <Button
            variant="secondary"
            size={"lg"}
            className="flex items-center justify-start space-x-2 w-full"
          >
            <CreditCard size={16} />
            <span>Payment Management</span>
          </Button>
        </Link>
      </li>
      <li>
        <Link className="block w-full" to={"/user/payments-history"}>
          <Button
            variant="secondary"
            size={"lg"}
            className="flex items-center justify-start space-x-2 w-full"
          >
            <History size={16} />
            <span>Payments History</span>
          </Button>
        </Link>
      </li>
    </>
  );

  const adminLinks = (
    <>
      <li>
        <Link className="block w-full" to={"/admin/overview"}>
          <Button
            variant={"secondary"}
            size={"lg"}
            className="flex items-center justify-start space-x-2 w-full"
          >
            <LayoutDashboard size={16} />
            <span>Overview</span>
          </Button>
        </Link>
      </li>
      <li>
        <Link className="block w-full" to={"/admin/manage-cars"}>
          <Button
            variant="secondary"
            size={"lg"}
            className="flex items-center justify-start space-x-2 w-full"
          >
            <Car size={16} />
            <span>Manage Cars</span>
          </Button>
        </Link>
      </li>
      <li>
        <Link className="block w-full" to={"/admin/manage-bookings"}>
          <Button
            variant="secondary"
            size={"lg"}
            className="flex items-center justify-start space-x-2 w-full"
          >
            <BookAIcon size={16} />
            <span>Manage Bookings</span>
          </Button>
        </Link>
      </li>
      <li>
        <Link className="block w-full" to={"/admin/manage-return-cars"}>
          <Button
            variant="secondary"
            size={"lg"}
            className="flex items-center justify-start space-x-2 w-full"
          >
            <CarFront size={16} />
            <span>Manage Return Cars</span>
          </Button>
        </Link>
      </li>
      <li>
        <Link className="block w-full" to={"/admin/manage-users"}>
          <Button
            variant="secondary"
            size={"lg"}
            className="flex items-center justify-start space-x-2 w-full"
          >
            <UsersRound size={16} />
            <span>User Management</span>
          </Button>
        </Link>
      </li>
      <li>
        <Link className="block w-full" to={"/admin/all-payments"}>
          <Button
            variant="secondary"
            size={"lg"}
            className="flex items-center justify-start space-x-2 w-full"
          >
            <CreditCard size={16} />
            <span>All Payments</span>
          </Button>
        </Link>
      </li>
    </>
  );

  return (
    <div className="lg:basis-[20%] basis-full lg:h-screen bg-background border-b lg:border-b-0 lg:border-r border-r-0 fixed top-0 lg:sticky w-full z-10">
      <div className="px-2 py-3 lg:p-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="hidden lg:flex items-center space-x-1">
          <img src={logo} alt="logo" className="h-8 w-8" />
          <span className="text-2xl font-semibold">RentGo</span>
        </Link>
        <div className="lg:hidden ml-1">
          <ProfileDropdown
            size="10"
            align="start"
            profileImage={currentUser?.data?.profileImage}
            name={currentUser?.data?.name}
          />
        </div>

        <div className="flex items-center space-x-2">
          <ThemeSwitcher />
          {/* Menu Toggle Button for Mobile */}
          <button
            className="lg:hidden active:scale-95 transition duration-150"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* SideMenu Navigation - Hidden by default on mobile */}
      <nav
        className={`lg:block transition-all duration-300 ease-in-out px-2 lg:px-4 py-2 ${
          isMenuOpen ? "right-0" : "right-full"
        } absolute lg:static top-20  w-full bg-background lg:bg-transparent h-screen lg:h-auto`}
      >
        <ul className="lg:p-0 space-y-2">
          <li>
            <Link className="block w-full" to={"/"}>
              <Button
                size={"lg"}
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
