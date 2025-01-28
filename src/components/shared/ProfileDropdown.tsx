import { logout } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
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
  email?: string;
}

const Profile = ({ align, size, profileImage, name, email }: IProps) => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  // console.log(email);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar
          className={`bg-background ring-2 ring-primary ${
            size ? size : "size-10"
          }`}
        >
          <AvatarImage
            src={profileImage}
            alt="Customer avatar"
            className="w-full"
          />
          <AvatarFallback className="bg-muted dark:bg-primary/15">
            {name?.[0]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 p-3 text-center space-y-2 text-sm"
        align={align}
      >
        <DropdownMenuLabel className="text-xs font-semibold text-primary">
          {email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="space-y-0.5">
          <div className="font-medium text-accent-foreground truncate">
            {name}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button
            onClick={handleLogout}
            className="w-full px-3 py-1.5 text-xs font-medium text-destructive border rounded-md border-destructive hover:bg-destructive/10"
          >
            Log out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
