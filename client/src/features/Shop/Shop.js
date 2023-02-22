import React, { useState, useEffect } from "react";
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import Cards from "../../layouts/Cards";
import { useSelector } from "react-redux";
import SkeletonComp from "../../components/SkeletonComp";
import { BASE_URL } from "../../BASE_URL";
import EmptyShopSvg from "../../assets/EmptyShopSvg";
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
        const shopDataApi = await fetch(`${BASE_URL}/`, {
          method: "POST",
          body: JSON.stringify({
            userData: userLoggedIn?.user?._id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const res = await shopDataApi.json();
        console.log("yahi change kiya hai", res);
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
    <div className="   w-full h-full ">
      <h1 className="  text-lg font-Poppins text-center bg-backgound_white text-primary  md:text-4xl font-semibold ">
        Feature Products SoFar:
      </h1>
      {marker && (
        <div className="flex flex-wrap  p-4  justify-evenly items-center">
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
          showChatsCartBtn={true}
          showDeleteBtn={false}
        />
      ) : (
        [
          secMarker && (
            <div className="flex h-screen items-center justify-center flex-col ">
              <div key="1"></div>
              <div className="">
                <EmptyShopSvg />
              </div>
            </div>
          ),
        ]
      )}
    </div>
  );
};

export default Shop;
