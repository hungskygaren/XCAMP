"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import React, { useState } from "react";
import TextInput from "@/components/ui/inputs/TextInput";
import CreateEmail from "@/components/features/email/CreateEmail"; // Import CreateEmail

export default function SidebarEmail({ categories }) {
  const pathname = usePathname();
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State cho modal
  const BASE_URL =
    "https://cdn.builder.io/api/v1/image/assets/eaf66ec7115845108341136eff88427a";

  // Component MenuItem (danh mục chính)
  const MenuItem = ({ item }) => {
    const route = item.route ? `/email/${item.route}` : "#";
    const isActive = pathname === route;

    return (
      <Link
        href={route}
        className={`flex items-center justify-between h-[2.75rem] gap-2.5 px-6 py-2.5 w-full rounded-lg transition-colors ${
          isActive ? "text-violet-800 bg-violet-100" : "text-neutral-900"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <img
            src={item.icon}
            alt={item.label}
            width={24}
            height={24}
            className="object-contain"
          />
          <span>{item.label}</span>
        </div>
        {item.count !== undefined && (
          <span className="rounded-full w-[2.625rem] h-6 flex items-center justify-center bg-[#F4F5F6] text-xs text-[#777E90]">
            {item.count}
          </span>
        )}
      </Link>
    );
  };

  // Component TagItem (tags phụ) - Bỏ Link, chỉ là giao diện
  const TagItem = ({ tag }) => {
    return (
      <div className="flex items-center gap-2.5 pl-11 py-2.5 w-full rounded-lg hover:bg-gray-50 transition-colors text-neutral-900">
        <img
          src={tag.icon}
          alt={tag.label}
          width={24}
          height={24}
          className="object-contain"
        />
        <span>{tag.label}</span>
      </div>
    );
  };

  // Hàm mở modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Hàm đóng modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col py-3 w-[250px] bg-white text-xs font-medium">
      {/* Thanh tìm kiếm */}
      <div className="mb-4 flex justify-center items-center gap-2 px-[.9375rem]">
        <div className="w-[11.75rem] h-[2rem]">
          <TextInput
            placeholder="Tìm kiếm"
            rightIcon="/sidebaremail/search.png"
            onRightIconClick={() => console.log("Search")}
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            iconSize="w-[.9375rem] h-[.9375rem]"
            className="bg-white text-black border flex h-[2rem] border-[#E6E8EC] w-full rounded-lg"
            type="text"
          />
        </div>
        <img
          src="/sidebaremail/filter.png"
          alt="Filter"
          width={24}
          height={24}
          className="object-contain"
        />
      </div>

      {/* Nút Soạn email */}
      <div
        className="flex justify-center gap-[.5625rem] rounded-[.5rem] text-white items-center mx-[.9375rem] bg-[#4A30B1] h-[2.75rem] cursor-pointer"
        onClick={handleOpenModal} // Thêm sự kiện nhấp để mở modal
      >
        <img
          src="/sidebaremail/add.png"
          alt="Add"
          width={10}
          height={10}
          className="object-contain"
        />
        <p className="text-[.75rem] font-semibold">Soạn email</p>
      </div>

      {/* Danh sách danh mục */}
      <section className="w-full flex flex-col gap-[.3125rem] px-[.9375rem] mt-4">
        {categories.map((item) => (
          <div key={item.id}>
            {item.label !== "Gắn thẻ" ? (
              <MenuItem item={item} />
            ) : (
              <div>
                <Link
                  href="/email/tags"
                  className={`flex items-center justify-between h-[2.75rem] gap-2.5 px-6 py-2.5 w-full rounded-lg transition-colors ${
                    pathname === "/email/tags"
                      ? "text-violet-800 bg-violet-100"
                      : "text-neutral-900"
                  }`}
                >
                  <div
                    className="flex items-center gap-2.5"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsTagsOpen(!isTagsOpen);
                    }}
                  >
                    <img
                      src={`${BASE_URL}/3a8de9ce79222a6be5e5b66e1aa8f72a123a52db92808f5d333420263177870c`}
                      alt="Arrow"
                      width={9}
                      height={9}
                      className="transition-transform duration-200"
                      style={{
                        transform: isTagsOpen
                          ? "rotate(270deg)"
                          : "rotate(0deg)",
                      }}
                    />
                    <Image
                      src={item.icon}
                      alt="Tag icon"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                    <span>{item.label}</span>
                  </div>
                </Link>

                {isTagsOpen && (
                  <div className="flex flex-col">
                    {item.tags.map((tag) => (
                      <TagItem key={tag.id} tag={tag} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Modal CreateEmail */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6  w-[900px] relative">
            <div className="flex flex-wrap gap-5 p-7 justify-between text-xl font-semibold text-neutral-900 max-md:max-w-full">
              <h1>Soạn email</h1>
              <button onClick={handleCloseModal} aria-label="Đóng">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/eaf66ec7115845108341136eff88427a/511c8bc5a704eab29808b952b551228e92ee64a962bb23365d91b5367b6338eb?placeholderIfAbsent=true"
                  alt="Đóng"
                  className="object-contain shrink-0 w-6 aspect-square"
                />
              </button>
            </div>

            <CreateEmail />
          </div>
        </div>
      )}
    </div>
  );
}
