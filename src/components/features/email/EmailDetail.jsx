"use client";
import React from "react";

// Constants
const BASE_URL =
  "https://cdn.builder.io/api/v1/image/assets/eaf66ec7115845108341136eff88427a";
const TOOL_ICONS = [
  "/EmailDetail/flag.png",
  "/EmailDetail/inventory.png",
  "/EmailDetail/mark_email.png",
  "/EmailDetail/trash.png",
  "/EmailDetail/report.png",
  "/EmailDetail/tag.png",
  "/EmailDetail/reply.png",
  "/EmailDetail/reply_all.png",
];

// Components
const WarningBanner = () => (
  <section className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium text-red-500 bg-red-100 rounded-xl">
    <img
      src={`${BASE_URL}/804bdf304eb975a828a381aa5823f2265e6e9f31d7ddefbebc939af3dea83dfe?placeholderIfAbsent=true`}
      className="w-6"
      alt="Warning"
    />
    <p>
      Không có kết nối internet. Vui lòng kiểm tra cài đặt internet của bạn.
    </p>
  </section>
);

const Toolbar = () => (
  <section className="flex items-center justify-between px-5 py-3.5 mt-5 bg-gray-100 rounded-lg">
    <div className="flex gap-4">
      {TOOL_ICONS.map((src, index) => (
        <img key={index} src={src} className="w-6" alt={`Tool ${index + 1}`} />
      ))}
    </div>
    <img
      src={`${BASE_URL}/c74e1266bd21259d44123397289c90af250080ac3a81cd9fc1fba64ed0e51daa?placeholderIfAbsent=true`}
      className="w-6"
      alt="More options"
    />
  </section>
);

const SenderInfo = ({ sender, recipients, cc, timestamp }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <section className="flex flex-wrap gap-5 justify-between mt-3">
      <div className="flex gap-3.5">
        <img
          src={sender.avatar}
          className="w-11 rounded-full"
          alt={`${sender.name} avatar`}
        />
        <div className="flex flex-col">
          <h2 className="text-sm font-semibold text-neutral-900">
            {sender.name}
          </h2>
          <p className="mt-2.5 text-xs text-gray-400">
            Đến:{" "}
            <span className="text-neutral-900">
              {recipients.map((r) => r.name).join(", ")}
            </span>{" "}
            | CC:{" "}
            <span className="text-neutral-900">
              {cc.map((c) => c.name).join(", ")}
            </span>
          </p>
        </div>
      </div>
      <div className="flex gap-2 items-center text-sm text-gray-400">
        <img
          src={`${BASE_URL}/a404938417ca9b5942ef8a12c75d908ecf7e2a714c60664374ce8878f8c1c8c3?placeholderIfAbsent=true`}
          className="w-[70px]"
          alt="Time indicator"
        />
        <time>{formatTime(timestamp)}</time>
      </div>
    </section>
  );
};

const Signature = ({ company, details }) => (
  <address className="mt-5 text-xs text-slate-500 not-italic">
    {company}
    {details.map((line, index) => (
      <React.Fragment key={index}>
        <br />
        {line}
      </React.Fragment>
    ))}
  </address>
);

const AttachmentSection = ({ attachments }) =>
  attachments?.length > 0 && (
    <>
      <section className="flex justify-between px-3.5 py-2 mt-12 text-xs text-violet-800 bg-violet-100 rounded-lg">
        <h3 className="font-semibold">{attachments.length} tệp đính kèm</h3>
        <button className="flex gap-1.5">
          <img
            src={`${BASE_URL}/5bff32dad7b10e7189215861055c13aec1f685fe328cdace632b62e0558bdcb4?placeholderIfAbsent=true`}
            className="w-5"
            alt="Download all"
          />
          <span>Tải về tất cả</span>
        </button>
      </section>
      <section className="mt-2.5 space-y-2.5">
        {attachments.map((file, index) => (
          <div
            key={index}
            className="flex justify-between px-4 py-2.5 bg-gray-100 rounded-lg"
          >
            <div className="flex gap-2">
              <img
                src={`${BASE_URL}/8e35431f5f7151324e4a10d253bdde390bf6417fe1ea76bc6965fe3e19f55ff4?placeholderIfAbsent=true`}
                className="w-6"
                alt="File icon"
              />
              <div>
                <p className="text-neutral-900">{file.name}</p>
                <p className="text-slate-500">{file.size}</p>
              </div>
            </div>
            <button>
              <img
                src={`${BASE_URL}/e6653b358d0d5a0ab26b25fd028142c37c803ef3d9623d22862840d783046acc?placeholderIfAbsent=true`}
                className="w-5"
                alt="Download"
              />
            </button>
          </div>
        ))}
      </section>
    </>
  );

