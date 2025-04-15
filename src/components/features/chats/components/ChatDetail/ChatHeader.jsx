import Image from "next/image";
import React from "react";
import { getChatAvatar } from "../Utils/ChatUtils";

const ChatHeader = ({ chat, currentUser, toggleChatInfo, isChatInfoOpen }) => {
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

  const avatars = getChatAvatar(chat, currentUser);

  return (
    <div className="flex items-center justify-between mt-5 ml-[22px] pb-[18px]">
      <div className="flex items-center ">
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
            <div className="w-[98px] h-6 bg-[#777E90]/15 rounded-full flex items-center pl-[14px]">
              <div className="flex flex-row items-center gap-[5px]">
                <Image
                  src="/Chats/iconlist/tag.png"
                  width={16}
                  height={16}
                  alt=""
                />
                <p className="text-xs text-[#777E90]">Gắn thẻ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-[15px] mr-1 lg:mr-6 shrink-0">
        <Image
          src="/Chats/iconchatdetail/Search.png"
          width={24}
          height={24}
          alt=""
        />
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
        <button className="shrink" onClick={toggleChatInfo}>
          {isChatInfoOpen ? (
            <Image
              src="/Chats/iconchatdetail/chatinforviolet.png"
              width={24}
              height={24}
              alt="chatinfor"
              className="bg-gray-300 rounded-sm"
            />
          ) : (
            <Image
              src="/Chats/iconchatdetail/chatinfor.png"
              width={24}
              height={24}
              alt="chatinfor"
              className="hover:bg-violet-200 rounded-sm"
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
