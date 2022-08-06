import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { authActions } from "../../features/auth/authSlice";

interface Props {}

export const PrivateRoute = (props: Props) => {
  const isLoggedIn = Boolean(localStorage.getItem("access_token"));

  const dispatch = useAppDispatch();
  if (isLoggedIn) dispatch(authActions.navigateAdmin());
  if (!isLoggedIn) return <Navigate to="/login" />;
  return <Outlet />;
};
