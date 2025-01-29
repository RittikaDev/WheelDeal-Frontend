import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { useAppSelector } from "../../redux/hooks";
import {
  selectCurrentUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { useGetCurrentUserMutation } from "../../redux/features/auth/authApi";

import { ThemeSwitcher } from "../themeSwitch/ThemeSwitcher";
import { verifyToken } from "../../utils/verifyToken";
import { IMenuItem } from "../../types";

import { FormInput, LogInIcon, Menu, X } from "lucide-react";
// import logo from "../../../assets/car.svg";
import { Button } from "../ui/button";
import ProfileDropdown from "./ProfileDropdown";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Use the selector to automatically update when the user is logged in
  const loggedInUser = useAppSelector(selectCurrentUser);
  const token = useAppSelector(useCurrentToken);
  const userEmail = useAppSelector(selectCurrentUser);

  const [getCurrentUser, { data: currentUser, isLoading }] =
    useGetCurrentUserMutation();

  useEffect(() => {
    if (userEmail) getCurrentUser({ email: userEmail.userEmail });
  }, [userEmail, getCurrentUser]);

  let user;
  if (token) user = verifyToken(token as string) as { role: "user" | "admin" };

  const menus: IMenuItem[] = [
    {
      menuId: 1,
      label: "Home",
      path: "/",
    },
    {
      menuId: 2,
      label: "All Products",
      path: "/cars",
    },
    {
      menuId: 3,
      label: "About Us",
      path: "/about-us",
    },
  ];

  if (!isLoading && loggedInUser) {
    menus.push({
      menuId: 4,
      label: "Dashboard",
      path:
        (user?.role === "admin" && "/admin") ||
        (user?.role === "user" && "/user") ||
        "/",
    });
  }
  return (
    <header className="z-50 sticky top-0 bg-background border-b">
      <nav className="max-w-7xl mx-auto gap-3 px-5 sticky top-0 py-3 lg:py-3">
        <div className="flex items-center justify-between">
          <Link className="flex items-center space-x-1" to="/">
            <img
              src="/wheelDeal-logo.png"
              className="h-10 w-10 mt-2"
              alt="wheelDeal"
            />
            <span className="text-2xl font-semibold">WheelDeal</span>
          </Link>
          <ul
            className={`z-10 flex absolute bg-background w-[80%] flex-col top-0 lg:w-auto lg:static lg:flex-row lg:bg-transparent lg:items-center lg:space-x-8 h-screen lg:h-auto ${
              isMenuOpen ? "left-0" : "-left-full"
            } transition-all duration-300`}
          >
            <li className="flex justify-between p-4 lg:hidden">
              <Link className="flex items-center space-x-1" to="/">
                <img src="/wheelDeal-logo.png" alt="wheelDeal" />
                <span className="text-2xl font-semibold">WheelDeal</span>
              </Link>
              <button
                className="inline-block lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X size={24} />
                ) : (
                  <Menu className="opacity-0" size={24} />
                )}
              </button>
            </li>
            <>
              {menus.map((menu: IMenuItem) => (
                <NavLink
                  className={({ isActive }) =>
                    `py-4 px-4 block lg:py-0 lg:inline-block lg:px-0 ${
                      isActive
                        ? "text-primary font-bold" // Active styles
                        : "hover:bg-primary lg:hover:bg-transparent lg:hover:text-primary"
                    }`
                  }
                  key={menu.menuId}
                  to={menu.path}
                >
                  {menu.label}
                </NavLink>
              ))}
            </>

            <li className="lg:hidden flex flex-col px-2 space-y-2 pt-2">
              <Link to="/signup">
                <Button size={"lg"} variant={"outline"} className="w-full">
                  Sign Up
                </Button>
              </Link>
              <Link to="/login">
                <Button size={"lg"} variant={"default"} className="w-full">
                  Sign In
                </Button>
              </Link>
            </li>
          </ul>

          {/* Conditionally render based on user login state */}
          {!isLoading && loggedInUser ? (
            <div className="flex items-center space-x-6">
              <ThemeSwitcher />
              <ProfileDropdown
                align="end"
                profileImage={currentUser?.data?.profileImage}
                name={currentUser?.data?.name}
                email={currentUser?.data?.email}
              />
              <button
                className="inline-block lg:hidden active:scale-95 duration-50"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu size={24} />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <ThemeSwitcher />
              <button
                className="inline-block lg:hidden active:scale-95 duration-50"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu size={24} />
              </button>
              <div className="space-x-2 hidden lg:inline-block">
                <Link to="/register">
                  <Button size={"lg"} variant="outline">
                    <FormInput />
                    Register
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size={"lg"} variant={"default"}>
                    <LogInIcon />
                    Log In
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
export default NavBar;
