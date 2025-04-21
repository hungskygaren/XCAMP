import React, { createContext, useContext, useState, useCallback } from "react";

// Tạo ngữ cảnh (context) để quản lý trạng thái liên quan đến chat
const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  // Trạng thái mở/đóng của ChatInformation panel
  const [isChatInfoOpen, setIsChatInfoOpen] = useState(false);
  // Trạng thái hiển thị ban đầu (ví dụ: pinned messages)
  const [initialView, setInitialView] = useState(null);
  // Trạng thái mở/đóng của SearchPanel
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Hàm toggle trạng thái ChatInformation panel
  const toggleChatInfo = useCallback(
    (open) => {
      const nextState = open !== undefined ? open : !isChatInfoOpen;
      setIsChatInfoOpen(nextState);

      // Reset initialView khi đóng ChatInformation
      if (!nextState) setInitialView(null);

      // Đóng SearchPanel nếu đang mở
      if (isSearchOpen) setIsSearchOpen(false);
    },
    [isChatInfoOpen, isSearchOpen] // Phụ thuộc vào trạng thái hiện tại
  );

  // Hàm toggle trạng thái SearchPanel
  const toggleSearchPanel = useCallback(
    (value) => {
      const nextState = value !== undefined ? value : !isSearchOpen;
      setIsSearchOpen(nextState);

      // Đóng ChatInformation nếu SearchPanel được mở
      if (isChatInfoOpen) setIsChatInfoOpen(false);

      // Reset initialView khi đóng SearchPanel
      if (value === false) setInitialView(null);
    },
    [isSearchOpen, isChatInfoOpen] // Phụ thuộc vào trạng thái hiện tại
  );

  // Hàm mở chi tiết pinned messages
  const openPinnedMessagesDetail = useCallback(() => {
    setInitialView("pinned"); // Đặt initialView là "pinned"
    if (isSearchOpen) setIsSearchOpen(false); // Đóng SearchPanel nếu đang mở
    setIsChatInfoOpen(true); // Mở ChatInformation panel
  }, [isSearchOpen]);

  return (
    // Cung cấp các giá trị và hàm cho các component con
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

// Hook tùy chỉnh để sử dụng ChatContext
export const useChat = () => useContext(ChatContext);
