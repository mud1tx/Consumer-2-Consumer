import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { User } from "../../redux/action/authUser";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

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
        console.log("error aye kya", formData);
        setError(formData.message);
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
      <div className=" bg-backgound_white min-h-screen flex items-center justify-center">
        <div className="bg-white flex rounded shadow-lg max-w-4xl p-5 items-center">
          <div className="md:w-1/2 px-8 md:px-16">
            <h2 class="font-bold text-3xl text-primary_darker">Login Here</h2>
            <p className="text-primary text-xs mt-4 mb-4 ">
              <NavLink to="/signup">New User</NavLink>
            </p>
            <form
              className=" flex flex-col gap-4 "
              // action="/login"
              // method="POST"
              onSubmit={handleFormSubmit}
            >
              <div className="flex flex-col text-text_color ">
                <label className="text-sm text-text_color">Email</label>
                <input
                  className="p-2  text-sm focus:outline-none focus:shadow-md  rounded-sm border outline-none"
                  type="email"
                  name="email"
                  value={userLoginData.email}
                  onChange={handleInputs}
                />
              </div>
              <div className=" text-text_color">
                <label className="text-sm">Password</label>
                <input
                  className="p-2 text-sm focus:outline-none focus:shadow-md outline-none rounded-sm border w-full"
                  type="password"
                  name="password"
                  value={userLoginData.password}
                  onChange={handleInputs}
                />
              </div>
              <button
                className="w-full my-5  py-2  shadow-lg  bg-primary  focus:outline-none text-text_color font-semibold rounded-sm"
                type="submit"
              >
                Log In
              </button>

              <div className="flex justify-between">
                <p className="text-text_color relative">
                  <NavLink to="/reset">Reset Password ?</NavLink>
                </p>
              </div>
            </form>
          </div>
          <div class="md:block hidden w-1/2">
            <img
              className=" rounded "
              alt="Logo"
              src={require("../Shop/BackgroundIllustration.jpg")}
            />
          </div>
        </div>
      </div>
      {error && <h1 className="absolute">{error}</h1>}
    </>
  );
};

export default Login;
