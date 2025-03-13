"use client";
import Navbar from "@/components/common/Navbar";
import VerticalNavbar from "@/components/common/VerticalNavbar";
import ChatView from "@/components/features/chats/ChatView";
import * as React from "react";

import { useState, useEffect } from "react";

const Chat = () => {
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch("http://localhost:4000/chats");
        const data = await response.json();
        setChats(data);
        if (data.length > 0) {
          setActiveChat(data[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const handleSelectChat = (chatId) => {
    const selected = chats.find((chat) => chat.id === chatId);
    if (selected) {
      // Mark messages as read when opening chat
      const updatedChats = chats.map((chat) => {
        if (chat.id === chatId) {
          const updatedMessages = chat.messages.map((msg) => ({
            ...msg,
            isRead: true,
          }));
          return { ...chat, messages: updatedMessages, unreadCount: 0 };
        }
        return chat;
      });

      setChats(updatedChats);
      setActiveChat(selected);

      // Cập nhật trạng thái đọc tin nhắn trên server
      updateChatOnServer(chatId, {
        ...selected,
        messages: selected.messages.map((msg) => ({ ...msg, isRead: true })),
        unreadCount: 0,
      });
    }
  };

  const handleSendMessage = (content, attachments = []) => {
    if (!content.trim() && attachments.length === 0) return;
    if (!activeChat) return;

    const newMessage = {
      id: Date.now(),
      senderId: 1, // Current user ID (Sang Nguyễn)
      content,
      timestamp: new Date().toISOString(),
      isRead: true,
      attachments,
    };

    const updatedChat = {
      ...activeChat,
      messages: [...activeChat.messages, newMessage],
      lastMessageTime: newMessage.timestamp,
    };

    const updatedChats = chats.map((chat) => {
      if (chat.id === activeChat.id) {
        return updatedChat;
      }
      return chat;
    });

    setChats(updatedChats);
    setActiveChat(updatedChat);

    // Cập nhật tin nhắn mới lên server
    updateChatOnServer(activeChat.id, updatedChat);
  };

  const updateChatOnServer = async (chatId, updatedChat) => {
    try {
      await fetch(`http://localhost:4000/chats/${chatId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedChat),
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật dữ liệu:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F4F5F6]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-lg font-semibold text-gray-700">
            Đang tải dữ liệu...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex max-w-[1440px]">
      <VerticalNavbar />
      <div className="flex flex-col">
        <Navbar />
        <div className="flex  bg-[#F4F5F6] min-h-screen">
          <div className=" ml-4 mt-4">
            <ChatView
              chats={chats}
              activeChat={activeChat}
              onSelectChat={handleSelectChat}
              onSendMessage={handleSendMessage}
              currentUser={{ id: 1, name: "Sang Nguyễn" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
