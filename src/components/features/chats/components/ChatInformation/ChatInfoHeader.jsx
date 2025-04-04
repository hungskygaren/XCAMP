import Image from "next/image";
import React from "react";

export default function ChatInfoHeader() {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="bg-[#F4F5F6] border-[#A8ABB8] border-1 border-dashed w-[50px] h-[50px] rounded-full flex items-center justify-center">
          <Image
            src="/Chats/iconlist/camera.png"
            width={24}
            height={24}
            alt=""
          />
        </div>
        <div className="absolute top-7 right-5 w-[50px] h-[50px] rounded-full flex items-center justify-center">
          <Image src="/Chats/avatar1.png" fill alt="" />
          <div className="absolute bottom-0 right-0 bg-[#777E90] w-[16px] h-[16px] rounded-full flex items-center justify-center">
            <Image
              src="/Chats/iconchatinfor/camera_black.png"
              width={8}
              height={8}
              alt=""
            />
          </div>
        </div>
        <div className="flex gap-[6px]  items-end ">
          <span className=" mt-[9px] text-sm font-semibold">
            Development Team
          </span>
          <Image
            src={`/Chats/iconchatinfor/edit.png`}
            width={18}
            height={18}
            alt=""
            className="w-[18px] h-[18px]"
          />
        </div>
        <div className="flex  mt-[21px]">
          <div className="flex flex-col gap-[6px] justify-center items-center">
            <div className="flex items-center justify-center bg-[#E6E8EC] w-10 h-10 rounded-full">
              <Image
                src="/Chats/iconlist/notificationoff.png"
                alt=""
                width={24}
                height={24}
              />
            </div>
            <div className="text-[#777E90] text-[10px]">Tắt Thông báo</div>
          </div>
          <div className="flex flex-col gap-[6px] justify-center items-center ml-7.5 ">
            <div className="flex items-center justify-center bg-[#E6E8EC] w-10 h-10 rounded-full">
              <Image
                alt=""
                src="/Chats/iconlist/verticalpin.png"
                width={24}
                height={24}
              />
            </div>
            <div className="text-[#777E90] text-[10px]">Ghim lên đầu</div>
          </div>
          <div className="flex flex-col gap-[6px] justify-center items-center ml-[21px]">
            <div className="flex items-center justify-center bg-[#E6E8EC] w-10 h-10 rounded-full ">
              <Image
                alt=""
                src="/Chats/iconlist/addGroup.png"
                width={24}
                height={24}
              />
            </div>
            <div className="text-[#777E90] text-[10px]">Thêm thành viên</div>
          </div>
        </div>
      </div>
    </>
  );
}