const ImageGallery = ({ images }) =>
  images?.length > 0 && (
    <section className="flex gap-2.5 mt-5">
      {images.map((img, index) => (
        <figure key={index} className="text-xs text-neutral-900 text-center">
          <img src={img.src} className="w-[100px] rounded-lg" alt={img.alt} />
          <figcaption className="mt-1.5">{img.caption}</figcaption>
        </figure>
      ))}
    </section>
  );

const ReplyButtons = () => (
  <section className="flex gap-4 mt-16 text-xs font-semibold text-slate-500">
    {[
      { icon: "/EmailDetail/reply.png", text: "Trả lời" },
      { icon: "/EmailDetail/reply_all.png", text: "Trả lời tất cả" },
      { icon: "/EmailDetail/reply.png", text: "Chuyển tiếp" }, // Dùng cùng ảnh với ảnh 1
    ].map((btn, index) => (
      <button
        key={index}
        className="flex gap-2 items-center px-3.5 py-2 bg-gray-100 rounded-lg"
      >
        <img
          src={btn.icon}
          className={`w-[18px] ${index === 2 ? "transform scale-x-[-1]" : ""}`}
          alt={`${btn.text} icon`}
        />
        <span>{btn.text}</span>
      </button>
    ))}
  </section>
);

const ForwardedEmail = ({ forwarded }) => {
  if (!forwarded) return null;

  const formatDateTime = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <>
      <hr className="mt-6 border-gray-200" />
      <section className="mt-6 text-sm text-neutral-900">
        <p>
          <strong>From:</strong> {forwarded.sender.name}{" "}
          <a href={`mailto:${forwarded.sender.email}`} className="underline">
            {forwarded.sender.email}
          </a>
          <br />
          <strong>Sent:</strong> {formatDateTime(forwarded.timestamp)}
          <br />
          <strong>To:</strong>{" "}
          {forwarded.recipients?.map((r) => r.name).join(", ") || "Unknown"}
          <br />
          <strong>Subject:</strong> {forwarded.subject || "No subject"}
        </p>
        <p className="mt-5 whitespace-pre-wrap">{forwarded.body}</p>
      </section>
    </>
  );
};

// Main Component
const EmailDetail = ({ email }) => {
  return (
    <article className="relative w-[660px] rounded-[.625rem]">
      <img
        src={`${BASE_URL}/5cdb587bac6dbde999e2e6c31e751029f6efe81c343f85dca7bc13e749f9affb?placeholderIfAbsent=true`}
        className="absolute inset-0 w-full h-full object-cover"
        alt="Background"
      />
      <div className="relative flex flex-col pb-12 min-h-[1250px]">
        <WarningBanner />
        <main className="px-7 mt-5">
          <h1 className="text-sm font-semibold text-black">{email.subject}</h1>
          <Toolbar />
          <SenderInfo
            sender={email.sender}
            recipients={email.recipients || []}
            cc={email.cc || []}
            timestamp={email.timestamp}
          />
          <section className="mt-6 text-sm text-neutral-900 whitespace-pre-wrap">
            {email.content?.body || "Không có nội dung"}
          </section>
          <Signature
            company={email.content?.signature?.company || ""}
            details={email.content?.signature?.details || []}
          />
          <ForwardedEmail forwarded={email.content?.forwarded} />
          <AttachmentSection attachments={email.attachments} />
          <ImageGallery images={email.images} />
          <ReplyButtons />
        </main>
      </div>
    </article>
  );
};

export default EmailDetail;
