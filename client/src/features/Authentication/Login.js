import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { User } from "../../redux/action/authUser";
import { toast } from "react-toastify";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BASE_URL } from "../../BASE_URL";
import "react-toastify/dist/ReactToastify.css";
import LoginSvg from "../../assets/LoginSvg";
import classes from "./Login.module.css";
import Loading from "../../components/Loading";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
  });
  const [validate, setValidate] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserLoginData({ ...userLoginData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const loginApiResponse = await fetch(`${BASE_URL}/login`, {
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
        setLoading(false);
        toast.error(`${message}`);
        setValidate(formData.validationErrors);
      } else {
        setLoading(false);
        toast.success(`${message}`);
        sessionStorage.setItem("userLoggedIn", JSON.stringify(formData));
        dispatch(User(formData));
        navigate("/");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className=" bg-backgound_white font-Poppins sm:pt-20  min-h-screen flex items-center justify-center ">
          <div className="   flex bg-main_white rounded shadow-lg max-w-4xl px-2 py-4 items-center">
            <div className="md:w-1/2  mr-3 ml-3 px-8 md:px-16">
              <div>
                <h2 className="font-bold text-4xl  px-8 text-primary text-shadow-lg ">
                  Log In
                </h2>
                <p className=" mt-4 flex items-center gap-1  px-8 text-sm text-primary hover:text-text_color">
                  <NavLink to="/signup">New User</NavLink>
                  <AiOutlineUserAdd className="" />
                </p>
              </div>
              <form
                className="max-w-[400px]  w-full  bg-gary-900 p-8 px-8 rounded-lg"
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
                  className="w-full my-5 py-2 transition  focus:outline-none  bg-gradient-to-r from-tertiary to-primary shadow-lg  hover:shadow-teal-500/20  text-main_white font-semibold rounded-sm"
                  type="submit"
                >
                  Log In
                </button>
              </form>
              <div className="px-8 flex items-center justify-between">
                <p className="text-text_color">
                  <NavLink to="/reset">Reset Password</NavLink>
                </p>
              </div>
            </div>
            <div className="md:block hidden w-1/2">
              <LoginSvg />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
