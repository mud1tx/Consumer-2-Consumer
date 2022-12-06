import React, { useState, useEffect } from "react";
import Shop from "../features/Shop/Shop";
import Navbar from "../components/Navbar";
import HeroSection from "../features/Shop/HeroSection";
import { useSelector } from "react-redux";

const ShopPage = () => {
  const searchData = useSelector((state) => state.searchInputReducer);

  const [searchProduct, setSearchProduct] = useState(searchData);

  useEffect(() => {
    setSearchProduct(searchData);
  }, [searchData]);
  return (
    <div className="bg-main_color-100">
      <Navbar />
      {searchProduct === "" ? <HeroSection /> : <></>}
      <Shop />
    </div>
  );
};

export default ShopPage;
