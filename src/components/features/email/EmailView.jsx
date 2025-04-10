"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation"; // Thêm usePathname
import EmailList from "@/components/features/email/EmailList";
import EmailDetail from "@/components/features/email/EmailDetail";

export default function EmailView({ type }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname(); // Lấy đường dẫn hiện tại
  const initialEmailId = searchParams.get("emailId");
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch email và xử lý initialEmailId
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch("http://localhost:4000/emails");
        if (!response.ok) throw new Error("Không thể tải email");
        const allEmails = await response.json();
        console.log("All emails in EmailView:", allEmails);
        console.log("Type in EmailView:", type);

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
            router.replace(`/email/${type}/${email.id}`); // Cập nhật URL
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
  }, [type, initialEmailId, router]);

  // Đồng bộ selectedEmail với pathname
  useEffect(() => {
    const pathParts = pathname.split("/");
    const currentEmailId = pathParts[pathParts.length - 1];

    if (currentEmailId && !isNaN(currentEmailId)) {
      const email = emails.find((e) => e.id === parseInt(currentEmailId, 10));
      setSelectedEmail(email || null);
    } else {
      setSelectedEmail(null);
    }
  }, [pathname, emails, type]);

  // Xử lý khi chọn email
  const handleEmailSelect = (email) => {
    setSelectedEmail(email);
    if (email) {
      router.push(`/email/${type}/${email.id}`); // Thêm vào lịch sử
    } else {
      router.push(`/email/${type}`); // Về danh sách
    }
  };

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
