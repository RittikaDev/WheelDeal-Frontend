import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

interface IProps {
  children: React.ReactNode;
  roles: string[] | undefined; // Accept an array of roles
}

const ProtectedRoutes = ({ children, roles }: IProps) => {
  const token = useAppSelector(useCurrentToken);
  const location = useLocation();
  const dispatch = useAppDispatch();

  let user;

  if (token) user = verifyToken(token) as { role: "user" | "admin" };

  // If no token is found, redirect to signin page
  if (!token) {
    console.log("No token found, redirecting to login.");
    return <Navigate to="/signin" replace={true} state={{ from: location }} />;
  }

  // If roles are provided, check if the user has any of the allowed roles
  if (roles && !roles.includes(user?.role as string)) {
    dispatch(logout());
    return <Navigate to="/signin" replace={true} />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
