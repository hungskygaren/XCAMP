"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import VerticalNavbar from "@/components/common/VerticalNavbar";
import SidebarEmail from "@/components/features/email/SidebarEmail";

export default function EmailLayout({ children }) {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/actions")
      .then((res) => res.json())
      .then(setActions)
      .catch((err) => console.error("Lỗi fetch actions:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F4F5F6]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-lg font-semibold text-gray-700">
            Đang tải dữ liệu...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <VerticalNavbar />
      <div className="flex-1">
        <Navbar />
        <div className="flex pt-4 bg-[#F4F5F6] min-h-screen">
          <div className="w-[250px] ml-4">
            <SidebarEmail categories={actions} />
          </div>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
