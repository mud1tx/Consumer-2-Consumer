import React from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import classes from "./Hero.module.css";
// import img from "../Shop/pexels-clem-onojeghuo-375903.jpg"
const Hero = () => {
  return (
    <div className="relative flex flex-col bg-main_color-100 py-16 px-8 lg:pt-0 lg:flex-col lg:pb-0">
      <div className="flex flex-col items-start w-full max-w-xl px-2 mx-auto lg:px-8 lg:max-w-screen-xl">
        <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
          <div className="max-w-xl mb-6">
            {/* <div>
              <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
            Consumer To Consumer 
              </p>
            </div> */}
            <h2 className="max-w-lg mb-6 mt-4  sm:text-5xl text-3xl  font-bold text-main_color-150  ">
              Cons
              <span className="text-main_color-200">umer</span>
              <br className="text-main_color-200  " />
              To
              <span className="inline-block  text-main_color-200 ml-2">
                Cons
                <span className="text-main_color-150">umer</span>
              </span>
            </h2>
            <p className="text-base sm:text-xl text-main_color-25 md:text-lg">
              Consumer to consumer (C2C) is a business model in which
              third-party companies facilitate transactions for products or
              services between private consumers without a business
              participating on either end of the sale. Today, most C2C business
              is conducted via online companies. Before the Internet
            </p>
          </div>
          <div className="flex flex-col items-center md:flex-row">
            <button className="inline-flex gap-2 items-center justify-center w-full h-12 px-6 mb-3 font-medium  text-main_color-100 transition duration-200 rounded shadow-md md:w-auto md:mr-4 md:mb-0 bg-main_color-150 focus:shadow-outline focus:outline-none">
              Swipe Down <AiOutlineArrowDown />
            </button>
            {/* <button
              href="/"
              aria-label=""
              className="inline-flex items-center rounded-sm font-semibold text-main_color-150 border border-main_color-150 px-6 py-2 transition-colors duration-200 hover:text-deep-purple-accent-700"
            >
              Learn more
            </button> */}
          </div>
        </div>
      </div>
      <div className="inset-y-0 right-0 gray w-full max-w-xl px-4 mx-auto lg:pl-8 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-1/2 lg:max-w-full lg:absolute xl:px-0">
        <img
          className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none sm:h-96 lg:h-full"
          src={require("../Shop/pexels-oladimeji-ajegbile-2861798.jpg")}
          alt="Main Img"
        />
      </div>
    </div>
  );
};

export default Hero;
