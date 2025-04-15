import React, { useEffect, useRef } from "react";
import ChatList from "./ChatList";
import ChatDetail from "./ChatDetail";
import ChatInformation from "./ChatInformation";
import SearchPanel from "./SearchPanel";
import { ChatProvider, useChat } from "../../../contexts/ChatContext";

const ChatViewContent = ({
  chats,
  activeChat,
  onSelectChat,
  onSendMessage,
  currentUser,
  contacts,
  onUpdateChat,
}) => {
  const modalRef = useRef(null);
  const searchPanelRef = useRef(null);
  const { isChatInfoOpen, toggleChatInfo, isSearchOpen, toggleSearchPanel } =
    useChat();

  useEffect(() => {
    const handleClickOutsideChatInfo = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        toggleChatInfo(false);
      }
    };

    const handleClickOutsideSearchPanel = (e) => {
      const isChatInfoButton = e.target.closest("[data-chatinfor-button]");
      if (
        searchPanelRef.current &&
        !searchPanelRef.current.contains(e.target) &&
        !isChatInfoButton
      ) {
        toggleSearchPanel(false);
      }
    };

    const mediaQuery = window.matchMedia("(min-width: 1280px)");

    const updateClickOutsideChatInfo = () => {
      if (
        isChatInfoOpen &&
        modalRef.current &&
        window.getComputedStyle(modalRef.current).position === "absolute"
      ) {
        console.log(
          "Attaching click outside handler for ChatInformation (position: absolute)"
        );
        document.addEventListener("mousedown", handleClickOutsideChatInfo);
      } else {
        console.log(
          "Removing click outside handler for ChatInformation (not absolute)"
        );
        document.removeEventListener("mousedown", handleClickOutsideChatInfo);
      }
    };

    const updateClickOutsideSearchPanel = () => {
      if (
        isSearchOpen &&
        searchPanelRef.current &&
        window.getComputedStyle(searchPanelRef.current).position === "absolute"
      ) {
        console.log(
          "Attaching click outside handler for SearchPanel (position: absolute)"
        );
        document.addEventListener("mousedown", handleClickOutsideSearchPanel);
      } else {
        console.log(
          "Removing click outside handler for SearchPanel (not absolute)"
        );
        document.removeEventListener(
          "mousedown",
          handleClickOutsideSearchPanel
        );
      }
    };

    const handleMediaChange = (e) => {
      if (!e.matches) {
        if (isChatInfoOpen) {
          console.log("Window resized below xl, closing ChatInformation");
          toggleChatInfo(false);
        }
        if (isSearchOpen) {
          console.log("Window resized below xl, closing SearchPanel");
          toggleSearchPanel(false);
        }
      }
    };

    updateClickOutsideChatInfo();
    updateClickOutsideSearchPanel();

    // Theo dõi thay đổi media query
    mediaQuery.addEventListener("change", handleMediaChange);

    // Dọn dẹp
    return () => {
      console.log("Cleaning up listeners");
      document.removeEventListener("mousedown", handleClickOutsideChatInfo);
      document.removeEventListener("mousedown", handleClickOutsideSearchPanel);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, [isChatInfoOpen, toggleChatInfo, isSearchOpen, toggleSearchPanel]);

  // Debug refs và position
  useEffect(() => {
    console.log("modalRef.current:", modalRef.current);
    if (modalRef.current) {
      console.log("modalRef classList:", modalRef.current.classList);
      console.log(
        "modalRef position:",
        window.getComputedStyle(modalRef.current).position
      );
    }
    console.log("searchPanelRef.current:", searchPanelRef.current);
    if (searchPanelRef.current) {
      console.log(
        "searchPanelRef classList:",
        searchPanelRef.current.classList
      );
      console.log(
        "searchPanelRef position:",
        window.getComputedStyle(searchPanelRef.current).position
      );
    }
  }, [isChatInfoOpen, isSearchOpen]);

  return (
    <div className="flex gap-4 h-[calc(100vh-98px)] w-full">
      <ChatList
        chats={chats}
        activeChat={activeChat}
        onSelectChat={(chatId, chat) => onSelectChat(chatId, chat)}
        contacts={contacts}
        currentUser={currentUser}
      />
      <div className="flex transition-all duration-300 gap-4 w-full h-full relative">
        {activeChat ? (
          <div className="transition-all duration-300 flex-1 h-full">
            <ChatDetail
              chat={activeChat}
              onSendMessage={onSendMessage}
              currentUser={currentUser}
              onUpdateChat={onUpdateChat}
            />
          </div>
        ) : (
          <div className="w-[57.875rem] h-full bg-white flex items-center justify-center">
            <p className="text-gray-500 text-lg">
              Hãy chọn một cuộc trò chuyện để bắt đầu
            </p>
          </div>
        )}
        {isChatInfoOpen && (
          <div
            className="xl:relative absolute right-0 top-0 h-full"
            ref={modalRef}
          >
            <ChatInformation />
          </div>
        )}
        {isSearchOpen && (
          <div
            className="xl:relative absolute right-0 top-0 h-full"
            ref={searchPanelRef}
          >
            <SearchPanel />
          </div>
        )}
      </div>
    </div>
  );
};

const ChatView = (props) => (
  <ChatProvider>
    <ChatViewContent {...props} />
  </ChatProvider>
);

export default ChatView;
