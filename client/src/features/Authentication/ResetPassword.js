import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import classes from "./Login.module.css";
import { BASE_URL } from "../../BASE_URL";
import ResetSvg from "../../assets/ResetSvg";
const ResetPassword = () => {
  const [userLoginData, setUserLoginData] = useState({
    email: "",
  });

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserLoginData({ [name]: value });
  };

  const [validate, setValidate] = useState([]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const resetPasswordApiResponse = await fetch(`${BASE_URL}/reset`, {
        method: "POST",
        body: JSON.stringify({
          email: userLoginData.email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resetData = await resetPasswordApiResponse.json();
      const { ok } = resetData;
      const { message } = resetData;
      if (!ok) {
        toast.error(`${message}`);
        setValidate(resetData.validationErrors);
      } else {
        toast.success(`${message}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg-backgound_white font-Poppins font-Poppins sm:pt-5 min-h-screen flex items-center justify-center">
        <div className="bg-main_white flex rounded shadow-lg max-w-4xl p-5 items-center">
          <div className="md:w-1/2 px-8 md:px-16">
            <h2 class="font-bold text-3xl text-primary mb-10">
              Reset Password
            </h2>
            <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
              <div className="flex flex-col text-text_color">
                <label>Email</label>
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
              <button
                className="w-full my-5 text-white bg-primary hover:shadow-xs  focus:outline-none  duration-700 py-2  shadow-lg  hover:shadow-green-500/20 font-semibold rounded-sm"
                type="submit"
              >
                Reset Password
              </button>
            </form>
            <p className="text-text_color">
              <NavLink to="/login">Log In</NavLink>
            </p>
          </div>
          <div class="md:block hidden w-1/2">
          <ResetSvg/>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
