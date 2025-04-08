// src/components/features/chats/components/ChatDetail/MessageItem.js
import Image from "next/image";
import React from "react";

const MessageItem = ({ message, currentUser, participants, onOpenModal }) => {
  const isCurrentUser = message.senderId === currentUser.id;

  const getMessageSender = (senderId) => {
    return participants.find((p) => p.id === senderId)?.name || "Unknown";
  };

  const getReadByAvatars = (message) => {
    if (!message.readBy || message.readBy.length === 0) return [];
    return message.readBy
      .filter((id) => id !== message.senderId)
      .map(
        (id) => participants.find((p) => p.id === id)?.avatar || "/avatar.png"
      );
  };

  const renderMessageContent = (content) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = content.split(urlRegex);
    return parts.map((part, index) =>
      part.match(urlRegex) ? (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white underline"
        >
          {part}
        </a>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  const formatShortTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex ${
          isCurrentUser ? "flex-row-reverse" : ""
        } gap-[15px] max-w-[70%]`}
      >
        <div>
          <Image
            src={
              participants.find((p) => p.id === message.senderId)?.avatar ||
              "/avatar.png"
            }
            alt={getMessageSender(message.senderId)}
            width={30}
            height={30}
            className="rounded-full object-cover"
          />
        </div>
        <div
          className={`flex w-full flex-col gap-1 ${
            isCurrentUser ? "items-end" : ""
          }`}
        >
          <div className="text-sm font-semibold text-[#777E90]">
            {getMessageSender(message.senderId)}
          </div>
          {message.content && (
            <div
              className={`rounded-lg px-5 py-3 ${
                isCurrentUser ? "bg-[#4A30B1] text-white" : "bg-[#F4F5F6]"
              }`}
            >
              <p className="text-sm">{renderMessageContent(message.content)}</p>
            </div>
          )}
          {message.attachments &&
            message.attachments.length > 0 &&
            message.attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="mt-2 cursor-pointer"
                onClick={() => onOpenModal(attachment)}
              >
                {attachment.type === "image" ? (
                  <div className="relative w-[400px] h-[250px]">
                    <Image
                      src={attachment.url}
                      fill
                      alt={attachment.name}
                      className="object-cover rounded-lg"
                    />
                  </div>
                ) : attachment.type === "video" ? (
                  <div className="relative w-[400px] h-[250px]">
                    <video
                      src={attachment.url}
                      width={400}
                      height={250}
                      className="object-cover rounded-lg"
                      controls={false}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[60px] h-[60px] bg-black/50 rounded-full flex items-center justify-center">
                        <Image
                          src="/Chats/iconchatdetail/play.png"
                          width={17}
                          height={21}
                          alt="Play"
                          className="opacity-80 hover:opacity-100"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center w-[400px] h-[58px]">
                    <div className="mr-2">
                      <Image
                        src="/Chats/iconchatdetail/icondoc.png"
                        width={36}
                        height={36}
                        alt="Document"
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-[3px]">
                      <p className="text-sm text-black font-medium truncate">
                        {attachment.name}
                      </p>
                      <p className="text-xs text-gray-500">{attachment.size}</p>
                    </div>
                    <div className="flex items-center gap-4 pr-[15px]">
                      <Image
                        src="/Chats/iconchatdetail/download_black.png"
                        width={24}
                        height={24}
                        alt="Download"
                      />
                      <Image
                        src="/Chats/iconchatdetail/folder_black.png"
                        width={24}
                        height={24}
                        alt="Folder"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          <div
            className={`flex items-center mt-1 text-sm text-[#A8ABB8] ${
              isCurrentUser ? "justify-end" : "justify-start"
            }`}
          >
            <span className="text-xs">
              {formatShortTime(message.timestamp)}
            </span>
            {isCurrentUser && (
              <span className="ml-2 flex items-center gap-1">
                {message.readBy && message.readBy.length > 0
                  ? getReadByAvatars(message).map((avatar, index) => (
                      <Image
                        key={index}
                        src={avatar}
                        width={16}
                        height={16}
                        alt="Reader"
                        className="rounded-full inline-block"
                      />
                    ))
                  : "✓"}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
