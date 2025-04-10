// src/components/features/chats/components/ChatInformation/ChatInformation.js
import React, { useState } from "react";
import ChatInfoHeader from "./components/ChatInformation/ChatInfoHeader";
import GroupMembers from "./components/ChatInformation/GroupMembers";
import PinnedMessages from "./components/ChatInformation/PinnedMessages";
import PinnedMessagesDetail from "./components/ChatInformation/PinnedMessagesDetail";
import MediaAndLinks from "./components/ChatInformation/MediaAndLinks";
import ChatActions from "./components/ChatInformation/ChatActions";
import GroupMemberDetail from "./components/ChatInformation/GroupMemberDetail";
import { useChat } from "../../../contexts/ChatContext"; // Điều chỉnh đường dẫn

export default function ChatInformation() {
  const { initialView, toggleChatInfo } = useChat();
  const [isDetailView, setIsDetailView] = useState(initialView || null);

  // Dữ liệu tĩnh cho members
  const members = [
    {
      id: "1",
      name: "Nguyễn Tuấn Anh",
      avatar: "/Chats/avatar1.png",
      role: "Quản trị viên",
      isOnline: true,
    },
    {
      id: "2",
      name: "Đào Phương Uyên",
      avatar: "/Chats/avatar2.png",
      role: "Thành viên",
      isOnline: false,
    },
    {
      id: "3",
      name: "Jack Nguyen",
      avatar: "/Chats/avatar3.png",
      role: "Thành viên",
      isOnline: true,
    },
    {
      id: "4",
      name: "Lưu Thị Dung",
      avatar: "/Chats/avatar4.png",
      role: "Thành viên",
      isOnline: false,
    },
  ];

  // Dữ liệu tĩnh cho pinned messages
  const pinnedMessages = [
    {
      id: "1",
      sender: "Nguyễn Tuấn Anh",
      avatar: "/Chats/avatar1.png",
      content:
        "Ever wondered how some graphic designers always manage to produce",
      pinnedBy: "Nguyễn Tuấn Anh",
      timestamp: "2023-10-15T10:00:00Z",
    },
    {
      id: "2",
      sender: "Nguyễn Tuấn Anh",
      avatar: "/Chats/avatar1.png",
      content: "Mô tả nội dung.docx",
      attachments: [{ type: "document", name: "Mô tả nội dung.docx" }],
      pinnedBy: "Nguyễn Tuấn Anh",
      timestamp: "2023-10-15T12:00:00Z",
    },
    {
      id: "3",
      sender: "Đào Phương Uyên",
      avatar: "/Chats/avatar2.png",
      content: "Meeting notes for today",
      pinnedBy: "Jack Nguyen",
      timestamp: "2023-10-16T09:00:00Z",
    },
    {
      id: "4",
      sender: "Jack Nguyen",
      avatar: "/Chats/avatar3.png",
      content: "Project timeline.pdf",
      attachments: [{ type: "document", name: "Project timeline.pdf" }],
      pinnedBy: "Nguyễn Tuấn Anh",
      timestamp: "2023-10-16T14:00:00Z",
    },
  ];

  return (
    <div className="w-[340px] h-full flex flex-col bg-white rounded-[10px] transition-transform duration-300 transform translate-x-0">
      <div className="px-4 py-7 overflow-y-auto h-full">
        {isDetailView === "members" ? (
          <GroupMemberDetail
            members={members}
            onBack={() => setIsDetailView(null)}
          />
        ) : isDetailView === "pinned" ? (
          <PinnedMessagesDetail
            pinnedMessages={pinnedMessages}
            onBack={() => setIsDetailView(null)}
          />
        ) : (
          <>
            <ChatInfoHeader />
            <GroupMembers
              members={members}
              onShowDetail={() => setIsDetailView("members")}
            />
            <PinnedMessages onShowDetail={() => setIsDetailView("pinned")} />
            <MediaAndLinks />
            <ChatActions />
          </>
        )}
      </div>
    </div>
  );
}
