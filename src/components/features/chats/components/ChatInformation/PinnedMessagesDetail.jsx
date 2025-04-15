import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export default function PinnedMessagesDetail({ pinnedMessages, onBack }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(null); // Trạng thái mở rộng/thu gọn
  const dropdownRef = useRef(null);
  const handleToggleDropdown = function (messageId) {
    setIsDropdownOpen(isDropdownOpen === messageId ? null : messageId);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="flex flex-col h-full">
      {/* Tiêu đề */}
      <div className="flex items-center gap-2">
        <Image
          src="/Chats/iconchatinfor/arrow_back.png"
          width={24}
          height={24}
          alt=""
          className="cursor-pointer"
          onClick={onBack} // Quay lại giao diện mặc định
        />
        <p className="font-semibold text-sm">Tin nhắn đã ghim</p>
      </div>

      {/* Danh sách tin nhắn ghim */}
      <div className="flex flex-col gap-2 mt-4 overflow-y-auto">
        {pinnedMessages.map((message) => (
          <div
            key={message.id}
            className="flex-col border-1 border-[#E6E8EC] rounded-lg items-center justify-between pl-3.5 pt-2.75 pb-3.75 pr-2.75"
          >
            <div className="flex justify-between items-center">
              <div className="flex">
                <div>
                  <Image src={message.avatar} width={30} height={30} alt="" />
                </div>
                <div className="ml-2.25 flex items-center">
                  <p className="text-xs">{message.sender}</p>
                </div>
              </div>
              <div className="relative">
                <Image
                  className="mr-2.75 cursor-pointer"
                  src="/Chats/iconlist/3Dot.png"
                  width={18}
                  height={18}
                  alt=""
                  onClick={() => handleToggleDropdown(message.id)}
                />
                {isDropdownOpen === message.id && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-2 top-6 w-[193px] bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50"
                  >
                    <button className="flex items-center gap-2 w-full text-left pl-[10px] py-[7px] text-xs text-[#141416] hover:bg-[#F4F5F6]">
                      <Image
                        src="/Chats/iconchatdetail/forward.png"
                        width={18}
                        height={18}
                        alt=""
                      />
                      Chuyển tiếp
                    </button>
                    <button className="flex items-center gap-2 w-full text-left pl-[10px] py-[7px] text-xs text-[#141416] hover:bg-[#F4F5F6]">
                      <Image
                        src="/Chats/iconlist/unpin.png"
                        width={18}
                        height={18}
                        alt=""
                      />
                      Bỏ ghim tin nhắn
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="text-xs mt-1.5">
              {message.attachment ? (
                <div className="flex items-center gap-1">
                  <Image
                    src={message.attachment}
                    width={24}
                    height={24}
                    alt=""
                  />
                  <p>{message.content}</p>
                </div>
              ) : (
                message.content
              )}
            </div>
            <div className="flex justify-between items-center mt-2.5">
              <div className="text-[10px] text-[#A8ABB8] w-[92px]">
                Được ghim bởi {message.pinnedBy}
              </div>
              <div className="bg-[#E8E3FF] cursor-pointer h-[24px] w-[120px] px-[14px] pl-1.25 pr-1.75 rounded-full text-[10px] font-semibold text-[#4A30B1] flex items-center justify-center">
                Xem tin nhắn gốc
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
