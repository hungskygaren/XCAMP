import React from "react";

const SearchResults = ({
  filteredContacts,
  filteredMessages,
  onSelectChat,
  getChatName,
  getChatAvatar,
  currentUser,
  searchQuery,
  setSearchQuery,
  setIsSearchOpen,
  chats,
}) => {
  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };
  const handleSearchFocus = () => {
    setIsSearchOpen(true);
  };
  return (
    <div className="absolute inset-0 bg-white z-20 p-4 overflow-y-auto">
      <div className="flex items-center mb-4 gap-[1.375rem]">
        <div className="relative w-[17.5rem]">
          <input
            type="text"
            placeholder="Tìm kiếm liên hệ hoặc tin nhắn"
            className="w-full pl-[15px] h-8 text-[.75rem] text-[#A8ABB8] font-semibold border border-gray-200 rounded-lg focus:outline-none placeholder:text-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleSearchFocus}
          />
        </div>
        <button
          className="flex-1 h-8 text-[.75rem] font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center justify-center"
          onClick={handleCloseSearch}
        >
          Đóng
        </button>
      </div>

      {filteredContacts.length > 0 && (
        <>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Liên hệ</h3>
          {filteredContacts.slice(0, 2).map((contact) => {
            const matchingChats = chats.filter(
              (c) =>
                c.type === "direct" &&
                c.participants.length === 2 &&
                c.participants.some((p) => p.id === currentUser.id) &&
                c.participants.some((p) => p.id === contact.id)
            );
            const existingChat =
              matchingChats.length > 0
                ? matchingChats.reduce((latest, current) =>
                    new Date(latest.lastMessageTime) >
                    new Date(current.lastMessageTime)
                      ? latest
                      : current
                  )
                : null;
            const chat = existingChat || {
              id: Date.now().toString(),
              type: "direct",
              participants: [
                { id: currentUser.id, name: currentUser.name },
                {
                  id: contact.id,
                  name: contact.name,
                  email: contact.email,
                  avatar: contact.avatar,
                },
              ],
              messages: [],
              unreadCount: 0,
              lastMessageTime: new Date().toISOString(),
            };
            return (
              <div
                key={contact.id}
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-lg"
                onClick={() => {
                  onSelectChat(chat.id, chat);
                  handleCloseSearch();
                }}
              >
                <img
                  src={contact.avatar || "/avatar.png"}
                  alt={contact.name}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <p className="text-sm font-medium">{contact.name}</p>
                  <p className="text-xs text-gray-500">{contact.email}</p>
                </div>
              </div>
            );
          })}
          {filteredContacts.length > 2 && (
            <button
              className="text-sm text-blue-500 mt-2"
              onClick={() => console.log("Xem thêm liên hệ")}
            >
              Xem thêm ({filteredContacts.length - 2})
            </button>
          )}
        </>
      )}

      {filteredMessages.length > 0 && (
        <>
          <h3 className="text-sm font-semibold text-gray-700 mt-4 mb-2">
            Tin nhắn
          </h3>
          {filteredMessages.map(({ chat, messages }) => (
            <div
              key={chat.id}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-lg"
              onClick={() => {
                onSelectChat(chat.id);
                handleCloseSearch();
              }}
            >
              <img
                src={getChatAvatar(chat)}
                alt={getChatName(chat)}
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <div>
                <p className="text-sm font-medium">{getChatName(chat)}</p>
                <p className="text-xs text-gray-500">
                  {messages[0].content.length > 30
                    ? messages[0].content.substring(0, 30) + "..."
                    : messages[0].content}
                </p>
              </div>
            </div>
          ))}
        </>
      )}

      {filteredContacts.length === 0 &&
        filteredMessages.length === 0 &&
        searchQuery.trim() && (
          <p className="text-gray-500 text-center mt-4">
            Không tìm thấy kết quả
          </p>
        )}
    </div>
  );
};

export default SearchResults;
