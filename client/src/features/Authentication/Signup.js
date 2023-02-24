import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../BASE_URL";
import SignUpsvg from "../../assets/SignUpSvg";
import Loading from "../../components/Loading";

const SignUp = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    pin_code: "",
    country: "",
  });
  const [error, setError] = useState("");
  const [validate, setValidate] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const loginApiResponse = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        body: JSON.stringify({
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          password: userData.password,
          confirmPassword: userData.confirmPassword,
          address: userData.address,
          city: userData.city,
          pin_code: userData.pin_code,
          country: userData.country,
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
        setError(formData.message);
        setValidate(formData.validationErrors);
      } else {
        setLoading(false);
        toast.success(`${message}`);
        navigate("/login");
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
        <div className="  font-Poppins  bg-backgound_white sm:pt-20  min-h-screen flex items-center justify-center">
          <div className="  bg-main_white flex rounded shadow-lg max-w-4xl px-2 py-4 items-center">
            <div className="md:w-11/12 px-4 md:px-16">
              <h2 className="font-bold text-xl md:text-3xl px-8 text-primary">
                Sign Up
              </h2>
              <form
                className="max-w-[400px]  w-full mx-auto bg-gary-900 p-8 px-8 rounded-lg"
                onSubmit={handleFormSubmit}
              >
                <div className="md:flex gap-x-2 ">
                  <div className="flex  flex-col  py-2">
                    <label
                      htmlFor="first_name"
                      className="text-sm text-text_color"
                    >
                      First Name
                    </label>
                    <input
                      className={
                        validate.find((e) => e.param === "first_name")
                          ? `rounded-sm border   bg-main_color-25  focus:border-none text-sm p-2  focus:shadow-md focus:outline-none ${classes.invalid}`
                          : "rounded-sm border   bg-main_color-25  focus:border-none text-sm p-2  focus:shadow-md focus:outline-none"
                      }
                      type="text"
                      name="first_name"
                      value={userData.first_name}
                      onChange={handleInputs}
                    />
                  </div>

                  <div className="flex  flex-col  py-2">
                    <label
                      htmlFor="last_name"
                      className="text-sm text-text_color"
                    >
                      Last Name
                    </label>
                    <input
                      className={
                        validate.find((e) => e.param === "last_name")
                          ? `rounded-sm border   bg-main_color-25  focus:border-none text-sm p-2  focus:shadow-md focus:outline-none ${classes.invalid}`
                          : "rounded-sm border   bg-main_color-25  focus:border-none text-sm p-2  focus:shadow-md focus:outline-none"
                      }
                      type="text"
                      name="last_name"
                      value={userData.last_name}
                      onChange={handleInputs}
                    />
                  </div>
                </div>
                <div className="md:flex  gap-x-2">
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
                      value={userData.email}
                      onChange={handleInputs}
                    />
                  </div>

                  <div className="flex flex-col  py-2">
                    <label
                      htmlFor="password"
                      className="text-sm text-text_color"
                    >
                      Password
                    </label>
                    <input
                      className={
                        validate.find((e) => e.param === "password")
                          ? `rounded-sm bg-main_color-25 border focus:shadow-md text-sm p-2 focus:outline-none ${classes.invalid}`
                          : "rounded-sm bg-main_color-25 border focus:shadow-md text-sm p-2 focus:outline-none"
                      }
                      type="Password"
                      name="password"
                      value={userData.password}
                      onChange={handleInputs}
                    />
                  </div>
                </div>

                <div className="md:flex gap-x-2 items-center ">
                  <div className="flex flex-col  ">
                    <label
                      htmlFor="confirmPassword"
                      className="text-sm text-text_color"
                    >
                      Confirm Password
                    </label>
                    <input
                      className={
                        validate.find((e) => e.param === "confirmPassword")
                          ? `rounded-sm bg-main_color-25 border focus:shadow-md text-sm p-2 focus:outline-none ${classes.invalid}`
                          : "rounded-sm bg-main_color-25 border focus:shadow-md text-sm p-2 focus:outline-none"
                      }
                      type="Password"
                      name="confirmPassword"
                      value={userData.confirmPassword}
                      onChange={handleInputs}
                    />
                  </div>
                  <div className="flex  flex-col  py-2">
                    <label
                      htmlFor="address"
                      className="text-sm text-text_color"
                    >
                      Address
                    </label>
                    <input
                      className="rounded-sm bg-main_color-25 border focus:shadow-md text-sm p-2 focus:outline-none"
                      type="text"
                      name="address"
                      value={userData.address}
                      onChange={handleInputs}
                    />
                  </div>
                </div>

                <div className="md:flex gap-x-2 ">
                  <div className="flex  flex-col  py-2">
                    <label
                      htmlFor="pin_code"
                      className="text-sm text-text_color"
                    >
                      Pin Code
                    </label>
                    <input
                      className="rounded-sm bg-main_color-25 border focus:shadow-md text-sm p-2 focus:outline-none"
                      type="number"
                      name="pin_code"
                      value={userData.pin_code}
                      onChange={handleInputs}
                    />
                  </div>
                  <div className="flex  flex-col  py-2">
                    <label htmlFor="city" className="text-sm text-text_color">
                      City
                    </label>
                    <input
                      className="rounded-sm bg-main_color-25 border focus:shadow-md text-sm p-2 focus:outline-none"
                      type="text"
                      name="city"
                      value={userData.city}
                      onChange={handleInputs}
                    />
                  </div>
                </div>

                <div className="flex ">
                  <div className="flex  flex-col  py-2">
                    <label
                      htmlFor="country"
                      className="text-sm text-text_color"
                    >
                      Country
                    </label>
                    <input
                      className="rounded-sm bg-main_color-25 border focus:shadow-md text-sm p-2 focus:outline-none"
                      type="text"
                      name="country"
                      value={userData.country}
                      onChange={handleInputs}
                    />
                  </div>
                </div>
                <button
                  className="w-full my-5 py-2 transition    bg-gradient-to-r from-tertiary to-primary text-main_white shadow-lg shadow-text-teal-400 hover:shadow-teal-500/20   font-semibold rounded-sm"
                  type="submit"
                >
                  Sign Up
                </button>
              </form>
              <p className="text-text_color">
                <NavLink to="/login">Already have Account ?</NavLink>
              </p>
            </div>

            <div className="md:block hidden w-1/2">
              <SignUpsvg />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
