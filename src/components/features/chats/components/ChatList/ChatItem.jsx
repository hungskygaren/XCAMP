// src/components/features/chats/components/ChatList/ChatItem.js
import React, { useState, useEffect, useRef } from "react";
import TagManagement from "./TagManagement";
import {
  getChatName,
  getChatAvatar,
  getLastMessage,
  formatTime,
} from "@/components/features/chats/components/ChatList/ChatUtils"; // Import từ chatUtils
import Image from "next/image";

const ChatItem = ({
  chat,
  activeChat,
  onSelectChat,
  currentUser,
  onUpdateChat,
  tags,
  onUpdateTags,
}) => {
  const avatars = getChatAvatar(chat, currentUser);
  const [contextMenu, setContextMenu] = useState(null);
  const [isTagSubmenuOpen, setIsTagSubmenuOpen] = useState(false);
  const [isTagManagementOpen, setIsTagManagementOpen] = useState(false);
  const menuRef = useRef(null);
  const tagButtonRef = useRef(null);

  const handleToggle = (field) => {
    const newValue = !chat[field];
    onUpdateChat(chat.id, { [field]: newValue });
  };

  const handleMenuAction = (action, value) => {
    switch (action) {
      case "togglePin":
        onUpdateChat(chat.id, { isPinned: !chat.isPinned });
        break;
      case "clearUnread":
        onUpdateChat(chat.id, { unreadCount: 0 });
        break;
      case "toggleNotification":
        onUpdateChat(chat.id, { isNotificationOff: !chat.isNotificationOff });
        break;
      case "toggleFlag":
        onUpdateChat(chat.id, { isFlagged: !chat.isFlagged });
        break;
      case "setTag":
        onUpdateChat(chat.id, { tag: value === chat.tag ? null : value });
        break;
      case "manageTags":
        setIsTagManagementOpen(true);
        break;
      default:
        break;
    }
    setContextMenu(null);
    setIsTagSubmenuOpen(false);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    const menuWidth = 250;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    let x = e.clientX || (e.touches && e.touches[0].clientX);
    let y = e.clientY || (e.touches && e.touches[0].clientY);

    if (x + menuWidth > windowWidth) x = windowWidth - menuWidth;
    const menuHeight = menuRef.current ? menuRef.current.offsetHeight : 300;
    if (y + menuHeight > windowHeight) {
      y = y - menuHeight;
      if (y < 0) y = 0;
    }

    setContextMenu({ x, y });
    setIsTagSubmenuOpen(false);
  };

  const handleTouchStart = (e) => {
    const timer = setTimeout(() => {
      handleContextMenu(e);
    }, 500);
    e.target.dataset.timer = timer;
  };

  const handleTouchEnd = (e) => {
    clearTimeout(e.target.dataset.timer);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contextMenu && !e.target.closest(".context-menu")) {
        setContextMenu(null);
        setIsTagSubmenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("contextmenu", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("contextmenu", handleClickOutside);
    };
  }, [contextMenu]);

  const handleTagMenuClick = (e) => {
    e.stopPropagation();
    setIsTagSubmenuOpen((prev) => !prev);
  };

  const handleSaveTag = (tagId) => {
    onUpdateChat(chat.id, { tag: tagId });
  };

  const handleUpdateTag = () => {
    onUpdateTags();
  };

  const handleDeleteTag = (tagId) => {
    if (chat.tag === tagId) {
      onUpdateChat(chat.id, { tag: null });
    }
  };

  const handleUpdateTags = () => {
    onUpdateTags();
  };

  const TagIcon = ({ color }) => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.6959 8.9218L15.6964 8.9223C15.7984 9.02422 15.8665 9.132 15.9087 9.24713C15.9585 9.38311 15.9813 9.51246 15.9813 9.6375C15.9813 9.76236 15.9586 9.88675 15.9106 10.0133C15.8692 10.1224 15.8012 10.2292 15.6964 10.3339L10.3339 15.6964C10.2294 15.801 10.117 15.8747 9.99555 15.9233C9.86253 15.9765 9.73788 16 9.61875 16C9.49962 16 9.37497 15.9765 9.24195 15.9233C9.12047 15.8747 9.00813 15.801 8.90355 15.6964L2.2848 9.0777C2.19419 8.98708 2.12461 8.88302 2.07451 8.76195C2.02509 8.64252 2 8.51697 2 8.38125V3C2 2.72116 2.09345 2.49491 2.29418 2.29418C2.49491 2.09345 2.72116 2 3 2H8.38125C8.51135 2 8.63755 2.02599 8.7637 2.08065C8.89632 2.13812 9.00551 2.21267 9.09622 2.30333C9.0963 2.3034 9.09637 2.30348 9.09645 2.30355L15.6959 8.9218ZM9.2647 15.3531L9.61825 15.7076L9.9723 15.3536L15.3348 9.99105L15.6879 9.638L15.3353 9.28445L8.71655 2.64695L8.57002 2.5H8.3625H3H2.5V3V8.3625V8.56919L2.64595 8.71555L9.2647 15.3531ZM5.31832 5.31832C5.1944 5.44224 5.05641 5.5 4.875 5.5C4.69359 5.5 4.5556 5.44224 4.43168 5.31832C4.30776 5.1944 4.25 5.05641 4.25 4.875C4.25 4.69359 4.30776 4.5556 4.43168 4.43168C4.5556 4.30776 4.69359 4.25 4.875 4.25C5.05641 4.25 5.1944 4.30776 5.31832 4.43168C5.44224 4.5556 5.5 4.69359 5.5 4.875C5.5 5.05641 5.44224 5.1944 5.31832 5.31832Z"
        fill={color}
        stroke={color}
      />
    </svg>
  );

  const shouldSubmenuPopUp = () => {
    if (!contextMenu || !tagButtonRef.current) return false;
    const tagButtonRect = tagButtonRef.current.getBoundingClientRect();
    const submenuHeight = 320;
    const spaceBelow = window.innerHeight - tagButtonRect.bottom;
    return spaceBelow < submenuHeight;
  };

  return (
    <>
      <div
        className={`relative flex items-start hover:bg-violet-50 w-[362px] min-h-[70px] h-[70px] pl-[13px] pr-[17px] pt-[13px] rounded-[8px] border-[#E6E8EC] border-[1px] cursor-pointer transition-colors ${
          activeChat && activeChat.id === chat.id ? "bg-[#E8E3FF]" : ""
        } `}
        onClick={() => onSelectChat(chat.id)}
        onContextMenu={handleContextMenu}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative flex-shrink-0">
          {chat.unreadCount > 0 && (
            <div className="absolute z-20 right-0 top-0 translate-x-1.5 -translate-y-1/3 bg-[#EE316B] text-white text-xs font-semibold rounded-[200px] min-w-[29px] h-[20px] flex items-center justify-center">
              {chat.unreadCount}
            </div>
          )}
          {chat.type === "group" ? (
            typeof avatars === "string" ? (
              <Image
                src={avatars}
                alt="Group avatar"
                className="w-11 h-11 rounded-full object-cover"
                width={44}
                height={44}
              />
            ) : avatars.length === 2 ? (
              <div className="flex -space-x-1">
                {avatars.map((avatar, index) => (
                  <Image
                    width={24}
                    height={24}
                    key={index}
                    src={avatar}
                    alt={`Group member ${index + 1}`}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center">
                {avatars.length >= 1 && (
                  <Image
                    width={24}
                    height={24}
                    src={avatars[0]}
                    alt="Group member 1"
                    className="w-6 h-6 rounded-full object-cover z-10"
                  />
                )}
                <div className="flex -space-x-1 -mt-1.5">
                  {avatars.length >= 2 && (
                    <Image
                      width={24}
                      height={24}
                      src={avatars[1]}
                      alt="Group member 2"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  )}
                  {avatars.length === 3 && chat.participants.length === 3 ? (
                    <Image
                      width={24}
                      height={24}
                      src={avatars[2]}
                      alt="Group member 3"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : chat.participants.length > 3 ? (
                    <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-white text-sm">
                      +{chat.participants.length - 2}
                    </div>
                  ) : null}
                </div>
              </div>
            )
          ) : (
            <Image
              width={44}
              height={44}
              src={avatars}
              alt={getChatName(chat, currentUser)}
              className="w-11 h-11 rounded-full object-cover"
            />
          )}
          {chat.type === "direct" &&
            chat.participants.find((p) => p.id !== currentUser.id)
              ?.isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            )}
        </div>
        <div className="ml-3 w-full">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-twdark text-sm">
              {getChatName(chat, currentUser)}
            </h3>
            <span className="text-xs text-gray-500">
              {formatTime(chat.lastMessageTime)}
            </span>
          </div>
          <div className="flex w-full justify-between items-center">
            <p
              className={`text-sm ${
                chat.unreadCount > 0 ? "text-black" : "text-twgrey"
              }`}
            >
              {getLastMessage(chat)}
              {chat.messages?.[chat.messages.length - 1]?.attachments?.length >
                0 && <span className="text-sm ml-1">[file]</span>}
            </p>
            <div className="flex gap-2 ml-[7px]">
              {chat.isPinned && (
                <Image
                  width={18}
                  height={18}
                  src="/Chats/iconlist/pin.png"
                  alt="Pinned"
                  className="w-[18px] h-[18px] cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggle("isPinned");
                  }}
                />
              )}
              {chat.tag && tags.find((t) => t.id === chat.tag) && (
                <div
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMenuAction("setTag", chat.tag);
                  }}
                >
                  <TagIcon
                    color={
                      tags.find((t) => t.id === chat.tag)?.color || "#A8ABB8"
                    }
                  />
                </div>
              )}
              {chat.isNotificationOff && (
                <Image
                  width={18}
                  height={18}
                  src="/Chats/iconlist/notificationoff.png"
                  alt="Notification Off"
                  className="w-[18px] h-[18px] cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggle("isNotificationOff");
                  }}
                />
              )}
              {chat.isFlagged && (
                <Image
                  width={18}
                  height={18}
                  src="/Chats/iconlist/flag.png"
                  alt="Flagged"
                  className="w-[18px] h-[18px] cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggle("isFlagged");
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {contextMenu && (
        <div
          ref={menuRef}
          className="fixed w-[250px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-2 pointer-events-auto context-menu"
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="flex items-center gap-2 w-full text-left px-2 py-2 text-xs hover:bg-[#F4F5F6]"
            onClick={() => handleMenuAction("togglePin")}
          >
            <Image
              src={
                chat.isPinned
                  ? "/Chats/iconlist/verticalpin.png"
                  : "/Chats/iconlist/unpin.png"
              }
              alt=""
              className="w-[18px] h-[18px]"
              width={18}
              height={18}
            />
            {chat.isPinned ? "Bỏ ghim" : "Ghim lên đầu"}
          </button>
          <button
            className="flex items-center gap-2 w-full text-left px-2 py-2 text-xs hover:bg-[#F4F5F6]"
            onClick={() => handleMenuAction("clearUnread")}
          >
            <Image
              width={18}
              height={18}
              src="/Chats/iconlist/clean.png"
              alt=""
              className="w-[18px] h-[18px]"
            />
            Bỏ qua tin nhắn chưa đọc
          </button>
          <button
            className="flex items-center gap-2 w-full text-left px-2 py-2 text-xs hover:bg-[#F4F5F6]"
            onClick={() => handleMenuAction("toggleNotification")}
          >
            <Image
              src={
                chat.isNotificationOff
                  ? "/Chats/iconlist/notificationon.png"
                  : "/Chats/iconlist/notificationoff.png"
              }
              alt=""
              className="w-[18px] h-[18px]"
              width={18}
              height={18}
            />
            {chat.isNotificationOff ? "Bật thông báo" : "Tắt thông báo"}
          </button>
          <button
            className="flex items-center gap-2 w-full text-left text-black text-xs px-2 py-2 hover:bg-[#F4F5F6]"
            onClick={() => handleMenuAction("toggleFlag")}
          >
            <Image
              width={18}
              height={18}
              src={
                chat.isFlagged
                  ? "/Chats/iconlist/flag.png"
                  : "/Chats/iconlist/flag.png"
              }
              alt=""
              className="w-[18px] h-[18px]"
            />
            {chat.isFlagged ? "Bỏ đánh dấu" : "Đánh dấu"}
          </button>

          <div className="relative group">
            <button
              ref={tagButtonRef}
              className="flex items-center justify-between gap-2 w-full text-left px-2 py-2 text-[#141416] text-xs hover:bg-[#F4F5F6]"
              onClick={handleTagMenuClick}
              onMouseEnter={() =>
                window.innerWidth > 768 && setIsTagSubmenuOpen(true)
              }
              onMouseLeave={() =>
                window.innerWidth > 768 && setIsTagSubmenuOpen(false)
              }
            >
              <div className="flex items-center gap-2">
                <TagIcon color="#A8ABB8" />
                Gắn thẻ
              </div>
              <Image
                width={18}
                height={18}
                src="/Chats/iconlist/Line.png"
                alt=""
                className="w-[18px] h-[18px] rotate-270"
              />
            </button>

            {isTagSubmenuOpen && (
              <div
                className={`absolute w-[250px] bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50 left-full ${
                  shouldSubmenuPopUp() ? "bottom-0" : "top-0"
                }`}
                onMouseEnter={() =>
                  window.innerWidth > 768 && setIsTagSubmenuOpen(true)
                }
                onMouseLeave={() =>
                  window.innerWidth > 768 && setIsTagSubmenuOpen(false)
                }
              >
                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    className="flex items-center justify-between gap-2 w-full text-left px-2 py-2 text-xs hover:bg-[#F4F5F6]"
                    onClick={() => handleMenuAction("setTag", tag.id)}
                  >
                    <div className="flex items-center gap-2">
                      <TagIcon color={tag.color} />
                      {tag.name}
                    </div>
                    {chat.tag === tag.id && (
                      <Image
                        width={18}
                        height={18}
                        src="/Chats/iconlist/check.png"
                        className="w-[18px] h-[18px]"
                        alt=""
                      />
                    )}
                  </button>
                ))}
                <button
                  className="flex items-center gap-2 w-full text-left px-2 py-2 text-[#141416] text-xs hover:bg-[#F4F5F6]"
                  onClick={() => handleMenuAction("manageTags")}
                >
                  <Image
                    width={18}
                    height={18}
                    src="/Chats/iconlist/setting.png"
                    className="w-[18px] h-[18px]"
                    alt=""
                  />
                  Quản lý thẻ
                </button>
              </div>
            )}
          </div>

          <button className="flex items-center gap-2 w-full text-xs text-[#F33E3E] text-left px-2 py-1 hover:bg-[#F4F5F6]">
            <Image
              width={18}
              height={18}
              src="/Chats/iconlist/delete.png"
              alt=""
              className="w-[18px] h-[18px]"
            />
            Xóa cuộc hội thoại
          </button>
        </div>
      )}

      {isTagManagementOpen && (
        <TagManagement
          onClose={() => setIsTagManagementOpen(false)}
          onSaveTag={handleSaveTag}
          onUpdateTag={handleUpdateTag}
          onDeleteTag={handleDeleteTag}
          onUpdateTags={handleUpdateTags}
        />
      )}
    </>
  );
};

export default ChatItem;
