// src/components/features/chats/components/ChatDetail/PinnedMessagesHeader.js
import Image from "next/image";
import React from "react";

const PinnedMessagesChatDetail = ({
  pinnedMessages,
  currentUser,
  onToggleExpand,
  isExpanded,
  onMessageClick,
  onOpenPinnedMessagesDetail,
}) => {
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
          <p className="text-sm text-[#141416] ml-[5px]">{attachment.name}</p>
        </div>
      );
    }
    return (
      <p className="text-sm text-[#141416]">
        {message.content.length > 30
          ? `${message.content.substring(0, 30)}...`
          : message.content}
      </p>
    );
  };

  const latestPinnedMessage = pinnedMessages[0];
  // Thêm hàm xử lý nhấp "Xem tất cả ghim" để bỏ expand
  const handleViewAllPins = () => {
    onOpenPinnedMessagesDetail(); // Mở ChatInformation với PinnedMessagesDetail
    onToggleExpand(false); // Thêm dòng này để bỏ trạng thái expand
  };
  return (
    <div className="relative px-5.5">
      {!isExpanded ? (
        <div className="h-[54px] flex items-center justify-between gap-2">
          <div
            className="border-[#E6E8EC] border-1 rounded-lg h-full flex-1 py-2.5 px-3 flex items-center justify-between bg-white cursor-pointer"
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
                  <p className="text-sm text-[#141416]">{`${getMessageSender(
                    latestPinnedMessage.senderId
                  )}: `}</p>
                  {renderPinnedContent(latestPinnedMessage)}
                </div>
              </div>
              <div className="text-xs text-[#777E90]">
                Được ghim bởi {getPinnedByName(latestPinnedMessage.pinnedBy)}
              </div>
            </div>
            <div>
              <Image
                src="/Chats/iconlist/3Dot.png"
                width={18}
                height={18}
                alt="More"
              />
            </div>
          </div>
          {pinnedMessages.length > 1 && (
            <button
              className="bg-[#F4F5F6] rounded-lg w-[54px] h-full flex flex-col items-center justify-center"
              onClick={() => onToggleExpand(true)}
            >
              <span className="text-sm text-[#777E90] font-semibold">
                +{pinnedMessages.length - 1}
              </span>
              <span className="text-xs text-[#777E90]">Ghim</span>
            </button>
          )}
        </div>
      ) : (
        <div className="h-[54px] relative">
          <div className="border-[#E6E8EC] border-1 absolute z-20 top-0 left-0 right-0 rounded-lg py-2.5 px-2 flex flex-col items-center gap-[10px] bg-white shadow-lg">
            <div className="flex justify-between w-full items-center">
              <div className="text-xs font-semibold">Tin nhắn đã ghim</div>
              <button
                className="flex items-center gap-[5px]"
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
                  <div className="flex flex-col">
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
                        )}: `}</p>
                        {renderPinnedContent(msg)}
                      </div>
                    </div>
                    <div className="text-xs text-[#777E90]">
                      Được ghim bởi {getPinnedByName(msg.pinnedBy)}
                    </div>
                  </div>
                  <div>
                    <Image
                      src="/Chats/iconlist/3Dot.png"
                      width={18}
                      height={18}
                      alt="More"
                    />
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
