import React from "react";
import ChatList from "./ChatList";
import ChatDetail from "./ChatDetail";
import ChatInformation from "./ChatInformation"; // Import component mới

const ChatView = ({
  chats,
  activeChat,
  onSelectChat,
  onSendMessage,
  currentUser,
  contacts,
  isChatInfoOpen, // Nhận trạng thái
  toggleChatInfo, // Nhận hàm toggle
}) => {
  return (
    <div className="flex gap-4 h-[calc(100vh-98px)]  ">
      <ChatList
        chats={chats}
        activeChat={activeChat}
        onSelectChat={(chatId, chat) => onSelectChat(chatId, chat)}
        contacts={contacts}
        currentUser={currentUser}
      />
      <div className="flex transition-all duration-300 gap-4 w-[926px] h-full">
        {activeChat ? (
          <div className={`transition-all duration-300 flex-1 h-full`}>
            <ChatDetail
              chat={activeChat}
              onSendMessage={onSendMessage}
              currentUser={currentUser}
              toggleChatInfo={toggleChatInfo} // Truyền toggle xuống ChatDetail
              isChatInfoOpen={isChatInfoOpen} // Truyền trạng thái xuống ChatDetail
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
          <div className="w-[340px] transition-all duration-300">
            <ChatInformation />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatView;
