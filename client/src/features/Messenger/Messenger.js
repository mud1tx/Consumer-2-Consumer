import React, { useEffect, useState, useRef } from "react";
import Conversation from "../../components/Conversation";
import classes from "./Messenger.module.css";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import Message from "../../components/Message";

const Messenger = () => {
  const userLoggedIn = useSelector((state) => state.authenticateUser);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", userLoggedIn.user._id);
  }, [userLoggedIn]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await (
          await fetch("/admin/conversation/" + userLoggedIn.user._id)
        ).json();
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [userLoggedIn]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await (
          await fetch("/admin/messages/" + currentChat?._id)
        ).json();
        // console.log("ye kya hai", res);
        setMessages(res);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      senderId: userLoggedIn.user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== userLoggedIn.user._id
    );
    socket.current.emit("sendMessage", {
      senderId: userLoggedIn.user._id,
      receiverId: receiverId,
      text: newMessage,
    });
    // console.log(message);
    try {
      const res = await fetch("/admin/message/chat", {
        method: "POST",
        body: JSON.stringify({
          message: message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resJson = await res.json();
      console.log("derfe", resJson);
      // if (message.length === undefined) {
      //   setMessages([resJson]);
      // } else {
      setMessages([...messages, resJson]);
      // }
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  

  return (
    <>
      {/* <Navbar /> */}
      <div className={classes.messenger}>
        <div className={classes.chatMenu}>
          <div className={classes.chatMenuWrapper}>
            {/* <input
              placeholder="Search for the user"
              className={classes.chatMenuInput}
            /> */}
            {conversations.map((c, index) => (
              <div key={index} onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={userLoggedIn} />
              </div>
            ))}
          </div>
        </div>
        <div className={classes.chatBox}>
          <div className={classes.chatBoxWrapper}>
            {currentChat ? (
              <>
                <div className={classes.chatBoxTop}>
                  {messages?.length > 0 &&
                    messages?.map((m, index) => (
                      <div ref={scrollRef} key={index}>
                        <Message
                          message={m}
                          own={m.senderId === userLoggedIn.user._id}
                        />
                      </div>
                    ))}
                </div>
                <div className={classes.chatBoxBottom}>
                  <textarea
                    className={classes.chatMessageInput}
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button
                    className={classes.chatSubmitButton}
                    onClick={handleSubmit}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className={classes.noConversationText}>
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
