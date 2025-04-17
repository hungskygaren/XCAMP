import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const PinnedMessagesChatDetail = ({
  pinnedMessages,
  currentUser,
  onToggleExpand,
  isExpanded,
  onMessageClick,
  onOpenPinnedMessagesDetail,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const dropdownRefs = useRef({});

  // Sử dụng object để lưu nhiều refs cho từng dropdown
  const getDropdownRef = (messageId) => {
    if (!dropdownRefs.current[messageId]) {
      dropdownRefs.current[messageId] = React.createRef();
    }
    return dropdownRefs.current[messageId];
  };
  console.log(dropdownRefs);
  console.log(dropdownRefs.current);

  const handleToggleDropdown = (messageId, event) => {
    event.stopPropagation(); // Ngăn lan truyền để tránh gọi onMessageClick
    setIsDropdownOpen(isDropdownOpen === messageId ? null : messageId);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Nếu một dropdown đang mở
      if (isDropdownOpen !== null) {
        const currentRef = dropdownRefs.current[isDropdownOpen];

        // Kiểm tra nếu click không phải là trong dropdown
        if (
          currentRef &&
          currentRef.current &&
          !currentRef.current.contains(event.target)
        ) {
          // Kiểm tra xem đó có phải là nút 3dot của tin nhắn đang mở không
          const is3DotButton = event.target.closest(
            `img[data-message-id="${isDropdownOpen}"]`
          );

          // Nếu không phải là nút 3dot của tin nhắn đang mở, đóng dropdown
          if (!is3DotButton) {
            setIsDropdownOpen(null);
          }
          // Nếu là nút 3dot, handleToggleDropdown sẽ xử lý việc đóng/mở
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]); // Thêm dependency để tối ưu

  const getMessageSender = (senderId) => {
    return (
      pinnedMessages[0].participants.find((p) => p.id === senderId)?.name ||
      "Unknown"
    );
  };

  const getPinnedByName = (pinnedById) => {
    return (
      pinnedMessages[0].participants.find((p) => p.id === pinnedById)?.name ||
      "Unknown"
    );
  };

  const renderPinnedContent = (message) => {
    if (message.attachments && message.attachments.length > 0) {
      const attachment = message.attachments[0];
      return (
        <div className="flex items-center">
          <Image
            src={
              attachment.type === "image"
                ? "/Chats/iconchatinfor/image.png"
                : attachment.type === "video"
                ? "/Chats/iconchatdetail/iconvideo.png"
                : "/Chats/iconchatdetail/icondoc.png"
            }
            width={18}
            height={18}
            className="ml-[5px]"
            alt={attachment.type}
          />
          <p className="text-sm text-[#141416] ml-[5px] truncate">
            {attachment.name}
          </p>
        </div>
      );
    }
    return (
      <p className="text-sm text-[#141416] ml-[5px]">
        {message.content.length > 30
          ? `${message.content.substring(0, 30)}...`
          : message.content}
      </p>
    );
  };

  const latestPinnedMessage = pinnedMessages[0];

  const handleViewAllPins = () => {
    onOpenPinnedMessagesDetail();
    onToggleExpand(false);
  };

  return (
    <div className="relative px-5.5">
      {!isExpanded ? (
        <div className="flex justify-between gap-2">
          <div
            className="border-[#E6E8EC] border-1 rounded-lg flex-1 py-2.5 px-3 flex items-center justify-between bg-white cursor-pointer"
            onClick={() => onMessageClick(latestPinnedMessage.id)}
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-[7px]">
                <Image
                  src="/Chats/iconlist/pin.png"
                  width={18}
                  height={18}
                  alt="Pin"
                />
                <div className="flex items-center">
                  <p className="text-sm text-[#141416] text-nowrap truncate">{`${getMessageSender(
                    latestPinnedMessage.senderId
                  )} `}</p>
                  <p className="flex items-center text-sm ml-1">:</p>
                  {renderPinnedContent(latestPinnedMessage)}
                </div>
              </div>
              <div className="text-xs text-[#777E90]">
                Được ghim bởi {getPinnedByName(latestPinnedMessage.pinnedBy)}
              </div>
            </div>
            <div className="relative">
              <Image
                className="shrink cursor-pointer"
                src="/Chats/iconlist/3Dot.png"
                width={18}
                height={18}
                alt="More"
                data-message-id={latestPinnedMessage.id}
                onClick={(e) => handleToggleDropdown(latestPinnedMessage.id, e)}
              />

              {isDropdownOpen === latestPinnedMessage.id && (
                <div
                  ref={getDropdownRef(latestPinnedMessage.id)}
                  className="absolute right-0 top-4 w-[193px] bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50"
                >
                  <button className="flex items-center gap-2 w-full text-left pl-[10px] py-[7px] text-xs text-[#141416] hover:bg-[#F4F5F6]">
                    <Image
                      src="/Chats/iconchatdetail/forward.png"
                      width={18}
                      height={18}
                      alt=""
                    />
                    Chuyển tiếp
                  </button>
                  <button className="flex items-center gap-2 w-full text-left pl-[10px] py-[7px] text-xs text-[#141416] hover:bg-[#F4F5F6]">
                    <Image
                      src="/Chats/iconlist/unpin.png"
                      width={18}
                      height={18}
                      alt=""
                    />
                    Bỏ ghim tin nhắn
                  </button>
                </div>
              )}
            </div>
          </div>
          {pinnedMessages.length > 1 && (
            <button
              className="bg-[#F4F5F6] cursor-pointer rounded-lg w-[54px] self-stretch flex items-center justify-center"
              onClick={() => onToggleExpand(true)}
            >
              <div className="flex flex-col items-center justify-center py-2">
                <span className="text-sm text-[#777E90] font-semibold">
                  +{pinnedMessages.length - 1}
                </span>
                <span className="text-xs text-[#777E90]">Ghim</span>
              </div>
            </button>
          )}
        </div>
      ) : (
        <div className="h-[54px] relative">
          <div className="border-[#E6E8EC] border-1 absolute z-20 top-0 left-0 right-0 rounded-lg py-2.5 px-2 flex flex-col items-center gap-[10px] bg-white shadow-lg">
            <div className="flex justify-between w-full items-center">
              <div className="text-xs font-semibold">Tin nhắn đã ghim</div>
              <button
                className="flex items-center gap-[5px] cursor-pointer"
                onClick={() => onToggleExpand(false)}
              >
                <div className="text-[#4A30B1] text-xs">Thu gọn</div>
                <Image
                  src="/Chats/iconlist/line-violet.png"
                  width={20}
                  height={20}
                  alt="Collapse"
                />
              </button>
            </div>
            <div className="flex flex-col w-full gap-2 max-h-[200px] overflow-y-auto">
              {pinnedMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="rounded-lg bg-[#F4F5F6] w-full py-2.5 px-3 flex items-center justify-between cursor-pointer"
                  onClick={() => onMessageClick(msg.id)}
                >
                  <div className="flex flex-col text-nowrap truncate">
                    <div className="flex items-center gap-[7px]">
                      <Image
                        src="/Chats/iconlist/pin.png"
                        width={18}
                        height={18}
                        alt="Pin"
                      />
                      <div className="flex items-center">
                        <p className="text-sm text-[#141416]">{`${getMessageSender(
                          msg.senderId
                        )}`}</p>
                        <p className="flex items-center text-sm ml-1">:</p>
                        {renderPinnedContent(msg)}
                      </div>
                    </div>
                    <div className="text-xs text-[#777E90] truncate">
                      Được ghim bởi {getPinnedByName(msg.pinnedBy)}
                    </div>
                  </div>
                  <div className="relative">
                    <Image
                      className="shrink cursor-pointer"
                      src="/Chats/iconlist/3Dot.png"
                      width={18}
                      height={18}
                      alt="More"
                      data-message-id={msg.id}
                      onClick={(e) => handleToggleDropdown(msg.id, e)}
                    />
                    {isDropdownOpen === msg.id && (
                      <div
                        ref={getDropdownRef(msg.id)}
                        className="fixed w-[193px] bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50"
                        style={{
                          top: `${
                            document
                              .querySelector(`img[data-message-id="${msg.id}"]`)
                              ?.getBoundingClientRect().bottom - 5
                          }px`,
                          right: "57px",
                        }}
                      >
                        <button className="flex items-center gap-2 w-full text-left pl-[10px] py-[7px] text-xs text-[#141416] hover:bg-[#F4F5F6]">
                          <Image
                            src="/Chats/iconchatdetail/forward.png"
                            width={18}
                            height={18}
                            alt=""
                          />
                          Chuyển tiếp
                        </button>
                        <button className="flex items-center gap-2 w-full text-left pl-[10px] py-[7px] text-xs text-[#141416] hover:bg-[#F4F5F6]">
                          <Image
                            src="/Chats/iconlist/unpin.png"
                            width={18}
                            height={18}
                            alt=""
                          />
                          Bỏ ghim tin nhắn
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div
              className="text-xs text-[#4A30B1] font-semibold cursor-pointer"
              onClick={handleViewAllPins}
            >
              Xem tất cả ghim
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PinnedMessagesChatDetail;
