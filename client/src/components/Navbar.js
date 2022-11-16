import React, { useState } from "react";
export default function Navbar() {
  const [show, setShow] = useState(null);
  const [profile, setProfile] = useState(false);
  // const [product, setProduct] = useState(false);
  // const [deliverables, setDeliverables] = useState(false);
  return (
    <>
      <div className="bg-gray-200 h-full w-full">
        {/* Code block starts */}
        <nav className="bg-white shadow xl:block hidden ">
          <div className="mx-auto container px-6 py-2 xl:py-0">
            <div className="flex items-center justify-between">
              {/* <div className="inset-y-0 left-0 flex items-center xl:hidden"> */}
                {/* <div className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-100 focus:outline-none transition duration-150 ease-in-out">
                  For The Bigger Screen More then Laptop
                  <div className="visible xl:hidden">
                    <ul className="p-2 border-r bg-white absolute rounded left-0 right-0 shadow mt-8 md:mt-8 hidden">
                      <li className="flex xl:hidden cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                        <div className="flex items-center">
                          <p className="ml-2 font-bold">DashBoard</p>
                        </div>
                      </li>
                      <li className="flex xl:hidden flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex justify-center">
                        <div className="flex items-center">
                          <span className="ml-2 font-bold">Products</span>
                        </div>
                      </li>
                      <li className="flex xl:hidden cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                        <span className="ml-2 font-bold">Performance</span>
                      </li>
                      <li className="border-b border-gray-300 flex xl:hidden cursor-pointer text-gray-600 text-sm leading-3 tracking-normal pt-2 pb-4 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                        <span className="ml-2 font-bold">Deliverables</span>
                      </li>
                      <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                        <div className="flex items-center">
                          <div className="w-12 cursor-pointer flex text-sm border-2 border-transparent rounded focus:outline-none focus:border-white transition duration-150 ease-in-out">
                            <input
                              className="bg-gray-100 focus:outline-none rounded w-full text-sm text-gray-500  pl-10 py-2"
                              type="text"
                              placeholder="Search"
                            />
                          </div>
                          <div className="sm:ml-2 text-white relative">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-chevron-down cursor-pointer"
                              width={20}
                              height={20}
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" />
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </div>
                        </div>
                      </li>
                      <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                        <div className="flex items-center">
                          <span className="ml-2">Profile</span>
                        </div>
                      </li>
                    </ul>
                    <svg
                      onclick="MenuHandler(this,true)"
                      aria-haspopup="true"
                      aria-label="Main Menu"
                      xmlns="http://www.w3.org/2000/svg"
                      className="show-m-menu icon icon-tabler icon-tabler-menu"
                      width={28}
                      height={28}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <line x1={4} y1={8} x2={20} y2={8} />
                      <line x1={4} y1={16} x2={20} y2={16} />
                    </svg>
                  </div>
                  <div
                    className="hidden close-m-menu text-gray-700"
                    onclick="MenuHandler(this,false)"
                  >
                    <svg
                      aria-label="Close"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <line x1={18} y1={6} x2={6} y2={18} />
                      <line x1={6} y1={6} x2={18} y2={18} />
                    </svg>
                  </div>
                </div> */}
              {/* </div> */}
              <div className="flex w-full sm:w-auto items-center sm:items-stretch justify-end sm:justify-start">
                <div className="flex flex-row items-center ">
                  <img
                    className="rounded h-10 w-10 object-cover"
                    alt="Logo"
                    src={require("../components/company-logo.png")}
                  />
                  <h2 className="hidden sm:block text-base text-gray-700 font-bold leading-normal pl-3">
                    C<span className="text-[red]">2</span>C
                  </h2>
                </div>
              </div>
              <div className="flex">
                <div className="hidden xl:flex md:mr-6 xl:mr-16">
                  <a
                    href="javascript: void(0)"
                    className="flex px-5 items-center py-6 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out"
                  >
                    Shop
                  </a>
                  <a
                    href="javascript: void(0)"
                    className="flex px-5 items-center py-6 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out"
                  >
                    Cart
                  </a>
                  <a
                    href="javascript: void(0)"
                    className="flex px-5 items-center py-6 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out"
                  >
                    Product
                  </a>
                  <a
                    href="javascript: void(0)"
                    className="flex px-5 items-center py-6 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out"
                  >
                    Order
                  </a>

                  <a
                    href="javascript: void(0)"
                    className="flex px-5 items-center py-6 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out"
                  >
                    Add Product
                  </a>
                </div>
                <div className="hidden xl:flex items-center">
                  <div className="relative md:mr-6 my-2">
                    <a className=""></a>
                    <input
                      className="bg-gray-100 focus:outline-none rounded w-full text-sm text-gray-500  pl-10 py-2"
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
                        <ul className="p-2 w-40 border-r bg-white absolute rounded right-0 shadow top-0 mt-16 ">
                          <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                            <div className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-user"
                                width={20}
                                height={20}
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <circle cx={12} cy={7} r={4} />
                                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                              </svg>
                              <span className="ml-2">LogIn</span>
                            </div>
                          </li>
                          <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-help"
                              width={20}
                              height={20}
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" />
                              <circle cx={12} cy={12} r={9} />
                              <line x1={12} y1={17} x2={12} y2="17.01" />
                              <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
                            </svg>
                            <span className="ml-2">SignUp</span>
                          </li>
                        </ul>
                      )}
                      <div className="cursor-pointer flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"></div>
                      <div className="ml-2 text-gray-600 flex items-center">
                        <p>SignIn</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-chevron-down cursor-pointer"
                          width={20}
                          height={20}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <nav>
          <div className="py-4 px-6 w-full flex xl:hidden justify-between items-center bg-white fixed top-0 z-40">
            <div className="w-24">
              <div className="flex flex-row items-center ">
                <img
                  className="rounded h-10 w-10 object-cover"
                  alt="Logo"
                  src={require("../components/company-logo.png")}
                />
                <h2 className="hidden sm:block text-base text-gray-700 font-bold leading-normal pl-3">
                  C<span className="text-[red]">2</span>C
                </h2>
              </div>
            </div>
            <div className="flex items-center">
              <div className="relative mr-6 ">
                <input
                  className="bg-gray-100 focus:outline-none rounded w-full text-sm text-gray-500  pl-10 py-2"
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-menu-2"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1={4} y1={6} x2={20} y2={6} />
                    <line x1={4} y1={12} x2={20} y2={12} />
                    <line x1={4} y1={18} x2={20} y2={18} />
                  </svg>
                )}
              </div>
            </div>
          </div>
          {/*Mobile responsive sidebar*/}
          <div
            className={
              show
                ? "w-full xl:hidden h-full absolute z-40  transform  translate-x-0 "
                : "   w-full xl:hidden h-full absolute z-40  transform -translate-x-full"
            }
          >
            <div
              className="bg-gray-800 opacity-50 w-full h-full"
              onClick={() => setShow(!show)}
            />
            <div className="w-64 z-40 fixed overflow-y-auto z-40 top-0 bg-white shadow h-full flex-col justify-between xl:hidden pb-4 transition duration-150 ease-in-out">
              <div className="px-6 h-full">
                <div className="flex flex-col justify-between h-full w-full">
                  <div>
                    <div className="mt-6 flex w-full items-center justify-between">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <div className="flex flex-row items-center ">
                            <img
                              className="rounded h-10 w-10 object-cover"
                              alt="Logo"
                              src={require("../components/company-logo.png")}
                            />
                            <h2 className="hidden sm:block text-base text-gray-700 font-bold leading-normal pl-3">
                              C<span className="text-[red]">2</span>C
                            </h2>
                          </div>
                          <p className="text-base md:text-2xl text-gray-800 ml-3">
                            C2C
                          </p>
                        </div>
                        <div
                          id="cross"
                          className="text-gray-800"
                          onClick={() => setShow(!show)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-x"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <line x1={18} y1={6} x2={6} y2={18} />
                            <line x1={6} y1={6} x2={18} y2={18} />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <ul className="f-m-m">
                      <a className="cursor-pointer">
                        <li className="text-gray-800 pt-10">
                          <div className="flex items-center">
                            <div className="w-6 h-6 md:w-8 md:h-8 text-indigo-700"></div>
                            <p className="text-indigo-700 xl:text-base text-base ml-3">
                              Dashboard
                            </p>
                          </div>
                        </li>
                      </a>
                      <a className="cursor-pointer">
                        <li className="text-gray-800 pt-8">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-6 h-6 md:w-8 md:h-8 text-gray-800"></div>
                              <p className="text-gray-800 xl:text-base md:text-2xl text-base ml-3">
                                Products
                              </p>
                            </div>
                          </div>
                        </li>
                      </a>
                      <a className="cursor-pointer">
                        <li className="text-gray-800 pt-8">
                          <div className="flex items-center">
                            <div className="w-6 h-6 md:w-8 md:h-8 text-gray-800"></div>
                            <p className="text-gray-800 xl:text-base md:text-2xl text-base ml-3">
                              Performance
                            </p>
                          </div>
                        </li>
                      </a>
                      <li className="text-gray-800 pt-8 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-6 h-6 md:w-8 md:h-8 text-gray-800"></div>
                            <p className="text-gray-800 xl:text-base md:text-2xl text-base ml-3">
                              Deliverables
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="w-full pt-4">
                    <div className="flex justify-center mb-4 w-full">
                      <div className="relative w-full">
                        <div className="text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4"></div>
                        <input
                          className="bg-gray-100 focus:outline-none rounded w-full text-sm text-gray-500  pl-10 py-2"
                          type="text"
                          placeholder="Search"
                        />
                      </div>
                    </div>
                    <div className="border-t border-gray-300 pt-4">
                      <div className="flex items-center   justify-between">
                        <button className="">LogIn</button>
                        <button>SignUp</button>
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
}

// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import classes from "./Navbar.module.css";
// import { HiMenu } from "react-icons/hi";

// const Navbar = () => {
//   const [sideBarClick, setSideBarClick] = useState(false);

//   return (
//     <div className={classes.navbar_sideBar_container}>
//       {/*NAV-BAR CODE  */}

//       <div className={classes.navbar}>
//         <div className={classes.navbar_company_logo}>
//           <img alt="Company Logo" src="../Images/company-logo.png" />
//         </div>
//         <div className={classes.navbar_pages}>
//           <div className={classes.navbar_page}>
//             <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 isActive ? "nav_link_active" : "nav_link"
//               }
//             >
//               Shop
//             </NavLink>
//           </div>
//           <div className={classes.navbar_page}>
//             <NavLink
//               to="/products"
//               className={({ isActive }) =>
//                 isActive ? "nav_link_active" : "nav_link"
//               }
//             >
//               Products
//             </NavLink>
//           </div>
//           <div className={classes.navbar_page}>
//             <NavLink
//               to="/cart"
//               className={({ isActive }) =>
//                 isActive ? "nav_link_active" : "nav_link"
//               }
//             >
//               Cart
//             </NavLink>
//           </div>
//           <div className={classes.navbar_page}>
//             <NavLink
//               to="/orders"
//               className={({ isActive }) =>
//                 isActive ? "nav_link_active" : "nav_link"
//               }
//             >
//               Orders
//             </NavLink>
//           </div>
//           <div className={classes.navbar_page}>
//             <NavLink
//               to="/admin/add-product"
//               className={({ isActive }) =>
//                 isActive ? "nav_link_active" : "nav_link"
//               }
//             >
//               Add Products
//             </NavLink>
//           </div>
//           <div className={classes.navbar_page}>
//             <NavLink
//               to="/user"
//               className={({ isActive }) =>
//                 isActive ? "nav_link_active" : "nav_link"
//               }
//             >
//               Admin Products
//             </NavLink>
//           </div>
//         </div>
//         <div className={classes.navbar_searchBox}>
//           <input type="search" placeholder="Search Product..." />
//         </div>
//         <div className={classes.navbar_login_signUp_Btn}>
//           <button className={`${classes.login_btn}`} type="button">
//             <NavLink
//               to="/login"
//               style={() => ({
//                 color: "inherit",
//                 textDecoration: "none",
//               })}
//             >
//               Login
//             </NavLink>
//           </button>
//           <button className={`${classes.signUp_btn}`} type="button">
//             <NavLink
//               to="/signup"
//               style={() => ({
//                 color: "inherit",
//                 textDecoration: "none",
//               })}
//             >
//               SignUp
//             </NavLink>
//           </button>
//         </div>
//         <div className={classes.navbar_sideBar}>
//           <HiMenu
//             className={classes.navbar_sideBar_logo}
//             onClick={() => {
//               setSideBarClick(!sideBarClick);
//             }}
//           />
//         </div>
//       </div>

