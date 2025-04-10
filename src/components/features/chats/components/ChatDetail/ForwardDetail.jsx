// src/components/features/chats/components/ChatDetail/ForwardDetail.js
import Image from "next/image";
import React, { useRef, useEffect } from "react";
import Button from "@/components/ui/buttons/Button";
import TextInput from "@/components/ui/inputs/TextInput";

const ForwardDetail = ({ onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg w-[570px] pt-[14px] px-[15px] pb-[16px]"
      >
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold">Chuyển tiếp</div>
          <span onClick={onClose} className="cursor-pointer">
            <Image
              width={24}
              height={24}
              className="w-6 h-6"
              src="/Chats/iconlist/close.png"
              alt=""
            />
          </span>
        </div>
        <div className="w-full h-0 border-1 border-[#E6E8EC] mt-[14px] mb-[16px]"></div>
        <div className="flex gap-[18px]">
          <div className="w-[280px]">
            <div className="relative">
              <TextInput
                type="text"
                placeholder="Tìm kiếm"
                value="Tìm kiếm "
                inputClassName="w-full pl-[15px] h-8 text-[.75rem] text-[#A8ABB8] font-semibold border border-gray-200 rounded-lg focus:outline-none placeholder:text-gray-500"
                rightIcon="/Chats/iconlist/Search.png"
                rightIconClassName="w-4 h-4"
              />
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto h-[472px] scrollbar-custom mt-4">
              <div className="flex w-[260px] flex-col gap-[10px]">
                <div className="text-xs text-[#777E90] font-semibold">
                  Trò chuyện gần đây
                </div>
                <div className="flex items-center border-b-1 border-[#E6E8EC] justify-between pb-4">
                  <div className="flex gap-[11px] items-center">
                    <Image
                      width={30}
                      height={30}
                      src="/Chats/avatar1.png"
                      className="w-[30px] h-[30px]"
                      alt=""
                    />
                    <div>
                      <p className="text-xs">Nguyễn Tuấn Anh</p>
                      <p className="text-[#777E90] text-xs">
                        tuananh@example.com
                      </p>
                    </div>
                  </div>
                  <span className="w-[18px] h-[18px] rounded-sm flex items-center justify-center border-1 border-gray-300 bg-white"></span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[245px] h-[530px] bg-[#F4F5F6] flex flex-col gap-[14px] px-4 py-3 rounded-[10px]">
            <p className="text-xs text-[#777E90] font-semibold">Đã chọn (1)</p>
            <div className="flex flex-col gap-[10px]">
              <div className="flex gap-2 items-center pr-[8px] pl-[6px] py-[6px] rounded-lg bg-white w-fit">
                <Image
                  width={22}
                  height={22}
                  src="/Chats/avatar1.png"
                  className="w-[22px] h-[22px]"
                  alt=""
                />
                <p className="text-xs">Nguyễn Tuấn Anh</p>
                <Image
                  width={18}
                  height={18}
                  src="/Chats/iconlist/close-bg_gray.png"
                  className="w-[18px] h-[18px]"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <TextInput
            type="text"
            placeholder="Nhập nội dung tin nhắn"
            value=""
            inputClassName="w-full pl-[15px] h-8 text-[.75rem] text-[#A8ABB8] font-semibold border border-gray-200 rounded-lg focus:outline-none placeholder:text-gray-500"
          />
        </div>
        <div className="flex justify-between">
          <Button
            className="px-[30px] py-[10px] bg-[#F4F5F6] text-[#777E90] text-sm rounded-[10px] cursor-pointer"
            onClick={onClose}
            children="Đóng"
          />
          <Button
            className="px-[38.5px] py-[10px] bg-[#4A30B1] text-white text-sm rounded-[10px] cursor-pointer"
            children="Chuyển tiếp"
          />
        </div>
      </div>
    </div>
  );
};

export default ForwardDetail;
