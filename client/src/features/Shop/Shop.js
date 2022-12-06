import React, { useState, useEffect } from "react";
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import Cards from "../../layouts/Cards";
import { useSelector } from "react-redux";
import SkeletonComp from "../../components/SkeletonComp";

const Shop = () => {
  const searchData = useSelector((state) => state.searchInputReducer);
  // console.log(searchData);

  const [allProductsData, setAllProductsData] = useState([]);
  const [searchProduct, setSearchProduct] = useState([]);
  const [marker, setMarker] = useState(true);
  const [secMarker, setSecMarker] = useState(false);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/");
        const json = await response.json();
        console.log(json);
        setAllProductsData(json);
        setMarker(false);
        setSecMarker(true);
      } catch (err) {
        console.log("Error", err);
      }
    };
    fetchAllProducts();
  }, []);

  useEffect(() => {
    let searchInputDataArray = [];
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
      return;
    });
    // console.log("nhkkh", searchInputDataArray);
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
        [secMarker && <h1>Shop is Empty😐.Please come again tomorrow</h1>]
      )}
    </div>
  );
};

export default Shop;