//       {/* SIDE-BAR CODE */}

//       {sideBarClick && (
//         <div className={classes.sideBar_content}>
//           <div>
//             <div className={classes.sideBar_halfContent}>
//               <button className={`${classes.login_btn}`} type="button">
//                 <NavLink
//                   to="/login"
//                   style={() => ({
//                     color: "inherit",
//                     textDecoration: "none",
//                   })}
//                 >
//                   Login
//                 </NavLink>
//               </button>
//               <button className={`${classes.signUp_btn}`} type="button">
//                 <NavLink
//                   to="/signup"
//                   style={() => ({
//                     color: "inherit",
//                     textDecoration: "none",
//                   })}
//                 >
//                   SignUp
//                 </NavLink>
//               </button>
//             </div>
//           </div>
//           <div className={classes.sideBar_fullContent}>
//             <div className={classes.sidebar_page}>
//               <NavLink
//                 to="/"
//                 className={({ isActive }) =>
//                   isActive ? "nav_link_active" : "sideBar_link"
//                 }
//               >
//                 Shop
//               </NavLink>
//             </div>
//             <div className={classes.sidebar_page}>
//               <NavLink
//                 to="/products"
//                 className={({ isActive }) =>
//                   isActive ? "nav_link_active" : "sideBar_link"
//                 }
//               >
//                 Products
//               </NavLink>
//             </div>
//             <div className={classes.sidebar_page}>
//               <NavLink
//                 to="/cart"
//                 className={({ isActive }) =>
//                   isActive ? "nav_link_active" : "sideBar_link"
//                 }
//               >
//                 Cart
//               </NavLink>
//             </div>
//             <div className={classes.sidebar_page}>
//               <NavLink
//                 to="/orders"
//                 className={({ isActive }) =>
//                   isActive ? "nav_link_active" : "sideBar_link"
//                 }
//               >
//                 Orders
//               </NavLink>
//             </div>
//             <div className={classes.sidebar_page}>
//               <NavLink
//                 to="/admin/add-product"
//                 className={({ isActive }) =>
//                   isActive ? "nav_link_active" : "sideBar_link"
//                 }
//               >
//                 Add Products
//               </NavLink>
//             </div>
//             <div className={classes.sidebar_page}>
//               <NavLink
//                 to="/user"
//                 className={({ isActive }) =>
//                   isActive ? "nav_link_active" : "sideBar_link"
//                 }
//               >
//                 Admin Products
//               </NavLink>
//             </div>
//             <button className={`${classes.login_btn}`} type="button">
//               <NavLink
//                 to="/login"
//                 style={() => ({
//                   color: "inherit",
//                   textDecoration: "none",
//                 })}
//               >
//                 Login
//               </NavLink>
//             </button>
//             <button className={`${classes.signUp_btn}`} type="button">
//               <NavLink
//                 to="/signup"
//                 style={() => ({
//                   color: "inherit",
//                   textDecoration: "none",
//                 })}
//               >
//                 SignUp
//               </NavLink>
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;
