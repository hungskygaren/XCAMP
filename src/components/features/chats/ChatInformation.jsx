import React from "react";
import ChatInfoHeader from "./components/ChatInformation/ChatInfoHeader";
import GroupMembers from "./components/ChatInformation/GroupMembers";
import PinnedMessages from "./components/ChatInformation/PinnedMessages";
import MediaAndLinks from "./components/ChatInformation/MediaAndLinks";
import ChatActions from "./components/ChatInformation/ChatActions";

export default function ChatInformation() {
  return (
    <div className="w-[340px]  h-[calc(100vh-100px)] flex flex-col bg-white rounded-[10px] transition-transform duration-300 transform translate-x-0">
      <div className="px-4 py-7 overflow-y-auto h-full">
        <ChatInfoHeader />
        <GroupMembers />
        <PinnedMessages />
        <MediaAndLinks />
        <ChatActions />
      </div>
    </div>
  );
}
