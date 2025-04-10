// src/components/features/chats/components/ChatDetail/MessagesList.js
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import AttachmentModal from "./AttachmentModal";
import MessageActions from "./MessageActions"; // Import component mới
import PinnedMessagesChatDetail from "./PinnedMessagesChatDetail";
import LikeModal from "./LikeModal";
import ForwardDetail from "./ForwardDetail";
import { useChat } from "@/contexts/ChatContext";
const MessagesList = ({ chat, currentUser }) => {
  const messagesContainerRef = useRef(null);
  const [modalContent, setModalContent] = useState(null);
  const [isPinnedExpanded, setIsPinnedExpanded] = useState(false);
  const [highlightedMessageId, setHighlightedMessageId] = useState(null);
  const [hoveredMessageId, setHoveredMessageId] = useState(null); // Thêm trạng thái hover
  const [isLikeModalOpen, setIsLikeModalOpen] = useState(false); // Trạng thái modal
  const [isForwardModalOpen, setIsForwardModalOpen] = useState(false);
  const { openPinnedMessagesDetail } = useChat(); // Lấy hàm từ context
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
        <PinnedMessagesChatDetail
          pinnedMessages={pinnedMessages}
          currentUser={currentUser}
          onToggleExpand={setIsPinnedExpanded}
          isExpanded={isPinnedExpanded}
          onMessageClick={scrollToMessage}
          onOpenPinnedMessagesDetail={openPinnedMessagesDetail}
        />
      )}

      <div
        ref={messagesContainerRef}
        className={`overflow-y-auto p-4 space-y-4 ${messagesHeight}`}
      >
        {/* Thêm tin nhắn tĩnh ở cuối */}
        <div
          className={`flex justify-start transition-all duration-300`}
          onMouseEnter={() => setHoveredMessageId("static-message")}
          onMouseLeave={() => setHoveredMessageId(null)}
        >
          <div className={`flex gap-[15px] max-w-[70%]`}>
            <div>
              <Image
                src="/chats/avatar3.png" // Avatar gán cứng
                alt=""
                width={30}
                height={30}
                className="rounded-full object-cover"
              />
            </div>

            <div className={`flex w-full flex-col gap-1 relative `}>
              <div className="text-sm font-semibold text-[#777E90]">
                Cyclops
              </div>
              {hoveredMessageId === "static-message" && (
                <MessageActions
                  onForward={() => setIsForwardModalOpen(true)} // Truyền hàm mở Forward
                />
              )}
              <div className={`rounded-lg px-5 py-3 bg-[#F4F5F6] text-xs`}>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    <div className="flex gap-2.5 items-center">
                      <Image
                        src="Chats/iconchatdetail/videocall.png"
                        width={18}
                        height={18}
                        alt=""
                      />
                      <p className="font-semibold">
                        Cuộc họp video - Development Team
                      </p>
                    </div>
                    <p>30:05</p>
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <Image
                      src="Chats/iconchatdetail/calendar.png"
                      width={18}
                      height={18}
                      alt=""
                    />
                    <p className="">
                      Thời gian: Thứ 6, ngày 16/10/2024, 13:38 - 14:38
                    </p>
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <Image
                      src="Chats/iconchatdetail/infor.png"
                      width={18}
                      height={18}
                      alt=""
                    />
                    <p className="">ID cuộc họp: 352 870 172</p>
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <Image
                      src="Chats/iconlist/addGroup.png"
                      width={18}
                      height={18}
                      alt=""
                    />
                    <div className="flex gap-1.5  flex-wrap">
                      <Image
                        src="Chats/avatar1.png"
                        width={24}
                        height={24}
                        alt=""
                      />
                      <Image
                        src="Chats/avatar2.png"
                        width={24}
                        height={24}
                        alt=""
                      />
                      <Image
                        src="Chats/avatar3.png"
                        width={24}
                        height={24}
                        alt=""
                      />
                      <Image
                        src="Chats/avatar4.png"
                        width={24}
                        height={24}
                        alt=""
                      />
                      <Image
                        src="Chats/avatar1.png"
                        width={24}
                        height={24}
                        alt=""
                      />
                      <Image
                        src="Chats/avatar1.png"
                        width={24}
                        height={24}
                        alt=""
                      />
                      <Image
                        src="Chats/avatar2.png"
                        width={24}
                        height={24}
                        alt=""
                      />
                      <Image
                        src="Chats/avatar3.png"
                        width={24}
                        height={24}
                        alt=""
                      />
                      <Image
                        src="Chats/avatar4.png"
                        width={24}
                        height={24}
                        alt=""
                      />
                      <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#B1B5C3]">
                        +3
                      </span>
                    </div>
                  </div>
                  <div className="bg-[#D2D4D7] h-8 rounded-[6px] text-white  flex items-center justify-center font-semibold">
                    Đã kết thúc
                  </div>
                </div>
              </div>
              <div
                className={`flex flex-col items-start mt-1 text-sm text-[#A8ABB8]`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs">
                    {formatShortTime(new Date().toISOString())}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`flex justify-end transition-all duration-300`}
          onMouseEnter={() => setHoveredMessageId("static-message")}
          onMouseLeave={() => setHoveredMessageId(null)}
        >
          <div className={`flex flex-row-reverse gap-[15px] max-w-[70%]`}>
            <div>
              <Image
                src="/chats/avatar2.png"
                alt=""
                width={30}
                height={30}
                className="rounded-full object-cover"
              />
            </div>

            <div className={`flex w-full flex-col gap-1 relative items-end`}>
              <div className="text-sm font-semibold text-[#777E90]">Joker</div>
              {hoveredMessageId === "static-message" && (
                <MessageActions
                  onForward={() => setIsForwardModalOpen(true)} // Truyền hàm mở Forward
                />
              )}
              <div
                className={`rounded-lg px-5 py-3 bg-[#4A30B1] text-xs text-white`}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    <div className="flex gap-2.5 items-center">
                      <Image
                        src="Chats/iconchatdetail/videocall.png"
                        width={18}
                        height={18}
                        alt=""
                      />
                      <p className="font-semibold">
                        Cuộc họp video - Development Team
                      </p>
                    </div>
                    {/* <p>30:05</p> */}
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <Image
                      src="Chats/iconchatdetail/calendar.png"
                      width={18}
                      height={18}
                      alt=""
                    />
                    <p className="">
                      Thời gian: Thứ 6, ngày 16/10/2024, 13:38 - 14:38
                    </p>
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <Image
                      src="Chats/iconchatdetail/infor.png"
                      width={18}
                      height={18}
                      alt=""
                    />
                    <p className="">ID cuộc họp: 352 870 172</p>
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <Image
                      src="Chats/iconlist/addGroup.png"
                      width={18}
                      height={18}
                      alt=""
                    />
                    <div className="flex gap-1.5 flex-wrap">
                      <Image
                        src="Chats/avatar1.png"
                        width={24}
                        height={24}
                        alt=""
                      />
                      <Image
                        src="Chats/avatar2.png"
                        width={24}
                        height={24}
                        alt=""
                      />
                      <Image
                        src="Chats/avatar3.png"
                        width={24}
                        height={24}
                        alt=""
                      />
                      <Image
                        src="Chats/avatar4.png"
                        width={24}
                        height={24}
                        alt=""
                      />
                      <Image
                        src="Chats/avatar1.png"
                        width={24}
                        height={24}
                        alt=""
                      />
                      <Image
                        src="Chats/avatar1.png"
                        width={24}
                        height={24}
                        alt=""
                      />
                      <Image
                        src="Chats/avatar2.png"
                        width={24}
                        height={24}
                        alt=""
                      />
                      <Image
                        src="Chats/avatar3.png"
                        width={24}
                        height={24}
                        alt=""
                      />
                      <Image
                        src="Chats/avatar4.png"
                        width={24}
                        height={24}
                        alt=""
                      />
                      <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#B1B5C3]">
                        +3
                      </span>
                    </div>
                  </div>
                  <div className="bg-[#EE316B] h-8 rounded-[6px] text-white  flex items-center justify-center font-semibold">
                    Tham gia
                  </div>
                </div>
              </div>
              <div
                className={`flex flex-col items-start mt-1 text-sm text-[#A8ABB8]`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs">
                    {formatShortTime(new Date().toISOString())}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {chat.messages &&
          chat.messages.map((message, index) => {
            const isCurrentUser = message.senderId === currentUser.id;
            const showDateHeader = isFirstMessageOfDay(index);

            return (
              <div key={message.id}>
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
                  className={`flex ${
                    isCurrentUser ? "justify-end" : "justify-start"
                  } transition-all duration-300 ${
                    highlightedMessageId === message.id ? "bg-[#E8E3FF]" : ""
                  }`}
                >
                  <div
                    id={`message-${message.id}`}
                    className={`flex  ${
                      isCurrentUser ? "flex-row-reverse" : ""
                    } gap-[15px] max-w-[70%] `}
                    onMouseEnter={() => setHoveredMessageId(message.id)}
                    onMouseLeave={() => setHoveredMessageId(null)}
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
                      {/* Hiển thị MessageActions khi hover */}
                      {hoveredMessageId === message.id && (
                        <MessageActions
                          isCurrentUser={isCurrentUser}
                          message={message}
                          onForward={() => setIsForwardModalOpen(true)}
                        />
                      )}
                      {message.content && (
                        <div
                          className={`rounded-lg px-5 py-3 relative ${
                            isCurrentUser
                              ? "bg-[#4A30B1] text-white"
                              : "bg-[#F4F5F6]"
                          }`}
                        >
                          {(index === 7 || index === 8 || index === 9) && (
                            <>
                              {isCurrentUser ? (
                                <div className="rounded-lg bg-[#16006D] flex items-center py-2.5 pr-3 mb-2.5   text-xs">
                                  <div className="bg-[#EE316B] w-0.5 h-9"></div>
                                  <div className="ml-4">
                                    <span>Nguyễn Tuấn Anh</span>
                                    <p>
                                      Ever wondered how some graphic desi...
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <div className="rounded-lg bg-white flex items-center py-2.5 pr-3 mb-2.5   text-xs">
                                  <div className="bg-[#EE316B] w-0.5 h-9"></div>
                                  <div className="ml-4">
                                    <span>Nguyễn Tuấn Anh</span>
                                    <p>
                                      Ever wondered how some graphic desi...
                                    </p>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                          <p className="text-sm">
                            {renderMessageContent(message.content)}
                          </p>
                          {(index === 4 || index === 5 || index === 6) && (
                            <>
                              {isCurrentUser ? (
                                <div
                                  onClick={() => setIsLikeModalOpen(true)}
                                  className="rounded-full cursor-pointer bg-[#16006D] px-[15px] py-[5px] mt-[10px] inline-flex gap-1.5 items-center justify-center"
                                >
                                  <Image
                                    src="/Chats/iconchatdetail/like_red.png"
                                    width={18}
                                    height={18}
                                    alt=""
                                  />
                                  <p className="text-xs font-semibold text-white/60">
                                    Nguyễn Tuấn Anh
                                  </p>
                                </div>
                              ) : (
                                <div
                                  onClick={() => setIsLikeModalOpen(true)}
                                  className="rounded-full cursor-pointer bg-white px-[15px] py-[5px] mt-[10px] inline-flex gap-1.5 items-center justify-center"
                                >
                                  <Image
                                    src="/Chats/iconchatdetail/like_red.png"
                                    width={18}
                                    height={18}
                                    alt=""
                                  />
                                  <p className="text-xs text-[#777E90]">+99</p>
                                </div>
                              )}
                            </>
                          )}
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
                              <div className="relative 2xl:w-[400px] xl:w-[300px] lg:w-[200px] w-[150px] h-[100px]  2xl:h-[250px] xl:h-[190px] lg:h-[140px]">
                                <Image
                                  src={attachment.url}
                                  alt={attachment.name}
                                  fill={true}
                                  className="object-cover rounded-lg w-full h-full"
                                />
                              </div>
                            ) : attachment.type === "video" ? (
                              <div className="relative 2xl:w-[400px] xl:w-[300px] lg:w-[200px] w-[150px] h-[100px]  2xl:h-[250px] xl:h-[190px] lg:h-[140px]">
                                <video
                                  src={attachment.url}
                                  alt={attachment.name}
                                  className="object-cover rounded-lg w-full h-full"
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
                              <div className="flex items-center ">
                                <div className="mr-2 flex-shrink-0">
                                  <Image
                                    src="/Chats/iconchatdetail/icondoc.png"
                                    width={36}
                                    height={36}
                                    alt="Document"
                                  />
                                </div>
                                <div className="flex-1 flex flex-col gap-[3px] ">
                                  <p className="text-sm text-black font-medium">
                                    {attachment.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {attachment.size}
                                  </p>
                                </div>
                                <div className="flex-shrink-0 flex  items-center gap-4 pr-[15px]">
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
                              width={18}
                              height={18}
                              alt="Pin"
                            />
                            <span className="text-[#4A30B1] text-sm">
                              {getPinnedByName(message.pinnedBy)}{" "}
                            </span>
                            <p className="text-sm"> đã ghim tin nhắn</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {isLikeModalOpen && (
        <LikeModal onClose={() => setIsLikeModalOpen(false)} />
      )}
      {isForwardModalOpen && (
        <ForwardDetail onClose={() => setIsForwardModalOpen(false)} />
      )}

      {modalContent && (
        <AttachmentModal attachment={modalContent} onClose={closeModal} />
      )}
    </div>
  );
};

export default MessagesList;
