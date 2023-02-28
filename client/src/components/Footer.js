import React from "react";
import { BsFacebook ,BsInstagram ,BsGithub ,BsLinkedin} from "react-icons/bs";


const Footer = () => {
    return (
        <div className="mx-auto font-Poppins container xl:px-20 lg:px-12 sm:px-6  px-4 py-12">
            <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center ">
                  <img
                    className=" h-12 w-12 object-cover"
                    alt="Logo"
                    src={require("../assets/company-logo.png")}
                  />
                </div>
                {/* <div className="flex flex-wrap sm:gap-10 gap-8 items-center justify-center mt-8">
                    <p className="hover:text-primary text-base cursor-pointer leading-4 text-text_color">Shop</p>
                    <p className="hover:text-primary text-base cursor-pointer leading-4 text-text_color">Cart</p>
                    <p className="hover:text-primary text-base cursor-pointer leading-4 text-text_color">Orders</p>
                    <p className="hover:text-primary text-base cursor-pointer leading-4  text-text_color">Add Products</p>
                    <p className="hover:text-primary text-base cursor-pointer leading-4  text-text_color">Admin Product</p>
                    <p className="hover:text-primary text-base cursor-pointer leading-4  text-text_color">Lend</p>
                    <p className="hover:text-primary text-base cursor-pointer leading-4  text-text_color">Borrowed</p>
                </div> */}
                <div className="flex items-center gap-x-8 mt-6">
                <div className="cursor-pointer  rounded-full p-2 shadow-2xl   border-2 hover:bg-facebook border-facebook hover:text-main_white text-facebook duration-500   ">
                    <BsFacebook className="text-xl   hover:shadow-sm"/>
                    </div>
                    <div className="cursor-pointer  rounded-full p-2 shadow- border-2 border-instagram hover:bg-instagram  text-instagram duration-500   hover:text-main_white">
                       <BsInstagram className="md:text-xl text-lg shadow-2xl "/>
                    </div>
                    <div className="cursor-pointer  rounded-full p-2 shadow-2xl  border-2 border-github hover:bg-github text-github duration-500   hover:text-main_white">

                       <BsGithub className="text-xl "/>
                    </div>
                    <div className="cursor-pointer  rounded-full p-2 shadow-2xl  border-2 hover:bg-linkedin border-linkedin text-link duration-500 text-linkedin  hover:text-main_white">
                       <BsLinkedin className="text-xl "/>
                    </div>
                </div>
                <div className="flex items-center mt-6">
                    <p className="md:text-base text-xs leading-4 text-text_color">
                        2021-22 <span className="font-semibold">Consumer to Consumer</span>
                    </p>
                    <div className="border-l border-gray-800 pl-2 ml-2">
                        <p className="md:text-base text-xs leading-4 text-gray-800">Inc. All rigths reserved</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
