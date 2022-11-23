import { Routes, Route } from "react-router-dom";
import ShopPage from "./pages/ShopPage";
import React, { useEffect } from "react";
import AdminProductsPage from "./pages/AdminProductsPage";
import AddProductsPage from "./pages/AddProductsPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import ProductsPage from "./pages/ProductsPage";
import Login from "./features/Authentication/Login";
import Signup from "./features/Authentication/Signup";
import PrivateRoute from "./features/PrivateRoutes/PrivateRoutes";
import { User } from "./redux/action/authUser";
import { useDispatch } from "react-redux";
import ResetPassword from "./features/Authentication/ResetPassword";
import NewPassword from "./features/Authentication/NewPassword";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("userLoggedIn");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      dispatch(User(foundUser));
    }
  });

  return (
    <Routes>
      <Route path="/" element={<ShopPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/admin/add-product" element={<AddProductsPage />} />
        <Route path="/admin/admin-products" element={<AdminProductsPage />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="/new-password/:token" element={<NewPassword />} />
      <Route path="/signup" element={<Signup />} />
      {/* <Navbar /> */}
    </Routes>
  );
};

export default App;
