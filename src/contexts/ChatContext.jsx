// src/contexts/ChatContext.js
import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [isChatInfoOpen, setIsChatInfoOpen] = useState(false);
  const [initialView, setInitialView] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleChatInfo = (open) => {
    setIsChatInfoOpen(open !== undefined ? open : !isChatInfoOpen);
    if (!open) setInitialView(null); // Reset initialView khi đóng
    if (isSearchOpen) setIsSearchOpen(false); // Đóng SearchPanel nếu đang mở
  };
  const toggleSearchPanel = (value) => {
    setIsSearchOpen(value !== undefined ? value : !isSearchOpen);
    if (isChatInfoOpen) setIsChatInfoOpen(false); // Đóng ChatInformation nếu đang mở
    if (value === false) setInitialView(null); // Reset initialView khi đóng SearchPanel (nếu cần)
  };
  const openPinnedMessagesDetail = () => {
    setInitialView("pinned");
    if (isSearchOpen) setIsSearchOpen(false); // Đóng SearchPanel
    setIsChatInfoOpen(true);
  };

  return (
    <ChatContext.Provider
      value={{
        isChatInfoOpen,
        toggleChatInfo,
        initialView,
        setInitialView,
        isSearchOpen,
        toggleSearchPanel,
        openPinnedMessagesDetail,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
