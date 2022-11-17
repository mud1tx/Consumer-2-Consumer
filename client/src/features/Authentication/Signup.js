import React, { useState } from "react";
import img from "../Authentication/LoginImg.png";
export default function Signup() {
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

        <div className="  bg-gray-800  flex felx-col  justify-center">
          <form className="max-w-[400px] bg-gray-900 w-full mx-auto bg-gary-900 p-8 px-8 rounded-lg">
            <h2 className="text-4xl dark:text-white font-bold text-center">
              Sign Up
            </h2>
            <div className="flex  flex-col text-gray-400 py-2">
              <label>First Name</label>
              <input
                className="rounded bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="text"
              />
            </div>

            <div className="flex  flex-col text-gray-400 py-2">
              <label>Last Name</label>
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

            <div className="flex flex-col text-gray-400 py-2">
              <label>Confirm Password</label>
              <input
                className="rounded bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="Password"
              />
            </div>
            <button className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/20  text-white font-semibold rounded-lg">
              Sign In
            </button>
            <p className="text-white">Alredy have Account <span><a  className="cursor-pointer text-teal-500">Sign In</a></span></p>
          </form>
         
        </div>
      </div>
    </>
  );
}
