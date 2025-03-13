"use client";
import React from "react";
import Image from "next/image";
import EmailDetail from "./EmailDetail";

const EmailCard = ({
  email,
  isChecked,
  isSelected,
  isViewingDetail,
  onSelect,
  onCheckboxToggle,
}) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours()}h${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}, ${date.toLocaleDateString("vi-VN")}`;
  };

  const handleCheckboxClick = (e) => {
    e.stopPropagation();
    onCheckboxToggle(email);
  };

  return (
    <div
      className={`px-4 py-3 w-full border-[1px] border-[#E6E8EC] rounded-lg cursor-pointer hover:bg-gray-200 transition-colors ${
        isSelected
          ? "bg-[#E8E3FF] text-violet-800"
          : email.isUnread
          ? "bg-gray-50 font-semibold"
          : "bg-white"
      }`}
      onClick={() => onSelect(email)}
    >
      <div className="flex justify-between items-start gap-2">
        <div className="flex items-center gap-2 text-gray-800">
          <div className="w-4 h-4 cursor-pointer" onClick={handleCheckboxClick}>
            {isChecked ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <rect width="16" height="16" rx="2" fill="#8B5CF6" />
                <path
                  d="M12 5L6.5 10.5L4 8"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="15"
                  height="15"
                  rx="1.5"
                  stroke="#D1D5DB"
                  fill="white"
                />
              </svg>
            )}
          </div>
          <span className="truncate text-sm font-semibold">
            {email.sender.name}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-500 text-xs">
          {isChecked ? (
            <>
              <img
                src="/EmailList/mark_email.png"
                className="w-4 h-4"
                alt="Action 1"
              />
              <img
                src="/EmailList/trash.png"
                className="w-4 h-4"
                alt="Action 2"
              />
              <img
                src="/EmailList/inventory.png"
                className="w-4 h-4"
                alt="Action 3"
              />
              <img
                src="/EmailList/flag.png"
                className="w-4 h-4"
                alt="Action 4"
              />
            </>
          ) : isViewingDetail ? (
            <>
              <img
                src="/emaillist/attachment.png"
                className="w-4 h-4"
                alt="Attachment"
              />
              <span>{formatTimestamp(email.timestamp)}</span>
            </>
          ) : (
            <span>{formatTimestamp(email.timestamp)}</span>
          )}
        </div>
      </div>
      <div className="mt-1 ml-6 text-gray-800 truncate text-sm font-semibold">
        {email.subject}
      </div>
      <div className="mt-1 ml-6 text-xs text-gray-500 truncate">
        {email.summary}
      </div>
    </div>
  );
};

export default function EmailList({
  emails: filteredEmails = [],
  onEmailSelect,
}) {
  const [checkedEmailIds, setCheckedEmailIds] = React.useState([]);
  const [selectedEmail, setSelectedEmail] = React.useState(null);
  const [selectAll, setSelectAll] = React.useState(false);

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    const newCheckedIds = isChecked
      ? filteredEmails.map((email) => email.id)
      : [];
    setCheckedEmailIds(newCheckedIds);
  };

  const handleCheckboxToggle = (email) => {
    if (checkedEmailIds.includes(email.id)) {
      const newCheckedIds = checkedEmailIds.filter((id) => id !== email.id);
      setCheckedEmailIds(newCheckedIds);
      setSelectAll(false);
    } else {
      setCheckedEmailIds([...checkedEmailIds, email.id]);
      setSelectAll(checkedEmailIds.length + 1 === filteredEmails.length);
    }
  };

  const handleSelect = (email) => {
    if (selectedEmail && selectedEmail.id === email.id) {
      setSelectedEmail(null);
      if (onEmailSelect) onEmailSelect(null);
    } else {
      setSelectedEmail(email);
      if (onEmailSelect) onEmailSelect(email); // Gọi để điều hướng
    }
  };

  return (
    <div className="flex gap-4 h-full bg-gray-100">
      <div className="w-[400px] bg-white shadow-sm rounded-lg overflow-y-auto ml-[16px]">
        <div className="px-[.9375rem]">
          <div className="py-6 px-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 cursor-pointer"
                  onClick={() =>
                    handleSelectAll({ target: { checked: !selectAll } })
                  }
                >
                  {selectAll ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <rect width="16" height="16" rx="2" fill="#8B5CF6" />
                      <path
                        d="M12 5L6.5 10.5L4 8"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="15"
                        height="15"
                        rx="1.5"
                        stroke="#D1D5DB"
                        fill="white"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Tất cả thư
                </span>
                <Image
                  src="/EmailList/line.png"
                  alt="Line"
                  width={16}
                  height={16}
                />
              </div>
              <div className="flex gap-2">
                <img
                  src="/EmailList/mark_email.png"
                  alt="Mark"
                  width={16}
                  height={16}
                  className="cursor-pointer"
                />
                <Image
                  src="/EmailList/email-open.png"
                  alt="Open"
                  width={16}
                  height={16}
                  className="cursor-pointer"
                />
                <Image
                  src="/EmailList/trash.png"
                  alt="Trash"
                  width={16}
                  height={16}
                  className="cursor-pointer"
                />
                <Image
                  src="/EmailList/tag.png"
                  alt="Tag"
                  width={16}
                  height={16}
                  className="cursor-pointer"
                />
                <Image
                  src="/EmailList/flag.png"
                  alt="Flag"
                  width={16}
                  height={16}
                  className="cursor-pointer"
                />
                <Image
                  src="/EmailList/replay.png"
                  alt="Replay"
                  width={16}
                  height={16}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {filteredEmails.map((email) => (
              <EmailCard
                key={email.id}
                email={email}
                isChecked={checkedEmailIds.includes(email.id)}
                isSelected={selectedEmail && selectedEmail.id === email.id}
                isViewingDetail={selectedEmail && selectedEmail.id === email.id}
                onSelect={handleSelect}
                onCheckboxToggle={handleCheckboxToggle}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
