import { Routes, Route } from "react-router-dom";
import ShopPage from "./pages/ShopPage";
import React from "react";
import AdminProductsPage from "./pages/AdminProductsPage";
import AddProductsPage from "./pages/AddProductsPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import LendPage from "./pages/LendPage";
import Login from "./features/Authentication/Login";
import Signup from "./features/Authentication/Signup";
import PrivateRoute from "./features/PrivateRoutes/PrivateRoutes";
import { User } from "./redux/action/authUser";
import { useDispatch } from "react-redux";
import ResetPassword from "./features/Authentication/ResetPassword";
import NewPassword from "./features/Authentication/NewPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BorrowPage from "./pages/BorrowPage";
import ChatPager from "./pages/ChatPager";
import Navbar from "./components/Navbar";
import ProductDetailPage from "./pages/ProductDetailPage";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const dispatch = useDispatch();

  const loggedInUser = sessionStorage.getItem("userLoggedIn");
  if (loggedInUser) {
    const foundUser = JSON.parse(loggedInUser);
    dispatch(User(foundUser));
  }

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<ShopPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/:prodId" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/admin/add-product" element={<AddProductsPage />} />
          <Route path="/admin/admin-products" element={<AdminProductsPage />} />
          <Route path="/admin/lend" element={<LendPage />} />
          <Route path="/admin/borrow" element={<BorrowPage />} />
          <Route path="/admin/chats" element={<ChatPager />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/new-password/:token" element={<NewPassword />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
