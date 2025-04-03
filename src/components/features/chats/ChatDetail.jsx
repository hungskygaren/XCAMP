import React from "react";
import ChatHeader from "./components/ChatDetail/ChatHeader";
import MessagesList from "./components/ChatDetail/MessagesList";
import MessageInput from "./components/ChatDetail/MessageInput";

const ChatDetail = ({ chat, onSendMessage, currentUser }) => {
  if (!chat) return <div className="flex-1">No chat selected</div>;

  return (
    <div className="w-[57.875rem] flex flex-col bg-white rounded-[10px] mr-[16px] mb-[18px]">
      <ChatHeader chat={chat} currentUser={currentUser} />
      <MessagesList chat={chat} currentUser={currentUser} />
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatDetail;
