export const emails = [
  {
    id: 1,
    categoryId: 1, // Inbox
    tagIds: [41],
    sender: {
      name: "Peggy fromsss Quire",
      email: "peggy@quire.com",
      avatar: "/avatar.png",
    },
    recipients: [{ name: "Sang Nguyễn", email: "sang.nguyen@techup.vn" }],
    cc: [{ name: "Lưu Thị Dung", email: "dung.luuthi@nitto.com" }],
    subject: "[Last chance to sign up for our webinar] Summer Updates",
    timestamp: "2024-10-16T11:20:00Z",
    isUnread: true,

    hasAttachment: false,
    summary: "I'm Peggy, the Customer Success Manager at Quire...",
    content: {
      body: "Dear Sang Nguyễn,\n\nI'm Peggy, the Customer Success Manager at Quire. This is your last chance to sign up for our webinar on Summer Updates. Don’t miss out!\n\nBest regards,\nPeggy",
      signature: {
        company: "Quire Inc.",
        details: [
          "Address: 123 Tech Street, Hanoi, Vietnam",
          "Tel: +84-123-456-789",
          "Email: peggy@quire.com",
        ],
      },
    },
  },
  {
    id: 2,
    categoryId: 2, // Sent
    tagIds: [42],
    sender: {
      name: "Nguyễn Tuấn Anh",
      email: "tuananh.nguyen@techup.vn",
      avatar: "/avatar.png",
    },
    recipients: [{ name: "Sang Nguyễn", email: "sang.nguyen@techup.vn" }],
    cc: [
      { name: "Lưu Thị Dung", email: "dung.luuthi@nitto.com" },
      { name: "Đào Phương Uyên", email: "uyen.dao@techup.vn" },
    ],
    subject: "RE: [External] Trả lời: TECHUP - YÊU CẦU BÁO GIÁ LỊCH",
    timestamp: "2024-10-09T11:20:00Z",
    isUnread: false,

    hasAttachment: true,
    attachments: [
      {
        name: "Ý tưởng lịch Nitto.xlsx",
        size: "840.8 KB",
        url: "/attachments/nitto.xlsx",
      },
      {
        name: "Thiết kế lịch Nitto.pdf",
        size: "1.2 MB",
        url: "/attachments/nitto.pdf",
      },
    ],
    images: [
      {
        src: "/ảnhmẫu.png",
        alt: "Thiết kế lịch",
        caption: "Mẫu thiết kế",
      },
      {
        src: "/ảnhmẫu.png",
        alt: "Thiết kế lịch",
        caption: "Mẫu thiết kế",
      },
      {
        src: "/ảnhmẫu.png",
        alt: "Thiết kế lịch",
        caption: "Mẫu thiết kế",
      },
    ],
    summary: "Dear anh Sang, Báo giá bản scan là đc anh ạ...",
    content: {
      body: "Dear anh Sang,\n\nBáo giá bản scan là đc anh ạ.\n\nBest regards,\nNguyễn Tuấn Anh",
      signature: {
        company: "TECHUP Corporation",
        details: [
          "Address: 46 Nam Ngư, Cửa Nam, Hoàn Kiếm, Hà Nội",
          "Tel: +84 981 077 093",
          "Email: tuananh.nguyen@techup.vn",
        ],
      },
      forwarded: {
        sender: { name: "Sang Nguyễn", email: "sang.nguyen@techup.vn" },
        timestamp: "2024-10-09T16:03:00Z",
        body: "Dear Nga,\n\nEm cung cấp giúp bên anh thông tin người nhận và địa chỉ cụ thể để bên anh chuyển báo giá qua nhé.\n\nCảm ơn em,\nSang",
      },
    },
  },
  {
    id: 3,
    categoryId: 2, // Sent
    tagIds: [],
    sender: {
      name: "Nga Nguyễn",
      email: "nga.nguyenthithuy@nitto.com",
      avatar: "/avatar.png",
    },
    recipients: [{ name: "Sang Nguyễn", email: "sang.nguyen@techup.vn" }],
    cc: [],
    subject: "Re: Yêu cầu báo giá",
    timestamp: "2024-10-15T09:45:00Z",
    isUnread: false,

    hasAttachment: false,
    summary: "Anh Sang ơi, em đã gửi báo giá qua email này...",
    content: {
      body: "Anh Sang ơi,\n\nEm đã gửi báo giá qua email này, anh check giúp em nhé.\n\nThanks,\nNga",
      signature: {
        company: "NITTO DENKO TAPE MATERIALS (VIET NAM) CO.,LTD",
        details: [
          "Branch Office: Thang Long Industrial Park, RF20, Unit P4, Dong Anh District, Ha Noi, Vietnam",
          "Tel: +84-24-3951.7723 ext 305",
          "Email: nga.nguyenthithuy@nitto.com",
        ],
      },
    },
  },
  // Thêm email cho các category khác
  {
    id: 4,
    categoryId: 7, // Trash
    tagIds: [],
    sender: {
      name: "Test User",
      email: "test@example.com",
      avatar: "/avatar.png",
    },
    recipients: [{ name: "Sang Nguyễn", email: "sang.nguyen@techup.vn" }],
    cc: [],
    subject: "Deleted Email",
    timestamp: "2024-10-14T10:00:00Z",
    isUnread: false,

    hasAttachment: false,
    summary: "This email was moved to trash...",
    content: {
      body: "This email was moved to trash.",
      signature: { company: "Example Corp", details: [] },
    },
  },
  {
    id: 5,
    categoryId: 3, // Drafts
    tagIds: [41],
    sender: {
      name: "Sang Nguyễn",
      email: "sang.nguyen@techup.vn",
      avatar: "/avatar.png",
    },
    recipients: [],
    cc: [],
    subject: "Draft: Project Update",
    timestamp: "2024-10-13T15:30:00Z",
    isUnread: false,

    hasAttachment: false,
    summary: "Draft email about project update...",
    content: {
      body: "Draft email about project update.",
      signature: { company: "TECHUP", details: [] },
    },
  },
];
