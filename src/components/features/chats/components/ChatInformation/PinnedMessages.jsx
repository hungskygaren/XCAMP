import Image from "next/image";
import React from "react";

export default function PinnedMessages() {
  return (
    <>
      <div className="mt-4.5">
        <div className="bg-[#F4F5F6] flex justify-between items-center rounded-lg px-2.5 py-2 ">
          <p className="font-semibold text-xs">Tin nhắn đã ghim</p>
          <Image
            src="Chats/iconlist/Line.png"
            width={20}
            height={20}
            className="rotate-180"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex-col border-1 border-[#E6E8EC] rounded-lg items-center justify-between pl-3.5 pt-2.75 pb-3.75 pr-2.75">
            <div className="flex justify-between items-center">
              <div className="flex ">
                <div>
                  <Image
                    src="Chats/avatar1.png"
                    width={30}
                    height={30}
                    alt=""
                  />
                </div>
                <div className="ml-2.25 flex items-center">
                  <p className="text-xs">Nguyễn Tuấn Anh</p>
                </div>
              </div>
              <Image
                className="mr-2.75"
                src="Chats/iconlist/3Dot.png"
                width={18}
                height={18}
                alt=""
              />
            </div>
            <div className="text-xs mt-1.5">
              Ever wondered how some graphic designers always manage to produce
            </div>
            <div className="flex justify-between items-center mt-2.5">
              <div className="text-[10px] text-[#A8ABB8] w-[92px]">
                Được ghim bởi Nguyễn Tuấn Anh
              </div>
              <div className="bg-[#E8E3FF] h-[24px] w-[120px] px-[14px] pl-1.25 pr-1.75 rounded-full text-[10px] font-semibold text-[#4A30B1] flex items-center justify-center">
                Xem tin nhắn gốc
              </div>
            </div>
          </div>
          <div className="flex-col border-1 border-[#E6E8EC] rounded-lg items-center justify-between pl-3.5 pt-2.75 pb-3.75 pr-2.75">
            <div className="flex justify-between items-center">
              <div className="flex ">
                <div>
                  <Image
                    src="Chats/avatar1.png"
                    width={30}
                    height={30}
                    alt=""
                  />
                </div>
                <div className="ml-2.25 flex items-center">
                  <p className="text-xs">Nguyễn Tuấn Anh</p>
                </div>
              </div>
              <Image
                className="mr-2.75"
                src="Chats/iconlist/3Dot.png"
                width={18}
                height={18}
                alt=""
              />
            </div>
            <div className=" flex items-center gap-1 mt-2.5">
              <Image
                src="Chats/iconchatdetail/icondoc.png"
                width={24}
                height={24}
                alt=""
              />
              <p className="text-xs">Mô tả nội dung.docx</p>
            </div>
            <div className="flex justify-between items-center mt-3 ">
              <div className="text-[10px] text-[#A8ABB8] w-[92px]">
                Được ghim bởi Nguyễn Tuấn Anh
              </div>
              <div className="bg-[#E8E3FF] h-[24px] w-[120px] px-[14px] pl-1.25 pr-1.75 rounded-full text-[10px] font-semibold text-[#4A30B1] flex items-center justify-center">
                Xem tin nhắn gốc
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-4 text-xs text-[#4A30B1] font-semibold flex justify-center">
          Xem tất cả ghim
        </div>
      </div>
    </>
  );
}
