import { Navigate, Outlet } from "react-router-dom";

interface Props {}

export const PrivateRouteAuth = (props: Props) => {
  const isLoggedIn = Boolean(localStorage.getItem("access_token"));
  if (isLoggedIn) return <Navigate to="/admin" />;
  return <Outlet />;
};
