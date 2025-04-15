import React, { useEffect, useRef, useState } from "react";
import { useChat } from "../../../contexts/ChatContext";
import Image from "next/image";
import TextInput from "@/components/ui/inputs/TextInput";
// Mock data
const mockMessages = [
  {
    avatar: "/Chats/avatar1.png",
    name: "Nguyễn Tuấn Anh",
    date: "16/10/2024",
    content: "... wondered how some graphic design...",
  },
  {
    avatar: "/Chats/avatar1.png",
    name: "Nguyễn Tuấn Anh",
    date: "16/10/2024",
    content: "... wondered how some graphic design...",
  },
  {
    avatar: "/Chats/avatar1.png",
    name: "Nguyễn Tuấn Anh",
    date: "16/10/2024",
    content: "... wondered how some graphic design...",
  },
];

const mockFiles = [
  {
    icon: "/Chats/iconchatdetail/icondoc.png",
    name: "... how some graphic designers... .docx",
    size: "102 KB",
    date: "16/10/2024",
  },
  {
    icon: "/Chats/iconchatdetail/icondoc.png",
    name: "... how some graphic designers... .docx",
    size: "102 KB",
    date: "16/10/2024",
  },
  {
    icon: "/Chats/iconchatdetail/icondoc.png",
    name: "... how some graphic designers... .docx",
    size: "102 KB",
    date: "16/10/2024",
  },
];
const SearchPanel = () => {
  const [search, setSearch] = useState("");
  const { isSearchOpen, toggleSearchPanel } = useChat();
  return (
    <div className="w-[340px] h-full bg-white  rounded-[10px] transition-transform duration-300 transform translate-x-0">
      <div className="px-3.75 py-7 overflow-y-auto h-full">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold text-sm">
              Tìm kiếm trong cuộc trò chuyện
            </p>
            <Image
              src="/Chats/iconlist/close.png"
              width={24}
              height={24}
              alt="Close"
              className="cursor-pointer"
              onClick={() => toggleSearchPanel(!isSearchOpen)}
            />
          </div>
          <div className="mt-4 overflow-y-auto">
            <div className="relative w-full mb-4">
              <TextInput
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                rightIcon={
                  search.length === 0
                    ? "/Chats/iconlist/Search.png"
                    : "/Chats/iconlist/close-bg_gray.png"
                }
                rightIconClassName="w-4 h-4"
                onRightIconClick={() => search.length > 0 && setSearch("")}
                inputClassName="w-full pl-[15px] h-8 text-[.75rem] text-[#A8ABB8] font-semibold border border-gray-200 rounded-lg focus:outline-none placeholder:text-gray-500"
              />
            </div>

            <div className="flex flex-col">
              <p className="text-xs font-semibold mb-1">Tin nhắn</p>
              <div className="flex flex-col">
                {mockMessages.map((message, index) => (
                  <div
                    key={`message-${index}`}
                    className="flex py-3 border-b-1 border-[#E6E8EC] pl-[11px] items-center gap-2.5"
                  >
                    <Image
                      src={message.avatar}
                      width={30}
                      height={30}
                      alt={message.name}
                    />
                    <div className="flex flex-col w-full">
                      <div className="flex text-xs justify-between items-center">
                        <p className="text-[#978FB8] font-semibold">
                          {message.name}
                        </p>
                        <p className="text-[#777E90]">{message.date}</p>
                      </div>
                      <div className="text-xs">{message.content}</div>
                    </div>
                  </div>
                ))}
                <p className="text-[#4A30B1] text-xs font-semibold mt-[10px] text-center">
                  Hiển thị thêm
                </p>
              </div>
            </div>

            <div className="flex flex-col mt-3">
              <p className="text-xs font-semibold mb-1">File</p>
              <div className="flex flex-col ">
                {mockFiles.map((file, index) => (
                  <div
                    key={`file-${index}`}
                    className="flex py-3 border-b-1 border-[#E6E8EC] pl-[11px] items-center gap-2.5"
                  >
                    <Image
                      src={file.icon}
                      width={30}
                      height={30}
                      alt={file.name}
                    />
                    <div className="flex flex-col gap-[3px] w-full">
                      <div className="text-xs">{file.name}</div>
                      <div className="flex text-xs justify-between items-center">
                        <p className="text-[#777E90]">{file.size}</p>
                        <p className="text-[#777E90]">{file.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <p className="text-[#4A30B1] text-xs font-semibold mt-[10px] text-center">
                  Hiển thị thêm
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
