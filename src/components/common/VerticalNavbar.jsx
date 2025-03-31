"use client"; // Thêm dòng này vì useRouter yêu cầu component là Client Component trong Next.js App Router.

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation"; // Import useRouter và usePathname để điều hướng và kiểm tra route.
import { useEffect, useState } from "react"; // Import useState và useEffect để quản lý trạng thái.

export default function VerticalNavbar() {
  const router = useRouter(); // Hook để điều hướng.
  const pathname = usePathname(); // Hook để lấy đường dẫn hiện tại.

  // Danh sách menu với route tương ứng
  const navItems = [
    { name: "Trang chủ", icon: "/VerticalBar/home.png", route: "/" },
    { name: "Kênh", icon: "/VerticalBar/network.png", route: "/channels" },
    { name: "Tin nhắn", icon: "/VerticalBar/messeage.png", route: "/chats" }, // Route cho chat
    { name: "Email", icon: "/VerticalBar/envelope 1.png", route: "/email" },
    { name: "Cuộc họp", icon: "/VerticalBar/video.png", route: "/meetings" },
    { name: "Tài liệu", icon: "/VerticalBar/folder.png", route: "/documents" },
  ];

  // Hàm xử lý khi click vào một mục
  const handleNavClick = (route) => {
    router.push(route); // Chuyển hướng đến route tương ứng.
  };

  return (
    <div className="w-[4.125rem] h-[500px] text-white flex flex-col items-center">
      {/* Logo */}
      <div className="">
        <Image src="/logosm.png" alt="Logo" width={66} height={66} />
      </div>

      {/* Danh sách menu */}
      <ul className="flex flex-col gap-[.3125rem] px-1 pt-[.625rem]">
        {navItems.map((item, index) => (
          <li
            key={index}
            onClick={() => handleNavClick(item.route)} // Gọi hàm điều hướng khi click.
            className={`rounded-[.5rem] hover:bg-[#feb7cd] cursor-pointer flex items-center justify-center ${
              pathname === item.route
                ? "bg-[#fce0e9] w-[3.5rem] h-[3.5rem]" // Đánh dấu active nếu route hiện tại khớp.
                : "w-[3.5rem] h-[3.5rem]"
            }`}
          >
            <div className="flex flex-col gap-[.25rem] items-center text-[#777E90] text-[.5625rem] font-semibold">
              <Image src={item.icon} alt={item.name} width={20} height={20} />
              <span>{item.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
