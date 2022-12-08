import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { User } from "../../redux/action/authUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./Login.module.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
  });
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
      const { message } = formData;
      if (!ok) {
        toast.error(`${message}`);
        setValidate(formData.validationErrors);
      } else {
        toast.success(`${message}`);
        // console.log("message aaya kya", message);
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
      <div className="bg-backgound_white min-h-screen flex items-center justify-center">
        <div className="  bg-main_white flex rounded shadow-lg max-w-4xl px-2 py-4 items-center">
          <div className="md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-3xl text-primary">Log In</h2>
            <form
              className="max-w-[400px]  w-full mx-auto bg-gary-900 p-8 px-8 rounded-lg"
              onSubmit={handleFormSubmit}
            >
              <div className="flex  flex-col  py-2">
                <label htmlFor="email" className="text-sm text-text_color">
                  Email
                </label>
                <input
                  className={
                    validate.find((e) => e.param === "email")
                      ? `rounded-sm bg-main_color-25 border focus:shadow-md text-sm p-2 focus:outline-none ${classes.invalid}`
                      : "rounded-sm bg-main_color-25 border focus:shadow-md text-sm p-2 focus:outline-none"
                  }
                  type="email"
                  name="email"
                  value={userLoginData.email}
                  onChange={handleInputs}
                />
              </div>

              <div className="flex flex-col  py-2">
                <label htmlFor="password" className="text-sm text-text_color">
                  Password
                </label>
                <input
                  className={
                    validate.find((e) => e.param === "password")
                      ? `rounded-sm bg-main_color-25 border focus:shadow-md text-sm p-2 focus:outline-none ${classes.invalid}`
                      : "rounded-sm bg-main_color-25 border focus:shadow-md text-sm p-2 focus:outline-none"
                  }
                  type="password"
                  name="password"
                  value={userLoginData.password}
                  onChange={handleInputs}
                />
              </div>
              <button
                className="w-full my-5 py-2 transition   bg-primary shadow-lg shadow-text-teal-400 hover:shadow-teal-500/20  text-text_color font-semibold rounded-sm"
                type="submit"
              >
                Log In
              </button>
            </form>
            <p className="text-text_color">
              <NavLink to="/signup">New User</NavLink>
            </p>
            <p className="text-text_color">
              <NavLink to="/reset">Reset Password</NavLink>
            </p>
          </div>
          <div className="md:block hidden w-1/2">
            <img
              className=" rounded "
              alt="Logo"
              src={require("../Shop/pexels-oladimeji-ajegbile-2861798.jpg")}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
