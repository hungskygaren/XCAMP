import React, { useEffect, useRef } from "react";
import ChatList from "./ChatList";
import ChatDetail from "./ChatDetail";
import ChatInformation from "./ChatInformation";
import SearchPanel from "./SearchPanel";
import { ChatProvider, useChat } from "../../../contexts/ChatContext";

// Component chính hiển thị giao diện chat
const ChatViewContent = ({
  chats, // Danh sách các cuộc trò chuyện
  activeChat, // Cuộc trò chuyện đang được chọn
  onSelectChat, // Hàm xử lý khi chọn một cuộc trò chuyện
  onSendMessage, // Hàm xử lý khi gửi tin nhắn
  currentUser, // Người dùng hiện tại
  contacts, // Danh sách liên hệ
  onUpdateChat, // Hàm xử lý khi cập nhật thông tin chat
}) => {
  const modalRef = useRef(null); // Tham chiếu đến ChatInformation panel
  const searchPanelRef = useRef(null); // Tham chiếu đến SearchPanel
  const { isChatInfoOpen, toggleChatInfo, isSearchOpen, toggleSearchPanel } =
    useChat(); // Lấy trạng thái và hàm từ ChatContext

  useEffect(() => {
    // Đóng ChatInformation khi click ra ngoài
    const handleClickOutsideChatInfo = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        toggleChatInfo(false);
      }
    };

    // Đóng SearchPanel khi click ra ngoài
    const handleClickOutsideSearchPanel = (e) => {
      const isChatInfoButton = e.target.closest("[data-chatinfor-button]");
      if (
        searchPanelRef.current &&
        !searchPanelRef.current.contains(e.target) &&
        !isChatInfoButton
      ) {
        toggleSearchPanel(false);
      }
    };

    const mediaQuery = window.matchMedia("(min-width: 1280px)");

    const updateClickOutsideChatInfo = () => {
      // Hàm thêm sự kiện click ngoài nếu modalRef hiện tại là absolute
      if (
        isChatInfoOpen &&
        modalRef.current &&
        window.getComputedStyle(modalRef.current).position === "absolute"
      ) {
        document.addEventListener("mousedown", handleClickOutsideChatInfo);
      } else {
        document.removeEventListener("mousedown", handleClickOutsideChatInfo);
      }
    };

    const updateClickOutsideSearchPanel = () => {
      if (
        isSearchOpen &&
        searchPanelRef.current &&
        window.getComputedStyle(searchPanelRef.current).position === "absolute"
      ) {
        document.addEventListener("mousedown", handleClickOutsideSearchPanel);
      } else {
        document.removeEventListener(
          "mousedown",
          handleClickOutsideSearchPanel
        );
      }
    };

    // Đóng các panel khi kích thước màn hình nhỏ hơn 1280px
    const handleMediaChange = (e) => {
      if (!e.matches) {
        if (isChatInfoOpen) toggleChatInfo(false);
        if (isSearchOpen) toggleSearchPanel(false);
      }
    };

    // Cập nhật sự kiện click ngoài và theo dõi thay đổi kích thước màn hình
    updateClickOutsideChatInfo();
    updateClickOutsideSearchPanel();
    mediaQuery.addEventListener("change", handleMediaChange);

    // Dọn dẹp sự kiện khi component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideChatInfo);
      document.removeEventListener("mousedown", handleClickOutsideSearchPanel);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, [isChatInfoOpen, toggleChatInfo, isSearchOpen, toggleSearchPanel]);

  useEffect(() => {
    // Debug vị trí và trạng thái của các panel
    if (modalRef.current) {
      console.log(
        "modalRef position:",
        window.getComputedStyle(modalRef.current).position
      );
    }
    if (searchPanelRef.current) {
      console.log(
        "searchPanelRef position:",
        window.getComputedStyle(searchPanelRef.current).position
      );
    }
  }, [isChatInfoOpen, isSearchOpen]);

  return (
    <div className="flex gap-4 h-[calc(100vh-98px)] w-full">
      {/* Danh sách các cuộc trò chuyện */}
      <ChatList
        chats={chats}
        activeChat={activeChat}
        onSelectChat={(chatId, chat) => onSelectChat(chatId, chat)}
        contacts={contacts}
        currentUser={currentUser}
      />
      <div className="flex transition-all duration-300 gap-4 w-full h-full relative">
        {/* Hiển thị chi tiết cuộc trò chuyện nếu có */}
        {activeChat ? (
          <div className="transition-all duration-300 flex-1 h-full">
            <ChatDetail
              chat={activeChat}
              onSendMessage={onSendMessage}
              currentUser={currentUser}
              onUpdateChat={onUpdateChat}
            />
          </div>
        ) : (
          <div className="w-full h-full bg-white flex items-center justify-center">
            <p className="text-gray-500 text-lg">
              Hãy chọn một cuộc trò chuyện để bắt đầu
            </p>
          </div>
        )}
        {/* Hiển thị ChatInformation panel nếu đang mở */}
        {isChatInfoOpen && (
          <div
            className="xl:relative absolute right-0 top-0 h-full"
            ref={modalRef}
          >
            <ChatInformation />
          </div>
        )}
        {/* Hiển thị SearchPanel nếu đang mở */}
        {isSearchOpen && (
          <div
            className="xl:relative absolute right-0 top-0 h-full"
            ref={searchPanelRef}
          >
            <SearchPanel />
          </div>
        )}
      </div>
    </div>
  );
};

// Bọc ChatViewContent với ChatProvider để cung cấp context
const ChatView = (props) => (
  <ChatProvider>
    <ChatViewContent {...props} />
  </ChatProvider>
);

export default ChatView;
