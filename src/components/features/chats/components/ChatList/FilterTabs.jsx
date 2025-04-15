import React from "react";

const FilterTabs = ({ filter, setFilter }) => (
  <div className="relative w-full h-8 bg-gray-100 rounded-lg flex mt-4">
    <div
      className={`absolute h-full w-1/2 bg-[#EE316B] rounded-lg transition-all duration-300 ${
        filter === "unread" ? "translate-x-full" : "translate-x-0"
      }`}
    />
    <button
      className={`relative text-xs font-semibold w-1/2 text-center z-10 ${
        filter === "all" ? "text-white" : "text-[#777E90]"
      }`}
      onClick={() => setFilter("all")}
    >
      Tất cả tin nhắn
    </button>
    <button
      className={`relative text-xs font-semibold w-1/2 text-center z-10 ${
        filter === "unread" ? "text-white" : "text-[#777E90]"
      }`}
      onClick={() => setFilter("unread")}
    >
      Chưa đọc
    </button>
  </div>
);

export default FilterTabs;
