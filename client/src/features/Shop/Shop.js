import React, { useState, useEffect } from "react";
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import Cards from "../../layouts/Cards";
import { useSelector } from "react-redux";
import SkeletonComp from "../../components/SkeletonComp";

const Shop = () => {
  const searchData = useSelector((state) => state.searchInputReducer);
  const userLoggedIn = useSelector((state) => state.authenticateUser);
  // console.log(searchData);

  const [allProductsData, setAllProductsData] = useState([]);
  const [searchProduct, setSearchProduct] = useState([]);
  const [marker, setMarker] = useState(true);
  const [secMarker, setSecMarker] = useState(false);

  useEffect(() => {
    const fetchAllProducts = async (userLoggedIn) => {
      try {
        const shopDataApi = await fetch("http://localhost:5000/", {
          method: "POST",
          body: JSON.stringify({
            userData: userLoggedIn?.user?._id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const res = await shopDataApi.json();
        console.log("yahi change kiya hai",res);
        setAllProductsData(res.data);
        setMarker(false);
        setSecMarker(true);
      } catch (err) {
        console.log("Error", err);
      }
    };
    fetchAllProducts(userLoggedIn);
  }, [userLoggedIn]);

  useEffect(() => {
    let searchInputDataArray = [];
    searchInputDataArray = allProductsData.filter((product) => {
      if (
        searchData !== "" &&
        (product.title.toLowerCase().startsWith(searchData.toLowerCase()) ||
          product.title.toLowerCase().includes(searchData.toLowerCase()) ||
          product.category.toLowerCase().startsWith(searchData.toLowerCase()) ||
          product.category.toLowerCase().includes(searchData.toLowerCase()))
      ) {
        return product;
      }
      return;
    });
    setSearchProduct(searchInputDataArray);
  }, [searchData, allProductsData]);

  return (
    <div className=" pt-20 bg-main_color-200 ">
      {marker && (
        <div className="flex flex-wrap  p-4 bg-backgound_white justify-evenly items-center">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonComp key={index} />
          ))}
        </div>
      )}
      {!marker &&
      secMarker &&
      (searchProduct.length > 0 || allProductsData?.length > 0) ? (
        <Cards
          allProductsData={
            searchProduct.length > 0 ? searchProduct : allProductsData
          }
        />
      ) : (
        [secMarker && <h1 key="1">Shop is Empty😐.Please come again tomorrow</h1>]
      )}
    </div>
  );
};

export default Shop;
