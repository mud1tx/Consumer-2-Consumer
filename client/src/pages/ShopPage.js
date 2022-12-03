import React, { useState, useEffect } from "react";
import Shop from "../features/Shop/Shop";
import Navbar from "../components/Navbar";
import HeroSection from "../features/Shop/HeroSection";
// import Hero from "../features/Shop/Hero";
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
      <HeroSection />
      {/* <div className="bg-main_color-100">
        <h1 className="text-3xl font-semibold  text-main_color-1000 ml-16">
      {searchProduct === "" ? <Hero /> : <></>}
      <div>
        <h1 className="text-3xl font-semibold text-main_color-1000 ml-4">
          Featured Product SoFar
        </h1>
      </div> */}
      <Shop />;
    </div>
  );
};

export default ShopPage;
