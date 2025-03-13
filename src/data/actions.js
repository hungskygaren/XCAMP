export const actions = [
  {
    id: 1,
    label: "Hộp thư đến",
    icon: "/SidebarEmail/inbox.png",
    count: 278,
    route: "inbox",
  },
  {
    id: 2,
    label: "Email đã gửi",
    icon: "/SidebarEmail/sent.png",
    count: 45,
    route: "sent",
  },
  {
    id: 3,
    label: "Bản nháp",
    icon: "/SidebarEmail/drafts.png",
    count: 12,
    route: "drafts",
  },
  {
    id: 4,
    label: "Lưu trữ",
    icon: "/SidebarEmail/storage.png",
    count: 10,
    route: "archive",
  },
  {
    id: 5,
    label: "Đã gắn cờ",
    icon: "/SidebarEmail/flag.png",
    count: 5,
    route: "flagged",
  },
  {
    id: 6,
    label: "Thư rác",
    icon: "/SidebarEmail/spam.png",
    count: 3,
    route: "spam",
  },
  {
    id: 7,
    label: "Thùng rác",
    icon: "/SidebarEmail/trash.png",
    count: 2,
    route: "trash",
  },
  {
    id: 8,
    label: "Đã lên lịch",
    icon: "/SidebarEmail/Schedule Send.png",
    count: 1,
    route: "scheduled",
  },
  {
    id: 9,
    label: "Cài đặt email",
    icon: "/SidebarEmail/setting.png",
    route: "settings", // Có thể không cần hiển thị email cho "Cài đặt"
  },
  {
    id: 10,
    label: "Gắn thẻ",
    icon: "/SidebarEmail/tag.png",
    tags: [
      {
        id: 41,
        label: "Phần mềm",
        icon: "https://cdn.builder.io/api/v1/image/assets/eaf66ec7115845108341136eff88427a/13907e52d63cd03195c94ed355e677d5662e85d6b18ca38d73b9fe01ff36533e",
        count: 15,
      },
      {
        id: 42,
        label: "Website",
        icon: "https://cdn.builder.io/api/v1/image/assets/eaf66ec7115845108341136eff88427a/8d62021c9e29e3c27d98c38a8bee0e1ea5d2b8df10a93ef1f13f944dd4808df4",
        count: 8,
      },
    ],
  },
];
