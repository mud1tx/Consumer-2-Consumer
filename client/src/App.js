import "./App.css";
import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import ShopPage from "./pages/ShopPage";
import React from "react";
import AdminProductsPage from "./pages/AdminProductsPage";
import AddProductsPage from "./pages/AddProductsPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import ProductsPage from "./pages/ProductsPage";
import Login from "./features/Authentication/Login";
import Signup from "./features/Authentication/Signup";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ShopPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/admin/add-product" element={<AddProductsPage />} />
      <Route path="/admin/admin-products" element={<AdminProductsPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* <Navbar /> */}
    </Routes>
  );
};

export default App;
