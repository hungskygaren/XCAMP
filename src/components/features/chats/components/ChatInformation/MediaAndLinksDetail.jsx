import TextInput from "@/components/ui/inputs/TextInput";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

// Component tái sử dụng cho từng item (ảnh, file, link)
const MediaItem = ({
  item,
  type,
  onToggleDropdown,
  dropdownOpen,
  dropdownRef,
}) => {
  const [hovered, setHovered] = useState(false);

  // Tùy chọn dropdown dựa trên type
  const dropdownOptions = {
    media: [
      {
        icon: "/Chats/iconchatdetail/copy.png",
        label: "Sao chép hình ảnh",
        color: "#141416",
      },
      {
        icon: "/Chats/iconchatdetail/forward.png",
        label: "Chuyển tiếp",
        color: "#141416",
      },
      {
        icon: "/Chats/iconchatdetail/download_black.png",
        label: "Tải xuống",
        color: "#141416",
      },
      {
        icon: "/Chats/iconchatdetail/folder_black.png",
        label: "Xem trong thư mục",
        color: "#141416",
      },
      {
        icon: "/Chats/iconchatinfor/chat.png",
        label: "Xem tin nhắn gốc",
        color: "#141416",
      },
      {
        icon: "/Chats/iconlist/delete.png",
        label: "Xóa với tất cả mọi người",
        color: "#F33E3E",
      },
      {
        icon: "/Chats/iconlist/delete.png",
        label: "Xóa chỉ ở phía tôi",
        color: "#F33E3E",
      },
    ],
    file: [
      {
        icon: "/Chats/iconchatdetail/forward.png",
        label: "Chuyển tiếp",
        color: "#141416",
      },
      {
        icon: "/Chats/iconchatdetail/download_black.png",
        label: "Tải xuống",
        color: "#141416",
      },
      {
        icon: "/Chats/iconchatdetail/folder_black.png",
        label: "Xem trong thư mục",
        color: "#141416",
      },
      {
        icon: "/Chats/iconchatinfor/chat.png",
        label: "Xem tin nhắn gốc",
        color: "#141416",
      },
      {
        icon: "/Chats/iconlist/delete.png",
        label: "Xóa với tất cả mọi người",
        color: "#F33E3E",
      },
      {
        icon: "/Chats/iconlist/delete.png",
        label: "Xóa chỉ ở phía tôi",
        color: "#F33E3E",
      },
    ],
    link: [
      {
        icon: "/Chats/iconchatdetail/forward.png",
        label: "Chuyển tiếp",
        color: "#141416",
      },
      {
        icon: "/Chats/iconchatinfor/link_black.png",
        label: "Mở bằng trình duyệt",
        color: "#141416",
      },
      {
        icon: "/Chats/iconchatinfor/chat.png",
        label: "Xem tin nhắn gốc",
        color: "#141416",
      },
      {
        icon: "/Chats/iconlist/delete.png",
        label: "Xóa với tất cả mọi người",
        color: "#F33E3E",
      },
      {
        icon: "/Chats/iconlist/delete.png",
        label: "Xóa chỉ ở phía tôi",
        color: "#F33E3E",
      },
    ],
  };

  return (
    <div
      className={`relative ${
        type === "media" ? "w-[97px] h-[97px]" : "w-full"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {type === "media" ? (
        <Image
          src={item.url}
          width={97}
          height={97}
          alt=""
          className="object-cover rounded-md z-10"
        />
      ) : (
        <div className="border-1 border-[#E6E8EC] rounded-lg flex justify-between items-center py-[11px] pl-2 pr-5">
          <div className="flex gap-1.5 items-center">
            <Image
              src={
                type === "file"
                  ? "Chats/iconchatdetail/icondoc.png"
                  : "Chats/iconchatinfor/tenten-vn.png"
              }
              width={36}
              height={36}
              alt=""
            />
            <div className="flex flex-col">
              <div className="text-sm">{item.name}</div>
              <div
                className={`text-xs ${
                  type === "link" ? "text-[#4A30B1]" : "text-[#777E90]"
                }`}
              >
                {item.detail}
              </div>
            </div>
          </div>
          <Image
            src="Chats/iconlist/3Dot.png"
            width={18}
            height={18}
            alt=""
            className="opacity-0"
          />
        </div>
      )}
      {hovered && (
        <div className="absolute top-1 right-1 bg-white rounded-[4px] border-1 border-[#E6E8EC] w-6 h-6 flex items-center justify-center z-20">
          <Image
            src="/Chats/iconlist/3Dot.png"
            width={18}
            height={18}
            alt=""
            className="cursor-pointer"
            onClick={() => onToggleDropdown(item.id)}
          />
        </div>
      )}
      {dropdownOpen === item.id && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-[28px] text-xs w-[193px] bg-white border border-gray-200 rounded-lg shadow-lg px-2.5 py-2 z-50"
        >
          {dropdownOptions[type].map((option, index) => (
            <button
              key={index}
              className={`flex items-center gap-2 w-full text-left py-2 text-xs text-[${option.color}] hover:bg-[#F4F5F6]`}
            >
              <Image src={option.icon} width={18} height={18} alt="" />
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function MediaAndLinksDetail({ initialType = "media", onBack }) {
  const [filter, setFilter] = useState(initialType);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);

  // Dữ liệu tập trung cho cả 3 tab
  const data = {
    media: [
      {
        date: "16/10/2024",
        items: [
          { id: "1", url: "/Chats/avatar0.png" },
          { id: "2", url: "/Chats/avatar0.png" },
          { id: "3", url: "/Chats/avatar0.png" },
        ],
      },
      {
        date: "15/10/2024",
        items: [
          { id: "4", url: "/Chats/avatar0.png" },
          { id: "5", url: "/Chats/avatar0.png" },
        ],
      },
    ],
    file: [
      {
        date: "16/10/2024",
        items: [{ id: "f1", name: "Mô tả nội dung.docx", detail: "102KB" }],
      },
      {
        date: "15/10/2024",
        items: [
          { id: "f2", name: "Mô tả nội dung.docx", detail: "102KB" },
          { id: "f3", name: "Mô tả nội dung.docx", detail: "102KB" },
        ],
      },
    ],
    link: [
      {
        date: "16/10/2024",
        items: [
          { id: "l1", name: "Nhà đăng ký mua tên miền", detail: "tenten.vn" },
        ],
      },
      {
        date: "15/10/2024",
        items: [
          { id: "l2", name: "Nhà đăng ký mua tên miền", detail: "tenten.vn" },
          { id: "l3", name: "Nhà đăng ký mua tên miền", detail: "tenten.vn" },
        ],
      },
    ],
  };

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleDropdown = (itemId) => {
    setDropdownOpen(dropdownOpen === itemId ? null : itemId);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Tiêu đề và nút quay lại */}
      <div className="flex items-center gap-2">
        <Image
          src="/Chats/iconchatinfor/arrow_back.png"
          width={24}
          height={24}
          alt=""
          className="cursor-pointer"
          onClick={onBack}
        />
        <p className="font-semibold text-sm">
          Hình ảnh, video, file và liên kết
        </p>
      </div>

      {/* FilterTabs */}
      <div className="relative w-full h-8 bg-[#F4F5F6] rounded-lg flex mt-8">
        <div
          className={`absolute h-full w-1/3 bg-[#EE316B] rounded-lg transition-all duration-300 ${
            filter === "media"
              ? "translate-x-0"
              : filter === "file"
              ? "translate-x-full"
              : "translate-x-[200%]"
          }`}
        />
        {["media", "file", "link"].map((tab) => (
          <button
            key={tab}
            className={`relative text-xs font-semibold w-1/3 text-center z-10 ${
              filter === tab ? "text-white" : "text-[#777E90]"
            }`}
            onClick={() => setFilter(tab)}
          >
            {tab === "media"
              ? "Ảnh/Video"
              : tab === "file"
              ? "File"
              : "Liên kết"}
          </button>
        ))}
      </div>

      {/* Nội dung thay đổi dựa trên filter */}
      <div className="mt-4 overflow-y-auto">
        {(filter === "file" || filter === "link") && (
          <div className="relative w-full mb-4">
            <TextInput
              type="text"
              placeholder={`Tìm theo ${filter === "file" ? "tên" : "link"}`}
              value=""
              rightIcon="/Chats/iconlist/Search.png"
              rightIconClassName="w-4 h-4"
              inputClassName="w-full pl-[15px] h-8 text-[.75rem] text-[#A8ABB8] font-semibold border border-gray-200 rounded-lg focus:outline-none placeholder:text-gray-500"
            />
          </div>
        )}
        <div className="flex flex-col gap-4">
          {data[filter].map((group) => (
            <div key={group.date}>
              <p className="text-xs text-[#777E90] mb-2">{group.date}</p>
              <div
                className={`${
                  filter === "media"
                    ? "flex flex-wrap gap-1.25"
                    : "flex flex-col gap-2.5"
                }`}
              >
                {group.items.map((item) => (
                  <MediaItem
                    key={item.id}
                    item={item}
                    type={filter}
                    onToggleDropdown={handleToggleDropdown}
                    dropdownOpen={dropdownOpen}
                    dropdownRef={dropdownRef}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
