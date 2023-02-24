import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewPasswordSvg from "../../assets/NewPasswordSvg";
import { BASE_URL } from "../../BASE_URL";
import Loading from "../../components/Loading";

const NewPassword = () => {
  const navigate = useNavigate();

  const [userLoginData, setUserLoginData] = useState("");
  const [userData, setUserData] = useState({ userId: "", passwordToken: "" });
  const [validate, setValidate] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserLoginData(value);
  };

  const { token } = useParams();

  const userValid = async () => {
    const res = await fetch(`${BASE_URL}/new-password/${token}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.ok) {
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
      setLoading(true);
      const resetPasswordApiResponse = await fetch(`${BASE_URL}/new-password`, {
        method: "POST",
        body: JSON.stringify({
          newPassword: userLoginData,
          userId: userData.userId,
          passwordToken: userData.passwordToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resetData = await resetPasswordApiResponse.json();
      const { ok } = resetData;
      const { message } = resetData;
      if (!ok) {
        setLoading(false);
        toast.error(`${message}`);
        setValidate(resetData.validationErrors);
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
      <div className=" bg-backgound_white sm:pt-20 min-h-screen flex items-center justify-center">
        <div className="bg-main_white flex rounded shadow-lg max-w-4xl p-5 items-center">
          <div className="md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-3xl text-primary mb-10">
              New Password
            </h2>
            <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
              <div className="flex flex-col text-text_color">
                <label>Password</label>
                <input
                  className="rounded-sm bg-main_color-25 border focus:shadow-md text-sm p-2 focus:outline-none"
                  type="password"
                  name="password"
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
                className="w-full my-5 bg-primary hover:shadow-xs focus:outline-none  duration-700 py-2 text-text_color shadow-lg  hover:shadow-green-500/20 font-semibold rounded-sm"
                type="submit"
              >
                Update Password
              </button>
            </form>
          </div>
          <div class="md:block hidden w-1/2">
            <NewPasswordSvg />
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default NewPassword;
