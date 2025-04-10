import Image from "next/image";
import React, { useState } from "react";

export default function MediaAndLinks({ onShowDetail }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mt-4.5">
      <div
        className="bg-[#F4F5F6] flex justify-between items-center rounded-lg px-2.5 py-2 cursor-pointer"
        onClick={handleToggleExpand}
      >
        <p className="font-semibold text-xs">
          Hình ảnh, video, file và liên kết
        </p>
        <Image
          src="/Chats/iconlist/Line.png"
          width={20}
          height={20}
          className={`transition-transform duration-300 ${
            isExpanded ? "rotate-180" : "rotate-0"
          }`}
          alt=""
        />
      </div>
      {isExpanded && (
        <div className="flex flex-col gap-2 mt-2">
          <button
            className="px-[9px] pl-[15px] flex items-center gap-2 hover:bg-gray-100 rounded-md"
            onClick={() => onShowDetail("media")}
          >
            <Image
              src="/Chats/iconchatinfor/image.png"
              width={18}
              height={18}
              alt=""
            />
            <p className="text-xs pt-0.25">Ảnh/Video</p>
          </button>
          <button
            className="px-[9px] pl-[15px] flex items-center gap-2 hover:bg-gray-100 rounded-md"
            onClick={() => onShowDetail("file")}
          >
            <Image
              src="/Chats/iconchatinfor/Form.png"
              width={18}
              height={18}
              alt=""
            />
            <p className="text-xs pt-0.25">File</p>
          </button>
          <button
            className="px-[9px] pl-[15px] flex items-center gap-2 hover:bg-gray-100 rounded-md"
            onClick={() => onShowDetail("link")}
          >
            <Image
              src="/Chats/iconchatinfor/link_black.png"
              width={18}
              height={18}
              alt=""
            />
            <p className="text-xs pt-0.25">Liên kết</p>
          </button>
        </div>
      )}
    </div>
  );
}
