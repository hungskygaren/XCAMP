// app/email/[type]/page.js
"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import EmailList from "@/components/features/email/EmailList";
import EmailDetail from "@/components/features/email/EmailDetail";

export default function EmailView({ type }) {
  const searchParams = useSearchParams();
  const initialEmailId = searchParams.get("emailId");
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch("http://localhost:4000/emails");
        if (!response.ok) throw new Error("Không thể tải email");
        const allEmails = await response.json();
        console.log("All emails in EmailView:", allEmails);
        console.log("Type in EmailView:", type); // Log type

        // Thay thế đoạn code lọc cũ
        const filteredEmails = allEmails.filter(
          (email) => email.category === type
        );
        setEmails(filteredEmails);

        if (initialEmailId) {
          const email = filteredEmails.find(
            (e) => e.id === parseInt(initialEmailId, 10)
          );
          setSelectedEmail(email || null);
          if (email) {
            window.history.replaceState(null, "", `/email/${type}/${email.id}`);
          }
        }
      } catch (err) {
        console.error("Lỗi fetch emails:", err);
        setEmails([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEmails();
  }, [type, initialEmailId]);

  const handleEmailSelect = (email) => {
    setSelectedEmail(email);
    if (email) {
      window.history.pushState(null, "", `/email/${type}/${email.id}`);
    } else {
      window.history.pushState(null, "", `/email/${type}`);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.split("/");
      const currentEmailId = path[path.length - 1];
      if (currentEmailId && !isNaN(currentEmailId)) {
        const email = emails.find((e) => e.id === parseInt(currentEmailId, 10));
        setSelectedEmail(email || null);
      } else {
        setSelectedEmail(null);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [emails, type]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Đang tải dữ liệu...
      </div>
    );

  return (
    <div className="flex flex-row gap-4 h-screen">
      <div className="w-[400px] bg-white">
        <EmailList emails={emails} onEmailSelect={handleEmailSelect} />
      </div>
      <div className="flex-1">
        {selectedEmail ? (
          <EmailDetail email={selectedEmail} />
        ) : (
          <div className="flex items-center justify-center h-full">
            Chọn một email để xem chi tiết
          </div>
        )}
      </div>
    </div>
  );
}
