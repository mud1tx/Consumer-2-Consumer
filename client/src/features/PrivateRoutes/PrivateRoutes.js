import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const userLoggedIn = useSelector((state) => state.authenticateUser);
  return userLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
