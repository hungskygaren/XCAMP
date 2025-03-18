import * as React from "react";
import { useState, useMemo } from "react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [isSortOpen, setIsSortOpen] = useState(false);

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
    // Kiểm tra xem có bất kỳ biểu tượng nào không
    const hasIcons =
      chat.isTagged ||
      chat.isPinned ||
      chat.isNotificationOff ||
      chat.isFlagged;
    const maxLength = hasIcons ? 15 : 18;
    return chatName.length > maxLength
      ? chatName.substring(0, maxLength) + "..."
      : chatName;
  };

  // const getChatAvatar = (chat) => {
  //   if (chat.type === "direct") {
  //     const otherParticipant = chat.participants.find(
  //       (p) => p.id !== currentUser.id
  //     );
  //     return otherParticipant?.avatar || "/avatar.png"; // Trả về chuỗi cho direct chat
  //   } else if (chat.type === "group") {
  //     if (chat.participants.length >= 1) {
  //       // Trả về mảng avatar của tối đa 3 thành viên đầu tiên
  //       return chat.participants
  //         .slice(0, 3)
  //         .map((p) => p.avatar || "/avatar.png");
  //     }
  //     return ["/group-avatar.png"]; // Default nếu không có thành viên
  //   }
  //   return "/avatar.png"; // Default chung
  // };
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
    const hasIcons =
      chat.isTagged ||
      chat.isPinned ||
      chat.isNotificationOff ||
      chat.isFlagged;
    const maxLength = hasIcons ? 20 : 35; // 20 nếu có biểu tượng, 30 nếu không
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

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const filteredChats = useMemo(() => {
    if (filter === "all") return chats;
    return chats.filter((chat) => chat.unreadCount > 0);
  }, [chats, filter]);

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
          {/* <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onFocus={() => setIsSearchOpen(true)}
            onClose={() => {
              setIsSearchOpen(false);
              setSearchQuery("");
            }}
          /> */}
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

        {/* <div className="relative w-[370px] h-8 bg-gray-100 rounded-lg flex mt-4">
          <div
            className={`absolute h-full w-1/2 bg-[#EE316B] rounded-lg transition-all duration-300 ${
              filter === "unread" ? "translate-x-full" : "translate-x-0"
            }`}
          />
          <button
            className={`relative text-xs font-semibold w-1/2 text-center z-10 ${
              filter === "all" ? "text-white" : "text-[#777E90]"
            }`}
            onClick={() => setFilter("all")}
          >
            Tất cả tin nhắn
          </button>
          <button
            className={`relative text-xs font-semibold w-1/2 text-center z-10 ${
              filter === "unread" ? "text-white" : "text-[#777E90]"
            }`}
            onClick={() => setFilter("unread")}
          >
            Chưa đọc
          </button>
        </div> */}
        <FilterTabs filter={filter} setFilter={setFilter} />
        {/* <div className="relative items-center flex justify-between">
          <button
            className="flex items-center gap-0.5 my-[14px] text-sm font-semibold text-gray-900"
            onClick={() => setIsSortOpen(!isSortOpen)}
          >
            <img
              src="/chats/iconlist/tag.png"
              alt="Sort"
              className="w-[1.125rem] mt-[1px] h-[1.125rem]"
            />
            <p className="text-xs pl-1.5 mt-0.5 font-semibold">Phân loại</p>
            {isSortOpen ? (
              <img
                src="/chats/iconlist/line.png"
                alt="Sort"
                className="w-5 h-5 rotate-90"
              />
            ) : (
              <img
                src="/chats/iconlist/line.png"
                alt="Sort"
                className="w-5 h-5"
              />
            )}
          </button>
          {isSortOpen && (
            <div className="absolute top-8 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10">
              <button
                className="block w-full text-left px-2 py-1 hover:bg-gray-100"
                onClick={() => setIsSortOpen(false)}
              >
                Theo thời gian
              </button>
              <button
                className="block w-full text-left px-2 py-1 hover:bg-gray-100"
                onClick={() => setIsSortOpen(false)}
              >
                Theo tên
              </button>
            </div>
          )}
          <div className="w-[18px] h-[18px]">
            <img src="/chats/iconlist/3dot.png" alt="" />
          </div>
        </div> */}
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
              // <div
              //   key={chat.id}
              //   className={`flex items-start w-full h-[70px] pl-[13px] pt-[13px] pr-[17px] pb-[16px] rounded-[8px] border-[#E6E8EC] border-[1px] cursor-pointer transition-colors ${
              //     activeChat && activeChat.id === chat.id ? "bg-blue-200" : ""
              //   } ${chat.type === "group" ? "bg-violet-100" : ""}`}
              //   onClick={() => onSelectChat(chat.id)}
              // >
              //   <div className="relative">
              //     {chat.type === "group" ? (
              //       chat.participants.length === 2 ? (
              //         // Trường hợp 2 người: hiển thị ngang, chồng nhẹ
              //         <div className="flex -space-x-2">
              //           {chat.participants.slice(0, 2).map((p) => (
              //             <img
              //               key={p.id}
              //               src={p.avatar}
              //               alt={p.name}
              //               className="w-8 h-8 rounded-full object-cover border-2 border-white"
              //             />
              //           ))}
              //         </div>
              //       ) : (
              //         // Trường hợp 3 người trở lên: hiển thị tam giác
              //         <div className="flex flex-col items-center">
              //           {/* Avatar trên cùng với z-index cao */}
              //           {chat.participants.length >= 1 && (
              //             <img
              //               src={chat.participants[0].avatar}
              //               alt={chat.participants[0].name}
              //               className="w-8 h-8 rounded-full object-cover border-2 border-white z-10"
              //             />
              //           )}
              //           {/* Hai avatar dưới hoặc avatar + số lượng */}
              //           <div className="flex -space-x-2 -mt-2">
              //             {chat.participants.length >= 2 && (
              //               <img
              //                 src={chat.participants[1].avatar}
              //                 alt={chat.participants[1].name}
              //                 className="w-8 h-8 rounded-full object-cover border-2 border-white"
              //               />
              //             )}
              //             {chat.participants.length === 3 ? (
              //               <img
              //                 src={chat.participants[2].avatar}
              //                 alt={chat.participants[2].name}
              //                 className="w-8 h-8 rounded-full object-cover border-2 border-white"
              //               />
              //             ) : chat.participants.length > 3 ? (
              //               <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center border-2 border-white text-white text-sm">
              //                 +{chat.participants.length - 2}
              //               </div>
              //             ) : null}
              //           </div>
              //         </div>
              //       )
              //     ) : (
              //       <img
              //         src={getChatAvatar(chat)}
              //         alt={getChatName(chat)}
              //         className="w-12 h-12 rounded-full object-cover"
              //       />
              //     )}
              //     {chat.type === "direct" &&
              //       chat.participants.find((p) => p.id !== 1)?.isOnline && (
              //         <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              //       )}
              //   </div>
              //   <div className="ml-3 flex-1">
              //     <div className="flex justify-between items-center">
              //       <h3 className="font-semibold text-twdark">
              //         {getChatName(chat)}
              //       </h3>
              //       <span className="text-xs text-gray-500">
              //         {formatTime(chat.lastMessageTime)}
              //       </span>
              //     </div>
              //     <p
              //       className={`text-sm mt-1 ${
              //         chat.unreadCount > 0 ? "text-black" : "text-twgrey"
              //       }`}
              //     >
              //       {getLastMessage(chat)}
              //       {chat.messages?.[chat.messages.length - 1]?.attachments
              //         ?.length > 0 && <span className="ml-1">📎</span>}
              //     </p>
              //   </div>
              //   {chat.unreadCount > 0 && (
              //     <div className="ml-2 bg-[#EE316B] text-white text-xs font-medium rounded-[200px] w-[33px] h-[20px] flex items-center justify-center">
              //       {chat.unreadCount}
              //     </div>
              //   )}
              // </div>
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
              />
            ))
          )}
        </div>
      ) : (
        // <div className="absolute inset-0 bg-white z-20 p-4 overflow-y-auto">
        //   <div className="flex items-center mb-4 gap-[1.375rem]">
        //     <div className="relative w-[17.5rem]">
        //       <input
        //         type="text"
        //         placeholder="Tìm kiếm liên hệ hoặc tin nhắn"
        //         className="w-full pl-[15px] h-8 text-[.75rem] text-[#A8ABB8] font-semibold border border-gray-200 rounded-lg focus:outline-none placeholder:text-gray-500"
        //         value={searchQuery}
        //         onChange={(e) => setSearchQuery(e.target.value)}
        //         autoFocus
        //       />
        //     </div>
        //     <button
        //       className="flex-1 h-8 text-[.75rem] font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center justify-center"
        //       onClick={handleCloseSearch}
        //     >
        //       Đóng
        //     </button>
        //   </div>

        //   {filteredContacts.length > 0 && (
        //     <>
        //       <h3 className="text-sm font-semibold text-gray-700 mb-2">
        //         Liên hệ
        //       </h3>
        //       {filteredContacts.slice(0, 2).map((contact) => {
        //         const chat = chats.find((c) =>
        //           c.participants.some((p) => p.id === contact.id)
        //         ) || {
        //           id: Date.now().toString(),
        //           type: "direct",
        //           participants: [
        //             { id: currentUser.id, name: currentUser.name },
        //             {
        //               id: contact.id,
        //               name: contact.name,
        //               email: contact.email,
        //               avatar: contact.avatar,
        //             },
        //           ],
        //           messages: [],
        //           unreadCount: 0,
        //           lastMessageTime: new Date().toISOString(),
        //         };
        //         return (
        //           <div
        //             key={contact.id}
        //             className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-lg"
        //             onClick={() => {
        //               onSelectChat(chat.id, chat);
        //               handleCloseSearch();
        //             }}
        //           >
        //             <img
        //               src={contact.avatar || "/avatar.png"}
        //               alt={contact.name}
        //               className="w-10 h-10 rounded-full object-cover mr-3"
        //             />
        //             <div>
        //               <p className="text-sm font-medium">{contact.name}</p>
        //               <p className="text-xs text-gray-500">{contact.email}</p>
        //             </div>
        //           </div>
        //         );
        //       })}
        //       {filteredContacts.length > 2 && (
        //         <button
        //           className="text-sm text-blue-500 mt-2"
        //           onClick={() => console.log("Xem thêm liên hệ")}
        //         >
        //           Xem thêm ({filteredContacts.length - 2})
        //         </button>
        //       )}
        //     </>
        //   )}

        //   {filteredMessages.length > 0 && (
        //     <>
        //       <h3 className="text-sm font-semibold text-gray-700 mt-4 mb-2">
        //         Tin nhắn
        //       </h3>
        //       {filteredMessages.map(({ chat, messages }) => (
        //         <div
        //           key={chat.id}
        //           className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-lg"
        //           onClick={() => {
        //             onSelectChat(chat.id);
        //             handleCloseSearch();
        //           }}
        //         >
        //           <img
        //             src={getChatAvatar(chat)}
        //             alt={getChatName(chat)}
        //             className="w-10 h-10 rounded-full object-cover mr-3"
        //           />
        //           <div>
        //             <p className="text-sm font-medium">{getChatName(chat)}</p>
        //             <p className="text-xs text-gray-500">
        //               {messages[0].content.length > 30
        //                 ? messages[0].content.substring(0, 30) + "..."
        //                 : messages[0].content}
        //             </p>
        //           </div>
        //         </div>
        //       ))}
        //     </>
        //   )}

        //   {filteredContacts.length === 0 &&
        //     filteredMessages.length === 0 &&
        //     searchQuery.trim() && (
        //       <p className="text-gray-500 text-center mt-4">
        //         Không tìm thấy kết quả
        //       </p>
        //     )}
        // </div>
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
