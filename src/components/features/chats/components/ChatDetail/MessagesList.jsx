// src/components/features/chats/components/ChatDetail/MessagesList.js
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import PinnedMessagesHeader from "./PinnedMessagesHeader";
import AttachmentModal from "./AttachmentModal";
import MessageActions from "./MessageActions"; // Import component mới

const MessagesList = ({ chat, currentUser }) => {
  const messagesContainerRef = useRef(null);
  const [modalContent, setModalContent] = useState(null);
  const [isPinnedExpanded, setIsPinnedExpanded] = useState(false);
  const [highlightedMessageId, setHighlightedMessageId] = useState(null);
  const [hoveredMessageId, setHoveredMessageId] = useState(null); // Thêm trạng thái hover

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const scrollToMessage = (messageId) => {
    const messageElement = document.getElementById(`message-${messageId}`);
    if (messageElement && messagesContainerRef.current) {
      messageElement.scrollIntoView({ behavior: "smooth", block: "center" });
      setHighlightedMessageId(messageId);
      setTimeout(() => setHighlightedMessageId(null), 2000);
    }
  };

  const formatShortTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatFullDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString([], {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isToday = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isFirstMessageOfDay = (messageIndex) => {
    if (messageIndex === 0) return true;
    const currentMessage = chat.messages[messageIndex];
    const previousMessage = chat.messages[messageIndex - 1];
    const currentDate = new Date(currentMessage.timestamp);
    const previousDate = new Date(previousMessage.timestamp);
    return (
      currentDate.getDate() !== previousDate.getDate() ||
      currentDate.getMonth() !== previousDate.getMonth() ||
      currentDate.getFullYear() !== previousDate.getFullYear()
    );
  };

  const getMessageSender = (senderId) => {
    return chat.participants.find((p) => p.id === senderId)?.name || "Unknown";
  };

  const getPinnedByName = (pinnedById) => {
    return (
      chat.participants.find((p) => p.id === pinnedById)?.name || "Unknown"
    );
  };

  const getReadByAvatars = (message) => {
    if (!message.readBy || message.readBy.length === 0) return [];
    if (chat.type === "direct") {
      const recipient = chat.participants.find((p) => p.id !== currentUser.id);
      if (message.readBy.includes(recipient.id)) {
        return [recipient?.avatar || "/avatar.png"];
      }
      return [];
    }
    return message.readBy
      .filter((id) => id !== message.senderId)
      .map((id) => {
        const participant = chat.participants.find((p) => p.id === id);
        return participant?.avatar || "/avatar.png";
      });
  };

  const renderMessageContent = (content) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = content.split(urlRegex);
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline"
          >
            {part}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  const openModal = (attachment) => {
    setModalContent(attachment);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  if (!chat) return <div className="flex-1">No chat selected</div>;

  const pinnedMessages =
    chat.messages
      ?.filter((msg) => msg.isPinned)
      .map((msg) => ({ ...msg, participants: chat.participants }))
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) || [];
  const messagesHeight =
    pinnedMessages.length > 0 ? "h-[calc(100%-54px)]" : "h-[calc(100%)]";

  return (
    <div className={`relative h-[calc(100%-170px)]`}>
      {pinnedMessages.length > 0 && (
        <PinnedMessagesHeader
          pinnedMessages={pinnedMessages}
          currentUser={currentUser}
          onToggleExpand={setIsPinnedExpanded}
          isExpanded={isPinnedExpanded}
          onMessageClick={scrollToMessage}
        />
      )}

      <div
        ref={messagesContainerRef}
        className={`overflow-y-auto p-4 space-y-4 ${messagesHeight}`}
      >
        {chat.messages &&
          chat.messages.map((message, index) => {
            const isCurrentUser = message.senderId === currentUser.id;
            const showDateHeader = isFirstMessageOfDay(index);

            return (
              <React.Fragment key={message.id}>
                {showDateHeader && (
                  <div className="text-center my-4">
                    <span className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full">
                      {isToday(message.timestamp)
                        ? `Hôm nay, ${formatShortTime(message.timestamp)}`
                        : formatFullDateTime(message.timestamp)}
                    </span>
                  </div>
                )}
                <div
                  id={`message-${message.id}`}
                  className={`flex ${
                    isCurrentUser ? "justify-end" : "justify-start"
                  } transition-all duration-300 ${
                    highlightedMessageId === message.id ? "bg-[#E8E3FF]" : ""
                  }`}
                  onMouseEnter={() => setHoveredMessageId(message.id)}
                  onMouseLeave={() => setHoveredMessageId(null)}
                >
                  <div
                    className={`flex  ${
                      isCurrentUser ? "flex-row-reverse" : ""
                    } gap-[15px] max-w-[70%] `}
                  >
                    <div>
                      <Image
                        src={
                          chat.participants.find(
                            (p) => p.id === message.senderId
                          )?.avatar || "/avatar.png"
                        }
                        alt={getMessageSender(message.senderId)}
                        width={30}
                        height={30}
                        className="rounded-full object-cover"
                      />
                    </div>

                    <div
                      className={`flex w-full flex-col gap-1 relative ${
                        isCurrentUser ? "items-end" : ""
                      }`}
                    >
                      <div className="text-sm font-semibold text-[#777E90]">
                        {getMessageSender(message.senderId)}
                      </div>
                      {message.content && (
                        <div
                          className={`rounded-lg px-5 py-3 relative ${
                            isCurrentUser
                              ? "bg-[#4A30B1] text-white"
                              : "bg-[#F4F5F6]"
                          }`}
                        >
                          {/* Hiển thị MessageActions khi hover */}
                          {hoveredMessageId === message.id && (
                            <MessageActions isCurrentUser={isCurrentUser} />
                          )}
                          <p className="text-sm">
                            {renderMessageContent(message.content)}
                          </p>
                        </div>
                      )}
                      {message.attachments &&
                        message.attachments.length > 0 &&
                        message.attachments.map((attachment) => (
                          <div
                            key={attachment.id}
                            className="mt-2 cursor-pointer"
                            onClick={() => openModal(attachment)}
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
                                  <p className="text-xs text-gray-500">
                                    {attachment.size}
                                  </p>
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
                        className={`flex flex-col items-${
                          isCurrentUser ? "end" : "start"
                        } mt-1 text-sm text-[#A8ABB8]`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs">
                            {formatShortTime(message.timestamp)}
                          </span>
                          {isCurrentUser && (
                            <span className="flex items-center gap-1">
                              {message.readBy && message.readBy.length > 0
                                ? getReadByAvatars(message).map(
                                    (avatar, index) => (
                                      <Image
                                        key={index}
                                        src={avatar}
                                        width={16}
                                        height={16}
                                        alt="Reader"
                                        className="rounded-full inline-block"
                                      />
                                    )
                                  )
                                : "✓"}
                            </span>
                          )}
                        </div>
                        {message.isPinned && (
                          <div className="flex items-center gap-1 text-xs text-[#777E90] mt-1">
                            <Image
                              src="/Chats/iconlist/pin.png"
                              width={12}
                              height={12}
                              alt="Pin"
                            />
                            <span>
                              {getPinnedByName(message.pinnedBy)} đã ghim tin
                              nhắn
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
      </div>

      {modalContent && (
        <AttachmentModal attachment={modalContent} onClose={closeModal} />
      )}
    </div>
  );
};

export default MessagesList;
