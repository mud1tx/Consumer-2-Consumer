import React from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import { Carousel } from "react-responsive-carousel";
import "../../components/Custom.css";

import "react-responsive-carousel/lib/styles/carousel.min.css";

const HeroSection = () => {
  return (
    <>
    <div className="dark:bg-gray-900  font-Poppins h-full flex items-center  bg-backgound_white">
      <div className="flex flex-col lg:flex-row  items-stretch justify-between lg:px-0 px-6 lg:py-20 py-8 2xl:mx-auto 2xl:container">
        <div className="z-30   relative lg:w-1/2">
          <div className="hidden dark:bg-gray-800  w-full lg:w-10/12 lg:h-full lg:flex justify-end items-center">
            <div className="w-full lg:w-auto lg:-mr-32">
              <Carousel
                infiniteLoop
                autoPlay
                showStatus={false}
                showArrows={false}
                showThumbs={false}
                showIndicators={false}
                stopOnHover={true}
                interval={2000}
              >
                <div>
                  <img
                    src={require("../../assets/View-1.jpg")}
                    alt="ProductImage"
                    className="w-full rounded-sm relative z-30 lg:pl-20 px-6 py-14"
                  />
                </div>
                <div>
                  <img
                    src={require("../../assets/View-2.jpg")}
                    alt="ProductImage"
                    className="w-full rounded-sm relative z-30 lg:pl-20 px-6 py-14"
                  />
                </div>
                <div>
                  <img
                    src={require("../../assets/View-3.jpg")}
                    alt="ProductImage"
                    className="w-full rounded-sm relative z-30 lg:pl-20 px-6 py-14"
                  />
                </div>
                <div>
                  <img
                    src={require("../../assets/View-4.jpg")}
                    alt="ProductImage"
                    className="w-full rounded-sm relative z-30 lg:pl-20 px-6 py-14"
                  />
                </div>
              </Carousel>
            </div>
          </div>
          <div className="absolute top-0 dark:bg-gray-800 bg-gray-100 md:h-96 w-full hidden md:block lg:hidden"></div>
          <div className="w-full h-full lg:hidden">
            <Carousel
              infiniteLoop
              autoPlay
              showStatus={false}
              showArrows={false}
              showThumbs={false}
              showIndicators={false}
              stopOnHover={true}
              interval={2000}
            >
              <div>
                <img
                  src={require("../../assets/View-1.jpg")}
                  alt="ProductImage"
                  className="w-full rounded-sm relative  lg:pl-20 md:px-6 py-5 md:py-14"
                />
              </div>
              <div>
                <img
                  src={require("../../assets/View-2.jpg")}
                  alt="ProductImage"
                  className="w-full rounded-sm relative  lg:pl-20 md:px-6 py-5 md:py-14"
                />
              </div>
              <div>
                <img
                  src={require("../../assets/View-3.jpg")}
                  alt="ProductImage"
                  className="w-full rounded-sm relative  lg:pl-20 md:px-6 py-5 md:py-14"
                />
              </div>
              <div>
                <img
                  src={require("../../assets/View-4.jpg")}
                  alt="ProductImage"
                  className="w-full rounded-sm relative  lg:pl-20 md:px-6 py-5 md:py-14"
                />
              </div>
            </Carousel>
          </div>
        </div>
        <div className=" bg-gray-100 dark:bg-gray-800 font-Poppins lg:w-1/2 lg:ml-12 lg:p-14 p-8 flex items-center">
          <div>
            <h1 className=" md:w-8/12 lg:w-10/12 xl:8/12 2xl:w-8/12 w-full xl:text-6xl sm:text-5xl text-4xl  font-semibold  text-text_color capitalize">
              {" "}
              Con
              <span className="text-primary clip-path-polygon-[0_0,_100%_0,_100%_100%,_0_calc(100%_-_1rem)]">
                sumer
              </span>
              <span>{"  "}To</span> Consum<span className="text-primary">er</span>
            </h1>
            <p className="dark:text-gray-300 md:w-9/12 lg:w-11/12 xl:w-10/12 2xl:9/12 text-base leading-normal text-text_color mt-5">
            C2C stands for “consumer to consumer” or “customer to customer”; it’s a business model that fosters commerce between private individuals, usually in an online environment.
             C2C companies act as intermediaries to foster engagement and help 
             consumers reach bigger audiences.
            </p>
            <div>
              <button className="dark:bg-white  gap-4 text-primary hover:text-text_color duration-700 rounded-sm dark:hover:bg-gray-400 dark:hover:text-gray-100 dark:text-gray-800 sm:w-auto w-full mt-8 text-base justify-between focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 focus:outline-none hover:bg-primary font-medium leading-none  py-4 px-8 border border-primary flex items-center">
              Swipe Down <AiOutlineArrowDown ></AiOutlineArrowDown>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
 
    </>
  );
};

export default HeroSection;
