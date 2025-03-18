import React, { useState, useRef, useEffect } from "react";

const ChatDetail = ({ chat, onSendMessage, currentUser }) => {
  const [messageInput, setMessageInput] = useState("");
  const [attachments, setAttachments] = useState([]);
  const messagesContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

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

  const handleSendMessage = (e) => {
    e.preventDefault();
    onSendMessage(messageInput, attachments);
    setMessageInput("");
    setAttachments([]);
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newAttachments = Array.from(files).map((file) => ({
      // id giờ là chuỗi, nhưng Date.now() + Math.random() vẫn tạo chuỗi số,
      // nên không cần thay đổi logic ở đây
      id: `${Date.now()}${Math.random().toString(36).substring(2)}`, // Tạo id chuỗi duy nhất
      name: file.name,
      type: file.type.split("/")[0],
      size: `${(file.size / 1024).toFixed(1)} KB`,
      url: URL.createObjectURL(file),
      file,
    }));

    setAttachments([...attachments, ...newAttachments]);
    if (e.target === fileInputRef.current) {
      fileInputRef.current.value = "";
    } else if (e.target === imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const removeAttachment = (id) => {
    // id là chuỗi, nhưng filter với !== vẫn hoạt động bình thường
    setAttachments(attachments.filter((att) => att.id !== id));
  };

  const getChatName = () => {
    if (!chat) return "";
    if (chat.type === "direct") {
      // p.id và currentUser.id đều là chuỗi, so sánh !== vẫn đúng
      const otherParticipant = chat.participants.find(
        (p) => p.id !== currentUser.id
      );
      return otherParticipant?.name || "Unknown";
    }
    return chat.name || "Group Chat";
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
    if (!chat) return "Unknown";
    // senderId là chuỗi, p.id cũng là chuỗi, so sánh === vẫn đúng
    return chat.participants.find((p) => p.id === senderId)?.name || "Unknown";
  };

  const getReadByAvatars = (message) => {
    if (!chat || !message.readBy || message.readBy.length === 0) return [];

    if (chat.type === "direct") {
      // currentUser.id và recipient.id đều là chuỗi
      const recipient = chat.participants.find((p) => p.id !== currentUser.id);
      // includes() hoạt động đúng với chuỗi
      if (message.readBy.includes(recipient.id)) {
        return [recipient?.avatar || "/avatar.png"];
      }
      return [];
    }

    return message.readBy
      .filter((id) => id !== message.senderId) // id và senderId đều là chuỗi
      .map((id) => {
        const participant = chat.participants.find((p) => p.id === id);
        return participant?.avatar || "/avatar.png";
      });
  };

  if (!chat) return <div className="flex-1">No chat selected</div>;

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

  return (
    <div className="w-[57.875rem] max-h-[1070px] flex flex-col bg-gray-50">
      <div className="p-4 border-b border-gray-200 bg-white flex items-center">
        <div className="flex items-center">
          <div className="mr-3">
            {chat.type === "direct" ? (
              <img
                src={
                  chat.participants.find((p) => p.id !== currentUser.id)
                    ?.avatar || "/avatar.png"
                }
                alt={getChatName()}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold">
                {getChatName().substring(0, 2).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{getChatName()}</h3>
          </div>
        </div>
      </div>

      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {chat.messages &&
          chat.messages.map((message, index) => {
            // message.senderId và currentUser.id đều là chuỗi
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
                  className={`flex ${
                    isCurrentUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="flex items-start max-w-[70%]">
                    {!isCurrentUser && (
                      <img
                        src={
                          chat.participants.find(
                            (p) => p.id === message.senderId
                          )?.avatar || "/avatar.png"
                        }
                        alt={getMessageSender(message.senderId)}
                        className="w-8 h-8 rounded-full object-cover mr-2 mt-1"
                      />
                    )}

                    <div className="w-full">
                      {!isCurrentUser && (
                        <p className="text-xs text-gray-500 mb-1">
                          {getMessageSender(message.senderId)}
                        </p>
                      )}

                      <div
                        className={`rounded-lg p-3 ${
                          isCurrentUser
                            ? "bg-[#4A30B1] text-white rounded-tr-none"
                            : "bg-white text-gray-800 border border-gray-200 rounded-tl-none"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">
                          {renderMessageContent(message.content)}
                        </p>

                        {message.attachments &&
                          message.attachments.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {message.attachments.map((attachment) => (
                                <div
                                  key={attachment.id}
                                  className="flex items-center rounded bg-gray-100 p-2"
                                >
                                  <div className="flex-shrink-0 mr-2">
                                    {attachment.type === "pdf" ? (
                                      <div className="bg-red-100 text-red-500 rounded p-1 text-xs">
                                        PDF
                                      </div>
                                    ) : attachment.type === "xlsx" ? (
                                      <div className="bg-green-100 text-green-500 rounded p-1 text-xs">
                                        XLSX
                                      </div>
                                    ) : (
                                      <div className="bg-blue-100 text-blue-500 rounded p-1 text-xs">
                                        FILE
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">
                                      {attachment.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {attachment.size}
                                    </p>
                                  </div>
                                  <a
                                    href={attachment.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-xs font-medium ml-2 px-2 py-1 rounded ${
                                      isCurrentUser
                                        ? "bg-blue-400 text-white"
                                        : "bg-gray-200 text-gray-800"
                                    }`}
                                  >
                                    Xem
                                  </a>
                                </div>
                              ))}
                            </div>
                          )}
                      </div>

                      <div
                        className={`flex items-center mt-1 text-sm text-[#A8ABB8] ${
                          isCurrentUser ? "justify-end" : "justify-start"
                        }`}
                      >
                        <span>{formatShortTime(message.timestamp)}</span>
                        {isCurrentUser && (
                          <span className="ml-2 flex items-center gap-1">
                            {message.readBy && message.readBy.length > 0
                              ? getReadByAvatars(message).map(
                                  (avatar, index) => (
                                    <img
                                      key={index}
                                      src={avatar}
                                      alt="Reader"
                                      className="w-4 h-4 rounded-full inline-block"
                                    />
                                  )
                                )
                              : "✓"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
      </div>

      <div className="p-4 bg-white border-t border-gray-200 sticky bottom-0">
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {attachments.map((att) => (
              <div
                key={att.id}
                className="flex items-center bg-gray-100 rounded-full pl-3 pr-1 py-1"
              >
                <span className="text-sm truncate max-w-[150px]">
                  {att.name}
                </span>
                <button
                  className="ml-1 rounded-full p-1 hover:bg-gray-200"
                  onClick={() => removeAttachment(att.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        <form
          onSubmit={handleSendMessage}
          className="flex items-center gap-2 bg-[#F4F5F6] py-[15px] pr-[13px] pl-[21px]"
        >
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => fileInputRef.current?.click()}
          >
            <img
              src="/chats/iconchatdetail/paperclip.png"
              className="w-5 h-5"
              alt=""
            />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <img
              src="/chats/iconchatdetail/emotions.png"
              className="w-5 h-5"
              alt=""
            />
          </button>
          <input
            ref={imageInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Input giữ nguyên */}
          <input
            type="text"
            placeholder="Nhập nội dung tin nhắn..."
            className="flex-1 pl-[18px] text-sm placeholder-[#A8ABB8] focus:outline-none "
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />

          {/* Nút gửi với hình ảnh thay đổi */}
          <button
            type="submit"
            className="rounded-full focus:outline-none"
            disabled={!messageInput.trim() && attachments.length === 0}
          >
            <img
              src={
                messageInput.trim() || attachments.length > 0
                  ? "/chats/iconchatdetail/send.png"
                  : "/chats/iconchatdetail/NotSend.png"
              }
              className="w-5 h-5"
              alt="Send"
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatDetail;
