import React, { useState, useEffect } from "react";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { getSender } from "../../config/ChatLogics";
import { useSelector } from "react-redux";
import { ChatState } from "../../context/ChatProvider";
import { BASE_URL } from "../../BASE_URL";

const MyChats = ({ fetchAgain }) => {
  const userLoggedIn = useSelector((state) => state.authenticateUser);
  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const [searchData, setSearchData] = useState([]);
  const toast = useToast();

  const fetchChats = async () => {
    try {
      const fetchChatsApi = await fetch(`${BASE_URL}/admin/chats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          currentUserId: userLoggedIn?.user?._id,
        },
      });

      const res = await fetchChatsApi.json();
      setChats(res);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const searchHandler = (e) => {
    const searchArray = [];
    chats.map((chat) => {
      chat.users.map((user) => {
        if (
          (user.first_name
            .toLowerCase()
            .trim()
            .includes(e.target.value.toLowerCase().trim()) ||
            user.last_name
              .toLowerCase()
              .trim()
              .includes(e.target.value.toLowerCase().trim())) &&
          !(
            user.first_name.toLowerCase().trim() ===
              userLoggedIn.user.first_name.toLowerCase().trim() ||
            user.last_name.toLowerCase().trim() ===
              userLoggedIn.user.last_name.toLowerCase().trim()
          )
        ) {
          searchArray.push(chat);
          return;
        }
      });
    });
    setSearchData(searchArray);
  };

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
      </Box>
      <div>
        <input
        className="border w-full focus:outline-none mb-2 rounded-lg outline-white"
        placeholder="Search User"
          type="search"
          onChange={(e) => {
            searchHandler(e);
          }}
        />
      </div>

      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {/* {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => ( */}
        {(searchData.length === 0 ? chats : searchData) ? (
          <Stack overflowY="scroll">
            {(searchData.length === 0 ? chats : searchData).map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#5ec576" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={Math.random() * 10000000}
              >
                <Text>
                  {!chat.isGroupChat && chat.users
                    ? getSender(userLoggedIn?.user, chat?.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>
                      {chat.latestMessage.sender.first_name}{" "}
                      {chat.latestMessage.sender.last_name} :{" "}
                    </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          {
            /* <ChatLoading /> */
          }
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
