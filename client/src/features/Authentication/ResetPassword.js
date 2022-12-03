import React, { useState } from "react";

const ResetPassword = () => {
  const [userLoginData, setUserLoginData] = useState({
    email: "",
  });

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserLoginData({ [name]: value });
  };

  const [error, setError] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const resetPasswordApiResponse = await fetch(
        "http://localhost:5000/reset",
        {
          method: "POST",
          body: JSON.stringify({
            email: userLoginData.email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const resetData = await resetPasswordApiResponse.json();
      //message ayega usko set kar do bus
      const { ok } = resetData;
      if (!ok) {
        setError(resetData.message);
      }
      console.log("resetData", resetData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg-backgound_white min-h-screen flex items-center justify-center">
        <div className="bg-main_white flex rounded shadow-lg max-w-4xl p-5 items-center">
          <div className="md:w-1/2 px-8 md:px-16">
          <h2 class="font-bold text-3xl text-primary mb-10">
            Reset  Password
          </h2>
          <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
            <div className="flex flex-col text-text_color">
              <label>Email</label>
              <input
                className="p-2  focus:outline-none focus:shadow-md text-sm rounded-sm border outline-none"
                type="email"
                name="email"
                value={userLoginData.email}
                onChange={handleInputs}
              />
            </div>
            <button
              className="w-full my-5 bg-primary hover:shadow-xs focus:outline-none  duration-700 py-2 text-text_color shadow-lg  hover:shadow-green-500/20 font-semibold rounded-sm"
              type="submit"
            >
              Reset Password
            </button>
          </form>
          </div>
        <div class="md:block hidden w-1/2">
          <img
            className=" rounded "
            alt="Logo"
            src={require("../Shop/pexels-oladimeji-ajegbile-2861798.jpg")}
          />
        </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
