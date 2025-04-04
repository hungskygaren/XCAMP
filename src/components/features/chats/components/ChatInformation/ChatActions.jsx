import Image from "next/image";
import React from "react";

export default function ChatActions() {
  return (
    <>
      <div className="flex flex-col gap-2 mt-2 ">
        <div className="bg-[#FDE2E2] rounded-lg py-2.25 pl-3.75 flex  gap-2.25">
          <Image
            src="Chats/iconlist/delete.png"
            width={18}
            height={18}
            alt=""
          />
          <p className="text-xs font-semibold text-[#F33E3E]">
            Xóa lịch sử trò chuyện
          </p>
        </div>
        <div className="bg-[#FDE2E2] rounded-lg py-2.25 pl-3.75 flex  gap-2.25">
          <Image
            src="Chats/iconlist/delete.png"
            width={18}
            height={18}
            alt=""
          />
          <p className="text-xs font-semibold text-[#F33E3E]">Xóa nhóm</p>
        </div>
        <div className="bg-[#FDE2E2] rounded-lg py-2.25 pl-3.75 flex  gap-2.25">
          <Image
            src="Chats/iconchatinfor/out_red.png"
            width={18}
            height={18}
            alt=""
          />
          <p className="text-xs font-semibold text-[#F33E3E]">Rời nhóm</p>
        </div>
      </div>
    </>
  );
}
