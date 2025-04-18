"use client";
import Navbar from "@/components/common/Navbar";
import VerticalNavbar from "@/components/common/VerticalNavbar";
import ChatView from "@/components/features/chats/ChatView";
import * as React from "react";
import { useState, useEffect } from "react";

const Chat = () => {
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [isChatInfoOpen, setIsChatInfoOpen] = useState(false); // Thêm trạng thái mới
  const currentUser = {
    id: "1",
    name: "Sang Nguyễn",
    email: "sang.nguyen@owls.com",
    avatar: "/chats/avatar1.png",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chatsResponse = await fetch(
          ` ${process.env.NEXT_PUBLIC_API_URL}/chats`
        );
        const chatsData = await chatsResponse.json();
        setChats(chatsData);
        // Bỏ tự động mở chat đầu tiên

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

  const handleSelectChat = async (chatId, newChat = null) => {
    let selected = chats.find((chat) => chat.id === chatId);

    // Nếu là chat mới (không tìm thấy trong chats)
    if (!selected && newChat) {
      selected = newChat;
      setChats((prevChats) => [...prevChats, selected]);
      await saveChatToServer(selected);
    }

    if (selected) {
      // Cập nhật trạng thái "đã đọc" và "unreadCount"
      const updatedChats = chats.map((chat) => {
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
          const unreadCount = updatedMessages.filter(
            (msg) => !msg.isRead
          ).length;
          return { ...chat, messages: updatedMessages, unreadCount };
        }
        return chat;
      });

      if (!chats.some((chat) => chat.id === chatId)) {
        setChats([...updatedChats, selected]);
      } else {
        setChats(updatedChats);
      }
      setActiveChat(selected);
      if (!newChat) await updateChatOnServer(chatId, selected); // Chỉ cập nhật nếu không phải chat mới
    }
  };

  const saveChatToServer = async (chat) => {
    try {
      const response = await fetch(
        ` ${process.env.NEXT_PUBLIC_API_URL}/chats`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(chat),
        }
      );
      if (!response.ok) throw new Error("Lỗi khi lưu chat vào server");
    } catch (error) {
      console.error("Lỗi khi lưu chat:", error);
    }
  };

  const handleSendMessage = (messages) => {
    if (!messages || messages.length === 0) return;
    if (!activeChat) return;

    const participantsIds = activeChat.participants
      .map((p) => p.id)
      .filter((id) => id !== currentUser.id);

    const readBy = activeChat.type === "group" ? participantsIds : [];

    // Tạo danh sách tin nhắn mới
    const newMessages = messages.map((msg) => ({
      id: `${Date.now()}${Math.random().toString(36).substring(2)}`,
      senderId: currentUser.id,
      content: msg.content,
      timestamp: new Date().toISOString(),
      isRead: true,
      readBy: readBy,
      attachments: msg.attachments,
    }));

    // Cập nhật state với tất cả tin nhắn mới
    const updatedChat = {
      ...activeChat,
      messages: [...activeChat.messages, ...newMessages],
      lastMessageTime: newMessages[newMessages.length - 1].timestamp,
    };

    setChats((prevChats) =>
      prevChats.map((chat) => (chat.id === activeChat.id ? updatedChat : chat))
    );
    setActiveChat(updatedChat);

    // Gửi toàn bộ dữ liệu lên server một lần
    updateChatOnServer(activeChat.id, updatedChat);
  };
  const updateChatOnServer = async (chatId, updatedChat) => {
    try {
      await fetch(` ${process.env.NEXT_PUBLIC_API_URL}/chats/${chatId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedChat),
      });
      if (!response.ok) throw new Error("Lỗi khi cập nhật dữ liệu lên server");
    } catch (error) {
      console.error("Lỗi khi cập nhật dữ liệu:", error);
    }
  };

  // Hàm cập nhật chat (dùng cho gắn thẻ)
  const handleUpdateChat = (chatId, updates) => {
    const updatedChats = chats.map((chat) =>
      chat.id === chatId ? { ...chat, ...updates } : chat
    );
    setChats(updatedChats);
    if (activeChat && activeChat.id === chatId) {
      setActiveChat({ ...activeChat, ...updates });
    }

    fetch(` ${process.env.NEXT_PUBLIC_API_URL}/chats/${chatId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    }).catch((err) => console.error("Error updating chat:", err));
  };

  const toggleChatInfo = () => {
    console.log(isChatInfoOpen); // Thêm để debug
    setIsChatInfoOpen((prev) => !prev); // Toggle trạng thái
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
              chats={chats}
              activeChat={activeChat}
              onSelectChat={handleSelectChat}
              onSendMessage={handleSendMessage}
              currentUser={currentUser}
              contacts={contacts}
              isChatInfoOpen={isChatInfoOpen} // Truyền trạng thái
              toggleChatInfo={toggleChatInfo} // Truyền hàm toggle
              onUpdateChat={handleUpdateChat}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
