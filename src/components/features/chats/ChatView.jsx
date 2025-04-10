// src/components/features/chats/components/ChatView.js
import React, { useEffect, useRef } from "react";
import ChatList from "./ChatList";
import ChatDetail from "./ChatDetail";
import ChatInformation from "./ChatInformation";
import { ChatProvider, useChat } from "../../../contexts/ChatContext";

const ChatViewContent = ({
  chats,
  activeChat,
  onSelectChat,
  onSendMessage,
  currentUser,
  contacts,
}) => {
  const modalRef = useRef(null);
  const { isChatInfoOpen, toggleChatInfo } = useChat();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        toggleChatInfo(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isChatInfoOpen, toggleChatInfo]);

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
