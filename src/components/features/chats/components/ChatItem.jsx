import React from "react";

const ChatItem = ({
  chat,
  activeChat,
  onSelectChat,
  currentUser,
  getChatName,
  getChatAvatar,
  getLastMessage,
  formatTime,
}) => {
  const avatars = getChatAvatar(chat);

  return (
    <div
      className={`flex items-start w-[370px] h-[70px] pl-[13px]  pr-[17px] pt-[13px]  rounded-[8px] border-[#E6E8EC] border-[1px] cursor-pointer transition-colors ${
        activeChat && activeChat.id === chat.id ? "bg-blue-200" : ""
      } ${chat.type === "group" ? "bg-violet-100" : ""}`}
      onClick={() => onSelectChat(chat.id)}
    >
      <div className="relative flex-shrink-0 ">
        {chat.unreadCount > 0 && (
          <div className="absolute z-20  right-0 top-0 translate-x-1.5  -translate-y-1/3 bg-[#EE316B] text-white text-xs font-semibold rounded-[200px] min-w-[29px] h-[20px] flex items-center justify-center">
            {chat.unreadCount}
          </div>
        )}
        {chat.type === "group" ? (
          typeof avatars === "string" ? (
            <img
              src={avatars}
              alt="Group avatar"
              className="w-11 h-11 rounded-full object-cover"
            />
          ) : avatars.length === 2 ? (
            // Trường hợp 2 người: hiển thị ngang, chồng nhẹ
            <div className="flex -space-x-1">
              {avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`Group member ${index + 1}`}
                  className="w-6 h-6 rounded-full object-cover "
                />
              ))}
            </div>
          ) : (
            // Trường hợp 3 người trở lên: hiển thị tam giác
            <div className="flex flex-col items-center">
              {/* Avatar trên cùng */}
              {avatars.length >= 1 && (
                <img
                  src={avatars[0]}
                  alt="Group member 1"
                  className="w-6 h-6 rounded-full object-cover  z-10"
                />
              )}
              {/* Hai avatar dưới hoặc avatar + số lượng */}
              <div className="flex -space-x-1 -mt-1.5">
                {avatars.length >= 2 && (
                  <img
                    src={avatars[1]}
                    alt="Group member 2"
                    className="w-6 h-6 rounded-full object-cover "
                  />
                )}
                {avatars.length === 3 && chat.participants.length === 3 ? (
                  <img
                    src={avatars[2]}
                    alt="Group member 3"
                    className="w-6 h-6 rounded-full object-cover "
                  />
                ) : chat.participants.length > 3 ? (
                  <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center  text-white text-sm">
                    +{chat.participants.length - 2}
                  </div>
                ) : null}
              </div>
            </div>
          )
        ) : (
          // Direct chat: dùng chuỗi avatar
          <img
            src={avatars}
            alt={getChatName(chat)}
            className="w-11 h-11 rounded-full object-cover"
          />
        )}
        {chat.type === "direct" &&
          chat.participants.find((p) => p.id !== currentUser.id)?.isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          )}
      </div>
      <div className="ml-3  w-full">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-twdark text-sm">
            {getChatName(chat)}
          </h3>
          <span className="text-xs text-gray-500">
            {formatTime(chat.lastMessageTime)}
          </span>
        </div>
        <div className="flex w-full justify-between items-center">
          <p
            className={`text-sm   ${
              chat.unreadCount > 0 ? "text-black" : "text-twgrey"
            }`}
          >
            {getLastMessage(chat)}
            {chat.messages?.[chat.messages.length - 1]?.attachments?.length >
              0 && <span className="text-sm ml-1">[file]</span>}
          </p>
          <div className="flex gap-2 ml-[7px] ">
            {chat.isTagged && (
              <img
                src="/chats/iconlist/tag.png"
                alt="Tagged"
                className="w-[18px] h-[18px]"
              />
            )}
            {chat.isPinned && (
              <img
                src="/chats/iconlist/pin.png"
                alt="Pinned"
                className="w-[18px] h-[18px]"
              />
            )}
            {chat.isNotificationOff && (
              <img
                src="/chats/iconlist/notificationoff.png"
                alt="Notification Off"
                className="w-[18px] h-[18px]"
              />
            )}
            {chat.isFlagged && (
              <img
                src="/chats/iconlist/flag.png"
                alt="Flagged"
                className="w-[18px] h-[18px]"
              />
            )}
          </div>
        </div>
      </div>
      {/* Container cho 4 biểu tượng ở bên phải ngoài cùng */}
    </div>
  );
};

export default ChatItem;
