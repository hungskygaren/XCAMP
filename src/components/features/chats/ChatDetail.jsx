import React from "react";
import ChatHeader from "./components/ChatDetail/ChatHeader";
import MessagesList from "./components/ChatDetail/MessagesList";
import MessageInput from "./components/ChatDetail/MessageInput";

const ChatDetail = ({
  chat,
  onSendMessage,
  currentUser,
  toggleChatInfo,
  isChatInfoOpen,
}) => {
  if (!chat) return <div className="flex-1">No chat selected</div>;

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-[10px]  ">
      <ChatHeader
        chat={chat}
        currentUser={currentUser}
        toggleChatInfo={toggleChatInfo}
        isChatInfoOpen={isChatInfoOpen}
      />
      <MessagesList chat={chat} currentUser={currentUser} />
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatDetail;
