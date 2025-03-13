import React, { useState, useRef, useEffect } from "react";

const ChatDetail = ({ chat, onSendMessage, currentUser }) => {
  const [messageInput, setMessageInput] = useState("");
  const [attachments, setAttachments] = useState([]);
  const messagesContainerRef = useRef(null); // Thay messagesEndRef bằng ref cho container
  const fileInputRef = useRef(null);

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
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type.split("/")[0],
      size: `${(file.size / 1024).toFixed(1)} KB`,
      url: URL.createObjectURL(file),
      file,
    }));

    setAttachments([...attachments, ...newAttachments]);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeAttachment = (id) => {
    setAttachments(attachments.filter((att) => att.id !== id));
  };

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

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getMessageSender = (senderId) => {
    if (!chat) return "Unknown";
    return chat.participants.find((p) => p.id === senderId)?.name || "Unknown";
  };

  if (!chat) return <div className="flex-1">No chat selected</div>;

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
            {/* {chat.type === "direct" && (
              <p className="text-xs text-gray-500">
                {chat.participants.find((p) => p.id !== currentUser.id)
                  ?.isOnline
                  ? "Đang hoạt động"
                  : "Không hoạt động"}
              </p>
            )} */}
          </div>
        </div>
      </div>

      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {chat.messages &&
          chat.messages.map((message) => {
            const isCurrentUser = message.senderId === currentUser.id;

            return (
              <div
                key={message.id}
                className={`flex ${
                  isCurrentUser ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex items-start max-w-[70%]">
                  {!isCurrentUser && (
                    <img
                      src={
                        chat.participants.find((p) => p.id === message.senderId)
                          ?.avatar || "/avatar.png"
                      }
                      alt={getMessageSender(message.senderId)}
                      className="w-8 h-8 rounded-full object-cover mr-2 mt-1"
                    />
                  )}

                  <div>
                    {chat.type === "group" && !isCurrentUser && (
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
                      <p className="whitespace-pre-wrap">{message.content}</p>

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

                    <p
                      className={`text-xs text-gray-500 mt-1 ${
                        isCurrentUser ? "text-right" : "text-left"
                      }`}
                    >
                      {formatMessageTime(message.timestamp)}
                      {isCurrentUser && (
                        <span className="ml-1">
                          {message.isRead ? "✓✓" : "✓"}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        {/* Không cần messagesEndRef ở đây nữa */}
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

        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => fileInputRef.current?.click()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
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
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </button>

          <input
            type="text"
            placeholder="Nhập tin nhắn..."
            className="flex-1 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />

          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>

          <button
            type="submit"
            className={`rounded-full p-2 focus:outline-none ${
              messageInput.trim() || attachments.length > 0
                ? "bg-[#4A30B1] text-white hover:bg-blue-600"
                : "bg-gray-100 text-gray-400"
            }`}
            disabled={!messageInput.trim() && attachments.length === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatDetail;
