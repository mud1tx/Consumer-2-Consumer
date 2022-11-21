import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Skeleton from "react-loading-skeleton";
import { BsCartCheck } from "react-icons/bs";
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";

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
  // console.log(allProductsData);
  return (
    <div className="w-10/12 m-auto pt-20 sm:pt-0 ">
      {allProductsData?.length > 0 ? (
        <div className=" flex flex-wrap justify-between  ">
          {allProductsData.map((product) => (
            //  <div  className=" flex ">
            <div key={product._id} className=" bg-main_color-200 rounded-md  ">
              <div className="w-64 h-auto rounded-md">
                <Carousel
                  // length={3}
                  // className="w-20"
                  infiniteLoop
                  autoPlay
                  showStatus={false}
                  showArrows={false}
                  showThumbs={false}
                  showIndicators={false}
                  stopOnHover={true}
                  interval={1000}
                >
                  {product.image.map((img, index) => (
                    <div key={index} className=" ">
                      <img
                        className="w-full"
                        // key={index}
                        src={`data:${product.imageType[index]};base64,${img}`}
                        alt={`${product.category}`}
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
              <div className="Content p-4">
                <h1>
                  <span className="text-md font-bold text-main_color-1000">
                    Title:{" "}
                  </span>
                  {product.title}
                </h1>
                <p>
                  <span className="text-md font-bold text-main_color-1000">
                    Category:{" "}
                  </span>
                  {product.category}
                </p>

                <p>
                  <span className="text-md text-main_color-1000 font-bold">
                    Price:{" "}
                  </span>
                  {product.price}{" "}
                  <span className="text-xs text-main_color-600 ">INR</span>
                </p>
                {/* <p>description:{product.description}</p> */}
                <div className="flex justify-between items-center mt-4 ">
                  <button className="bg-main_color-1000 rounded-sm  text-main_color-200 pl-2 pr-2 pt-1 pb-1">
                    Buy Now
                  </button>

                  <BsCartCheck className="text-main_color-1000 text-2xl" />
                </div>
              </div>
            </div>
            // </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap justify-between w-10/12 m-auto pt-20 sm:pt-0 ">
        <div class="w-64 rounded-md ">
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

        {/* Second Card */}

        <div class="w-64 rounded-md ">
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

        {/* Third card */}


        <div class="w-64 rounded-md ">
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

        {/* Fourth Card */}

        <div class="w-64 rounded-md ">
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

        {/* Fifth Card */}

        <div class="w-64 rounded-md ">
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

        {/* Sixth Card */}

        <div class="w-64 rounded-md ">
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

          {/* Seven Card */}

          <div class="w-64 rounded-md ">
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

          {/* Eigth Card */}

          <div class="w-64 rounded-md   ">
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
