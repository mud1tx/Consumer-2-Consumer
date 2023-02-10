import React, { useEffect, useRef } from "react";
import { isSameSenderMargin, isSameUser } from "../../config/ChatLogics";
import { ChatState } from "../../context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const scrollRef = useRef();
  const { user } = ChatState();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  return (
    <div>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={Math.random() * 100000000000}>
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user.user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user.user._id),
                marginTop: isSameUser(messages, m, i, user.user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
              ref={scrollRef}
            >
              {m.content}
            </span>
          </div>
        ))}
    </div>
  );
};

export default ScrollableChat;
