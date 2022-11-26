import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { User } from "../../redux/action/authUser";
import classes from "./Login.module.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [validate, setValidate] = useState([]);

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserLoginData({ ...userLoginData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginApiResponse = await fetch("http://localhost:5000/login", {
        method: "POST",
        body: JSON.stringify({
          email: userLoginData.email,
          password: userLoginData.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const formData = await loginApiResponse.json();
      const { ok } = formData;
      if (!ok) {
        // console.log("error aye kya", formData.validationErrors);
        setError(formData.message);
        setValidate(formData.validationErrors);
      } else {
        sessionStorage.setItem("userLoggedIn", JSON.stringify(formData));
        dispatch(User(formData));
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2  h-screen w-full">
        <div className="hidden sm:block  ">
          <img
            className="w-full h-full object-cover"
            src={require("../../assets/LoginImg.png")}
            alt="Login"
          />
        </div>

        <div className=" flex w-full  bg-gray-800 felx-col items-center justify-center">
          {error && (
            <div>
              <p>{error}</p>
            </div>
          )}
          <h2 className="text-4xl dark:text-white font-bold text-center">
            Log In
          </h2>
          <form
            className="max-w-[800px]   mx-auto bg-gray-900 p-8 px-8 rounded-lg"
            // action="/login"
            // method="POST"
            onSubmit={handleFormSubmit}
          >
            <div className="flex  flex-col text-gray-400 py-2">
              <label>Email</label>
              <input
                // className="rounded bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                className={
                  validate.find((e) => e.param === "email")
                    ? `rounded bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none ${classes.invalid}`
                    : "rounded bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                }
                type="email"
                name="email"
                value={userLoginData.email}
                onChange={handleInputs}
              />
            </div>
            <div className="flex flex-col text-gray-400 py-2">
              <label>Password</label>
              <input
                // className="rounded bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                className={
                  validate.find((e) => e.param === "password")
                    ? `rounded bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none ${classes.invalid}`
                    : "rounded bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                }
                type="password"
                name="password"
                value={userLoginData.password}
                onChange={handleInputs}
              />
            </div>
            <button
              className="w-full my-5 py-2 text-mygreen shadow-lg shadow-mygreen-800 hover:shadow-green-500/20  text-gray-100 font-semibold rounded-lg"
              type="submit"
            >
              Log In
            </button>
          </form>
          <p className="text-white">
            <NavLink to="/signup">New User</NavLink>
          </p>
          <p className="text-white">
            <NavLink to="/reset">Reset Password</NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
