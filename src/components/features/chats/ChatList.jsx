// src/components/features/chats/components/ChatList/ChatList.js
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
import More from "./components/ChatList/More";
import search from "/public/chats/iconlist/search.png";

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
  const [selectedTags, setSelectedTags] = useState([]); // Danh sách tag được chọn
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);
  const [isAddSettingOpen, setIsAddSettingOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const settingRef = useRef(null);
  const settingButtonRef = useRef(null);
  const [filterFlagged, setFilterFlagged] = useState(false);
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

  useEffect(() => {
    setChatData(chats || []);
  }, [chats]);

  const fetchTags = () => {
    fetch(` ${process.env.NEXT_PUBLIC_API_URL}/tags?_sort=order&_order=asc`)
      .then((res) => res.json())
      .then((data) => setTags(data))
      .catch((err) => console.error("Error fetching tags:", err));
  };

  // Hàm lọc tin nhắn theo danh sách tag
  const handleFilterByTag = (tagIds) => {
    setSelectedTags(tagIds);
  };
  const handleFilterByFlag = (shouldFilter) => {
    setFilterFlagged(shouldFilter); // Cập nhật trạng thái lọc flagged
  };
  const handleUpdateTags = () => {
    fetchTags();
  };

  const handleUpdateChat = (chatId, updates) => {
    const updatedChats = chatData.map((chat) =>
      chat.id === chatId ? { ...chat, ...updates } : chat
    );
    setChatData(updatedChats);

    fetch(` ${process.env.NEXT_PUBLIC_API_URL}/chats/${chatId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    }).catch((err) => console.error("Error updating chat:", err));
  };

  // Logic lọc chat dựa trên filter và selectedTags
  const chatsToDisplay = useMemo(() => {
    let result = chatData;
    // Lọc theo flagged từ More
    if (filterFlagged) {
      result = result.filter((chat) => chat.isFlagged);
    }
    // Lọc theo filter từ FilterTabs
    if (filter === "unread") {
      result = result.filter((chat) => chat.unreadCount > 0);
    }

    // Lọc theo danh sách tag từ SortDropdown
    if (selectedTags.length > 0) {
      result = result.filter((chat) => selectedTags.includes(chat.tag));
    }

    return result;
  }, [chatData, filter, selectedTags, filterFlagged]);

  const handleSearchFocus = () => {
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const handleOpenAddGroup = () => {
    setIsAddGroupOpen(true);
  };

  const handleOpenAddSetting = () => {
    setIsAddSettingOpen(!isAddSettingOpen);
  };
  const handleResetFilters = () => {
    setFilterFlagged(false);

    setSelectedTags([]);
    setFilter("all");
  };

  return (
    <>
      <div className="w-[25rem] bg-white rounded-[.625rem] px-[.9375rem] border-gray-200 relative">
        <div className="w-full">
          <div className="flex w-full mt-4 gap-[1.375rem] justify-center items-center h-10">
            <div className="relative w-[17.5rem]">
              <TextInput
                type="text"
                placeholder="Tìm kiếm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                rightIcon={search.src}
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
                <div className="flex gap-2">
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
            <div className="flex justify-between items-center ">
              <SortDropdown
                isSortOpen={isSortOpen}
                setIsSortOpen={setIsSortOpen}
                onFilterByTag={handleFilterByTag}
                chats={chats}
              />
              <More
                onFilterByFlag={handleFilterByFlag}
                onResetFilters={handleResetFilters}
              />
            </div>
            <div className="flex flex-col items-center gap-[15px] overflow-y-auto  h-[calc(100vh-252px)]">
              {chatsToDisplay.length === 0 ? (
                <p className="p-4 text-gray-500">
                  Không tìm thấy cuộc trò chuyện nào
                </p>
              ) : (
                chatsToDisplay.map((chat) => (
                  <ChatItem
                    key={chat.id}
                    chat={chat}
                    activeChat={activeChat}
                    onSelectChat={onSelectChat}
                    currentUser={currentUser}
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
              currentUser={currentUser}
              setIsSearchOpen={setIsSearchOpen}
              chats={chatData}
              contacts={contacts}
              searchQuery={searchQuery}
              onCloseSearch={handleCloseSearch}
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
