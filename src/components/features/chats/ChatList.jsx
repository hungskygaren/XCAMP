import * as React from "react";
import { useState, useMemo, useEffect, useRef } from "react";
import FilterTabs from "./components/ChatList/FilterTabs";
import SortDropdown from "./components/ChatList/SortDropdown";
import ChatItem from "./components/ChatList/ChatItem";
import SearchResults from "./components/ChatList/SearchResults";
import TextInput from "@/components/ui/inputs/TextInput";
import AddGroup from "./components/ChatList/AddGroup";
import Setting from "./components/ChatList/Setting";
import Button from "@/components/ui/buttons/Button";

const ChatList = ({
  chats,
  activeChat,
  onSelectChat,
  contacts,
  currentUser,
}) => {
  const [chatData, setChatData] = useState(chats || []);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);
  const [isAddSettingOpen, setIsAddSettingOpen] = useState(false);
  const settingRef = useRef(null);
  const settingButtonRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState(""); // Thêm trạng thái cho từ khóa tìm kiếm
  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isAddSettingOpen &&
        settingRef.current &&
        !settingRef.current.contains(e.target) &&
        settingButtonRef.current &&
        !settingButtonRef.current.contains(e.target)
      ) {
        setIsAddSettingOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAddSettingOpen]);

  const fetchTags = () => {
    fetch("http://192.168.31.231:4000/tags?_sort=order&_order=asc")
      .then((res) => res.json())
      .then((data) => setTags(data))
      .catch((err) => console.error("Error fetching tags:", err));
  };

  const handleUpdateTags = () => {
    fetchTags();
  };

  const handleUpdateChat = (chatId, updates) => {
    const updatedChats = chatData.map((chat) =>
      chat.id === chatId ? { ...chat, ...updates } : chat
    );
    setChatData(updatedChats);

    fetch(`http://192.168.31.231:4000/chats/${chatId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    }).catch((err) => console.error("Error updating chat:", err));
  };

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
      if (chat.avatar) return chat.avatar;
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
    const hasIcons =
      (chat.tag !== null && chat.tag !== undefined) ||
      chat.isPinned ||
      chat.isNotificationOff ||
      chat.isFlagged;
    const maxLength = hasIcons ? 20 : 35;
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

    if (isToday) {
      return date.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    if (isYesterday) {
      return "Hôm qua";
    }
    if (isThisYear) {
      return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
      });
    }
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleSearchFocus = () => {
    setIsSearchOpen(true);
  };
  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery(""); // Reset từ khóa tìm kiếm
  };
  const filteredChats = useMemo(() => {
    if (filter === "all") return chatData;
    return chatData.filter((chat) => chat.unreadCount > 0);
  }, [chatData, filter]);

  const handleOpenAddGroup = () => {
    setIsAddGroupOpen(true);
  };

  const handleOpenAddSetting = () => {
    setIsAddSettingOpen(!isAddSettingOpen);
  };

  <div className="flex items-center w-[370px] h-10 justify-center mb-4 gap-[1.375rem]">
    <div className="relative w-[17.5rem]">
      <TextInput
        type="text"
        placeholder="Tìm kiếm"
        value={searchQuery} // Gắn giá trị từ khóa
        onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật từ khóa
        onFocus={handleSearchFocus}
        rightIcon="/chats/iconlist/search.png"
        rightIconClassName="w-4 h-4"
        inputClassName="w-full pl-[15px] h-8 text-[.75rem] text-[#A8ABB8] font-semibold border border-gray-200 rounded-lg focus:outline-none placeholder:text-gray-500"
      />
    </div>
    <div className="w-[90px]">
      <Button
        className="w-full h-8 text-[.75rem] font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center justify-center"
        onClick={handleCloseSearch}
        children={"Đóng"}
      />
    </div>
  </div>;

  return (
    <>
      <div className="w-[25rem]  bg-white rounded-[.625rem] px-[.9375rem] border-gray-200 relative">
        <div className=" w-full">
          <div className="flex w-full mt-4 gap-[1.375rem] justify-center items-center h-10">
            <div className="relative w-[17.5rem]">
              <TextInput
                type="text"
                placeholder="Tìm kiếm"
                value={searchQuery} // Gắn giá trị từ khóa
                onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật từ khóa
                onFocus={handleSearchFocus}
                rightIcon="/chats/iconlist/search.png"
                rightIconClassName="w-4 h-4"
                inputClassName="w-full pl-[15px] h-8 text-[.75rem] text-[#A8ABB8] font-semibold border border-gray-200 rounded-lg focus:outline-none placeholder:text-gray-500"
              />
            </div>
            {isSearchOpen ? (
              <div className="w-[90px]">
                <Button
                  className="w-full h-8 text-[.75rem] font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center justify-center"
                  onClick={handleCloseSearch}
                  children={"Đóng"}
                />
              </div>
            ) : (
              <div className="relative">
                <div className="flex gap-2 ">
                  <button
                    className="p-2 rounded-lg hover:bg-gray-100"
                    onClick={handleOpenAddGroup}
                  >
                    <img
                      src="/chats/iconlist/addGroup.png"
                      alt="add"
                      className="w-6 h-6"
                    />
                  </button>
                  <button
                    ref={settingButtonRef}
                    className="p-2 rounded-lg hover:bg-gray-100"
                    onClick={handleOpenAddSetting}
                  >
                    <img
                      src="/chats/iconlist/setting.png"
                      alt="settings"
                      className="w-6 h-6"
                    />
                  </button>
                </div>
                {isAddSettingOpen && (
                  <div ref={settingRef}>
                    <Setting />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {!isSearchOpen ? (
          <>
            <FilterTabs filter={filter} setFilter={setFilter} />
            <SortDropdown
              isSortOpen={isSortOpen}
              setIsSortOpen={setIsSortOpen}
            />
            <div className="flex flex-col items-center gap-[15px] overflow-y-auto overflow-x-hidden pr-3 h-[calc(100vh-252px)] ">
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
          </>
        ) : (
          <div>
            <SearchResults
              onSelectChat={onSelectChat}
              getChatName={getChatName}
              getChatAvatar={getChatAvatar}
              currentUser={currentUser}
              setIsSearchOpen={setIsSearchOpen}
              chats={chatData}
              contacts={contacts}
              searchQuery={searchQuery} // Truyền từ khóa tìm kiếm
              onCloseSearch={handleCloseSearch} // Truyền hàm đóng tìm kiếm
            />
          </div>
        )}
      </div>

      {isAddGroupOpen && (
        <AddGroup
          onClose={() => setIsAddGroupOpen(false)}
          chats={chatData}
          contacts={contacts}
          currentUser={currentUser}
        />
      )}
    </>
  );
};

export default ChatList;
