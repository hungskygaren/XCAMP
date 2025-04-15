"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerticalNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  // Danh sách menu với route tương ứng
  const navItems = [
    { name: "Trang chủ", icon: "/VerticalBar/home.png", route: "/" },
    { name: "Kênh", icon: "/VerticalBar/network.png", route: "/channels" },
    { name: "Tin nhắn", icon: "/VerticalBar/messeage.png", route: "/chats" },
    { name: "Email", icon: "/VerticalBar/envelope 1.png", route: "/email" },
    { name: "Cuộc họp", icon: "/VerticalBar/video.png", route: "/meetings" },
    { name: "Tài liệu", icon: "/VerticalBar/folder.png", route: "/documents" },
  ];

  const handleNavClick = (route) => {
    router.push(route);
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
            onClick={() => handleNavClick(item.route)}
            className={`rounded-[.5rem] hover:bg-[#feb7cd] cursor-pointer flex items-center justify-center ${
              pathname === item.route
                ? "bg-[#fce0e9] w-[3.5rem] h-[3.5rem]"
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
