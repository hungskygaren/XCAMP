import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

export default function GroupMembers({ members, onShowDetail }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null); // Trạng thái dropdown cho từng member
  const dropdownRefs = useRef({});
  const getDropdownRef = (memberId) => {
    if (!dropdownRefs.current[memberId]) {
      dropdownRefs.current[memberId] = React.createRef();
    }
    return dropdownRefs.current[memberId];
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleToggleDropdown = (memberId, e) => {
    e.stopPropagation();
    setIsDropdownOpen(isDropdownOpen === memberId ? null : memberId);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen !== null) {
        // Lấy ref tương ứng với dropdown đang mở
        const currentRef = dropdownRefs.current[isDropdownOpen];

        if (
          currentRef &&
          currentRef.current &&
          !currentRef.current.contains(event.target)
        ) {
          // Kiểm tra xem click có phải vào nút 3 chấm không
          const isClickOn3DotButton = event.target.closest(
            `img[data-member-id="${isDropdownOpen}"]` // Sử dụng data-member-id
          );

          if (!isClickOn3DotButton) {
            setIsDropdownOpen(null); // Đóng dropdown nếu click ra ngoài và không phải nút 3 chấm
          }
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]); // Thêm isDropdownOpen vào dependency array

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
                className="flex items-center justify-between py-1.5 pl-3.75 relative"
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
                <div className="mr-2.75 relative">
                  <Image
                    src="/Chats/iconlist/3Dot.png"
                    width={18}
                    height={18}
                    alt=""
                    className="cursor-pointer"
                    data-member-id={member.id}
                    onClick={(e) => handleToggleDropdown(member.id, e)}
                  />
                  {isDropdownOpen === member.id && (
                    <div
                      ref={getDropdownRef(member.id)}
                      className="absolute right-0 top-3 w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50"
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
                              ? "/Chats/iconchatinfor/deleteshieldperson.png"
                              : "/Chats/iconchatinfor/shieldperson.png"
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
          <div
            className="mt-4 text-xs text-[#4A30B1] font-semibold flex justify-center cursor-pointer"
            onClick={onShowDetail}
          >
            Xem tất cả thành viên
          </div>
        </>
      )}
    </div>
  );
}
