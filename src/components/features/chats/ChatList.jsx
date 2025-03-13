import * as React from "react";
import { useState } from "react";

const ChatList = ({ chats, activeChat, onSelectChat }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all"); // "all" hoặc "unread"
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filteredChats = React.useMemo(() => {
    let result = chats || [];
    if (!result.length) return [];

    // Lọc theo tìm kiếm
    if (searchQuery.trim()) {
      result = result.filter((chat) => {
        if (chat.type === "direct") {
          const otherParticipant = chat.participants.find((p) => p.id !== 1);
          return otherParticipant?.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        }
        return chat.name?.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    // Lọc theo tab "Chưa đọc"
    if (filter === "unread") {
      result = result.filter((chat) => chat.unreadCount > 0);
    }

    return result;
  }, [chats, searchQuery, filter]);

  const getChatName = (chat) => {
    if (chat.type === "direct") {
      const otherParticipant = chat.participants.find((p) => p.id !== 1);
      return otherParticipant?.name || "Unknown";
    }
    return chat.name || "Group Chat";
  };

  const getChatAvatar = (chat) => {
    if (chat.type === "direct") {
      const otherParticipant = chat.participants.find((p) => p.id !== 1);
      return otherParticipant?.avatar || "/avatar.png";
    }
    return "/group-avatar.png";
  };

  const getLastMessage = (chat) => {
    if (!chat.messages || chat.messages.length === 0) return "Chưa có tin nhắn";

    const lastMessage = chat.messages[chat.messages.length - 1];
    if (!lastMessage) return "";

    return lastMessage.content.length > 30
      ? lastMessage.content.substring(0, 30) + "..."
      : lastMessage.content;
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const messageDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    if (messageDate.getTime() === today.getTime()) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    const daysDiff = Math.floor(
      (today.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysDiff < 7) {
      return date.toLocaleDateString([], { weekday: "short" });
    }

    return date.toLocaleDateString([], { day: "2-digit", month: "2-digit" });
  };

  return (
    <div className="w-[25rem] h-full bg-white rounded-[.625rem]  px-[.9375rem] border-gray-200">
      {/* Header */}
      <div className=" border-b border-gray-200 w-full">
        {/* Thanh tìm kiếm */}
        <div className="flex w-full  mt-4 gap-[1.375rem] justify-center items-center ">
          <div className="relative w-[17.5rem] ">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full pl-[15px] h-8 text-[.75rem] text-gray-700 font-semibold border border-gray-200 rounded-lg focus:outline-none placeholder:text-gray-500 placeholder:opacity-100"
            />

            <div className="absolute inset-y-0 right-[.5625rem] flex items-center pointer-events-none">
              <button
                className="p-2 rounded-lg hover:bg-gray-100"
                aria-label="Lọc tin nhắn"
                onClick={() => console.log("Filter clicked")}
              >
                <img
                  src="/chats/iconlist/search.png"
                  alt="add"
                  className="w-[.9375rem] h-[.9375rem]"
                />
              </button>
            </div>
          </div>
          <div className="flex justify-between  items-center">
            <div className="flex gap-2">
              <button
                className="p-2 rounded-lg hover:bg-gray-100"
                aria-label="Lọc tin nhắn"
                onClick={() => console.log("Filter clicked")}
              >
                <img
                  src="/chats/iconlist/addPeople.png"
                  alt="add"
                  className="w-6 h-6"
                />
              </button>
              <button
                className="p-2 rounded-lg hover:bg-gray-100"
                aria-label="Cài đặt"
                onClick={() => console.log("Settings clicked")}
              >
                <img
                  src="/chats/iconlist/setting.png"
                  alt="Settings"
                  className="w-6 h-6"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Thanh điều hướng */}
        <div className="relative w-[370px] bg-gray-100 rounded-lg flex mt-4">
          {/* Nút di chuyển theo trạng thái */}
          <div
            className={`absolute top-1 bottom-1 w-1/2 bg-rose-500 rounded-lg transition-all duration-300 ${
              filter === "unread" ? "translate-x-full" : "translate-x-0"
            }`}
          />

          {/* Nút "Tất cả" */}
          <button
            className={`relative w-1/2 px-4 py-2 text-center font-medium z-10 transition-colors ${
              filter === "all" ? "text-white" : "text-black"
            }`}
            onClick={() => setFilter("all")}
          >
            Tất cả
          </button>

          {/* Nút "Chưa đọc" */}
          <button
            className={`relative w-1/2 px-4 py-2 text-center font-medium z-10 transition-colors ${
              filter === "unread" ? "text-white" : "text-black"
            }`}
            onClick={() => setFilter("unread")}
          >
            Chưa đọc
          </button>
        </div>

        {/* Nút phân loại */}
        <div className="relative flex gap-2 mt-2">
          <button
            className="flex items-center gap-1 text-sm font-semibold text-gray-900"
            onClick={() => setIsSortOpen(!isSortOpen)}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/eaf66ec7115845108341136eff88427a/f8aeaa69cf1347b910767c2a93350217bd85beb59eabcb7f71f87aa1a8e889d5"
              alt="Sort"
              className="w-4 h-4"
            />
            Phân loại
          </button>
          {isSortOpen && (
            <div className="absolute top-8 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10">
              <button
                className="block w-full text-left px-2 py-1 hover:bg-gray-100"
                onClick={() => {
                  console.log("Sort by time");
                  setIsSortOpen(false);
                }}
              >
                Theo thời gian
              </button>
              <button
                className="block w-full text-left px-2 py-1 hover:bg-gray-100"
                onClick={() => {
                  console.log("Sort by name");
                  setIsSortOpen(false);
                }}
              >
                Theo tên
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Danh sách chat */}
      <div className="overflow-y-auto h-[calc(100%-12rem)]">
        {filteredChats.length === 0 ? (
          <p className="p-4 text-gray-500">
            Không tìm thấy cuộc trò chuyện nào
          </p>
        ) : (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
              className={`flex items-start p-4 cursor-pointer hover:bg-gray-100 transition-colors ${
                activeChat && activeChat.id === chat.id ? "bg-blue-50" : ""
              } ${chat.type === "group" ? "bg-violet-100" : ""}`}
              onClick={() => onSelectChat(chat.id)}
            >
              <div className="relative">
                {chat.type === "group" ? (
                  <div className="flex -space-x-2">
                    {chat.participants.slice(0, 2).map((p) => (
                      <img
                        key={p.id}
                        src={p.avatar}
                        alt={p.name}
                        className="w-8 h-8 rounded-full object-cover border-2 border-white"
                      />
                    ))}
                  </div>
                ) : (
                  <img
                    src={getChatAvatar(chat)}
                    alt={getChatName(chat)}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                {chat.type === "direct" &&
                  chat.participants.find((p) => p.id !== 1)?.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
              </div>

              <div className="ml-3 flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900">
                    {getChatName(chat)}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {formatTime(chat.lastMessageTime)}
                  </span>
                </div>
                <p
                  className={`text-sm mt-1 ${
                    chat.unreadCount > 0
                      ? "text-gray-900 font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {getLastMessage(chat)}
                  {chat.messages?.[chat.messages.length - 1]?.attachments
                    ?.length > 0 && <span className="ml-1">📎</span>}
                </p>
              </div>

              {chat.unreadCount > 0 && (
                <div className="ml-2 bg-blue-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {chat.unreadCount}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
