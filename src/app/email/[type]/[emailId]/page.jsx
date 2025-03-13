// app/email/[type]/[emailId]/page.js
"use client";
import { useState, useEffect } from "react";
import EmailList from "@/components/features/email/EmailList";
import EmailDetail from "@/components/features/email/EmailDetail";

export default function EmailDetailPage({ params }) {
  const { type, emailId } = params;
  console.log("Type in EmailDetailPage:", type, "EmailId:", emailId); // Log params
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listRes = await fetch("http://localhost:4000/emails");
        if (!listRes.ok) throw new Error("Không thể tải danh sách email");
        const allEmails = await listRes.json();

        let filteredEmails = [];
        if (type === "tags") {
          filteredEmails = allEmails.filter((email) => email.tagIds.length > 0);
        } else if (type.startsWith("tags/")) {
          const tagName = type.split("/")[1];
          filteredEmails = allEmails.filter((email) =>
            email.tagIds.includes(tagName)
          );
        } else {
          filteredEmails = allEmails.filter((email) => email.category === type);
        }
        setEmails(filteredEmails);

        if (emailId) {
          const res = await fetch(`http://localhost:4000/emails/${emailId}`);
          if (!res.ok) throw new Error("Không tìm thấy email");
          const data = await res.json();

          if (type === "tags") {
            if (!data.tagIds || data.tagIds.length === 0) {
              throw new Error("Email không có tag nào");
            }
          } else if (type.startsWith("tags/")) {
            const tagName = type.split("/")[1];
            if (!data.tagIds || !data.tagIds.includes(tagName)) {
              throw new Error("Email không thuộc tag này");
            }
          } else {
            if (data.category !== type) {
              throw new Error("Email không thuộc danh mục này");
            }
          }
          setSelectedEmail(data);
        }
      } catch (err) {
        console.error("Error:", err);
        setSelectedEmail(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type, emailId]);

  const handleEmailSelect = (selectedEmail) => {
    if (selectedEmail) {
      window.history.pushState(null, "", `/email/${type}/${selectedEmail.id}`);
      setSelectedEmail(selectedEmail);
    } else {
      window.history.pushState(null, "", `/email/${type}`);
      setSelectedEmail(null);
    }
  };

  if (loading) return <div>Đang tải...</div>;

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
