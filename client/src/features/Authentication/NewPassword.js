import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const NewPassword = () => {
  const navigate = useNavigate();

  const [userLoginData, setUserLoginData] = useState("");
  const [userData, setUserData] = useState({ userId: "", passwordToken: "" });

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log("dfdsf", name, value);
    setUserLoginData(value);
  };

  const { token } = useParams();

  const userValid = async () => {
    const res = await fetch(`http://localhost:5000/new-password/${token}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.ok) {
      console.log("user valid");
      console.log(data);
      setUserData(data);
    } else {
      navigate("/404");
    }
  };

  useEffect(() => {
    userValid();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const resetPasswordApiResponse = await fetch(
        "http://localhost:5000/new-password",
        {
          method: "POST",
          body: JSON.stringify({
            newPassword: userLoginData,
            userId: userData.userId,
            passwordToken: userData.passwordToken,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const resetData = await resetPasswordApiResponse.json();
      console.log("resetdata", resetData);
      const { ok } = resetData;
      if (!ok) {
        console.log("error aye kya");
        //     setError(formData.message);
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      className="max-w-[800px]   mx-auto bg-gray-800 p-8 px-8 rounded-lg"
      onSubmit={handleFormSubmit}
    >
      <div className="flex flex-col text-gray-400 py-2">
        <label>Password</label>
        <input
          className="rounded bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
          type="password"
          name="newPassword"
          value={userLoginData}
          onChange={handleInputs}
        />
        <input
          className="rounded bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
          type="hidden"
          name="userId"
          value={userData.userId}
        />
        <input
          className="rounded bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
          type="hidden"
          name="passwordToken"
          value={userData.passwordToken}
        />
      </div>
      <button
        className="w-full my-5 py-2 text-mygreen shadow-lg shadow-mygreen-800 hover:shadow-green-500/20  text-gray-100 font-semibold rounded-lg"
        type="submit"
      >
        Update Password
      </button>
    </form>
  );
};

export default NewPassword;
