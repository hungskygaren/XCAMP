import Image from "next/image";
import React, { useState, useRef } from "react";

const MessageInput = ({ onSendMessage }) => {
  const [messageInput, setMessageInput] = useState("");
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() && attachments.length === 0) return;

    const messagesToSend = [];

    // Thêm tin nhắn văn bản (nếu có)
    if (messageInput.trim()) {
      messagesToSend.push({ content: messageInput, attachments: [] });
    }

    // Thêm từng tệp đính kèm dưới dạng tin nhắn riêng
    attachments.forEach((attachment) => {
      messagesToSend.push({ content: "", attachments: [attachment] });
    });

    // Gửi tất cả tin nhắn cùng lúc
    onSendMessage(messagesToSend);

    // Reset input và attachments
    setMessageInput("");
    setAttachments([]);
  };
  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newAttachments = Array.from(files).map((file) => ({
      id: `${Date.now()}${Math.random().toString(36).substring(2)}`,
      name: file.name,
      type: file.type.split("/")[0], // "image", "video", hoặc loại khác
      subtype: file.type.split("/")[1], // "png", "mp4", "pdf",...
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
    setAttachments(attachments.filter((att) => att.id !== id));
  };

  const clearAllAttachments = () => {
    setAttachments([]);
  };

  // Tính toán số lượng file theo loại
  const getAttachmentSummary = () => {
    const imageCount = attachments.filter((att) => att.type === "image").length;
    const videoCount = attachments.filter((att) => att.type === "video").length;
    const fileCount = attachments.filter(
      (att) => att.type !== "image" && att.type !== "video"
    ).length;

    const parts = [];
    if (imageCount > 0) parts.push(`${imageCount} ảnh`);
    if (videoCount > 0) parts.push(`${videoCount} video`);
    if (fileCount > 0) parts.push(`${fileCount} file`);
    return parts.join(", ") || "Chưa có file nào";
  };

  return (
    <div className="p-4 bg-white  ">
      <div className="rounded-lg bg-[#F4F5F6] py-[15px] px-[21px]">
        {attachments.length > 0 && (
          <div className="mb-3">
            {/* Dòng tổng hợp số lượng */}
            <div className="flex justify-between items-center mb-2">
              <span className="text-black text-xs font-semibold">
                {getAttachmentSummary()}
              </span>
              <div
                className="flex items-center gap-[6px] cursor-pointer"
                onClick={clearAllAttachments}
              >
                <Image
                  src="/Chats/iconchatdetail/deleteall.png"
                  width={18}
                  height={18}
                  alt="Xóa tất cả"
                />
                <p className="text-[#F33E3E] text-xs font-semibold">
                  Xóa tất cả{" "}
                </p>
              </div>
            </div>

            {/* Danh sách file */}
            <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto">
              {attachments.map((att) => (
                <div
                  key={att.id}
                  className="relative w-[94px] h-[94px] rounded-lg"
                >
                  {att.type === "image" ? (
                    <Image
                      src={att.url}
                      width={94}
                      height={94}
                      alt={att.name}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  ) : att.type === "video" ? (
                    <div className="flex flex-col items-center justify-center h-full rounded-lg bg-white pt-[12px] px-2  gap-1.5">
                      <Image
                        src="/Chats/iconchatdetail/iconvideo.png"
                        width={36}
                        height={36}
                        alt="Video"
                      />
                      <span className="text-[10px] text-[#777E90] text-justify w-full line-clamp-2 break-words px-1 ">
                        {att.name}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full rounded-lg bg-white pt-[12px] px-2 gap-1.5">
                      <Image
                        src="/Chats/iconchatdetail/icondoc.png"
                        width={36}
                        height={36}
                        alt="Document"
                      />
                      <span className="text-[10px] text-[#777E90]  text-justify w-full line-clamp-2 break-words px-1 ">
                        {att.name}
                      </span>
                    </div>
                  )}
                  <button
                    onClick={() => removeAttachment(att.id)}
                    className="absolute top-2 right-2  rounded-full p-1 w-6 h-6 flex items-center justify-center cursor-pointer "
                  >
                    <Image
                      src="/Chats/iconchatdetail/whiteclose.png"
                      width={18}
                      height={18}
                      className="text-white"
                      alt="Xóa"
                    />
                  </button>
                </div>
              ))}
              {/* Ô chọn thêm file */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer w-[94px] h-[94px] flex items-center justify-center bg-transparent rounded-lg border-[#A8ABB8]  border-1 border-dashed"
              >
                <span className="text-2xl  ">+</span>
              </button>
            </div>

            {/* Gạch giữa */}
            <div className="border-t border-gray-300 my-3"></div>
          </div>
        )}

        {/* Phần input và nút */}
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image
              src="/Chats/iconchatdetail/paperclip.png"
              width={20}
              height={20}
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
            <Image
              src="/Chats/iconchatdetail/emotions.png"
              width={20}
              height={20}
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
          <input
            type="text"
            placeholder="Nhập nội dung tin nhắn..."
            className="flex-1 pl-[18px] text-sm placeholder-[#A8ABB8] focus:outline-none bg-transparent"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button
            type="submit"
            className="rounded-full focus:outline-none"
            disabled={!messageInput.trim() && attachments.length === 0}
          >
            <Image
              src={
                messageInput.trim() || attachments.length > 0
                  ? "/Chats/iconchatdetail/Send.png"
                  : "/Chats/iconchatdetail/NotSend.png"
              }
              width={20}
              height={20}
              alt="Send"
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageInput;
