import React, { useState } from "react";

export default function Setting() {
  const [isMessageSoundOn, setIsMessageSoundOn] = useState(true);

  return (
    <div className="absolute w-[330px] bg-white rounded-[10px] shadow-lg pr-[17px] pt-[12px] pl-[16px] pb-[14px] right-0 top-[40px] z-50">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Âm báo tin nhắn</p>
          <button
            className={`w-12 h-6 rounded-full flex items-center transition-all duration-300 ${
              isMessageSoundOn ? "bg-[#4A30B1]" : "bg-gray-300"
            }`}
            onClick={() => setIsMessageSoundOn(!isMessageSoundOn)}
          >
            <span
              className={`w-5 h-5 bg-white rounded-full inline-block transition-transform duration-300 ${
                isMessageSoundOn ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
        <p className="text-xs text-[#777E90] w-full">
          Phát âm thanh khi có tin nhắn và thông báo mới
        </p>
      </div>
    </div>
  );
}
