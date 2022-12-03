import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const userLoggedIn = useSelector((state) => state.authenticateUser);
  console.log("data aaya hai user se", userLoggedIn);
  return userLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
