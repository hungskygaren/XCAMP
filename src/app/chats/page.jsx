"use client";
import Navbar from "@/components/common/Navbar";
import VerticalNavbar from "@/components/common/VerticalNavbar";
import ChatView from "@/components/features/chats/ChatView";
import * as React from "react";
import { useState, useEffect } from "react";

/**
 * Component chính của trang Chat.
 * Quản lý trạng thái chung của ứng dụng chat bao gồm danh sách chats, contacts, chat đang hoạt động,
 * trạng thái loading, và thông tin người dùng hiện tại.
 * Xử lý logic fetch dữ liệu ban đầu, chọn chat, gửi tin nhắn, và cập nhật thông tin chat.
 */
const Chat = () => {
  const [loading, setLoading] = useState(true);

  const [chats, setChats] = useState([]);

  const [contacts, setContacts] = useState([]);

  const [activeChat, setActiveChat] = useState(null);

  const [isChatInfoOpen, setIsChatInfoOpen] = useState(false);

  // Thông tin giả lập của người dùng đang đăng nhập
  const currentUser = {
    id: "1",
    name: "Sang Nguyễn",
    email: "sang.nguyen@owls.com",
    avatar: "/chats/avatar1.png",
  };

  /**
   * Fetch dữ liệu chats và contacts ban đầu khi component mount.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const chatsResponse = await fetch(
          ` ${process.env.NEXT_PUBLIC_API_URL}/chats`
        );
        const chatsData = await chatsResponse.json();
        setChats(chatsData);

        const contactsResponse = await fetch(
          ` ${process.env.NEXT_PUBLIC_API_URL}/contacts`
        );
        const contactsData = await contactsResponse.json();
        setContacts(contactsData);

        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  /**
   * Xử lý sự kiện khi người dùng chọn một cuộc trò chuyện từ danh sách.
   * Tìm chat được chọn, đánh dấu các tin nhắn chưa đọc (của người khác) là đã đọc,
   * cập nhật trạng thái `chats` và `activeChat`.
   * Nếu là chat mới (newChat), lưu chat mới lên server trước.
   * Cập nhật trạng thái đã đọc của chat lên server.
   * @param {string} chatId - ID của cuộc trò chuyện được chọn.
   * @param {object | null} newChat - Đối tượng chat mới nếu đây là lần đầu mở chat với người này (từ search).
   */
  const handleSelectChat = async (chatId, newChat = null) => {
    let selected = chats.find((chat) => chat.id === chatId);

    let updatedChats = [...chats];

    // Xử lý trường hợp tạo chat mới từ kết quả search
    if (!selected && newChat) {
      selected = newChat;
      updatedChats = [...updatedChats, selected];
      await saveChatToServer(selected);
      console.log("New chat saved to server:", selected);
    }

    if (selected) {
      // Cập nhật danh sách chats: tìm đến chat được chọn và xử lý tin nhắn
      updatedChats = updatedChats.map((chat) => {
        if (chat.id === chatId) {
          const updatedMessages = chat.messages.map((msg) => {
            if (!msg.isRead && msg.senderId !== currentUser.id) {
              return {
                ...msg,
                isRead: true,
                readBy: [...(msg.readBy || []), currentUser.id],
              };
            }

            return msg;
          });
          // Tính lại số tin nhắn chưa đọc
          const unreadCount = updatedMessages.filter(
            (msg) => !msg.isRead && msg.senderId !== currentUser.id // Chính xác hơn là lọc tin nhắn của người khác chưa đọc
          ).length;

          return { ...chat, messages: updatedMessages, unreadCount };
        }

        return chat;
      });

      const updatedSelected = updatedChats.find((chat) => chat.id === chatId);
      console.log("Updated chat before sending to server:", updatedSelected);

      setChats(updatedChats);

      setActiveChat(updatedSelected);
      // Nếu không phải là tạo chat mới, gọi API để cập nhật trạng thái (đã đọc) lên server
      if (!newChat) await updateChatOnServer(chatId, updatedSelected);
    }
  };

  /**
   * Lưu một cuộc trò chuyện mới lên server.
   * @param {object} chat - Đối tượng chat cần lưu.
   */
  const saveChatToServer = async (chat) => {
    try {
      const response = await fetch(
        ` ${process.env.NEXT_PUBLIC_API_URL}/chats`,
        {
          method: "POST", // Sử dụng POST để tạo mới
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(chat),
        }
      );
      if (!response.ok) throw new Error("Lỗi khi lưu chat vào server");
    } catch (error) {
      console.error("Lỗi khi lưu chat:", error);
    }
  };

  /**
   * Xử lý sự kiện khi người dùng gửi tin nhắn mới.
   * Tạo đối tượng tin nhắn mới, cập nhật vào state `activeChat` và `chats`.
   * Gọi API để cập nhật toàn bộ cuộc trò chuyện lên server.
   * @param {Array<object>} messages - Mảng các đối tượng tin nhắn cần gửi (thường chỉ có 1, nhưng thiết kế cho phép gửi nhiều).
   *                                   Mỗi object chứa { content: string, attachments: Array<object> }.
   */
  const handleSendMessage = (messages) => {
    if (!messages || messages.length === 0) return;
    if (!activeChat) return;

    const participantsIds = activeChat.participants
      .map((p) => p.id)
      .filter((id) => id !== currentUser.id);

    const readBy = activeChat.type === "group" ? participantsIds : [];

    const newMessages = messages.map((msg) => ({
      id: `${Date.now()}${Math.random().toString(36).substring(2)}`, // Tạo ID tạm thời ở client
      senderId: currentUser.id,
      content: msg.content,
      timestamp: new Date().toISOString(),
      isRead: true,
      readBy: readBy,
      attachments: msg.attachments,
    }));

    const updatedChat = {
      ...activeChat,
      messages: [...activeChat.messages, ...newMessages],
      lastMessageTime: newMessages[newMessages.length - 1].timestamp,
    };

    setChats((prevChats) =>
      prevChats.map((chat) => (chat.id === activeChat.id ? updatedChat : chat))
    );

    setActiveChat(updatedChat);

    updateChatOnServer(activeChat.id, updatedChat);
  };

  /**
   * Cập nhật toàn bộ dữ liệu của một cuộc trò chuyện lên server bằng phương thức PUT.
   * Lưu ý: Phương thức PUT sẽ ghi đè toàn bộ tài nguyên. Cân nhắc dùng PATCH nếu chỉ cập nhật một phần.
   * @param {string} chatId - ID của chat cần cập nhật.
   * @param {object} updatedChat - Object chat đầy đủ với dữ liệu mới.
   */
  const updateChatOnServer = async (chatId, updatedChat) => {
    try {
      const response = await fetch(
        ` ${process.env.NEXT_PUBLIC_API_URL}/chats/${chatId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedChat),
        }
      );

      if (!response.ok) throw new Error("Lỗi khi cập nhật dữ liệu lên server");
    } catch (error) {
      console.error("Lỗi khi cập nhật dữ liệu:", error);
    }
  };

  /**
   * Cập nhật một phần thông tin của cuộc trò chuyện (ví dụ: gắn thẻ, ghim, cờ...).
   * Sử dụng phương thức PATCH để chỉ gửi những trường cần thay đổi lên server.
   * @param {string} chatId - ID của chat cần cập nhật.
   * @param {object} updates - Object chứa các trường cần cập nhật (ví dụ: { tag: 'newTagId', isPinned: true }).
   */
  const handleUpdateChat = (chatId, updates) => {
    // Cập nhật state `chats` ở client
    const updatedChats = chats.map((chat) =>
      chat.id === chatId ? { ...chat, ...updates } : chat
    );
    setChats(updatedChats);

    // Nếu chat đang được cập nhật là activeChat, cập nhật luôn state activeChat
    if (activeChat && activeChat.id === chatId) {
      setActiveChat({ ...activeChat, ...updates });
    }

    fetch(` ${process.env.NEXT_PUBLIC_API_URL}/chats/${chatId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    }).catch((err) => console.error("Error updating chat:", err));
  };

  /**
   * Hàm để bật/tắt trạng thái hiển thị của panel thông tin chi tiết chat (ChatInformation).
   * Được truyền xuống ChatView -> ChatDetail -> ChatHeader.
   */
  const toggleChatInfo = () => {
    console.log(isChatInfoOpen);
    setIsChatInfoOpen((prev) => !prev);
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#F4F5F6]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-lg font-medium text-gray-700">
            Đang tải dữ liệu...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex ">
      <VerticalNavbar />
      <div className="flex flex-col w-full">
        <Navbar />

        <div className="flex bg-[#F4F5F6] p-4 w-full ">
          <div className="w-full">
            <ChatView
              chats={chats} // Truyền danh sách chats
              activeChat={activeChat} // Truyền chat đang active
              onSelectChat={handleSelectChat} // Truyền hàm xử lý chọn chat
              onSendMessage={handleSendMessage} // Truyền hàm xử lý gửi tin nhắn
              currentUser={currentUser} // Truyền thông tin người dùng hiện tại
              contacts={contacts} // Truyền danh sách contacts
              isChatInfoOpen={isChatInfoOpen} // Truyền trạng thái mở/đóng panel info
              toggleChatInfo={toggleChatInfo} // Truyền hàm toggle panel info
              onUpdateChat={handleUpdateChat} // Truyền hàm cập nhật chat (cho tag, pin...)
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
