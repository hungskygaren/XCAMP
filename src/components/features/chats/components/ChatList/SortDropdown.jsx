// src/components/features/Chats/components/ChatList/SortDropdown.js
import React, { useState, useEffect, useRef } from "react";
import TagManagement from "./TagManagement";
import Image from "next/image";

const SortDropdown = ({ isSortOpen, setIsSortOpen, onFilterByTag, chats }) => {
  const [tags, setTags] = useState([]); // Danh sách thẻ
  const [selectedTags, setSelectedTags] = useState([]); // Danh sách thẻ được chọn
  const [isTagManagementOpen, setIsTagManagementOpen] = useState(false); // Trạng thái mở/đóng modal quản lý thẻ
  const containerRef = useRef(null); // Ref để tham chiếu đến toàn bộ component

  // Fetch danh sách thẻ từ API khi component mount
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags?_sort=order&_order=asc`)
      .then((res) => res.json())
      .then((data) => setTags(data))
      .catch((err) => console.error("Error fetching tags:", err));
  }, []);

  // Đóng dropdown khi nhấp ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSortOpen &&
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSortOpen, setIsSortOpen]);

  // Cập nhật danh sách thẻ sau khi thay đổi từ TagManagement
  const handleUpdateTags = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags?_sort=order&_order=asc`)
      .then((res) => res.json())
      .then((data) => setTags(data))
      .catch((err) => console.error("Error fetching tags:", err));
  };

  // Xử lý chọn/hủy chọn thẻ
  const handleTagToggle = (tagId) => {
    const newSelectedTags = selectedTags.includes(tagId)
      ? selectedTags.filter((id) => id !== tagId) // Bỏ thẻ nếu đã được chọn
      : [...selectedTags, tagId]; // Thêm thẻ nếu chưa được chọn
    setSelectedTags(newSelectedTags);
    onFilterByTag(newSelectedTags); // Gửi danh sách thẻ được chọn để lọc
  };

  // Reset tất cả thẻ được chọn
  const handleResetTags = () => {
    setSelectedTags([]);
    onFilterByTag([]); // Reset bộ lọc
    setIsSortOpen(false); // Đóng dropdown
  };

  // Component TagIcon: Hiển thị biểu tượng màu sắc của thẻ
  const TagIcon = ({ color }) => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.6959 8.9218L15.6964 8.9223C15.7984 9.02422 15.8665 9.132 15.9087 9.24713C15.9585 9.38311 15.9813 9.51246 15.9813 9.6375C15.9813 9.76236 15.9586 9.88675 15.9106 10.0133C15.8692 10.1224 15.8012 10.2292 15.6964 10.3339L10.3339 15.6964C10.2294 15.801 10.117 15.8747 9.99555 15.9233C9.86253 15.9765 9.73788 16 9.61875 16C9.49962 16 9.37497 15.9765 9.24195 15.9233C9.12047 15.8747 9.00813 15.801 8.90355 15.6964L2.2848 9.0777C2.19419 8.98708 2.12461 8.88302 2.07451 8.76195C2.02509 8.64252 2 8.51697 2 8.38125V3C2 2.72116 2.09345 2.49491 2.29418 2.29418C2.49491 2.09345 2.72116 2 3 2H8.38125C8.51135 2 8.63755 2.02599 8.7637 2.08065C8.89632 2.13812 9.00551 2.21267 9.09622 2.30333C9.0963 2.3034 9.09637 2.30348 9.09645 2.30355L15.6959 8.9218ZM9.2647 15.3531L9.61825 15.7076L9.9723 15.3536L15.3348 9.99105L15.6879 9.638L15.3353 9.28445L8.71655 2.64695L8.57002 2.5H8.3625H3H2.5V3V8.3625V8.56919L2.64595 8.71555L9.2647 15.3531ZM5.31832 5.31832C5.1944 5.44224 5.05641 5.5 4.875 5.5C4.69359 5.5 4.5556 5.44224 4.43168 5.31832C4.30776 5.1944 4.25 5.05641 4.25 4.875C4.25 4.69359 4.30776 4.5556 4.43168 4.43168C4.5556 4.30776 4.69359 4.25 4.875 4.25C5.05641 4.25 5.1944 4.30776 5.31832 4.43168C5.44224 4.5556 5.5 4.69359 5.5 4.875C5.5 5.05641 5.44224 5.1944 5.31832 5.31832Z"
        fill={color}
        stroke={color}
      />
    </svg>
  );

  // Xác định nhãn hiển thị trên nút "Phân loại"
  const getButtonLabel = () => {
    if (selectedTags.length === 0) return "Phân loại";
    if (selectedTags.length === 1) {
      const selectedTag = tags.find((tag) => tag.id === selectedTags[0]);
      return selectedTag ? selectedTag.name : "Phân loại";
    }
    return `${selectedTags.length} thẻ`;
  };

  // Xác định biểu tượng hiển thị trên nút
  const getButtonIcon = () => {
    if (selectedTags.length === 1) {
      const selectedTag = tags.find((tag) => tag.id === selectedTags[0]);
      return selectedTag ? <TagIcon color={selectedTag.color} /> : null;
    }
    return (
      <Image
        src="/Chats/iconlist/tag.png"
        alt="Sort"
        className="w-[1.125rem]h-[1.125rem]"
        width={18}
        height={18}
      />
    );
  };

  // Hàm xử lý toggle dropdown
  const handleToggleDropdown = (e) => {
    e.stopPropagation(); // Ngăn sự kiện lan truyền lên document
    setIsSortOpen(!isSortOpen);
  };

  return (
    <div
      ref={containerRef}
      className="relative items-center flex justify-between"
    >
      {/* Nút mở dropdown */}
      <button
        className={`flex cursor-pointer items-center justify-center  rounded-full  px-[13px] gap-0.5 my-[10px] py-[4px] text-sm font-semibold text-gray-900 ${
          selectedTags.length > 0 || isSortOpen
            ? "bg-[#00B6FF26] "
            : "bg-[#F4F5F6]"
        }`}
        onClick={handleToggleDropdown}
      >
        {getButtonIcon()}
        <p className="text-xs pl-1.5  font-semibold">{getButtonLabel()}</p>
        {selectedTags.length > 0 ? (
          <span
            className="flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation(); // Ngăn mở dropdown khi nhấp "x"
              handleResetTags();
            }}
          >
            <Image
              src="/Chats/iconlist/close1.png"
              alt="Reset"
              className="w-4 h-4 "
              width={16}
              height={16}
            />
          </span>
        ) : isSortOpen ? (
          <Image
            src="/Chats/iconlist/line1.png"
            alt="Sort"
            width={16}
            height={16}
            className="w-4 h-4 rotate-180"
          />
        ) : (
          <Image
            src="/Chats/iconlist/line1.png"
            alt="Sort"
            className="w-4 h-4"
            width={16}
            height={16}
          />
        )}
      </button>

      {/* Dropdown hiển thị danh sách thẻ */}
      {isSortOpen && (
        <div className="absolute  top-9.5 left-0 w-[250px] bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50">
          {/* Danh sách các thẻ với checkbox */}
          {tags.map((tag) => (
            <label
              key={tag.id}
              className="flex items-center gap-2 w-full text-left px-2 py-2 text-xs hover:bg-[#F4F5F6] cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedTags.includes(tag.id)}
                onChange={() => handleTagToggle(tag.id)}
                className="hidden" // Ẩn checkbox mặc định
              />
              <span
                className={`w-4 h-4 rounded-sm flex items-center justify-center border-1 border-gray-300 ${
                  selectedTags.includes(tag.id) ? "bg-[#4A30B1]" : "bg-white"
                }`}
              >
                {selectedTags.includes(tag.id) && (
                  <Image
                    width={8}
                    height={6}
                    src="/Chats/iconlist/WhiteCheck.png"
                    alt="Check"
                    className="w-2 h-1.5"
                  />
                )}
              </span>
              <TagIcon color={tag.color} />
              {tag.name}
            </label>
          ))}

          {/* Nút Quản lý thẻ */}
          <button
            className="flex items-center gap-2 w-full text-left px-2 py-2 text-[#141416] text-xs hover:bg-[#F4F5F6]"
            onClick={() => {
              setIsTagManagementOpen(true);
              setIsSortOpen(false);
            }}
          >
            <Image
              src="/Chats/iconlist/setting.png"
              className="w-[18px] h-[18px]"
              width={18}
              height={18}
              alt=""
            />
            Quản lý thẻ
          </button>
        </div>
      )}

      {/* Modal TagManagement */}
      {isTagManagementOpen && (
        <TagManagement
          onClose={() => setIsTagManagementOpen(false)}
          onSaveTag={handleUpdateTags}
          onUpdateTag={handleUpdateTags}
          onDeleteTag={handleUpdateTags}
          onUpdateTags={handleUpdateTags}
        />
      )}
    </div>
  );
};

export default SortDropdown;
