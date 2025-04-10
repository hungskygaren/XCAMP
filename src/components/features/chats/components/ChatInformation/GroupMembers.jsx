import Image from "next/image";
import React, { useState } from "react";

export default function GroupMembers({ members, onShowDetail }) {
  const [isExpanded, setIsExpanded] = useState(true); // Trạng thái mở rộng/thu gọn

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mt-6">
      <div
        className="bg-[#F4F5F6] flex justify-between items-center rounded-lg px-2.5 py-2 cursor-pointer"
        onClick={handleToggleExpand}
      >
        <p className="font-semibold text-xs">Thành viên trong nhóm</p>
        <Image
          src="/Chats/iconlist/Line.png"
          width={20}
          height={20}
          className={isExpanded ? "rotate-180" : "rotate-0"}
          alt=""
        />
      </div>
      {isExpanded && (
        <>
          <div className="flex flex-col gap-2">
            {members.slice(0, 3).map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between py-1.5 pl-3.75"
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
                      <p className="text-[10px] text-[#777E90]">
                        {member.role}
                      </p>
                    )}
                  </div>
                </div>
                <Image
                  className="mr-2.75"
                  src="/Chats/iconlist/3Dot.png"
                  width={18}
                  height={18}
                  alt=""
                />
              </div>
            ))}
          </div>
          <div
            className="mt-4 text-xs text-[#4A30B1] font-semibold flex justify-center cursor-pointer"
            onClick={onShowDetail} // Chuyển sang chế độ chi tiết
          >
            Xem tất cả thành viên
          </div>
        </>
      )}
    </div>
  );
}
