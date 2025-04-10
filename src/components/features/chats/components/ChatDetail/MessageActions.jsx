// src/components/features/chats/components/ChatDetail/MessageActions.js
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import ForwardDetail from "./ForwardDetail";

const MessageActions = ({ message, onForward }) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null); // Thêm trạng thái hover
  const moreRef = useRef(null);
  const moreButtonRef = useRef(null);

  const actions = [
    { icon: "/Chats/iconchatdetail/like.png", label: "Thích", key: "like" },
    { icon: "/Chats/iconchatdetail/reply.png", label: "Trả lời", key: "reply" },
    {
      icon: "/Chats/iconchatdetail/forward.png",
      label: "Chuyển tiếp",
      key: "forward",
    },
    { icon: "/Chats/iconlist/3Dot.png", label: "Thêm", key: "more" },
  ];

  const moreActions = [
    {
      icon: "/Chats/iconchatdetail/copy.png",
      label: "Sao chép tin nhắn",
      color: "#141416",
    },
    {
      icon: message?.isPinned
        ? "/Chats/iconlist/unpin.png"
        : "/Chats/iconlist/verticalpin.png",
      label: message?.isPinned ? "Bỏ ghim tin nhắn" : "Ghim tin nhắn",
      color: "#141416",
    },
    {
      icon: "/Chats/iconlist/delete.png",
      label: "Xóa với tất cả mọi người",
      color: "#F33E3E",
    },
    {
      icon: "/Chats/iconlist/delete.png",
      label: "Xóa chỉ ở phía tôi",
      color: "#F33E3E",
    },
  ];

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMoreOpen &&
        moreRef.current &&
        !moreRef.current.contains(event.target) &&
        !moreButtonRef.current.contains(event.target)
      ) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMoreOpen]);

  // Tính toán vị trí dropdown
  const getDropdownPosition = () => {
    if (!moreButtonRef.current) return { top: "40px", bottom: "auto" };
    const buttonRect = moreButtonRef.current.getBoundingClientRect();
    const dropdownHeight = 200;
    const spaceBelow = window.innerHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;

    if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
      return { top: "auto", bottom: "40px" };
    }
    return { top: "40px", bottom: "auto" };
  };

  const position = isMoreOpen ? getDropdownPosition() : {};

  return (
    <div className="absolute top-[-36px] left-0 flex bg-white border-[#E6E8EC] rounded-lg shadow-lg z-10">
      {actions.map((action) => (
        <div
          key={action.key}
          className="relative flex items-center justify-center"
          onMouseEnter={() => setHoveredButton(action.key)}
          onMouseLeave={() => setHoveredButton(null)}
        >
          {hoveredButton === action.key && (
            <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2">
              <div className="relative bg-white border border-gray-200 rounded-lg px-2 py-1 shadow-lg">
                <span className="text-xs text-[#141416] whitespace-nowrap">
                  {action.label}
                </span>
                {/* Hình tam giác trỏ xuống */}
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 bottom-[-6px] w-0 h-0 
                  border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-white"
                ></div>
              </div>
            </div>
          )}
          <button
            ref={action.key === "more" ? moreButtonRef : null}
            className="hover:bg-gray-100 border-r-1 p-[9px] border-[#E6E8EC] last:border-r-0"
            onClick={
              action.key === "more"
                ? () => setIsMoreOpen(!isMoreOpen)
                : action.key === "forward"
                ? onForward // Gọi hàm từ MessagesList
                : undefined
            }
          >
            <Image
              src={action.icon}
              width={18}
              height={18}
              alt={action.label}
            />
          </button>
        </div>
      ))}

      {isMoreOpen && (
        <div
          ref={moreRef}
          className="absolute right-0 w-[200px] h-[147px] bg-white border border-gray-200 rounded-lg shadow-lg py-2 px-1.5 z-50"
          style={{ top: position.top, bottom: position.bottom }}
        >
          {moreActions.map((moreAction, index) => (
            <button
              key={index}
              className="flex items-center gap-2 w-full text-left py-1.75 px-1 text-xs hover:bg-[#F4F5F6]"
              style={{ color: moreAction.color }}
            >
              <Image
                src={moreAction.icon}
                width={18}
                height={18}
                alt={moreAction.label}
              />
              {moreAction.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageActions;
