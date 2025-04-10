import Image from "next/image";
import React from "react";

export default function PinnedMessagesDetail({ pinnedMessages, onBack }) {
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
              <Image
                className="mr-2.75"
                src="/Chats/iconlist/3Dot.png"
                width={18}
                height={18}
                alt=""
              />
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
              <div className="bg-[#E8E3FF] h-[24px] w-[120px] px-[14px] pl-1.25 pr-1.75 rounded-full text-[10px] font-semibold text-[#4A30B1] flex items-center justify-center">
                Xem tin nhắn gốc
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
