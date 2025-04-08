// src/components/features/chats/components/ChatDetail/MessageActions.js
import Image from "next/image";
import React, { useState } from "react";

const MessageActions = ({}) => {
  const [hoveredButton, setHoveredButton] = useState(null);

  const actions = [
    {
      icon: "/Chats/iconchatdetail/like.png",
      label: "Thích",
      key: "like",
    },
    {
      icon: "/Chats/iconchatdetail/reply.png",
      label: "Trả lời",
      key: "reply",
    },
    {
      icon: "/Chats/iconchatdetail/forward.png",
      label: "Chuyển tiếp",
      key: "forward",
    },
    {
      icon: "/Chats/iconlist/3Dot.png",
      label: "Thêm",
      key: "more",
    },
  ];

  return (
    <div
      className={`absolute  top-[-36px] left-0  flex items-center  bg-white border-[#E6E8EC] rounded-lg shadow-lg  z-10`}
    >
      {actions.map((action) => (
        <div
          key={action.key}
          className="relative flex items-center justify-center"
          onMouseEnter={() => setHoveredButton(action.key)}
          onMouseLeave={() => setHoveredButton(null)}
        >
          {hoveredButton === action.key && (
            <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2">
              <div className="relative  rounded-lg px-2 py-1 shadow-lg">
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
          <button className=" hover:bg-gray-100  border-r-1 p-[9px] border-[#E6E8EC]">
            <Image
              src={action.icon}
              width={18}
              height={18}
              alt={action.label}
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default MessageActions;
