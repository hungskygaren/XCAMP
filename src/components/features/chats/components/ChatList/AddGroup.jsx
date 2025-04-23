/**
 * Component AddGroup
 * Modal cho phép tạo nhóm chat mới với các tính năng:
 * - Tạo tên nhóm
 * - Tìm kiếm và chọn thành viên
 * - Hiển thị danh sách trò chuyện gần đây
 * - Hiển thị danh sách liên hệ theo bảng chữ cái
 * - Quản lý thành viên đã chọn
 */
import Button from "@/components/ui/buttons/Button";
import TextInput from "@/components/ui/inputs/TextInput";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
/**
 * @param {Object} props - Props của component
 * @param {Function} props.onClose - Hàm đóng modal
 * @param {Array} props.chats - Danh sách các cuộc trò chuyện
 * @param {Array} props.contacts - Danh sách liên hệ
 * @param {Object} props.currentUser - Thông tin người dùng hiện tại
 */
export default function AddGroup({ onClose, chats, contacts, currentUser }) {
  const modalRef = useRef(null); // Ref để kiểm tra click ngoài modal
  const [groupName, setGroupName] = useState(""); // Tên nhóm
  const [searchQuery, setSearchQuery] = useState(""); // Từ khóa tìm kiếm
  const [selectedContacts, setSelectedContacts] = useState([]); // Danh sách thành viên đã chọn
  const [allContacts, setAllContacts] = useState([]); // Danh sách tất cả liên hệ

  // Đóng modal khi click ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    fetch(` ${process.env.NEXT_PUBLIC_API_URL}/contacts`)
      .then((res) => res.json())
      .then((data) => setAllContacts(data))
      .catch((err) => console.error("Error fetching contacts:", err));
  }, []);

  /**
   * Xử lý chọn/bỏ chọn thành viên
   * @param {Object} contact - Thông tin liên hệ được chọn/bỏ chọn
   */
  const handleCheckboxChange = (contact) => {
    setSelectedContacts((prev) =>
      prev.some((c) => c.id === contact.id)
        ? prev.filter((c) => c.id !== contact.id)
        : [...prev, contact]
    );
  };
  /**
   * Xóa thành viên khỏi danh sách đã chọn
   * @param {string} contactId - ID của liên hệ cần xóa
   */
  const handleRemoveSelected = (contactId) => {
    setSelectedContacts((prev) => prev.filter((c) => c.id !== contactId));
  };

  // Reset ô tìm kiếm
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  /**
   * Lọc và sắp xếp 5 cuộc trò chuyện gần đây nhất
   * Chỉ lấy các cuộc trò chuyện trực tiếp có tin nhắn
   */
  const recentChats = (chats && Array.isArray(chats) ? chats : [])
    .filter((chat) => chat.type === "direct" && chat.messages.length > 0)
    .map((chat) => {
      const otherParticipant = chat.participants.find(
        (p) => p.id !== currentUser.id
      );
      return {
        ...otherParticipant,
        lastMessageTime: chat.lastMessageTime,
      };
    })
    .sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime))
    .slice(0, 5);
  /**
   * Lọc danh sách liên hệ theo từ khóa tìm kiếm
 
   */
  const filteredContacts = allContacts.filter(
    (contact) =>
      contact.id !== currentUser.id && // Không bao gồm currentUser
      (searchQuery
        ? contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (contact.phone && contact.phone.includes(searchQuery))
        : true)
  );

  /**
   * Nhóm danh sách liên hệ theo chữ cái đầu tiên
   * Chỉ áp dụng khi không có từ khóa tìm kiếm
   */
  const groupedContacts = searchQuery
    ? {}
    : filteredContacts.reduce((acc, contact) => {
        const firstLetter = contact.name[0].toUpperCase();
        if (!acc[firstLetter]) acc[firstLetter] = [];
        acc[firstLetter].push(contact);
        return acc;
      }, {});
  // Sắp xếp các nhóm theo bảng chữ cái
  const sortedGroups = Object.keys(groupedContacts).sort();
  /**
   * Xử lý tạo nhóm mới
   * Tạo object nhóm với thông tin cơ bản và gửi request tạo nhóm
   */
  const handleCreateGroup = () => {
    const newGroup = {
      id: Date.now().toString(),
      name: groupName || "Group Chat",
      type: "group",
      participants: [
        currentUser,
        ...selectedContacts.map((c) => ({
          id: c.id,
          name: c.name,
          email: c.email,
          avatar: c.avatar,
        })),
      ],
      messages: [],
      unreadCount: 0,
      lastMessageTime: new Date().toISOString(),
    };

    fetch(` ${process.env.NEXT_PUBLIC_API_URL}/chats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGroup),
    })
      .then(() => onClose())
      .catch((err) => console.error("Error creating group:", err));
  };

  const rightIcon = searchQuery
    ? "/Chats/iconlist/close.png"
    : "/Chats/iconlist/Search.png";
  return (
    <div className="fixed inset-0  bg-black/50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg w-[570px] max-h-[80vh]  overflow-y-auto pt-[14px] px-[15px] pb-[16px]"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[13px]">
            <div className="w-11 h-11 bg-[#F4F5F6] border-1 border-dashed border-[#A8ABB8] rounded-full flex items-center justify-center">
              <Image
                width={24}
                height={24}
                src="Chats/iconlist/camera.png"
                alt=""
              />
            </div>

            <div>
              <TextInput
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                inputClassName="text-[#A8ABB8] text-xl font-semibold outline-none"
                placeholder="Nhập tên nhóm chat"
              />
            </div>
          </div>
          <span onClick={onClose} className="cursor-pointer">
            <Image
              width={24}
              height={24}
              className="w-6 h-6"
              src="/Chats/iconlist/close.png"
              alt=""
            />
          </span>
        </div>
        <div className="w-full h-0 border-1 border-[#E6E8EC] mt-[14px] mb-[16px]"></div>
        <div className="flex gap-[18px]">
          <div className="w-[280px]">
            <div className="relative">
              <TextInput
                type="text"
                placeholder="Tìm kiếm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                inputClassName="w-full pl-[15px] h-8 text-[.75rem] text-[#A8ABB8] font-semibold border border-gray-200 rounded-lg focus:outline-none placeholder:text-gray-500"
                rightIcon={rightIcon} // Chuyển đổi icon dựa trên searchQuery
                rightIconClassName="w-4 h-4"
                onRightIconClick={searchQuery ? handleClearSearch : () => {}} // Chỉ reset khi có searchQuery
              />
              {searchQuery && (
                <Image
                  width={16}
                  height={16}
                  src="/Chats/iconlist/close.png"
                  className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  alt="clear"
                  onClick={handleClearSearch}
                />
              )}
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto h-[472px] scrollbar-custom mt-4">
              {/* Trò chuyện gần đây - Chỉ hiển thị khi không tìm kiếm */}
              {!searchQuery && recentChats.length > 0 && (
                <div className="flex w-[260px] flex-col gap-[10px]">
                  <div className="text-xs text-[#777E90] font-semibold">
                    Trò chuyện gần đây
                  </div>
                  {recentChats.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center border-b-1 border-[#E6E8EC] justify-between pb-4"
                      onClick={() => handleCheckboxChange(contact)} // Di chuyển sự kiện onClick lên div cha
                    >
                      <div className="flex gap-[11px] items-center">
                        <Image
                          width={30}
                          height={30}
                          src={contact.avatar || "/Chats/avatar1.png"}
                          className="w-[30px] h-[30px]"
                          alt=""
                        />
                        <div>
                          <p className="text-xs">{contact.name}</p>
                          <p className="text-[#777E90] text-xs">
                            {contact.email}
                          </p>
                        </div>
                      </div>
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedContacts.some(
                            (c) => c.id === contact.id
                          )}
                          onChange={() => {}} // Để trống vì sự kiện được xử lý ở div cha
                          className="absolute opacity-0 w-0 h-0" // Ẩn checkbox mặc định
                        />
                        <span
                          className={`w-[18px] h-[18px] rounded-sm flex items-center justify-center border-1 border-gray-300 ${
                            selectedContacts.some((c) => c.id === contact.id)
                              ? "bg-[#4A30B1] border-[#4A30B1]"
                              : "bg-white"
                          }`}
                        >
                          {selectedContacts.some(
                            (c) => c.id === contact.id
                          ) && (
                            <Image
                              width={7.5}
                              height={6}
                              src="/Chats/iconlist/WhiteCheck.png"
                              alt="Check"
                            />
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Danh sách liên hệ */}

              {searchQuery ? (
                // Khi tìm kiếm: Hiển thị danh sách phẳng
                <div className="flex flex-col gap-[10px] w-[260px]">
                  {filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center border-b-1 border-[#E6E8EC] justify-between pb-4 "
                      onClick={() => handleCheckboxChange(contact)} // Di chuyển sự kiện onClick lên div cha
                    >
                      <div className="flex gap-[11px] items-center">
                        <Image
                          width={30}
                          height={30}
                          src={contact.avatar || "/chats/avatar1.png"}
                          className="w-[30px] h-[30px]"
                          alt=""
                        />
                        <div>
                          <p className="text-xs">{contact.name}</p>
                          <p className="text-[#777E90] text-xs">
                            {contact.email}
                          </p>
                        </div>
                      </div>
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedContacts.some(
                            (c) => c.id === contact.id
                          )}
                          onChange={() => {}} // Để trống vì sự kiện được xử lý ở div cha
                          className="absolute opacity-0 w-0 h-0" // Ẩn checkbox mặc định
                        />
                        <span
                          className={`w-[18px] h-[18px] rounded-sm flex items-center justify-center border-1 border-gray-300 ${
                            selectedContacts.some((c) => c.id === contact.id)
                              ? "bg-[#4A30B1] border-[#4A30B1]"
                              : "bg-white"
                          }`}
                        >
                          {selectedContacts.some(
                            (c) => c.id === contact.id
                          ) && (
                            <Image
                              width={7.5}
                              height={6}
                              src="/Chats/iconlist/WhiteCheck.png"
                              alt="Check"
                            />
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Khi không tìm kiếm: Hiển thị theo bảng chữ cái
                sortedGroups.map((letter) => (
                  <div
                    key={letter}
                    className="flex w-[260px] flex-col gap-[10px]"
                  >
                    <p className="text-xs text-[#777E90] font-semibold">
                      {letter}
                    </p>
                    {groupedContacts[letter].map((contact) => (
                      <div
                        key={contact.id}
                        className="flex items-center border-b-1 border-[#E6E8EC] justify-between pb-4"
                        onClick={() => handleCheckboxChange(contact)} // Di chuyển sự kiện onClick lên div cha
                      >
                        <div className="flex gap-[11px] items-center">
                          <Image
                            width={30}
                            height={30}
                            src={contact.avatar}
                            className="w-[30px] h-[30px]"
                            alt=""
                          />
                          <div>
                            <p className="text-xs">{contact.name}</p>
                            <p className="text-[#777E90] text-xs">
                              {contact.email}
                            </p>
                          </div>
                        </div>
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedContacts.some(
                              (c) => c.id === contact.id
                            )}
                            onChange={() => {}} // Để trống vì sự kiện được xử lý ở div cha
                            className="absolute opacity-0 w-0 h-0" // Ẩn checkbox mặc định
                          />
                          <span
                            className={`w-[18px] h-[18px] rounded-sm flex items-center justify-center border-1 border-gray-300 ${
                              selectedContacts.some((c) => c.id === contact.id)
                                ? "bg-[#4A30B1] border-[#4A30B1]"
                                : "bg-white"
                            }`}
                          >
                            {selectedContacts.some(
                              (c) => c.id === contact.id
                            ) && (
                              <Image
                                width={7.5}
                                height={6}
                                src="/Chats/iconlist/WhiteCheck.png"
                                alt="Check"
                              />
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="w-[245px] h-[530px] bg-[#F4F5F6] flex flex-col gap-[14px] px-4 py-3 rounded-[10px]">
            <p className="text-xs text-[#777E90] font-semibold">
              Đã chọn ({selectedContacts.length})
            </p>
            <div className="flex flex-col gap-[10px]">
              {selectedContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex gap-2 items-center pr-[8px] pl-[6px] py-[6px] rounded-lg bg-white w-fit"
                >
                  <Image
                    width={22}
                    height={22}
                    src={contact.avatar || "Chats/avatar1.png"}
                    className="w-[22px] h-[22px]"
                    alt=""
                  />
                  <p className="text-xs">{contact.name}</p>
                  <Image
                    width={18}
                    height={18}
                    src="Chats/iconlist/close-bg_gray.png"
                    className="w-[18px] h-[18px] cursor-pointer"
                    alt=""
                    onClick={() => handleRemoveSelected(contact.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-9">
          <Button
            className="px-[30px] py-[10px] bg-[#F4F5F6] text-[#777E90] text-sm rounded-[10px] cursor-pointer"
            onClick={onClose}
            children="Đóng"
          />
          <Button
            className="px-[38.5px] py-[10px] bg-[#4A30B1] text-white text-sm rounded-[10px] cursor-pointer"
            onClick={handleCreateGroup}
            children="Tạo nhóm"
          />
        </div>
      </div>
    </div>
  );
}
