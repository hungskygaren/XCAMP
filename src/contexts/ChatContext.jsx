// src/contexts/ChatContext.js
import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [isChatInfoOpen, setIsChatInfoOpen] = useState(false);
  const [initialView, setInitialView] = useState(null);

  const toggleChatInfo = (open) => {
    setIsChatInfoOpen(open !== undefined ? open : !isChatInfoOpen);
    if (!open) setInitialView(null); // Reset initialView khi đóng
  };

  const openPinnedMessagesDetail = () => {
    setInitialView("pinned");

    setIsChatInfoOpen(true);
  };

  return (
    <ChatContext.Provider
      value={{
        isChatInfoOpen,
        toggleChatInfo,
        initialView,
        setInitialView,

        openPinnedMessagesDetail,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
