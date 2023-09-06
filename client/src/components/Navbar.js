import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { HiOutlineLogout } from "react-icons/hi";
import { AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import { User } from "../redux/action/authUser";
import { SearchBar } from "../redux/action/searchBar";
import { BASE_URL } from "../BASE_URL";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userLoggedIn = useSelector((state) => state.authenticateUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const logoutApiResponse = await fetch(`${BASE_URL}/logout`, {
        method: "POST",
      });

      const logoutData = await logoutApiResponse.json();

      sessionStorage.clear();
      let data = logoutData;
      dispatch(User({ data }));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="w-full  text-gray-100 body-font mb-4 ">
      {/* :DESKTOP MENU */}
      <div className="container mx-auto flex justify-between items-center py-7 px-5">
        {/* ::Navbar */}

        <NavLink to="/">
          <div className="flex flex-row items-center ">
            <img
              className="rounded h-10 w-10 object-cover"
              alt="Logo"
              src={require("../assets/company-logo.png")}
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
        </NavLink>

        <nav className=" md:mr-auto md:ml-4 md:pl-4    flex items-center justify-center">
          <div className=" hidden text-sm xl:flex md:mr-6 xl:mr-16">
            <NavLink to="/">
              <div className=" flex px-5 items-center transform  overflow-x-hidden overflow-y-hidden  focus:bg-primary text-sm  py-6  leading-5 text-text_color hover:text-primary focus:outline-none transition duration-500 ease-in-out">
                Shop
              </div>
            </NavLink>
            {userLoggedIn?.isLoggedIn && (
              <NavLink to="/cart">
                <div className=" flex px-5 items-center py-6  leading-5 text-text_color hover:text-primary active:bg-violet-700 focus:outline-none transition duration-700 ease-in-out">
                  Cart
                </div>
              </NavLink>
            )}
            {userLoggedIn?.isLoggedIn && (
              <NavLink to="/orders">
                <div className=" flex px-5 items-center py-6 leading-5 text-text_color hover:text-primary focus:bg-gray-100 focus:outline-none transition duration-700 ease-in-out">
                  Orders
                </div>
              </NavLink>
            )}
            {userLoggedIn?.isLoggedIn && (
              <NavLink to="/admin/add-product">
                <div className=" flex px-5 items-center py-6  leading-5 text-text_color hover:text-primary focus:bg-gray-100 focus:outline-none transition duration-700 ease-in-out">
                  Add Products
                </div>
              </NavLink>
            )}
            {userLoggedIn?.isLoggedIn && (
              <NavLink to="/admin/admin-products">
                <div className=" flex px-5 items-center py-6  leading-5 text-text_color hover:text-primary focus:bg-gray-100 focus:outline-none transition duration-700 ease-in-out">
                  Admin Products
                </div>
              </NavLink>
            )}
            {userLoggedIn?.isLoggedIn && (
              <NavLink to="/admin/lend">
                <div className=" flex px-5 items-center py-6  leading-5 text-text_color hover:text-primary focus:bg-gray-100 focus:outline-none transition duration-700 ease-in-out">
                  Lend
                </div>
              </NavLink>
            )}
            {userLoggedIn?.isLoggedIn && (
              <NavLink to="/admin/borrow">
                <div className=" flex px-5 items-center py-6  leading-5 text-text_color hover:text-primary focus:bg-gray-100 focus:outline-none transition duration-700 ease-in-out">
                  Borrowed
                </div>
              </NavLink>
            )}
            {userLoggedIn?.isLoggedIn && (
              <NavLink to="/admin/chats">
                <div className=" flex px-5 items-center py-6  leading-5 text-text_color  hover:text-primary focus:bg-gray-100 focus:outline-none transition duration-700 ease-in-out">
                  Chats
                </div>
              </NavLink>
            )}
          </div>

          <div className=" flex items-center justify-between  ml-6 mr-6 my-2">
            <input
              className="  focus:shadow-xl drop-shadow-md rounded-lg  border border-black/40 focus:outline-none  w-full bg-backgound_white text-sm text-text_color pl-8   py-2"
              type="text"
              placeholder="Search"
              onClick={() => {
                navigate("/");
              }}
              onChange={(e) => {
                const val = e.target.value;
                dispatch(
                  SearchBar({
                    type: "SEARCH_PRODUCT",
                    payload: val,
                  })
                );
              }}
            />
            <CiSearch className="text-2xl text-text_color absolute pl-2  " />
          </div>

          <div className="hidden xl:flex absolute  right-0 mr-10 items-center">
            <div className=" relative flex  items-center ">
              <div
                className="flex items-center relative"
                onClick={() => setProfile(!profile)}
              >
                {!userLoggedIn?.isLoggedIn && profile && (
                  <ul className="p-2 w-40  bg-main_color-1000 absolute bg-white rounded right-0 shadow top-0 mt-16 ">
                    <li className="cursor-pointer text-text_color hover:text-white px-2 hover:bg-primary  rounded-sm duration-700 text-main_color-200 text-sm leading-3 tracking-normal py-2   focus:outline-none">
                      <NavLink to="/login">
                        <div className="flex items-center">
                          <AiOutlineLogin className="text-xl" />
                          <span className="ml-2 ">Login</span>
                        </div>
                      </NavLink>
                    </li>
                    <NavLink to="/signup">
                      <li className="cursor-pointer text-text_color hover:text-white px-2 hover:bg-primary rounded-sm duration-700 text-main_color-200 text-sm leading-3 tracking-normal mt-2 py-2  focus:text-main_color-200 focus:outline-none flex items-center">
                        <AiOutlineUserAdd className="text-2xl " />
                        <span className="ml-2">Signup</span>
                      </li>
                    </NavLink>
                  </ul>
                )}
                {/* <div className="cursor-pointer  text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"></div> */}
                {!userLoggedIn?.isLoggedIn && (
                  <div className="ml-2 text-main_color-200 flex items-center">
                    <FaUserCircle className="text-3xl cursor-pointer text-text_color" />
                  </div>
                )}
              </div>
              {userLoggedIn?.isLoggedIn && (
                <div className="cursor-pointer   focus:outline-none flex items-center  flex-row-reverse  text-lg leading-3 tracking-normal  ml-4   ">
                  <form onSubmit={handleFormSubmit}>
                    <input type="hidden" name="logout" value="" />
                    <button
                      type="submit"
                      className="text-sm flex bg-primary px-4 py-3 rounded-lg items-center justify-center"
                    >
                      Logout
                      {/* <HiOutlineLogout className="text-xl text-text_color focus:outline-none outline-none  " /> */}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </nav>
        {/* ::Avatar */}
        <div className="hidden sm:inline-flex ml-auto md:ml-0 mr-4 md:mr-0 cursor-pointer"></div>
        {/* ::Burger icon standard */}
        <GiHamburgerMenu
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl xl:hidden rounded-md active:outline-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 text-black"
        />
      </div>

      {/* :MOBILE MENU */}
      {isOpen && (
        <div className="w-full h-full  ease-in-out duration-300 transition-all overflow-y-hidden top-10    sm:h-auto  bg-white flex flex-col py-4 px-4 xl:hidden  text-base uppercase text-center font-semibold">
          <nav className=" md:mr-auto md:ml-4 md:pl-4  md:flex flex-wrap items-center justify-between text-base tracking-wide">
            <div className=" text-sm xl:flex md:mr-6 xl:mr-16">
              <NavLink to="/">
                <div className=" flex px-4 items-center transform  border-b overflow-x-hidden overflow-y-hidden  focus:bg-primary text-sm  py-2  leading-5 text-text_color    focus:outline-none transition duration-500 ease-in-out">
                  Shop
                </div>
              </NavLink>
              {userLoggedIn?.isLoggedIn && (
                <NavLink to="/cart">
                  <div className="flex px-4 items-center transform  border-b overflow-x-hidden overflow-y-hidden  focus:bg-primary text-sm  py-2  leading-5 text-text_color    focus:outline-none transition duration-500 ease-in-out">
                    Cart
                  </div>
                </NavLink>
              )}
              {userLoggedIn?.isLoggedIn && (
                <NavLink to="/orders">
                  <div className=" flex px-4 items-center transform  border-b overflow-x-hidden overflow-y-hidden  focus:bg-primary text-sm  py-2  leading-5 text-text_color    focus:outline-none transition duration-500 ease-in-out">
                    Orders
                  </div>
                </NavLink>
              )}
              {userLoggedIn?.isLoggedIn && (
                <NavLink to="/admin/add-product">
                  <div className=" flex px-4 items-center transform  border-b overflow-x-hidden overflow-y-hidden  focus:bg-primary text-sm  py-2  leading-5 text-text_color    focus:outline-none transition duration-500 ease-in-out">
                    Add Products
                  </div>
                </NavLink>
              )}
              {userLoggedIn?.isLoggedIn && (
                <NavLink to="/admin/admin-products">
                  <div className=" flex px-4 items-center transform  border-b overflow-x-hidden overflow-y-hidden  focus:bg-primary text-sm  py-2  leading-5 text-text_color    focus:outline-none transition duration-500 ease-in-out">
                    Admin Products
                  </div>
                </NavLink>
              )}
              {userLoggedIn?.isLoggedIn && (
                <NavLink to="/admin/lend">
                  <div className=" flex px-4 items-center transform  border-b overflow-x-hidden overflow-y-hidden  focus:bg-primary text-sm  py-2  leading-5 text-text_color    focus:outline-none transition duration-500 ease-in-out">
                    Lend
                  </div>
                </NavLink>
              )}
              {userLoggedIn?.isLoggedIn && (
                <NavLink to="/admin/borrow">
                  <div className="flex px-4 items-center transform  border-b overflow-x-hidden overflow-y-hidden  focus:bg-primary text-sm  py-2  leading-5 text-text_color    focus:outline-none transition duration-500 ease-in-out">
                    Borrowed
                  </div>
                </NavLink>
              )}
              {userLoggedIn?.isLoggedIn && (
                <NavLink to="/admin/chats">
                  <div className=" flex px-4 items-center transform  border-b overflow-x-hidden overflow-y-hidden  focus:bg-primary text-sm  py-2  leading-5 text-text_color    focus:outline-none transition duration-500 ease-in-out">
                    Chats
                  </div>
                </NavLink>
              )}
              {userLoggedIn?.isLoggedIn && (
                <div className=" items-center p-2">
                  <form onSubmit={handleFormSubmit}>
                    <input type="hidden" name="logout" value="" />
                    <button
                      type="submit"
                      className="flex px-4 items-center transform w-full bg-primary border-b overflow-x-hidden overflow-y-hidden  focus:bg-primary text-sm  py-2  leading-5 text-text_color    focus:outline-none transition duration-500 ease-in-out "
                    >
                      <span className="">
                        <HiOutlineLogout className=" text-xl text-text_color focus:outline-none outline-none  hover:text-secondry " />
                      </span>
                      Logout
                    </button>
                  </form>
                </div>
              )}
            </div>

            {!userLoggedIn?.isLoggedIn && (
              <div className="w-full pt-4">
                <div className="">
                  <ul className="flex flex-col gap-y-4 mt-4  ">
                    <li className="cursor-pointer  ">
                      <button
                        className="border rounded-sm w-full border-primary px-3 py-1 text-base hover:bg-primary 
                          focus:outline-none
                          shadow-sm hover:shadow-2xl hover:text-text_color duration-500 text-primary"
                      >
                        <NavLink to="/login">Login</NavLink>
                      </button>
                    </li>
                    <li className="cursor-pointer  ">
                      <button
                        className="border rounded-sm w-full shadow-sm 
                          focus:outline-none
                          hover:shadow-2xl border-primary px-3 py-1 hover:bg-primary hover:text-text_color duration-700 text-base text-primary"
                      >
                        <NavLink to="/signup">SignUp</NavLink>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
