import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";
// import Hero from "./Hero";
import Cards from "../../layouts/Cards";

const Shop = () => {
  const [allProductsData, setAllProductsData] = useState([]);
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
  return (
    <div className="  bg-main_color-200 ">
      
      {allProductsData?.length > 0 ? (
        <Cards allProductsData={allProductsData} />
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
