import React from "react";
import ChatList from "./ChatList";
import ChatDetail from "./ChatDetail";

const ChatView = ({
  chats,
  activeChat,
  onSelectChat,
  onSendMessage,
  currentUser,
  contacts,
}) => {
  return (
    <div className="flex gap-4 h-screen">
      <ChatList
        chats={chats}
        activeChat={activeChat}
        onSelectChat={(chatId, chat) => onSelectChat(chatId, chat)}
        contacts={contacts}
        currentUser={currentUser}
      />
      {activeChat ? (
        <ChatDetail
          chat={activeChat}
          onSendMessage={onSendMessage}
          currentUser={currentUser}
        />
      ) : (
        <div className="w-[57.875rem] h-full bg-white flex items-center justify-center">
          <p className="text-gray-500 text-lg">
            Hãy chọn một cuộc trò chuyện để bắt đầu
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatView;
