import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import FilterTabs from "./components/FilterTabs";
import SortDropdown from "./components/SortDropdown";
import ChatItem from "./components/ChatItem";
import SearchResults from "./components/SearchResults";

const ChatList = ({
  chats,
  activeChat,
  onSelectChat,
  contacts,
  currentUser,
}) => {
  const [chatData, setChatData] = useState(chats); // Quản lý trạng thái chats
  ////
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [tags, setTags] = useState([]);
  // Fetch danh sách tags khi mount
  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = () => {
    fetch("http://192.168.31.231:4000/tags?_sort=order&_order=asc")
      .then((res) => res.json())
      .then((data) => setTags(data))
      .catch((err) => console.error("Error fetching tags:", err));
  };
  const handleUpdateTags = () => {
    fetchTags(); // Cập nhật danh sách tags khi được gọi từ TagManagement
  };
  const handleUpdateChat = (chatId, updates) => {
    const updatedChats = chatData.map((chat) =>
      chat.id === chatId ? { ...chat, ...updates } : chat
    );
    setChatData(updatedChats);

    // Nếu dùng json-server, gửi PATCH request
    fetch(`http://192.168.31.231:4000/chats/${chatId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    }).catch((err) => console.error("Error updating chat:", err));
  };

  const filteredContacts = useMemo(() => {
    if (!contacts || !searchQuery.trim()) return [];
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [contacts, searchQuery]);

  const filteredMessages = useMemo(() => {
    if (!chats || !searchQuery.trim()) return [];
    const result = [];
    chats.forEach((chat) => {
      const matchingMessages = chat.messages.filter((msg) =>
        msg.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matchingMessages.length > 0) {
        result.push({ chat, messages: matchingMessages });
      }
    });
    return result;
  }, [chats, searchQuery]);

  const getChatName = (chat) => {
    let chatName;
    if (chat.type === "direct") {
      const otherParticipant = chat.participants.find(
        (p) => p.id !== currentUser.id
      );
      chatName = otherParticipant?.name || "Unknown";
    } else {
      chatName = chat.name || "Group Chat";
    }

    // Kiểm tra xem có biểu tượng nào không, với tag dựa trên chat.tag
    const hasIcons =
      (chat.tag !== null && chat.tag !== undefined) ||
      chat.isPinned ||
      chat.isNotificationOff ||
      chat.isFlagged;

    const maxLength = hasIcons ? 15 : 18;
    return chatName.length > maxLength
      ? chatName.substring(0, maxLength) + "..."
      : chatName;
  };

  const getChatAvatar = (chat) => {
    if (chat.type === "direct") {
      const otherParticipant = chat.participants.find(
        (p) => p.id !== currentUser.id
      );
      return otherParticipant?.avatar || "/avatar.png";
    } else if (chat.type === "group") {
      if (chat.avatar) return chat.avatar; // Ưu tiên avatar nhóm nếu có
      if (chat.participants.length >= 1) {
        return chat.participants
          .slice(0, 3)
          .map((p) => p.avatar || "/avatar.png");
      }
      return ["/group-avatar.png"];
    }
    return "/avatar.png";
  };

  const getLastMessage = (chat) => {
    if (!chat.messages || chat.messages.length === 0) return "Chưa có tin nhắn";
    const lastMessage = chat.messages[chat.messages.length - 1];

    // Kiểm tra xem có biểu tượng nào không, với tag dựa trên chat.tag thay vì chat.isTagged
    const hasIcons =
      (chat.tag !== null && chat.tag !== undefined) || // Kiểm tra tag có tồn tại
      chat.isPinned ||
      chat.isNotificationOff ||
      chat.isFlagged;

    const maxLength = hasIcons ? 20 : 35; // 20 nếu có biểu tượng, 35 nếu không
    return lastMessage.content.length > maxLength
      ? lastMessage.content.substring(0, maxLength) + "..."
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

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const isToday = messageDate.getTime() === today.getTime();
    const isYesterday = messageDate.getTime() === yesterday.getTime();
    const isThisYear = date.getFullYear() === now.getFullYear();

    // Hôm nay: Chỉ hiển thị giờ
    if (isToday) {
      return date.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    // Hôm qua: Hiển thị "Hôm qua"
    if (isYesterday) {
      return "Hôm qua";
    }

    // Năm nay: Hiển thị ngày/tháng
    if (isThisYear) {
      return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
      });
    }

    // Năm ngoái hoặc trước đó: Hiển thị đầy đủ ngày/tháng/năm
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleSearchFocus = () => {
    setIsSearchOpen(true);
  };

  const filteredChats = useMemo(() => {
    if (filter === "all") return chatData;
    return chatData.filter((chat) => chat.unreadCount > 0);
  }, [chatData, filter]);
  return (
    <div className="w-[25rem] h-full bg-white rounded-[.625rem] px-[.9375rem] border-gray-200 relative">
      <div className="border-b border-gray-200 w-full">
        <div className="flex w-full mt-4 gap-[1.375rem] justify-center items-center">
          <div className="relative w-[17.5rem]">
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="w-full pl-[15px] h-8 text-[.75rem] text-[#A8ABB8] font-semibold border border-gray-200 rounded-lg focus:outline-none placeholder:text-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleSearchFocus}
            />
          </div>

          <div className="flex gap-2">
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <img
                src="/chats/iconlist/addPeople.png"
                alt="add"
                className="w-6 h-6"
              />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <img
                src="/chats/iconlist/setting.png"
                alt="settings"
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>

        <FilterTabs filter={filter} setFilter={setFilter} />

        <SortDropdown isSortOpen={isSortOpen} setIsSortOpen={setIsSortOpen} />
      </div>

      {!isSearchOpen ? (
        <div className="flex flex-col items-center gap-[15px] overflow-y-auto h-[calc(100%-12rem)]">
          {filteredChats.length === 0 ? (
            <p className="p-4 text-gray-500">
              Không tìm thấy cuộc trò chuyện nào
            </p>
          ) : (
            filteredChats.map((chat) => (
              <ChatItem
                key={chat.id}
                chat={chat}
                activeChat={activeChat}
                onSelectChat={onSelectChat}
                currentUser={currentUser}
                getChatName={getChatName}
                getChatAvatar={getChatAvatar}
                getLastMessage={getLastMessage}
                formatTime={formatTime}
                onUpdateChat={handleUpdateChat}
                tags={tags}
                onUpdateTags={handleUpdateTags}
              />
            ))
          )}
        </div>
      ) : (
        <SearchResults
          filteredContacts={filteredContacts}
          filteredMessages={filteredMessages}
          onSelectChat={onSelectChat}
          getChatName={getChatName}
          getChatAvatar={getChatAvatar}
          currentUser={currentUser}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setIsSearchOpen={setIsSearchOpen}
          chats={chats}
        />
      )}
    </div>
  );
};

export default ChatList;
