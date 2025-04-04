import Image from "next/image";
import React from "react";

export default function MediaAndLinks() {
  return (
    <>
      <div className="mt-4.5">
        <div className="bg-[#F4F5F6] flex justify-between items-center rounded-lg px-2.5 py-2 ">
          <p className="font-semibold text-xs">
            Hình ảnh, video, file và liên kết
          </p>
          <Image
            src="Chats/iconlist/Line.png"
            width={20}
            height={20}
            className="rotate-180"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <div className="  px-[9px] pl-[15px] flex items-center gap-2 ">
            <Image
              src="Chats/iconchatinfor/image.png"
              width={18}
              height={18}
              alt=""
            />
            <p className="text-xs pt-0.25">Ảnh/Video</p>
            <div />
          </div>
          <div className="  px-[9px] pl-[15px] flex items-center gap-2 ">
            <Image
              src="Chats/iconchatinfor/Form.png"
              width={18}
              height={18}
              alt=""
            />
            <p className="text-xs pt-0.25">File</p>
            <div />
          </div>
          <div className="  px-[9px] pl-[15px] flex items-center gap-2 ">
            <Image
              src="Chats/iconchatinfor/link_black.png"
              width={18}
              height={18}
              alt=""
            />
            <p className="text-xs pt-0.25">Liên kết</p>
            <div />
          </div>
        </div>
      </div>
    </>
  );
}
