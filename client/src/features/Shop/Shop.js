import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";
import Cards from "../../layouts/Cards";
import { useSelector } from "react-redux";

const Shop = () => {
  const searchData = useSelector((state) => state.searchInputReducer);
  // console.log(searchData);

  const [allProductsData, setAllProductsData] = useState([]);
  const [searchProduct, setSearchProduct] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/");
        const json = await response.json();
        console.log(json);
        setAllProductsData(json);
      } catch (err) {
        console.log("Error", err);
      }
    };
    fetchAllProducts();
  }, []);

  let searchInputDataArray = [];

  useEffect(() => {
    searchInputDataArray = allProductsData.filter((product) => {
      // console.log("data", searchData, allProductsData);
      if (
        searchData !== "" &&
        (product.title.toLowerCase().startsWith(searchData.toLowerCase()) ||
          product.title.toLowerCase().includes(searchData.toLowerCase()) ||
          product.category.toLowerCase().startsWith(searchData.toLowerCase()) ||
          product.category.toLowerCase().includes(searchData.toLowerCase()))
      ) {
        // console.log("yahi hai array", product);
        return product;
      }
    });
    console.log("nhkkh", searchInputDataArray);
    setSearchProduct(searchInputDataArray);
  }, [searchData, allProductsData]);

  return (
    <div className=" pt-20 bg-main_color-200 ">
      {searchProduct.length > 0 || allProductsData?.length > 0 ? (
        <Cards
          allProductsData={
            searchProduct.length > 0 ? searchProduct : allProductsData
          }
        />
      ) : (
        <div className="flex flex-wrap justify-between w-10/12 m-auto pt-20 sm:pt-0 ">
          <div className="w-64 rounded-md ">
            <div className="">
              <Skeleton className="w-40 h-32" />
            </div>
            <div>
              <p>
                <Skeleton className="w-10px" />
              </p>
              <p>
                <Skeleton className="w-10px" />
              </p>
              <p>
                <Skeleton className="w-10px" />
              </p>
            </div>

            <div className="flex justify-between">
              <p className="w-20 text-2xl">
                <Skeleton />
              </p>
              <p className="w-20 text-2xl">
                <Skeleton />
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
