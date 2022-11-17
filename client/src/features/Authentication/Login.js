import React, { useState } from "react";
import img from "../Authentication/LoginImg.png";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInputs = (e) => {
    const name = e.target.name;
    // console.log(name);
    const value = e.target.value;
    setUserLoginData({ ...userLoginData, [name]: value });
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2  h-screen w-full">
        <div className="hidden sm:block  ">
          <img
            className="w-full h-full object-cover"
            src={img}
            alt="Login Image"
          />
        </div>

        <div className=" flex w-full  bg-gray-800 felx-col items-center justify-center">
          <h2 className="text-4xl dark:text-white font-bold text-center">
            Log In
          </h2>
          <form
            className="max-w-[800px]   mx-auto bg-gray-900 p-8 px-8 rounded-lg"
            method="POST"
            action="/login"
          >
            <div className="flex  flex-col text-gray-400 py-2">
              <label>Email</label>
              <input
                className="rounded bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="email"
                name="email"
                value={userLoginData.email}
                onChange={handleInputs}
              />
            </div>
            <div className="flex flex-col text-gray-400 py-2">
              <label>Password</label>
              <input
                className="rounded bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="password"
                name="password"
                value={userLoginData.password}
                onChange={handleInputs}
              />
            </div>
            {/* <div className="flex justify-between items-center text-gray-400 py-2">
              <p className="flex items-center">
                <input className="mr-2" type="checkbox" />
                Remember Me
              </p>
              <p className="">Forgot Password</p>
            </div> */}
            <button
              className="w-full my-5 py-2 text-mygreen shadow-lg shadow-mygreen-800 hover:shadow-green-500/20  text-gray-100 font-semibold rounded-lg"
              type="submit"
            >
              Sign In
            </button>
          </form>
          <p className="text-white">
            <NavLink to="/signup">New User</NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
