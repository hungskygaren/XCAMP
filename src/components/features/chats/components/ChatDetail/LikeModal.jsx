// src/components/features/chats/components/ChatDetail/LikeModal.js
import Image from "next/image";
import React, { useRef, useEffect } from "react";

const LikeModal = ({ onClose }) => {
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
        className="w-[400px] h-[400px] bg-white  rounded-lg pl-[25px] pt-[21px] pr-[21px] pb-[29px] flex flex-col gap-5 "
      >
        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold">Cảm xúc về tin nhắn</p>
          <Image
            src="Chats/iconlist/close.png"
            width={24}
            height={24}
            alt="Close"
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="flex flex-col gap-4 ">
          <div className="flex justify-between items-center">
            <div className="flex gap-[15px] items-center ">
              <Image src="Chats/avatar1.png" width={30} height={30} alt="" />
              <p className="text-sm font-semibold text-[#777E90]">
                Nguyễn Tuấn Anh
              </p>
            </div>
            <Image
              src="Chats/iconchatdetail/like_red.png"
              width={24}
              height={24}
              alt=""
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-[15px] items-center ">
              <Image src="Chats/avatar1.png" width={30} height={30} alt="" />
              <p className="text-sm font-semibold text-[#777E90]">
                Nguyễn Tuấn Anh
              </p>
            </div>
            <Image
              src="Chats/iconchatdetail/like_red.png"
              width={24}
              height={24}
              alt=""
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-[15px] items-center ">
              <Image src="Chats/avatar1.png" width={30} height={30} alt="" />
              <p className="text-sm font-semibold text-[#777E90]">
                Nguyễn Tuấn Anh
              </p>
            </div>
            <Image
              src="Chats/iconchatdetail/like_red.png"
              width={24}
              height={24}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikeModal;
