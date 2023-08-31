import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../BASE_URL";
import { useSelector } from "react-redux";
import "./Chat.css";

const Conversation = ({ data, currentUser, online }) => {
  const userLoggedIn = useSelector((state) => state.authenticateUser);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("sajna", currentUser);
    const userId = data.members.find((id) => id !== currentUser);

    const getUserData = async () => {
      try {
        const fetchUserDetail = await fetch(
          `${BASE_URL}/admin/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const res = await fetchUserDetail.json();
        setUserData(res);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);
  return (
    <>
      <div className="follower conversation">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <div>
            {online && <div className="online-dot"></div>}
            <img
              src={require("../../assets/user-account-logo.webp")}
              alt="Profile"
              className="followerImage"
              style={{ width: "50px", height: "50px" }}
            />
          </div>
          <div
            className="name"
            style={{
              display: "flex",
              //   gap: "1rem",
              flexDirection: "column",
            }}
          >
            <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
              {userData?.first_name} {userData?.last_name}
            </span>
            <span
              style={{ color: online ? "#51e200" : "", fontSize: "0.7rem" }}
            >
              {online ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
