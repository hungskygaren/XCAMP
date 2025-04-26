// src/components/features/chats/components/ChatList/ChatList.js
import * as React from "react";
import { useState, useMemo, useEffect, useRef } from "react";
import FilterTabs from "./components/ChatList/FilterTabs";
import SortDropdown from "./components/ChatList/SortDropdown";
import ChatItem from "./components/ChatList/ChatItem";
import SearchResults from "./components/ChatList/SearchResults";
import TextInput from "../common/ui/inputs/TextInput";
import AddGroup from "./components/ChatList/AddGroup";
import Setting from "./components/ChatList/Setting";
import Button from "../common/ui/buttons/Button";
import More from "./components/ChatList/More";
import search from "../../../public/chatsimg/Chats/iconlist/search.png";
import addgroup from "../../../public/chatsimg/Chats/iconlist/addGroup.png";
import setting from "../../../public/chatsimg/Chats/iconlist/setting.png";
import Image from "next/image";

// Component hiển thị danh sách các cuộc trò chuyện
const ChatList = ({
  chats, // Danh sách các cuộc trò chuyện
  activeChat, // Cuộc trò chuyện đang được chọn
  onSelectChat, // Hàm xử lý khi chọn một cuộc trò chuyện
  contacts, // Danh sách liên hệ
  currentUser, // Người dùng hiện tại
  onUpdateChat, // Hàm cập nhật thông tin chat
}) => {
  // Trạng thái dữ liệu chat
  const [chatData, setChatData] = useState(chats || []);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);
  const [isAddSettingOpen, setIsAddSettingOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const settingRef = useRef(null);
  const settingButtonRef = useRef(null);
  const [filterFlagged, setFilterFlagged] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contextMenu && !e.target.closest(".context-menu")) {
        setContextMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("contextmenu", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("contextmenu", handleClickOutside);
    };
  }, [contextMenu]);
  useEffect(() => {
    fetchTags();
  }, []);

  // Đóng cài đặt khi click ra ngoài
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

  // Cập nhật dữ liệu chat khi props `chats` thay đổi
  useEffect(() => {
    setChatData(chats || []);
  }, [chats]);

  // Fetch danh sách tag từ API
  const fetchTags = () => {
    fetch(
      ` ${process.env.NEXT_PUBLIC_API_URL_TEST}/tags?_sort=order&_order=asc`
    )
      .then((res) => res.json())
      .then((data) => setTags(data))
      .catch((err) => console.error("Error fetching tags:", err));
  };

  // Lọc tin nhắn theo danh sách tag
  const handleFilterByTag = (tagIds) => {
    setSelectedTags(tagIds);
  };

  // Lọc tin nhắn flagged
  const handleFilterByFlag = (shouldFilter) => {
    setFilterFlagged(shouldFilter);
  };

  // Cập nhật danh sách tag
  const handleUpdateTags = () => {
    fetchTags();
  };

  // Cập nhật thông tin chat
  const handleUpdateChat = (chatId, updates) => {
    const updatedChats = chatData.map((chat) =>
      chat.id === chatId ? { ...chat, ...updates } : chat
    );
    setChatData(updatedChats);

    // Gửi yêu cầu cập nhật lên server
    fetch(` ${process.env.NEXT_PUBLIC_API_URL_TEST}/chats/${chatId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    }).catch((err) => console.error("Error updating chat:", err));
  };

  // Lọc danh sách chat dựa trên filter và tag
  const chatsToDisplay = useMemo(() => {
    let result = chatData;

    // Lọc theo flagged
    if (filterFlagged) {
      result = result.filter((chat) => chat.isFlagged);
    }

    // Lọc theo trạng thái unread
    if (filter === "unread") {
      result = result.filter((chat) => chat.unreadCount > 0);
    }

    // Lọc theo tag
    if (selectedTags.length > 0) {
      result = result.filter((chat) => selectedTags.includes(chat.tag));
    }

    return result;
  }, [chatData, filter, selectedTags, filterFlagged]);

  // Xử lý khi focus vào ô tìm kiếm
  const handleSearchFocus = () => {
    setIsSearchOpen(true);
  };

  // Đóng tìm kiếm
  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  // Mở modal thêm nhóm
  const handleOpenAddGroup = () => {
    setIsAddGroupOpen(true);
  };

  // Mở/đóng cài đặt
  const handleOpenAddSetting = () => {
    setIsAddSettingOpen(!isAddSettingOpen);
  };

  // Reset bộ lọc
  const handleResetFilters = () => {
    setFilterFlagged(false);
    setSelectedTags([]);
    setFilter("all");
  };

  return (
    <>
      <div className=" w-[18rem] mid-lg:w-[20rem] lg:w-[25rem] bg-white rounded-[.625rem] px-[.9375rem] border-gray-200 relative h-full">
        <div className="w-full">
          <div className="flex w-full mt-[16px] gap-[1.375rem] justify-center items-center h-10">
            <div className="relative flex-1">
              {/* Ô tìm kiếm */}
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
                {/* Nút đóng tìm kiếm */}
                <Button
                  className=" cursor-pointer flex-shink-0 w-full h-8 text-[.75rem] font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center justify-center"
                  onClick={handleCloseSearch}
                  children={"Đóng"}
                />
              </div>
            ) : (
              <div className="relative">
                <div className="flex gap-2 flex-shrink-0">
                  {/* Nút thêm nhóm */}
                  <button
                    className="p-2 rounded-lg hover:bg-gray-100 flex-shrink-0 cursor-pointer"
                    onClick={handleOpenAddGroup}
                  >
                    <Image
                      src={addgroup.src}
                      alt="add"
                      width={24}
                      height={24}
                    />
                  </button>
                  {/* Nút mở cài đặt */}
                  <button
                    ref={settingButtonRef}
                    className="p-2 cursor-pointer rounded-lg hover:bg-gray-100 flex-shink-0"
                    onClick={handleOpenAddSetting}
                  >
                    <Image
                      src={setting.src}
                      alt="settings"
                      width={24}
                      height={24}
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
            {/* Tabs lọc */}
            <FilterTabs filter={filter} setFilter={setFilter} />
            <div className="flex justify-between items-center ">
              {/* Dropdown sắp xếp */}
              <SortDropdown
                isSortOpen={isSortOpen}
                setIsSortOpen={setIsSortOpen}
                onFilterByTag={handleFilterByTag}
                chats={chats}
              />
              {/* Menu mở rộng */}
              <More
                onFilterByFlag={handleFilterByFlag}
                onResetFilters={handleResetFilters}
              />
            </div>
            {/* Danh sách chat */}
            <div className="flex flex-col items-center pr-2 gap-[15px] overflow-y-auto  h-[calc(100vh-268px)] w-full">
              {chatsToDisplay.length === 0 ? (
                <p className="p-4 mb-0 text-gray-500">
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
                    onUpdateChat={onUpdateChat} // Truyền prop này xuống
                    tags={tags}
                    onUpdateTags={handleUpdateTags}
                    contextMenu={contextMenu}
                    setContextMenu={setContextMenu}
                  />
                ))
              )}
            </div>
          </>
        ) : (
          <div>
            {/* Kết quả tìm kiếm */}
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

      {/* Modal thêm nhóm */}
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
