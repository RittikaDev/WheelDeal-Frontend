import { Link } from "react-router-dom";

import { logout } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

interface IProps {
  align?: "start" | "end" | "center";
  size?: string;
  profileImage?: string;
  name?: string;
}

const ProfileDropdown = ({ align, size, profileImage, name }: IProps) => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar
          className={`bg-background ring-2 ring-primary ${
            size ? size : "size-12"
          }`}
        >
          <AvatarImage
            src={profileImage}
            alt="Customer avatar"
            className=" w-full "
          />
          <AvatarFallback className="bg-muted dark:bg-primary/15">
            {name?.[0]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align={align}>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link className="w-full" to="/me">
            <Button variant={"outline"} className="w-full">
              Profile
            </Button>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            onClick={handleLogout}
            className="w-full"
            variant={"destructive"}
          >
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
