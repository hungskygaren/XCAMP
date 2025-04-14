import TextInput from "@/components/ui/inputs/TextInput";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

export default function GroupMemberDetail({ members, onBack }) {
  const [filter, setFilter] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(null); // Trạng thái dropdown cho từng member
  const dropdownRef = useRef(null);

  const filteredMembers =
    filter === "all"
      ? members
      : members.filter((member) => member.role === "Quản trị viên");

  const handleToggleDropdown = (memberId) => {
    setIsDropdownOpen(isDropdownOpen === memberId ? null : memberId);
  };

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col h-full ">
      <div className="flex items-center gap-2">
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

      <div className="relative w-full min-h-8 bg-[#F4F5F6] mt-8 rounded-lg flex ">
        <div
          className={`absolute h-full w-1/2  bg-[#EE316B] rounded-lg transition-all duration-300 ${
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

      <div className="flex flex-col gap-2 mt-4 overflow-y-auto ">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between py-1.5 relative"
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
            <div className="relative">
              <Image
                src="/Chats/iconlist/3Dot.png"
                width={18}
                height={18}
                alt=""
                className="cursor-pointer"
                onClick={() => handleToggleDropdown(member.id)}
              />
              {isDropdownOpen === member.id && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 top-6 w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50"
                >
                  <button className="flex items-center gap-2 w-full text-left px-2 py-2 text-xs text-[#141416] hover:bg-[#F4F5F6]">
                    <Image
                      src="/Chats/iconchatinfor/chat.png"
                      width={18}
                      height={18}
                      alt=""
                    />
                    Nhắn tin
                  </button>
                  <button className="flex items-center gap-2 w-full text-left px-2 py-2 text-xs text-[#141416] hover:bg-[#F4F5F6]">
                    <Image
                      src={
                        member.role === "Quản trị viên"
                          ? "/Chats/iconchatinfor/Delete Shield Person.png"
                          : "/Chats/iconchatinfor/Shield Person.png"
                      }
                      width={18}
                      height={18}
                      alt=""
                    />
                    {member.role === "Quản trị viên"
                      ? "Gỡ vai trò quản trị viên"
                      : "Đặt làm quản trị viên"}
                  </button>
                  <button className="flex items-center gap-2 w-full text-left px-2 py-2 text-xs text-[#F33E3E] hover:bg-[#F4F5F6]">
                    <Image
                      src="/Chats/iconlist/delete.png"
                      width={18}
                      height={18}
                      alt=""
                    />
                    Xóa khỏi nhóm
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-[#F4F5F6] min-h-8 flex gap-1.5 items-center justify-center mt-2">
        <Image
          src="/Chats/iconlist/addGroup.png"
          width={20}
          height={20}
          alt=""
          className="cursor-pointer"
          onClick={onBack}
        />
        <div className="text-xs font-semibold text-[#777E90]">
          Thêm thành viên
        </div>
      </div>
    </div>
  );
}
