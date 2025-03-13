"use client";
import React from "react";
import { emails } from "@/data/emails"; // Giả sử emails được import từ file data

// Tạo component EmailCard riêng để tái sử dụng
const EmailCard = ({ email, isSelected, onSelect }) => {
  const BASE_URL =
    "https://cdn.builder.io/api/v1/image/assets/eaf66ec7115845108341136eff88427a";

  const cardStyle = email.isUnread
    ? "bg-gray-100"
    : isSelected
    ? "bg-violet-100"
    : "border border-solid border-[#E6E8EC]";

  const checkIcon = isSelected
    ? `${BASE_URL}/dfc8de7e069e5362d926e7aa5f481669c70cbfbfab8dde3e1703b19e78694524`
    : `${BASE_URL}/7ae06a5cea79a2c7b751e940c66eb31dc256391d6f1c54880fc15dbe6bfcd146`;

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours()}h${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}, ${date.toLocaleDateString("vi-VN")}`;
  };

  return (
    <article
      className={`mt-4 px-3.5 py-3.5 w-full rounded-lg bg-white ${cardStyle} cursor-pointer`}
      onClick={() => onSelect(email.id)}
    >
      <div className="flex gap-5 justify-between items-start w-full">
        <div className="flex gap-3 text-zinc-700">
          <img src={checkIcon} className="w-[18px] aspect-square" alt="Check" />
          <div className="basis-auto">{email.sender.name}</div>
        </div>

        <div className="flex gap-2 items-center text-right text-gray-400">
          {email.isStarred && (
            <img
              src={`${BASE_URL}/dc1feb4edeb49704b7dff6739deb67545ee9275396e92599046a0b51e8fff1bf`}
              className="w-5 aspect-square"
              alt="Star"
            />
          )}
          {email.hasAttachment && (
            <img
              src={`${BASE_URL}/6feaa4d421340bdd349faa3ade74ecabea7a9abfb663ea3346e2948474661e52`}
              className="w-5 aspect-square"
              alt="Attachment"
            />
          )}
          {isSelected && (
            <>
              <img
                src={`${BASE_URL}/e6d2472124af406a872172770282bb9de98f54f906730d07ea26f8c76197740e`}
                className="w-5 aspect-square"
                alt="Icon 1"
              />
              <img
                src={`${BASE_URL}/4a84065103432c192d76b0873a2726f4a8ad507ab7d4a041c6759519abfc0aaa`}
                className="w-5 aspect-square"
                alt="Icon 2"
              />
              <img
                src={`${BASE_URL}/fbc07fd501726567965df320c7642d70fdb48e974f53aefacee98c759ea6977b`}
                className="w-5 aspect-square"
                alt="Icon 3"
              />
              <img
                src={`${BASE_URL}/e33d89cfd2044166f1ca93a4debf1682eb88c97917dfbc3ddd49fd7e5471130c`}
                className="w-5 aspect-square"
                alt="Icon 4"
              />
            </>
          )}
          <div>{formatTimestamp(email.timestamp)}</div>
        </div>
      </div>
      <div className="mt-1.5 ml-8 text-zinc-700">{email.subject}</div>
      <div className="mt-2 ml-8 text-xs text-slate-500">{email.summary}</div>
    </article>
  );
};

// Component HeaderIcon để đơn giản hóa
const HeaderIcon = ({ src }) => (
  <img src={src} className="w-6 aspect-square" alt="Tool" />
);

const EmailItem = ({ onEmailSelect }) => {
  const [selectedEmailId, setSelectedEmailId] = React.useState(null);

  const BASE_URL =
    "https://cdn.builder.io/api/v1/image/assets/eaf66ec7115845108341136eff88427a";
  const headerIcons = [
    "5230a0cde9330bde6b7728ed0a87c62bee3759ff51c0e8ce3a55697366646c71",
    "f95c7ad282c130e4719f5b977ac4106ab9b8d9ecb438c6ed44bd7e895fbed693",
    "7008f1ab149df5b177afe1c2ae7c45ba1ee36386b9d8e2c044727a49a21a3f09",
    "75119c4da9da22086c4119bcc4f2be384e2d3f23d4976729945cf5e372d956ac",
    "701cb61a49f90efb6bffa47ce131d6789f499eaeade5dfae2495200f1b8ec346",
    "67d32a0dcf8fc7ccc019cf8ea94cb764b0202f7fadb8d7f2453bb99c9f6e25e2",
  ].map((id) => `${BASE_URL}/${id}`);

  const handleSelect = (id) => {
    setSelectedEmailId(id);
    onEmailSelect(emails.find((email) => email.id === id));
  };

  return (
    <main className="flex flex-col bg-white items-center mx-auto w-full max-w-[400px]">
      {/* Header Section */}
      <header className="flex gap-3.5 items-center w-full max-w-[348px]">
        <img
          src={`${BASE_URL}/2577c594f9ae328663a23c6e993292c1a0c4b67abba9ee109db092bad4f5198c`}
          className="w-[18px] aspect-square"
          alt="Menu"
        />
        <div className="flex gap-0.5 self-stretch my-auto text-xs font-semibold text-neutral-900">
          <span className="grow my-auto">Tất cả thư</span>
          <img
            src={`${BASE_URL}/96500d4473466ce8bf6343746ef7216517c9fe0d1296ece6a6b56f0d09225cec`}
            className="w-5 aspect-square"
            alt="Dropdown"
          />
        </div>
        <nav className="flex gap-4 items-center self-stretch">
          {headerIcons.map((src, index) => (
            <HeaderIcon key={index} src={src} />
          ))}
        </nav>
      </header>

      {/* Email List Section */}
      <section className="self-stretch mt-7 w-full">
        <div className="w-full text-sm">
          {emails.map((email) => (
            <EmailCard
              key={email.id}
              email={email}
              isSelected={selectedEmailId === email.id}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="mt-6 flex flex-col items-center">
        <p className="text-xs font-medium text-center text-slate-500 w-[300px]">
          Thử lưu email vào bộ nhớ đệm nếu bạn muốn đọc thêm khi ngoại tuyến.
        </p>
        <p className="mt-3 text-xs font-semibold text-center text-violet-800">
          Bộ nhớ đệm email
        </p>
      </footer>
    </main>
  );
};

export default EmailItem;
