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
  const currentUser = {
    id: "1",
    name: "Sang Nguyễn",
    email: "sang.nguyen@owls.com",
    avatar: "/chats/avatar2.png",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chatsResponse = await fetch(
          ` ${process.env.NEXT_PUBLIC_API_URL}/chats`
        );
        const chatsData = await chatsResponse.json();
        setChats(chatsData);
        if (chatsData.length > 0) setActiveChat(chatsData[0]);

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

  const handleSendMessage = (content, attachments = []) => {
    if (!content.trim() && attachments.length === 0) return;
    if (!activeChat) return;

    const participantsIds = activeChat.participants
      .map((p) => p.id)
      .filter((id) => id !== currentUser.id);

    const readBy = activeChat.type === "group" ? participantsIds : [];

    const newMessage = {
      id: `${Date.now()}`,
      senderId: currentUser.id,
      content,
      timestamp: new Date().toISOString(),
      isRead: true,
      readBy: readBy,
      attachments,
    };

    const updatedChat = {
      ...activeChat,
      messages: [...activeChat.messages, newMessage],
      lastMessageTime: newMessage.timestamp,
    };

    const updatedChats = chats.map((chat) =>
      chat.id === activeChat.id ? updatedChat : chat
    );

    setChats(updatedChats);
    setActiveChat(updatedChat);
    updateChatOnServer(activeChat.id, updatedChat);
  };

  const updateChatOnServer = async (chatId, updatedChat) => {
    try {
      await fetch(` ${process.env.NEXT_PUBLIC_API_URL}/chats/${chatId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedChat),
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật dữ liệu:", error);
    }
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="flex max-w-[1440px]">
      <VerticalNavbar />
      <div className="flex flex-col">
        <Navbar />
        <div className="flex bg-[#F4F5F6] ">
          <div className="ml-4 mt-4">
            <ChatView
              chats={chats}
              activeChat={activeChat}
              onSelectChat={handleSelectChat}
              onSendMessage={handleSendMessage}
              currentUser={currentUser}
              contacts={contacts}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
