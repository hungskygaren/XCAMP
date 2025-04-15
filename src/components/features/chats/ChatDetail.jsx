// src/components/features/chats/components/ChatDetail/ChatDetail.js
import React from "react";
import ChatHeader from "./components/ChatDetail/ChatHeader";
import MessagesList from "./components/ChatDetail/MessagesList";
import MessageInput from "./components/ChatDetail/MessageInput";
import { useChat } from "../../../contexts/ChatContext"; // Điều chỉnh đường dẫn

const ChatDetail = ({ chat, onSendMessage, currentUser, onUpdateChat }) => {
  const { toggleChatInfo, isChatInfoOpen } = useChat();

  if (!chat) return <div className="flex-1">No chat selected</div>;

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-[10px]">
      <ChatHeader
        chat={chat}
        currentUser={currentUser}
        toggleChatInfo={toggleChatInfo}
        isChatInfoOpen={isChatInfoOpen}
        onUpdateChat={onUpdateChat}
      />
      <MessagesList chat={chat} currentUser={currentUser} />
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatDetail;
