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
    <div>
      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
      <div>
        <h1>Reset Password</h1>
      </div>
      <form
        className="max-w-[800px]   mx-auto bg-gray-900 p-8 px-8 rounded-lg"
        onSubmit={handleFormSubmit}
      >
        <div className="flex  flex-col text-gray-400 py-2">
          <label>Email</label>
          <input
            className="rounded bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            type="email"
            name="email"
            value={userLoginData.email}
            onChange={handleInputs}
          />
        </div>
        <button
          className="w-full my-5 py-2 text-mygreen shadow-lg shadow-mygreen-800 hover:shadow-green-500/20  text-gray-100 font-semibold rounded-lg"
          type="submit"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
