// src/components/features/chats/components/ChatList/SearchResults.js
import Button from "@/components/ui/buttons/Button";
import React, { useMemo } from "react";
import {
  getChatName,
  getChatAvatar,
} from "@/components/features/chats/components/Utils/ChatUtils";
import Image from "next/image";

const SearchResults = ({
  onSelectChat,
  currentUser,
  contacts,
  setIsSearchOpen,
  chats,
  searchQuery,
  onCloseSearch,
}) => {
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

  const renderChatAvatar = (chat) => {
    const avatars = getChatAvatar(chat, currentUser);
    if (chat.type === "group" && Array.isArray(avatars)) {
      if (avatars.length === 2) {
        return (
          <div className="flex -space-x-1">
            {avatars.map((avatar, index) => (
              <Image
                width={20}
                height={20}
                key={index}
                src={avatar}
                alt={`Group member ${index + 1}`}
                className="w-5 h-5 rounded-full object-cover"
              />
            ))}
          </div>
        );
      }
      return (
        <div className="flex flex-col items-center">
          {avatars.length >= 1 && (
            <Image
              src={avatars[0]}
              alt="Group member 1"
              className="w-5 h-5 rounded-full object-cover z-10"
              width={20}
              height={20}
            />
          )}
          <div className="flex -space-x-1 -mt-1.5">
            {avatars.length >= 2 && (
              <Image
                src={avatars[1]}
                alt="Group member 2"
                className="w-5 h-5 rounded-full object-cover"
                width={20}
                height={20}
              />
            )}
            {avatars.length === 3 && chat.participants.length === 3 ? (
              <Image
                src={avatars[2]}
                alt="Group member 3"
                className="w-5 h-5 rounded-full object-cover"
                width={20}
                height={20}
              />
            ) : chat.participants.length > 3 ? (
              <div className="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs">
                +{chat.participants.length - 2}
              </div>
            ) : null}
          </div>
        </div>
      );
    }
    return (
      <Image
        src={avatars}
        alt={getChatName(chat, currentUser)}
        className="w-10 h-10 rounded-full object-cover"
        width={40}
        height={40}
      />
    );
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    onCloseSearch();
  };

  return (
    <div className="absolute bg-white z-20 p-4 overflow-y-auto">
      {!searchQuery.trim() ? (
        <div className="text-center text-gray-500 mt-4">
          <p className="text-sm">Nhập để tìm kiếm liên hệ hoặc tin nhắn</p>
          <p className="text-xs mt-1">Ví dụ: tên bạn bè, nội dung trò chuyện</p>
        </div>
      ) : (
        <>
          {filteredContacts.length > 0 && (
            <>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Liên hệ
              </h3>
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
                    {renderChatAvatar(chat)}
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
                  {renderChatAvatar(chat)}
                  <div>
                    <p className="text-sm font-medium">
                      {getChatName(chat, currentUser)}
                    </p>
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
        </>
      )}
    </div>
  );
};

export default SearchResults;
