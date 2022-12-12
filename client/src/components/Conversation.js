import React, { useEffect, useState } from "react";
import classes from "./Conversation.module.css";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const otherUserId = conversation.members.find(
      (m) => m !== currentUser.user._id
    );

    const getUser = async () => {
      try {
        const res = await (
          await fetch("/admin/chatUser/" + otherUserId)
        ).json();
        // console.log("friend hai yaar", res);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <div className={classes.conversation}>
      <img
        className={classes.conversationImg}
        src={require("../assets/user-account-logo.webp")}
        alt="user"
      />
      <div>
        <p className={classes.conversationName}>
          {user?.first_name} {user?.last_name}
        </p>
        <p>{user?.email}</p>
      </div>
    </div>
  );
};

export default Conversation;
