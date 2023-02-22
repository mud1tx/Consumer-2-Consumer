import React, { useState } from "react";
import { Box } from "@chakra-ui/layout";
import Chatbox from "./Chatbox";
import MyChats from "./MyChats";
import { ChatState } from "../../context/ChatProvider";

const Chat = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  return (
    <div style={{ width: "100%" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        pb="5px"
        pt="70px"
        pl="10px"
        pr="10px"
      >
        {user?.isLoggedIn && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chat;
