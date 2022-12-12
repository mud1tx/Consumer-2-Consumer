import React from "react";
// import Conversation from "../components/Conversation";
// import Navbar from "../components/Navbar";
// import classes from "./Messanger.module.css";
// import Message from "../components/Message";
// import ChatOnline from "../components/ChatOnline";
// import { useSelector } from "react-redux";
// import { io } from "socket.io-client";
import Messenger from "../features/Messenger/Messenger";

const MessengerPage = () => {
  // const userLoggedIn = useSelector((state) => state.authenticateUser);
  // const [conversations, setConversations] = useState([]);
  // const [currentChat, setCurrentChat] = useState(null);
  // const [messages, setMessages] = useState([]);
  // const [newMessage, setNewMessage] = useState("");
  // const [arrivalMessage, setArrivalMessage] = useState(null);
  // const socket = useRef(io("ws://localhost:8900"));
  // const scrollRef = useRef();

  // useEffect(() => {
  //   socket.current = io("ws://localhost:8900");
  //   socket.current.on("getMessage", (data) => {
  //     setArrivalMessage({
  //       sender: data.senderId,
  //       text: data.text,
  //       createdAt: Date.now(),
  //     });
  //   });
  // }, []);

  // useEffect(() => {
  //   arrivalMessage &&
  //     currentChat?.members.includes(arrivalMessage.sender) &&
  //     setMessages((prev) => [...prev, arrivalMessage]);
  // }, [arrivalMessage, currentChat]);

  // useEffect(() => {
  //   socket.current.emit("addUser", userLoggedIn.user._id);
  // }, [userLoggedIn]);

  // useEffect(() => {
  //   const getConversations = async () => {
  //     try {
  //       const res = await (
  //         await fetch("/admin/conversation/" + userLoggedIn.user._id)
  //       ).json();
  //       setConversations(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getConversations();
  // }, [userLoggedIn]);

  // useEffect(() => {
  //   const getMessages = async () => {
  //     try {
  //       const res = await (
  //         await fetch("/admin/messages/" + currentChat?._id)
  //       ).json();
  //       // console.log("ye kya hai", res);
  //       setMessages(res);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getMessages();
  // }, [currentChat]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const message = {
  //     senderId: userLoggedIn.user._id,
  //     text: newMessage,
  //     conversationId: currentChat._id,
  //   };
  //   const receiverId = currentChat.members.find(
  //     (member) => member !== userLoggedIn.user._id
  //   );
  //   socket.current.emit("sendMessage", {
  //     senderId: userLoggedIn.user._id,
  //     receiverId: receiverId,
  //     text: newMessage,
  //   });
  //   // console.log(message);
  //   try {
  //     const res = await fetch("/admin/message/chat", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         message: message,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const resJson = await res.json();
  //     console.log("derfe", resJson);
  //     // if (message.length === undefined) {
  //     //   setMessages([resJson]);
  //     // } else {
  //     setMessages([...messages, resJson]);
  //     // }
  //     setNewMessage("");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  return (
    <>
      {/* <Navbar /> */}
      <Messenger />
    </>
  );
};

export default MessengerPage;
