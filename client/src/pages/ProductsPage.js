import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductsPage = () => {
  return (
    <div className="2xl:container 2xl:mx-auto h-screen bg-backgound_white lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4  ">
      <div className="flex justify-center items-center px-4 py-4 lg:flex-row flex-col-reverse gap-8">
        {/* <!-- Description Div --> */}

        <div className="  w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
          <p className=" focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-text_color">
            Home / ProductName / Product
          </p>
          <h2 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-primary  mt-4">
            Wooden Stool
          </h2>

          <p className=" font-normal text-base leading-6 text-text_color mt-8">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using. Lorem Ipsum is that it has a more-or-less normal
            distribution of letters.
          </p>
          <h1 className=" font-normal  leading-6 text-text_color text-lg mt-8">
            Category:{" "}
            <span className="text-base">
              Reader will be distracted by the readable
            </span>
          </h1>
          <p className=" font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6 ">
            1299.00 INR
          </p>

          <button className="focus:outline-none focus:ring-2 border border-primary hover:bg-primary  duration-700 focus:ring-offset-2 focus:ring-gray-800 font-medium text-base hover:text-text_color leading-4  text-primary w-full py-5 lg:mt-12 mt-6">
            Add to shopping bag
          </button>
          <button className="focus:outline-none focus:ring-2 border border-primary hover:bg-primary  duration-700 focus:ring-offset-2 focus:ring-gray-800 font-medium text-base hover:text-text_color leading-4  text-primary w-full py-5 lg:mt-12 mt-6">
            Buy Now
          </button>
        </div>

        <div className=" w-full sm:w-96 md:w-8/12  lg:w-6/12  lg:gap-8 sm:gap-6 gap-4">
          <Carousel
            showStatus={false}
            showArrows={false}
            showIndicators={false}
            showThumbs={true}
          >
            <div>
              <img
                src={require("../features/Shop/View-1.jpg")}
                alt="image with decent chairs"
                className=""
              />
            </div>
            <div>
              <img
                src={require("../features/Shop/View-2.jpg")}
                alt="image with decent chairs"
                className=""
              />
            </div>
            <div>
              <img
                src={require("../features/Shop/View-3.jpg")}
                alt="image with decent chairs"
                className=""
              />
            </div>
            <div>
              <img
                src={require("../features/Shop/View-4.jpg")}
                alt="image with decent chairs"
                className=""
              />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
