import React, { useRef, useState, useEffect } from "react";
import ChatBox from "./Chatbox";
import Conversation from "./Conversation";
import { AiOutlineArrowRight } from "react-icons/ai";
import "./Chat.css";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../BASE_URL";
import { io } from "socket.io-client";

const Chat = () => {
  const socket = useRef();
  const userLoggedIn = useSelector((state) => state.authenticateUser);
  const [profile, setProfile] = useState(true);
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [searchChatUser, setsearchChatUser] = useState();
  // // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const fetchUserChats = await fetch(
          `${BASE_URL}/admin/chats/${userLoggedIn?.user?._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const res = await fetchUserChats.json();
        setChats(res);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [userLoggedIn?.user?._id]);

  const handleInput = (e) => {
    setsearchChatUser(e.target.value);
  };

  // // Connect to Socket.io
  useEffect(() => {
    socket.current = io("https://consumer-2-consumer.adaptable.app");
    socket.current.emit("new-user-add", userLoggedIn?.user?._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
      // console.log(onlineUsers);
    });
  }, [userLoggedIn?.user?._id]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      // console.log(data);
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find(
      (member) => member !== userLoggedIn?.user?._id
    );
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <>
      <button
        onClick={() => setProfile(!profile)}
        className="border border-black/40 flex p-2 rounded-lg items-center justify-items-center"
      >
        Chats <AiOutlineArrowRight className="w-3 h-3 text-text_color" />
      </button>

      <div className="Chat_Mobile">
        {/* Left Side */}
        {profile && (
          <div className="Left-side-chat">
            <div className="Chat-container">
              <div className="Chat-list">
                {chats.map((chat) => (
                  <div
                    key={chat._id}
                    onClick={() => {
                      setCurrentChat(chat);
                      setProfile((val) => !val);
                    }}
                  >
                    <Conversation
                      data={chat}
                      currentUser={userLoggedIn?.user?._id}
                      online={checkOnlineStatus(chat)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="Right-side-chat">
          <ChatBox
            chat={currentChat}
            currentUser={userLoggedIn?.user?._id}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
          />
        </div>
      </div>
    </>
  );
};

export default Chat;
