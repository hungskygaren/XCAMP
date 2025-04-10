import TextInput from "@/components/ui/inputs/TextInput";
import Image from "next/image";
import React, { useState } from "react";

export default function GroupMemberDetail({ members, onBack }) {
  const [filter, setFilter] = useState("all"); // Lọc tất cả hoặc quản trị viên

  // Lọc danh sách thành viên dựa trên filter
  const filteredMembers =
    filter === "all"
      ? members
      : members.filter((member) => member.role === "Quản trị viên");

  return (
    <div className="flex flex-col h-full ">
      {/* Tiêu đề */}
      <div className="flex items-center  gap-2 ">
        <Image
          src="/Chats/iconchatinfor/arrow_back.png"
          width={24}
          height={24}
          alt=""
          className="cursor-pointer"
          onClick={onBack}
        />
        <p className="font-semibold text-sm">Thành viên trong nhóm</p>
      </div>

      {/* Filter Tabs */}
      <div className="relative w-full h-8 bg-[#F4F5F6] rounded-lg flex mt-8">
        <div
          className={`absolute h-full w-1/2 bg-[#EE316B] rounded-lg transition-all duration-300 ${
            filter === "admins" ? "translate-x-full" : "translate-x-0"
          }`}
        />
        <button
          className={`relative text-xs font-semibold w-1/2 text-center z-10 ${
            filter === "all" ? "text-white" : "text-[#777E90]"
          }`}
          onClick={() => setFilter("all")}
        >
          Tất cả thành viên
        </button>
        <button
          className={`relative text-xs font-semibold w-1/2 text-center z-10 ${
            filter === "admins" ? "text-white" : "text-[#777E90]"
          }`}
          onClick={() => setFilter("admins")}
        >
          Quản trị viên
        </button>
      </div>

      <div className="mt-4">
        <div className="relative w-full">
          <TextInput
            type="text"
            placeholder="Tìm theo tên"
            value=""
            rightIcon="/Chats/iconlist/Search.png"
            rightIconClassName="w-4 h-4"
            inputClassName="w-full pl-[15px] h-8 text-[.75rem] text-[#A8ABB8] font-semibold border border-gray-200 rounded-lg focus:outline-none placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Danh sách thành viên */}
      <div className="flex flex-col gap-2 mt-4 overflow-y-auto">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between py-1.5"
          >
            <div className="flex items-center">
              <div className="relative">
                <Image src={member.avatar} width={30} height={30} alt="" />
                {member.isOnline && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-1.5 border-white rounded-full"></span>
                )}
              </div>
              <div className="ml-2.25 flex flex-col">
                <p className="text-xs">{member.name}</p>
                {member.role === "Quản trị viên" && (
                  <p className="text-[10px] text-[#777E90]">{member.role}</p>
                )}
              </div>
            </div>
            <Image
              src="/Chats/iconlist/3Dot.png"
              width={18}
              height={18}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}
