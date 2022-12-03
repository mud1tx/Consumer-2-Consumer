import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineShopping } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdProductionQuantityLimits } from "react-icons/md";
import { MdAddTask } from "react-icons/md";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { HiOutlineLogout } from "react-icons/hi";
import {
  AiOutlineLogin,
  AiOutlineClose,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

import { useSelector, useDispatch } from "react-redux";
import { User } from "../redux/action/authUser";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLoggedIn = useSelector((state) => state.authenticateUser);
  const [show, setShow] = useState(null);
  const [profile, setProfile] = useState(false);
  // const [logoutRefresh, setLogoutRefresh] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const logoutApiResponse = await fetch("http://localhost:5000/logout", {
        method: "POST",
      });

      const logoutData = await logoutApiResponse.json();

      sessionStorage.clear();
      let data = logoutData;
      dispatch(User({ data }));
      // setLogoutRefresh(true);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="  fixed  bg-main_white shadow-sm  w-full z-40  ">
        {/* Code block starts */}
        <nav className="shadow xl:block hidden  bg-main_white">
          <div className="mx-auto container px-6 py-2 xl:py-0">
            <div className="flex items-center justify-between">
              <div className="flex w-full sm:w-auto items-center sm:items-stretch justify-end sm:justify-start">
                <div className="flex flex-row items-center ">
                  <img
                    className="rounded h-10 w-10 object-cover"
                    alt="Logo"
                    src={require("../assets/company-logo.png")}
                  />
                </div>
              </div>
              <div className="flex">
                <div className="hidden xl:flex md:mr-6 xl:mr-16">
                  <div className=" flex px-5 items-center transform  overflow-x-hidden overflow-y-hidden  focus:bg-primary   py-6 text-md leading-5 text-text_color hover:bg-primary hover:text-text_color  focus:outline-none transition duration-500 ease-in-out">
                    <NavLink to="/">Shop</NavLink>
                  </div>
                  {userLoggedIn?.isLoggedIn && (
                    <div className=" flex px-5 items-center py-6 text-md leading-5 text-text_color hover:bg-primary hover:text-text_color focus:bg-gray-100 focus:outline-none transition duration-700 ease-in-out">
                      <NavLink to="/cart">Cart</NavLink>
                    </div>
                  )}
                  {userLoggedIn?.isLoggedIn && (
                    <div className=" flex px-5 items-center py-6 text-md leading-5 text-text_color hover:bg-primary hover:text-text_color focus:bg-gray-100 focus:outline-none transition duration-700 ease-in-out">
                      <NavLink to="/products">Products</NavLink>
                    </div>
                  )}

                  {userLoggedIn?.isLoggedIn && (
                    <div className=" flex px-5 items-center py-6 text-md leading-5 text-text_color hover:bg-primary hover:text-text_color focus:bg-gray-100 focus:outline-none transition duration-700 ease-in-out">
                      <NavLink to="/orders">Orders</NavLink>
                    </div>
                  )}

                  {userLoggedIn?.isLoggedIn && (
                    <div className=" flex px-5 items-center py-6 text-md leading-5 text-text_color hover:bg-primary hover:text-text_color focus:bg-gray-100 focus:outline-none transition duration-700 ease-in-out">
                      <NavLink to="/admin/add-product">Add Products</NavLink>
                    </div>
                  )}
                </div>
                <div className="hidden xl:flex items-center">
                  <div className="relative flex items-center justify-between  md:mr-6 my-2">
                    <input
                      className="  focus:shadow-xl drop-shadow-md  focus:outline-none rounded w-full bg-backgound_white text-sm text-text_color pl-8   py-2"
                      type="text"
                      placeholder="Search"
                    />
                    <CiSearch className="text-2xl text-text_color absolute pl-2  " />
                  </div>
                  <div className=" relative flex  items-center ">
                    <div
                      className="flex items-center relative"
                      onClick={() => setProfile(!profile)}
                    >
                      {profile && (
                        <ul className="p-2 w-40 border-r bg-main_color-1000 absolute bg-white rounded right-0 shadow top-0 mt-16 ">
                          <li className="cursor-pointer px-2 hover:bg-primary  rounded-sm duration-700 text-main_color-200 text-sm leading-3 tracking-normal py-2   focus:outline-none">
                            <div className="flex items-center">
                              <AiOutlineLogin className="text-xl" />
                              <span className="ml-2">
                                <NavLink to="/login">Login</NavLink>
                              </span>
                            </div>
                          </li>
                          <li className="cursor-pointer px-2 hover:bg-primary rounded-sm duration-700 text-main_color-200 text-sm leading-3 tracking-normal mt-2 py-2  focus:text-main_color-200 focus:outline-none flex items-center">
                            <AiOutlineUserAdd className="text-2xl " />
                            <span className="ml-2">
                              <NavLink to="/signup">SignUp</NavLink>
                            </span>
                          </li>
                        </ul>
                      )}
                      {/* <div className="cursor-pointer  text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"></div> */}

                      <div className="ml-2 text-main_color-200 flex items-center">
                        <FaUserCircle className="text-3xl cursor-pointer text-text_color" />
                      </div>
                    </div>
                    <div className="cursor-pointer flex items-center  flex-row-reverse text-text_color text-lg leading-3 tracking-normal  ml-4  focus:outline-none ">
                      <form onSubmit={handleFormSubmit}>
                        <input type="hidden" name="logout" value="" />
                        <button type="submit" className="text-base">
                          <HiOutlineLogout className="text-3xl text-text_color focus:outline-none outline-none  hover:text-red-500  ml-4" />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* For the mobile responsive nav bar started from here */}

        <nav>
          <div className="py-2 px-6 w-full flex xl:hidden justify-between items-center bg-main_white fixed top-0 z-10">
            <div className="w-24">
              <img
                className="rounded h-10 w-10 object-cover"
                alt="Logo"
                src={require("../assets/company-logo.png")}
              />
            </div>
            <div className="flex items-center duration-700 ">
              <div className=" mr-6 flex items-center justify-items-center ">
                <input
                  className="bg-backgound_white focus:outline-none drop-shadow-md  focus:shadow-xl rounded w-full text-sm text-text_color  pl-10 py-2"
                  type="text"
                  placeholder="Search"
                />
                <CiSearch className="text-2xl text-text_color absolute pl-2  " />
              </div>
              <div
                id="menu"
                className="text-white"
                onClick={() => setShow(!show)}
              >
                {show ? (
                  " "
                ) : (
                  <GiHamburgerMenu className="text-2xl text-primary" />
                )}
              </div>
            </div>
          </div>
          {/*Mobile responsive sidebar*/}
          <div
            className={
              show
                ? "fixed w-full h-full transform -translate-x-0 duration-700 z-40"
                : "absolute w-full h-full transform -translate-x-full duration-700 z-40"
            }
            id="mobile-nav"
          >
            <div
              className="bg-main_white opacity-25 w-full h-full"
              onClick={() => setShow(!show)}
            />
            <div className="w-64 z-40 fixed overflow-y-auto  top-0 bg-main_white shadow h-full flex-col justify-between xl:hidden pb-4 transition duration-150 ease-in-out">
              <div className="px-6 h-full">
                <div className="flex flex-col justify-between h-full w-full">
                  <div>
                    <div className="mt-6 flex w-full items-center justify-between">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <img
                            className="rounded h-10 w-10 object-cover"
                            alt="Logo"
                            src={require("../assets/company-logo.png")}
                          />
                        </div>
                      </div>
                      <div
                        id="cross"
                        className=""
                        onClick={() => setShow(!show)}
                      >
                        <AiOutlineClose className="text-xl text-primary" />
                      </div>
                    </div>
                    <ul className="f-m-m flex flex-col gap-4">
                      <span className="cursor-pointer mt-10 ">
                        <li className=" hover:bg-primary transform transition duration-500 hover:scale-105 ">
                          <div className="flex  items-center p-2">
                            <div className="w-6 h-6 md:w-8 md:h-8 ">
                              <AiOutlineShopping className="text-xl text-text_color " />
                            </div>
                            <p className="text-text_color xl:text-base text-base ml-3">
                              <NavLink to="/">Shop</NavLink>
                            </p>
                          </div>
                        </li>
                      </span>
                      <span className="cursor-pointer">
                        <li className=" hover:bg-primary transform transition duration-500 hover:scale-105 ">
                          <div className="flex  items-center p-2">
                            <div className="w-6 h-6 md:w-8 md:h-8 ">
                              <AiOutlineShoppingCart className="text-xl text-text_color " />
                            </div>
                            <p className="text-text_color xl:text-base text-base ml-3">
                              <NavLink to="/cart">Cart</NavLink>
                            </p>
                          </div>
                        </li>
                      </span>
                      <span className="cursor-pointer">
                        <li className=" hover:bg-primary transform transition duration-500 hover:scale-105 ">
                          <div className="flex  items-center p-2">
                            <div className="w-6 h-6 md:w-8 md:h-8 ">
                              <MdProductionQuantityLimits className="text-xl text-text_color " />
                            </div>
                            <p className="text-text_color xl:text-base text-base ml-3">
                              <NavLink to="/products">Products</NavLink>
                            </p>
                          </div>
                        </li>
                      </span>
                      <span className="cursor-pointer">
                        <li className=" hover:bg-primary transform transition duration-500 hover:scale-105 ">
                          <div className="flex  items-center p-2">
                            <div className="w-6 h-6 md:w-8 md:h-8 ">
                              <MdAddTask className="text-xl text-text_color " />
                            </div>
                            <p className="text-text_color xl:text-base text-base ml-3">
                              <NavLink to="/orders">Orders</NavLink>
                            </p>
                          </div>
                        </li>
                      </span>

                      <span className="cursor-pointer">
                        <li className=" hover:bg-primary transform transition duration-500 hover:scale-105 ">
                          <div className="flex  items-center p-2">
                            <div className="w-6 h-6 md:w-8 md:h-8 ">
                              <AiOutlineFolderAdd className="text-xl text-text_color " />
                            </div>
                            <p className="text-text_color xl:text-base text-base ml-3">
                              <NavLink to="/admin/add-product">
                                Add Products
                              </NavLink>
                            </p>
                          </div>
                        </li>
                      </span>

                      <p className="cursor-pointer">
                        <li className=" hover:bg-primary transform transition duration-500 hover:scale-105 ">
                          <div className="flex  items-center p-2">
                            <form onSubmit={handleFormSubmit}>
                              <input type="hidden" name="logout" value="" />
                              <button
                                type="submit"
                                className="text-text_color gap-4 flex flex-row items-center justify-between focus:outline-none xl:text-base  text-base "
                              >
                                <span className="">
                                  <HiOutlineLogout className=" text-xl text-text_color focus:outline-none outline-none  hover:text-secondry " />
                                </span>
                                Logout
                              </button>
                            </form>
                          </div>
                        </li>
                      </p>
                    </ul>
                  </div>
                  <div className="w-full pt-4">
                    <div className="border-t border-gray-400">
                      <ul className="flex justify-between mt-4 flex-row ">
                        <li className="cursor-pointer  ">
                          <button
                            className="border rounded-sm border-primary px-3 py-1 text-base hover:bg-primary 
                          focus:outline-none
                          shadow-sm hover:shadow-2xl hover:text-text_color duration-500 text-primary"
                          >
                            <NavLink to="/login">Login</NavLink>
                          </button>
                        </li>
                        <li className="cursor-pointer  ">
                          <button
                            className="border rounded-sm shadow-sm 
                          focus:outline-none
                          hover:shadow-2xl border-primary px-3 py-1 hover:bg-primary hover:text-text_color duration-700 text-base text-primary"
                          >
                            <NavLink to="/signup">SignUp</NavLink>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Navbar End From here */}

        {/* Code block ends */}
      </div>
    </>
  );
};

export default Navbar;
