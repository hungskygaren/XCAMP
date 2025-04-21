// src/components/features/chats/components/ChatList/More.js
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

// Component More: Dropdown hiển thị các tùy chọn lọc
const More = ({ onFilterByFlag, onResetFilters }) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false); // Trạng thái mở/đóng dropdown
  const [selectedFilter, setSelectedFilter] = useState(null); // Bộ lọc được chọn (null, "flagged", hoặc "mentioned")
  const moreRef = useRef(null); // Ref để kiểm tra click ngoài dropdown

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMoreOpen &&
        moreRef.current &&
        !moreRef.current.contains(event.target)
      ) {
        setIsMoreOpen(false); // Đóng dropdown
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMoreOpen]);

  // Toggle trạng thái mở/đóng dropdown
  const handleMoreOpen = (e) => {
    e.stopPropagation(); // Ngăn sự kiện lan truyền
    setIsMoreOpen(!isMoreOpen);
  };

  //   // Chọn "Đã gắn cờ"
  // const handleFilterFlagged = () => {
  //   setSelectedFilter("flagged");
  //   onFilterByFlag(true); // Kích hoạt lọc flagged
  //   setIsMoreOpen(false);
  // };

  // Chọn "Nhắc đến bạn"
  const handleFilterMentioned = () => {
    setSelectedFilter("mentioned"); // Đặt bộ lọc là "mentioned"
    onFilterByFlag(false); // Reset lọc flagged (chỉ chọn 1 bộ lọc tại 1 thời điểm)
    setIsMoreOpen(false); // Đóng dropdown
  };

  // Reset tất cả bộ lọc
  const handleReset = (e) => {
    e.stopPropagation(); // Ngăn sự kiện lan truyền
    setSelectedFilter(null); // Xóa bộ lọc đã chọn
    onResetFilters(); // Gọi hàm reset bộ lọc từ props
    setIsMoreOpen(false); // Đóng dropdown
  };

  return (
    <div ref={moreRef} className="relative">
      {/* Nút mở dropdown */}
      <button
        onClick={handleMoreOpen}
        className={`flex items-center cursor-pointer gap-1 py-1 px-2 ${
          selectedFilter || isMoreOpen ? "bg-[#00B6FF26] rounded-full" : ""
        }`}
      >
        {/* {selectedFilter === "flagged" ? (
          <>
            <Image
              src="/Chats/iconlist/flag.png"
              alt="Flagged"
              className="w-[18px] h-[18px]"
              width={18}
              height={18}
            />
            <span className="text-xs font-semibold">Đã gắn cờ</span>
          </>
        ) : selectedFilter === "mentioned" ? ( */}
        {selectedFilter === "mentioned" ? (
          <>
            <Image
              src="/Chats/iconlist/mention.png"
              alt="Mention"
              className="w-[18px] h-[18px]"
              width={18}
              height={18}
            />
            <span className="text-xs font-semibold">Nhắc đến bạn</span>
          </>
        ) : (
          <Image
            width={18}
            height={18}
            src="/Chats/iconlist/3Dot.png"
            className="w-[18px] h-[18px]"
            alt="More"
          />
        )}
        {/* Nút reset bộ lọc */}
        {selectedFilter && (
          <span className="ml-1 cursor-pointer" onClick={handleReset}>
            <Image
              width={16}
              height={16}
              src="/Chats/iconlist/close.png"
              alt="Reset"
              className="w-4 h-4"
            />
          </span>
        )}
      </button>

      {/* Dropdown hiển thị các tùy chọn */}
      {isMoreOpen && (
        <div className="absolute top-8 right-0 w-[150px] bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50">
          {/* Item 1: Đã gắn cờ
          <button
            className="flex items-center gap-2 w-full text-left px-2 py-2 text-xs text-[#141416] hover:bg-[#F4F5F6]"
            onClick={handleFilterFlagged}
          >
            <Image
              width={18}
              height={18}
              src="/Chats/iconlist/flag.png"
              alt="Flagged"
              className="w-[18px] h-[18px]"
            />
            Đã gắn cờ
          </button> */}
          {/* Item 2: Nhắc đến bạn */}
          <button
            className="flex items-center gap-2 w-full text-left px-2 py-2 text-xs text-[#141416] hover:bg-[#F4F5F6]"
            onClick={handleFilterMentioned}
          >
            <Image
              width={18}
              height={18}
              src="/Chats/iconlist/mention.png"
              alt="Mention"
              className="w-[18px] h-[18px]"
            />
            Nhắc đến bạn
          </button>
        </div>
      )}
    </div>
  );
};

export default More;
