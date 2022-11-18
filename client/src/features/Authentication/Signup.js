import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2  h-screen w-full">
        <div className="hidden sm:block  ">
          <img
            className="w-full h-full object-cover"
            src={require("../../assets/LoginImg.png")}
            alt="Signup"
          />
        </div>

        <div className="  bg-gray-800  flex felx-col  justify-center">
          <h2 className="text-4xl dark:text-white font-bold text-center">
            Sign Up
          </h2>
          <form
            className="max-w-[400px] bg-gray-900 w-full mx-auto bg-gary-900 p-8 px-8 rounded-lg"
            method="POST"
            action="/signup"
          >
            <div className="flex  flex-col text-gray-400 py-2">
              <label htmlFor="first_name">First Name</label>
              <input
                className="rounded bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="text"
                name="first_name"
                value={userData.first_name}
                onChange={handleInputs}
              />
            </div>

            <div className="flex  flex-col text-gray-400 py-2">
              <label htmlFor="last_name">Last Name</label>
              <input
                className="rounded bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="text"
                name="last_name"
                value={userData.last_name}
                onChange={handleInputs}
              />
            </div>

            <div className="flex  flex-col text-gray-400 py-2">
              <label htmlFor="email">Email</label>
              <input
                className="rounded bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputs}
              />
            </div>

            <div className="flex flex-col text-gray-400 py-2">
              <label htmlFor="password">Password</label>
              <input
                className="rounded bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="Password"
                name="password"
                value={userData.password}
                onChange={handleInputs}
              />
            </div>

            <div className="flex flex-col text-gray-400 py-2">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                className="rounded bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="Password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleInputs}
              />
            </div>
            <button
              className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/20  text-white font-semibold rounded-lg"
              type="submit"
            >
              Sign In
            </button>
          </form>
          <p className="text-white">
            <NavLink to="/login">Already have Account</NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
