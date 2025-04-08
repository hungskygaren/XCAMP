// src/components/features/chats/components/ChatDetail/AttachmentModal.js
import Image from "next/image";
import React from "react";

const AttachmentModal = ({ attachment, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="p-1 max-w-[90%] max-h-[90%] relative rounded-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 rounded-full p-1 hover:bg-violet-400 bg-violet-300 z-10"
        >
          <Image
            src="/Chats/iconlist/close.png"
            width={24}
            height={24}
            alt="Close"
          />
        </button>
        {attachment.type === "image" ? (
          <Image
            src={attachment.url}
            width={800}
            height={500}
            alt={attachment.name}
            className="object-contain max-w-full max-h-[80vh] rounded-lg"
          />
        ) : attachment.type === "video" ? (
          <div className="relative">
            <video
              src={attachment.url}
              width={800}
              height={500}
              controls
              className="object-contain max-w-full max-h-[80vh] rounded-lg"
            />
          </div>
        ) : (
          <iframe
            src={attachment.url}
            width="800"
            height="500"
            className="max-w-full max-h-[80vh] rounded-lg"
            title={attachment.name}
          />
        )}
      </div>
    </div>
  );
};

export default AttachmentModal;
