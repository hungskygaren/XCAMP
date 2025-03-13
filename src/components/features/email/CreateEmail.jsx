"use client";
import React, { useState, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";

// Tùy chỉnh Tiptap với các định dạng
const Tiptap = ({ content, onChange }) => {
  const fileInputRef = useRef(null); // Ref cho input file

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2], // Hỗ trợ h1, h2
        },
      }),
      Link.configure({
        openOnClick: false, // Không mở link ngay khi nhấp
      }),
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // Cập nhật nội dung khi thay đổi
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[200px] p-2 border border-gray-200 rounded-lg focus:outline-none",
      },
    },
  });

  if (!editor) {
    return null;
  }

  // Xử lý chèn ảnh từ file
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        editor.chain().focus().setImage({ src: e.target.result }).run();
      };
      reader.readAsDataURL(file);
    }
    fileInputRef.current.value = ""; // Reset input
  };

  return (
    <div className="mt-3.5 w-[845px] max-md:mr-1.5 max-md:max-w-full">
      {/* Thanh công cụ tùy chỉnh */}
      <div className="flex gap-2 p-2 bg-gray-100 rounded-t-lg border border-b-0 border-gray-200">
        {/* Undo & Redo */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-1 hover:bg-gray-200 rounded"
          title="Undo"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-1 hover:bg-gray-200 rounded"
          title="Redo"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3"
            />
          </svg>
        </button>

        {/* Tiêu đề */}
        <select
          onChange={(e) => {
            const level = parseInt(e.target.value);
            editor.chain().focus().toggleHeading({ level }).run();
            if (!level) editor.chain().focus().setParagraph().run();
          }}
          value={
            editor.isActive("heading")
              ? editor.getAttributes("heading").level
              : 0
          }
          className="p-1 rounded"
          title="Chọn tiêu đề"
        >
          <option value="0">Mặc định</option>
          <option value="1">Tiêu đề 1</option>
          <option value="2">Tiêu đề 2</option>
        </select>

        {/* Định dạng chữ */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1 ${
            editor.isActive("bold") ? "bg-gray-300" : ""
          } hover:bg-gray-200 rounded`}
          title="In đậm"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 5H6a2 2 0 00-2 2v10a2 2 0 002 2h5m0-14h2a2 2 0 012 2v4a2 2 0 01-2 2h-2m0 0h2a2 2 0 012 2v4a2 2 0 01-2 2h-2"
            />
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1 ${
            editor.isActive("italic") ? "bg-gray-300" : ""
          } hover:bg-gray-200 rounded`}
          title="In nghiêng"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 5H7m5 0l-4 14m4-14h5"
            />
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-1 ${
            editor.isActive("underline") ? "bg-gray-300" : ""
          } hover:bg-gray-200 rounded`}
          title="Gạch dưới"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 20h16M12 4v8m-6 0h12a2 2 0 01-2 2H8a2 2 0 01-2-2z"
            />
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-1 ${
            editor.isActive("strike") ? "bg-gray-300" : ""
          } hover:bg-gray-200 rounded`}
          title="Gạch ngang"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 10h8M12 14H4m8-4v4"
            />
          </svg>
        </button>

        {/* Danh sách */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1 ${
            editor.isActive("bulletList") ? "bg-gray-300" : ""
          } hover:bg-gray-200 rounded`}
          title="Danh sách gạch đầu dòng"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5h12M9 12h12M9 19h12M5 5h0m0 7h0m0 7h0"
            />
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1 ${
            editor.isActive("orderedList") ? "bg-gray-300" : ""
          } hover:bg-gray-200 rounded`}
          title="Danh sách có thứ tự"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 5h14M7 12h14M7 19h14M3 5v0M3 12v0M3 19v0"
            />
          </svg>
        </button>

        {/* Liên kết */}
        <button
          onClick={() => {
            const url = prompt("Nhập URL liên kết:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          className={`p-1 ${
            editor.isActive("link") ? "bg-gray-300" : ""
          } hover:bg-gray-200 rounded`}
          title="Chèn liên kết"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        </button>

        {/* Căn lề */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`p-1 ${
            editor.isActive({ textAlign: "left" }) ? "bg-gray-300" : ""
          } hover:bg-gray-200 rounded`}
          title="Căn trái"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 5h18M3 9h12M3 13h18M3 17h12"
            />
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`p-1 ${
            editor.isActive({ textAlign: "center" }) ? "bg-gray-300" : ""
          } hover:bg-gray-200 rounded`}
          title="Căn giữa"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 9h12M3 13h18M6 17h12"
            />
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`p-1 ${
            editor.isActive({ textAlign: "right" }) ? "bg-gray-300" : ""
          } hover:bg-gray-200 rounded`}
          title="Căn phải"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 9h12M3 13h18M9 17h12"
            />
          </svg>
        </button>

        {/* Màu chữ */}
        <select
          onChange={(e) =>
            editor.chain().focus().setColor(e.target.value).run()
          }
          value={editor.getAttributes("textStyle")?.color || ""}
          className="p-1 rounded"
          title="Màu chữ"
        >
          <option value="">Mặc định</option>
          <option value="red">Đỏ</option>
          <option value="blue">Xanh</option>
          <option value="green">Xanh lá</option>
          <option value="yellow">Vàng</option>
        </select>

        {/* Chèn hình ảnh */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-1 hover:bg-gray-200 rounded"
          title="Chèn hình ảnh"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          style={{ display: "none" }}
        />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

const CreateEmail = () => {
  // State để quản lý các trường nhập liệu và trạng thái giao diện
  const [subject, setSubject] = useState(
    "TechUp đề xuất hình ảnh và thông tin sử dụng cho website Aliro"
  );
  const [recipients, setRecipients] = useState([
    "Nguyễn Tuấn Anh",
    "Sang Nguyễn",
  ]);
  const [newRecipient, setNewRecipient] = useState("");
  const [cc, setCc] = useState("");
  const [body, setBody] = useState("");
  const [showSchedule, setShowSchedule] = useState(false);

  // Hàm xử lý khi bấm nút "Gửi đi"
  const handleSend = () => {
    console.log("Email data:", { subject, recipients, cc, body });
  };

  // Hàm xử lý khi bấm nút "Đóng"
  const handleClose = () => {
    console.log("Đóng form soạn email");
  };

  // Hàm xử lý khi xóa người nhận
  const handleRemoveRecipient = (recipientToRemove) => {
    setRecipients(recipients.filter((r) => r !== recipientToRemove));
    console.log("Removed recipient:", recipientToRemove);
  };

  // Hàm xử lý khi thêm người nhận mới
  const handleAddRecipient = (e) => {
    if (e.key === "Enter" && newRecipient.trim()) {
      setRecipients([...recipients, newRecipient.trim()]);
      setNewRecipient("");
      console.log("Added recipient:", newRecipient.trim());
    }
  };

  return (
    <div className="pb-2.5 font-medium rounded-none w-full">
      <div className="flex flex-col pt-6 w-full bg-white rounded-xl max-md:max-w-full">
        <div className="flex flex-col px-7 w-full text-sm max-md:px-5 max-md:max-w-full">
          {/* Khu vực tiêu đề email */}
          <hr className="shrink-0 mt-6 max-w-full h-px bg-gray-200 border border-gray-200 border-solid w-[845px] max-md:mr-1.5" />
          <div className="flex flex-wrap gap-3.5 self-start mt-4">
            <label className="text-slate-500">Tiêu đề:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="flex-auto text-neutral-900 bg-transparent border-none outline-none max-md:max-w-full"
            />
          </div>

          <hr className="shrink-0 mt-4 max-w-full h-px bg-gray-200 border border-gray-200 border-solid w-[845px] max-md:mr-1.5" />

          {/* Khu vực người nhận */}
          <div className="flex flex-wrap gap-5 justify-between mt-2 w-full text-slate-500 max-md:mr-1.5 max-md:max-w-full">
            <div className="flex gap-4 flex-wrap">
              <label className="grow my-auto">Gửi đến:</label>
              <div className="flex gap-2 flex-wrap">
                {recipients.map((recipient) => (
                  <div
                    key={recipient}
                    className="px-4 pt-2 pb-2 text-center bg-gray-100 rounded-lg"
                  >
                    <div className="flex gap-2 justify-center items-center">
                      <span className="self-stretch my-auto">{recipient}</span>
                      <button
                        onClick={() => handleRemoveRecipient(recipient)}
                        className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
                      >
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/eaf66ec7115845108341136eff88427a/a96225dc6ea459fb4434ee29163a543b5bebb06c2903215ab96b671f06b86ae7?placeholderIfAbsent=true"
                          alt="Xóa người nhận"
                        />
                      </button>
                    </div>
                  </div>
                ))}
                <input
                  type="text"
                  value={newRecipient}
                  onChange={(e) => setNewRecipient(e.target.value)}
                  onKeyDown={handleAddRecipient}
                  placeholder="Nhập tên hoặc email, nhấn Enter để thêm"
                  className="text-gray-400 bg-transparent border-none outline-none min-w-[200px]"
                />
              </div>
            </div>
            <button className="my-auto text-right">BCC</button>
          </div>

          <hr className="shrink-0 mt-2 max-w-full h-px bg-gray-200 border border-gray-200 border-solid w-[845px] max-md:mr-1.5" />

          {/* Khu vực CC */}
          <div className="flex gap-3.5 self-start mt-4">
            <label className="text-slate-500">CC:</label>
            <input
              type="text"
              value={cc}
              onChange={(e) => setCc(e.target.value)}
              placeholder="Địa chỉ email hoặc danh bạ"
              className="text-gray-400 basis-auto bg-transparent border-none outline-none"
            />
          </div>

          <hr className="shrink-0 mt-4 max-w-full h-px bg-gray-200 border border-gray-200 border-solid w-[845px] max-md:mr-1.5" />

          {/* Thanh công cụ soạn thảo */}
          <div className="flex flex-wrap gap-8 self-start mt-3.5 text-slate-500">
            <button
              className="flex gap-1.5"
              onClick={() => console.log("Chèn hình ảnh")}
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/eaf66ec7115845108341136eff88427a/a9290cbec40abe83ac04c3e2795a822c0c4ce12756662457b32e00deaa0f8cdd?placeholderIfAbsent=true"
                alt="Hình ảnh"
                className="object-contain shrink-0 w-6 aspect-square"
              />
              <span>Hình ảnh</span>
            </button>
            <button
              className="flex gap-1.5"
              onClick={() => console.log("Đính kèm tệp tin")}
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/eaf66ec7115845108341136eff88427a/942a8eae3bac2cc42f09360bd39afef45c8fe2b4ad673f920dd05a4a4c99170c?placeholderIfAbsent=true"
                alt="Tệp tin"
                className="object-contain shrink-0 w-6 aspect-square"
              />
              <span>Tệp tin đính kèm</span>
            </button>
            <button
              className="flex gap-1.5"
              onClick={() => console.log("Thêm chữ ký")}
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/eaf66ec7115845108341136eff88427a/3d15428f71b001ebd8a33b6c8dd24363aaac0d0b596ece832bcb3a92a901c908?placeholderIfAbsent=true"
                alt="Chữ ký"
                className="object-contain shrink-0 w-6 aspect-square"
              />
              <span>Chữ ký</span>
            </button>
            <button
              className="flex gap-1.5"
              onClick={() => console.log("Chọn mẫu email")}
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/eaf66ec7115845108341136eff88427a/c771a7eb0940bfd19952e8a14f18e776ba105b313a9a6a2e30ed501cda3b6882?placeholderIfAbsent=true"
                alt="Mẫu email"
                className="object-contain shrink-0 w-6 aspect-square"
              />
              <span>Mẫu email</span>
            </button>
            <button
              className="flex gap-1.5"
              onClick={() => console.log("Thêm sự kiện")}
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/eaf66ec7115845108341136eff88427a/2150cf7b6c08853db863e2f6de3dc93e570bc0b5727d7d713b1320cfb4916425?placeholderIfAbsent=true"
                alt="Sự kiện"
                className="object-contain shrink-0 w-6 aspect-square"
              />
              <span>Sự kiện</span>
            </button>
          </div>

          {/* Khu vực soạn thảo với Tiptap */}
          <Tiptap content={body} onChange={setBody} />

          {/* Chi tiết sự kiện */}
          <article className="flex flex-wrap gap-3 py-3 pr-20 pl-3.5 mt-4 text-xs rounded-xl border border-solid border-[color:var(--Grey-3,#E6E8EC)] text-neutral-900 max-md:pr-5 max-md:mr-1.5 max-md:max-w-full">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/eaf66ec7115845108341136eff88427a/0b14c44f8aeb96bc9d15b3e162a70f5202e911f77a88e37d24eedeb8464a54ed?placeholderIfAbsent=true"
              alt="Ảnh sự kiện"
              className="object-contain shrink-0 self-start rounded aspect-square w-[54px]"
            />
            <div className="flex flex-col items-start">
              <h2 className="text-sm font-semibold">Họp BNI</h2>
              <time className="mt-1.5">
                08h00, 16/10/2024 - 12h00, 17/10/2024
              </time>
              <address className="flex gap-1.5 self-stretch mt-1 text-violet-800">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/eaf66ec7115845108341136eff88427a/cac46a1e45cfc70dee389d6cec0db1426185fb107403f01c9c8c2b8518b79b9c?placeholderIfAbsent=true"
                  alt="Địa điểm"
                  className="object-contain shrink-0 my-auto w-2.5 aspect-[0.83] fill-violet-800"
                />
                <span className="flex-auto w-[379px]">
                  72A Ngõ 64 Nguyễn Lương Bằng, Nam Đồng, Đống Đa, Hà Nội
                </span>
              </address>
            </div>
          </article>

          {/* Thanh công cụ phía dưới */}
          <footer className="flex flex-wrap gap-5 justify-between mt-40 w-full font-semibold text-center max-md:mt-10 max-md:mr-1.5 max-md:max-w-full">
            <button
              className="flex flex-col justify-center items-center px-5 pt-2.5 pb-3 whitespace-nowrap bg-gray-100 rounded-lg text-slate-500"
              onClick={handleClose}
            >
              <span className="gap-2.5 self-stretch pb-px my-auto">Đóng</span>
            </button>

            <div className="flex gap-6 text-white">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/eaf66ec7115845108341136eff88427a/7008f1ab149df5b177afe1c2ae7c45ba1ee36386b9d8e2c044727a49a21a3f09?placeholderIfAbsent=true"
                alt=""
                className="object-contain shrink-0 my-auto w-6 aspect-square"
              />
              <div className="flex">
                <button
                  className="flex flex-col items-start px-5 pt-2.5 pb-3 w-full bg-violet-800 rounded-lg max-md:mr-0"
                  onClick={handleSend}
                >
                  <span className="gap-2.5 self-stretch pb-px my-auto">
                    Gửi đi
                  </span>
                </button>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/eaf66ec7115845108341136eff88427a/df1dc92f8cdca8b29243e404aff9df1a40d20ddaccfd428e944065d4bfdc0316?placeholderIfAbsent=true"
                  alt=""
                  className="object-contain shrink-0 self-start mt-4 w-2 aspect-[1.6] fill-white"
                />
              </div>
            </div>
          </footer>
        </div>

        {/* Dropdown lịch gửi */}
        <div className="flex z-10 flex-col justify-center items-start self-end py-1 mr-7 -mb-2.5 max-w-full text-xs text-center bg-white rounded-lg shadow-sm text-neutral-900 w-[170px] max-md:mr-2.5 max-md:mb-2.5">
          <button
            className="flex flex-col justify-center px-2.5 py-2 bg-white rounded-lg w-full"
            onClick={() => setShowSchedule(!showSchedule)}
          >
            <div className="flex gap-2 justify-center items-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/eaf66ec7115845108341136eff88427a/27d22b1c684de43441ab533e8fbd677b14f9a9aea62eb7c81aaa210981c8c08c?placeholderIfAbsent=true"
                alt=""
                className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
              />
              <span className="gap-2.5 self-stretch pb-px my-auto">
                Gửi theo lịch biểu
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEmail;
