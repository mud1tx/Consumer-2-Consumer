import React, { useState } from "react";
import img from "../Authentication/LoginImg.png";
export default function Login () {
  const [showpass, setShowPass] = useState(false);
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

        <div className=" flex w-1/2 bg-gray-800 felx-col items-center justify-center">
          <form className="max-w-[400px] bg-gray-900 w-full mx-auto bg-gary-900 p-8 px-8 rounded-lg">
            <h2 className="text-4xl dark:text-white font-bold text-center">
              Sign In
            </h2>
            <div className="flex  flex-col text-gray-400 py-2">
              <label>User Name</label>
              <input
                className="rounded bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="text"
              />
            </div>
            <div className="flex flex-col text-gray-400 py-2">
              <label>Password</label>
              <input
                className="rounded bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="Password"
              />
            </div>
            <div className="flex justify-between items-center text-gray-400 py-2">
              <p className="flex items-center">
                <input className="mr-2" type="checkbox" />
                Remember Me
              </p>
              <p className="">Forgot Password</p>
            </div>
            <button className="w-full my-5 py-2 text-mygreen shadow-lg shadow-mygreen-800 hover:shadow-green-500/20  text-gray-100 font-semibold rounded-lg">
              Sign In
            </button>
            <p className="text-white">Didn't Have Acount <span><a  className="cursor-pointer text-teal-500">Sign Up </a></span></p>
          </form>
        </div>
      </div>
    </>
  );
}