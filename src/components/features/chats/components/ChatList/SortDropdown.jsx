import React from "react";

const SortDropdown = ({ isSortOpen, setIsSortOpen }) => (
  <div className="relative items-center flex justify-between">
    <button
      className="flex items-center gap-0.5 my-[14px] text-sm font-semibold text-gray-900"
      onClick={() => setIsSortOpen(!isSortOpen)}
    >
      <img
        src="/chats/iconlist/tag.png"
        alt="Sort"
        className="w-[1.125rem] mt-[1px] h-[1.125rem]"
      />
      <p className="text-xs pl-1.5 mt-0.5 font-semibold">Phân loại</p>
      {isSortOpen ? (
        <img
          src="/chats/iconlist/line.png"
          alt="Sort"
          className="w-5 h-5 rotate-90"
        />
      ) : (
        <img src="/chats/iconlist/line.png" alt="Sort" className="w-5 h-5" />
      )}
    </button>
    {isSortOpen && (
      <div className="absolute top-8 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10">
        <button
          className="block w-full text-left px-2 py-1 hover:bg-gray-100"
          onClick={() => setIsSortOpen(false)}
        >
          Theo thời gian
        </button>
        <button
          className="block w-full text-left px-2 py-1 hover:bg-gray-100"
          onClick={() => setIsSortOpen(false)}
        >
          Theo tên
        </button>
      </div>
    )}
  </div>
);

export default SortDropdown;
