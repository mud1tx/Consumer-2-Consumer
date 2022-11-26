import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AiOutlineLogin,
  AiOutlineClose,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiLogOutCircle } from "react-icons/bi";
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
      <div className="bg-main_color-100 border-b border-main_color-50 border-bottom h-full w-full">
        {/* Code block starts */}
        <nav className="shadow xl:block hidden ">
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
                  <div className="flex px-5 items-center py-6 text-sm leading-5 text-main_color-200 hover:bg-main_color-200 hover:text-main_color-1000 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
                    <NavLink to="/">Shop</NavLink>
                  </div>
                  {userLoggedIn?.isLoggedIn && (
                    <div className="flex px-5 items-center py-6 text-sm leading-5 text-main_color-200 hover:bg-main_color-200 hover:text-main_color-1000 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
                      <NavLink to="/cart">Cart</NavLink>
                    </div>
                  )}
                  {userLoggedIn?.isLoggedIn && (
                    <div className="flex px-5 items-center py-6 text-sm leading-5 text-main_color-200 hover:bg-main_color-200 hover:text-main_color-1000 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
                      <NavLink to="/products">Products</NavLink>
                    </div>
                  )}

                  {userLoggedIn?.isLoggedIn && (
                    <div className="flex px-5 items-center py-6 text-sm leading-5 text-main_color-200 hover:bg-main_color-200 hover:text-main_color-1000 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
                      <NavLink to="/orders">Orders</NavLink>
                    </div>
                  )}

                  {userLoggedIn?.isLoggedIn && (
                    <div className=" flex px-5 items-center py-6 text-sm leading-5 text-main_color-200 hover:bg-main_color-200 hover:text-main_color-1000 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
                      <NavLink to="/admin/add-product">Add Products</NavLink>
                    </div>
                  )}
                </div>
                <div className="hidden xl:flex items-center">
                  <div className="relative md:mr-6 my-2">
                    <input
                      className="bg-main_color-200 focus:outline-none rounded w-full text-sm text-main_color-1000  pl-8 py-2"
                      type="text"
                      placeholder="Search"
                    />
                  </div>
                  <div className="ml-6 relative">
                    <div
                      className="flex items-center relative"
                      onClick={() => setProfile(!profile)}
                    >
                      {profile && (
                        <ul className="p-2 w-40 border-r bg-main_color-1000 absolute rounded right-0 shadow top-0 mt-16 ">
                          <li className="cursor-pointer text-main_color-200 text-sm leading-3 tracking-normal py-2 hover:text-white focus:text-main_color-200 focus:outline-none">
                            <div className="flex items-center">
                              <AiOutlineLogin className="text-xl" />
                              <span className="ml-2">
                                <NavLink to="/login">Login</NavLink>
                              </span>
                            </div>
                          </li>
                          <li className="cursor-pointer text-main_color-200 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-white focus:text-main_color-200 focus:outline-none flex items-center">
                            <AiOutlineUserAdd className="text-2xl " />
                            <span className="ml-2">
                              <NavLink to="/signup">SignUp</NavLink>
                            </span>
                          </li>
                        </ul>
                      )}
                      <div className="cursor-pointer flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"></div>
                      <div className="ml-2 text-main_color-200 flex items-center">
                        <FaUserCircle className="text-3xl" />
                      </div>
                    </div>
                    <div className="cursor-pointer text-main_color-200 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-white focus:text-main_color-200 focus:outline-none flex items-center">
                      <BiLogOutCircle className="text-2xl" />
                      <form
                        onSubmit={handleFormSubmit}
                        // action="/logout"
                        // method="POST"
                      >
                        <input type="hidden" name="logout" value="" />
                        <button type="submit">LogOut</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <nav>
          <div className="py-4 px-6 w-full h-14 flex xl:hidden justify-between items-center bg-main_color-1000 fixed top-0 z-40">
            <div className="w-24">
              <div className="flex flex-row items-center ">
                <img
                  className="rounded h-10 w-10 object-cover"
                  alt="Logo"
                  src={require("../assets/company-logo.png")}
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="relative mr-6 ">
                <input
                  className="bg-main_color-200 focus:outline-none rounded w-full text-sm text-main_color-1000  pl-10 py-2"
                  type="text"
                  placeholder="Search"
                />
              </div>
              <div
                id="menu"
                className="text-gray-800"
                onClick={() => setShow(!show)}
              >
                {show ? (
                  ""
                ) : (
                  <GiHamburgerMenu className="text-2xl text-main_color-200" />
                )}
              </div>
            </div>
          </div>
          {/*Mobile responsive sidebar*/}
          <div
            className={
              show
                ? "w-full xl:hidden h-full absolute z-40  transform   duration-700 translate-x-0 "
                : "   w-full xl:hidden h-full absolute z-40   duration-700 transform -translate-x-full"
            }
          >
            <div
              className="bg-gray-800 opacity-50 w-full h-full"
              onClick={() => setShow(!show)}
            />
            <div className="w-64 z-40 fixed overflow-y-auto  top-0 bg-main_color-1000 shadow h-full flex-col justify-between xl:hidden pb-4 transition duration-700 ease-in-out">
              <div className="px-6 h-full">
                <div className="flex flex-col justify-between h-full w-full">
                  <div className="">
                    <div className="mt-6 flex w-full items-center justify-between">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <div className="flex flex-row items-center ">
                            <img
                              className="rounded h-10 w-10 object-cover"
                              alt="Logo"
                              src={require("../assets/company-logo.png")}
                            />
                          </div>
                        </div>
                        <div id="cross" onClick={() => setShow(!show)}>
                          <AiOutlineClose className="text-2xl  cursor-pointer text-main_color-200" />
                        </div>
                      </div>
                    </div>
                    <ul className="f-m-m">
                      {/* <a className="cursor-pointer"> */}
                      <li className="text-main_color-200 pt-10">
                        <div className="w-full h-full md:w-full  md:h-full text-main_color-200">
                          <p className="text-main_color-200 xl:text-base text-base duration-700 p-2 ease-in-out hover:text-main_color-1000 hover:bg-main_color-200 ">
                            <NavLink to="/">Shop</NavLink>
                          </p>
                        </div>
                      </li>
                      {/* </a> */}
                      <li className="text-main_color-200 pt-2">
                        <div className="flex items-center justify-between">
                          <div className="w-full h-full md:w-full md:h-full  text-main_color-200">
                            <p className=" xl:text-base md:text-2xl text-base p-2 duration-700 ease-in-out hover:bg-main_color-200 hover:text-main_color-1000 ">
                              <NavLink to="/cart">Cart</NavLink>
                            </p>
                          </div>
                        </div>
                      </li>
                      {/* <a className="cursor-pointer"> */}
                      <li className="pt-2">
                        <div className="w-full h-full md:w-full md:h-full  text-main_color-200">
                          <p className="xl:text-base md:text-2xl text-base p-2 duration-700 ease-in-out hover:bg-main_color-200 hover:text-main_color-1000">
                            <NavLink to="/products">Products</NavLink>
                          </p>
                        </div>
                      </li>
                      {/* </a> */}
                      <li className="pt-4 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="w-full h-full md:w-full md:h-full  text-main_color-200">
                            <p className=" xl:text-base md:text-2xl text-base p-2 duration-700 ease-in-out hover:bg-main_color-200 hover:text-main_color-1000 ">
                              <NavLink to="/orders">Orders</NavLink>
                            </p>
                          </div>
                        </div>
                      </li>
                      <li className="text-gray-800 pt-4 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="w-full h-full   md:w-full md:h-full text-main_color-200">
                            <p className=" xl:text-base md:text-2xl  text-base duration-700 p-2 ease-in-out hover:bg-main_color-200 hover:text-main_color-1000">
                              <NavLink to="/admin/add-product">
                                Add Products
                              </NavLink>
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="w-full pt-4">
                    <div className="border-t border-gray-300 pt-4">
                      <div className="flex items-center   justify-between">
                        <button
                          className="bg-main_color-200 pl-4 pr-4 pt-1 outline-none rounded hover:bg-white pb-1"
                          type="button"
                        >
                          <NavLink to="/login">Login </NavLink>
                        </button>

                        <button
                          className="bg-main_color-200 pl-4 pr-4 pt-1 rounded hover:bg-white pb-1"
                          type="button"
                        >
                          <NavLink to="/signup">SignUp</NavLink>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {/* Code block ends */}
      </div>
    </>
  );
};

export default Navbar;