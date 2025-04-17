import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { getChatAvatar } from "../Utils/ChatUtils";
import TagManagement from "../ChatList/TagManagement"; // Import TagManagement
import { useChat } from "@/contexts/ChatContext";

const ChatHeader = ({
  chat,
  currentUser,
  toggleChatInfo,
  isChatInfoOpen,
  onUpdateChat,
}) => {
  const { isSearchOpen, toggleSearchPanel } = useChat();
  // Lấy tên cuộc trò chuyện (group hoặc direct)
  const getChatName = () => {
    if (!chat) return "";
    if (chat.type === "direct") {
      const otherParticipant = chat.participants.find(
        (p) => p.id !== currentUser.id
      );
      return otherParticipant?.name || "Unknown";
    }
    return chat.name || "Group Chat";
  };

  // State để quản lý danh sách tag, dropdown và modal TagManagement
  const [tags, setTags] = useState([]); // Danh sách tag từ API
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false); // Trạng thái mở/đóng dropdown
  const [isTagManagementOpen, setIsTagManagementOpen] = useState(false); // Trạng thái mở/đóng modal TagManagement
  const dropdownRef = useRef(null); // Ref để kiểm tra nhấp ngoài dropdown
  const tagButtonRef = useRef(null); // Ref cho nút "Gắn thẻ"

  // Lấy danh sách tag từ API khi component mount
  useEffect(() => {
    fetch(` ${process.env.NEXT_PUBLIC_API_URL}/tags?_sort=order&_order=asc`)
      .then((res) => res.json())
      .then((data) => setTags(data))
      .catch((err) => console.error("Error fetching tags:", err));
  }, []);

  // Đóng dropdown khi nhấp ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isTagDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        tagButtonRef.current &&
        !tagButtonRef.current.contains(event.target)
      ) {
        setIsTagDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isTagDropdownOpen]);

  // Xác định xem dropdown có nên hiện lên trên hay không (dựa trên không gian màn hình)
  const shouldDropdownPopUp = () => {
    if (!tagButtonRef.current) return false;
    const tagButtonRect = tagButtonRef.current.getBoundingClientRect();
    const dropdownHeight = 320; // Ước lượng chiều cao dropdown
    const spaceBelow = window.innerHeight - tagButtonRect.bottom;
    return spaceBelow < dropdownHeight;
  };

  // Xử lý chọn tag
  const handleTagSelect = (tagId) => {
    const newTag = tagId === chat.tag ? null : tagId; // Nếu chọn lại tag hiện tại, bỏ tag
    onUpdateChat(chat.id, { tag: newTag }); // Gọi hàm từ props để cập nhật chat
    setIsTagDropdownOpen(false); // Đóng dropdown
  };

  // Cập nhật danh sách tag sau khi thay đổi từ TagManagement
  const handleUpdateTags = () => {
    fetch(` ${process.env.NEXT_PUBLIC_API_URL}/tags?_sort=order&_order=asc`)
      .then((res) => res.json())
      .then((data) => setTags(data))
      .catch((err) => console.error("Error fetching tags:", err));
  };

  // Icon biểu tượng tag
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

  // Lấy thông tin tag hiện tại của chat
  const currentTag = chat.tag ? tags.find((t) => t.id === chat.tag) : null;

  const avatars = getChatAvatar(chat, currentUser);

  return (
    <div className="flex items-center justify-between mt-5 ml-[22px] pb-[18px]">
      <div className="flex items-center">
        <div className="mr-[14px]">
          {/* Logic avatar giữ nguyên */}
          {chat.type === "group" ? (
            typeof avatars === "string" ? (
              <Image
                src={avatars}
                alt=""
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
              alt=""
              className="w-11 h-11 rounded-full object-cover"
            />
          )}
        </div>
        <div className="flex flex-col gap-[6px]">
          <h3 className="text-black text-sm font-semibold">{getChatName()}</h3>
          <div className="flex gap-2">
            {chat.type === "group" && (
              <div className="w-[56px] h-6 bg-[#E8E3FF] rounded-full flex items-center pl-[14px]">
                <div className="flex flex-row items-center gap-[5px]">
                  <Image
                    src="/Chats/iconchatdetail/groupmember.png"
                    width={16}
                    height={16}
                    alt=""
                  />
                  <p className="text-xs text-[#4A30B1]">
                    {chat.participants.length}
                  </p>
                </div>
              </div>
            )}
            {/* Nút gắn thẻ */}
            <div className="relative ">
              <button
                ref={tagButtonRef}
                style={
                  currentTag
                    ? {
                        backgroundColor: `${currentTag.color}15`,
                        color: currentTag.color,
                      }
                    : {}
                }
                className={`min-w-[98px] py-1  px-3 h-6 rounded-full flex items-center pl-[14px] cursor-pointer text-xs ${
                  !currentTag ? "bg-[#777E90]/15 text-[#777E90]" : {}
                }
                }`}
                onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
              >
                <div className="flex flex-row items-center gap-[5px]">
                  <TagIcon color={currentTag ? currentTag.color : "#777E90"} />
                  <p>{currentTag ? currentTag.name : "Gắn thẻ"}</p>
                </div>
              </button>
              {/* Dropdown danh sách tag */}
              {isTagDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className={`absolute  w-[250px] bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50 left-0 ${
                    shouldDropdownPopUp() ? "bottom-8" : "top-8"
                  }`}
                >
                  {tags.map((tag) => (
                    <button
                      key={tag.id}
                      className="flex items-center cursor-pointer justify-between gap-2 w-full text-left px-2 py-2 text-xs hover:bg-[#F4F5F6]"
                      onClick={() => handleTagSelect(tag.id)}
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
                    onClick={() => {
                      setIsTagManagementOpen(true);
                      setIsTagDropdownOpen(false);
                    }}
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
          </div>
        </div>
      </div>
      <div className="flex gap-[15px] mr-1 lg:mr-6 shrink-0">
        <button onClick={() => toggleSearchPanel(!isSearchOpen)}>
          {isSearchOpen ? (
            <Image
              src="/Chats/iconchatdetail/Search-violet.png"
              width={24}
              height={24}
              alt="chatinfor"
              className="bg-[#4A30B1]/30 rounded-sm cursor-pointer"
            />
          ) : (
            <Image
              src="/Chats/iconchatdetail/Search.png"
              width={24}
              height={24}
              alt="chatinfor"
              className="hover:bg-[#4A30B1]/20 rounded-sm cursor-pointer"
            />
          )}
        </button>
        <Image
          src="/Chats/iconchatdetail/phone.png"
          width={24}
          height={24}
          alt=""
        />
        <Image
          src="/Chats/iconchatdetail/videocall.png"
          width={24}
          height={24}
          alt=""
        />
        <button
          className="shrink"
          onClick={() => toggleChatInfo(!isChatInfoOpen)}
        >
          {isChatInfoOpen ? (
            <Image
              src="/Chats/iconchatdetail/chatinforviolet.png"
              width={24}
              height={24}
              alt="chatinfor"
              className="bg-[#4A30B1]/30 rounded-sm cursor-pointer"
            />
          ) : (
            <Image
              src="/Chats/iconchatdetail/chatinfor.png"
              width={24}
              height={24}
              alt="chatinfor"
              className="hover:bg-[#4A30B1]/20 rounded-sm cursor-pointer"
            />
          )}
        </button>
      </div>
      {/* Modal TagManagement */}
      {isTagManagementOpen && (
        <TagManagement
          onClose={() => setIsTagManagementOpen(false)}
          onSaveTag={handleUpdateTags}
          onUpdateTag={handleUpdateTags}
          onDeleteTag={(tagId) => {
            if (chat.tag === tagId) {
              onUpdateChat(chat.id, { tag: null }); // Bỏ tag nếu tag bị xóa
            }
            handleUpdateTags();
          }}
          onUpdateTags={handleUpdateTags}
        />
      )}
    </div>
  );
};

export default ChatHeader;
