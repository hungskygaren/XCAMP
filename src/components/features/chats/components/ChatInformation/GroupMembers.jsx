import Image from "next/image";
import React from "react";

export default function GroupMembers() {
  return (
    <>
      <div className="mt-6">
        <div className="bg-[#F4F5F6] flex justify-between items-center rounded-lg px-2.5 py-2 ">
          <p className="font-semibold text-xs"> Thành viên trong nhóm</p>
          <Image
            src="Chats/iconlist/Line.png"
            width={20}
            height={20}
            className="rotate-180"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between py-1.5 pl-3.75">
            <div className="flex">
              <div>
                <Image src="Chats/avatar1.png" width={30} height={30} alt="" />
              </div>
              <div className="ml-2.25 flex-col items-center ">
                <p className="text-xs">Nguyễn Tuấn Anh</p>
                <p className="text-[10px] text-[#777E90] ">Quản trị viên</p>
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
          <div className="flex items-center justify-between py-1.5 pl-3.75">
            <div className="flex">
              <div>
                <Image src="Chats/avatar2.png" width={30} height={30} alt="" />
              </div>
              <div className="ml-2.25 flex flex-col items-center ">
                <p className="text-xs">Đào Phương Uyên</p>
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
          <div className="flex items-center justify-between py-1.5 pl-3.75">
            <div className="flex">
              <div>
                <Image src="Chats/avatar3.png" width={30} height={30} alt="" />
              </div>
              <div className="ml-2.25 flex flex-col items-center ">
                <p className="text-xs">Jack Nguyen</p>
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
        </div>
        <div className=" mt-4 text-xs text-[#4A30B1] font-semibold flex justify-center">
          Xem tất cả thành viên
        </div>
      </div>
    </>
  );
}
