{
  "id": 21,                             // Định danh duy nhất cho email, dùng để phân biệt và truy vấn email cụ thể (ví dụ: GET /emails/21).
  "category": "inbox",                  // Danh mục của email (ở đây là "inbox"), dùng để phân loại và hiển thị trong tab Hộp thư đến.
  "sender": {                           // Thông tin người gửi, dùng để hiển thị tên, email và ảnh đại diện trong UI.
    "name": "Nguyễn Tuấn Anh",          // Tên người gửi, hiển thị trong danh sách email hoặc header của email.
    "email": "tuananh.nguyen@techup.vn",// Địa chỉ email của người gửi, dùng để reply hoặc hiển thị chi tiết.
    "avatar": "/avatar.png"             // Đường dẫn đến ảnh đại diện, dùng để hiển thị hình ảnh người gửi trong giao diện.
  },
  "recipients": [                       // Danh sách người nhận chính (To), dùng để hiển thị danh sách người nhận trong header email.
    {
      "name": "Sang Nguyễn",            // Tên người nhận, hiển thị trong UI thay vì chỉ email để thân thiện hơn.
      "email": "sang.nguyen@techup.vn"  // Địa chỉ email người nhận, dùng để gửi lại hoặc tra cứu thông tin.
    }
  ],
  "cc": [                               // Danh sách người nhận sao chép (CC), hiển thị trong header email dưới mục "CC".
    {
      "name": "Lưu Thị Dung",           // Tên người nhận CC, hiển thị trong UI.
      "email": "dung.luuthi@nitto.com"  // Email người nhận CC, dùng để gửi lại hoặc tra cứu.
    },
    {
      "name": "Đào Phương Uyên",        // Tên người nhận CC thứ hai, hiển thị trong UI.
      "email": "uyen.dao@techup.vn"     // Email người nhận CC thứ hai, dùng để gửi lại hoặc tra cứu.
    }
  ],
  "subject": "RE: [External] Trả lời: TECHUP - YÊU CẦU BÁO GIÁ LỊCH", // Chủ đề email, hiển thị trong danh sách email và header chi tiết.
  "timestamp": "2024-10-09T11:20:00Z",  // Thời gian gửi email (chuẩn ISO 8601), dùng để sắp xếp email hoặc hiển thị ngày giờ.
  "isUnread": false,                    // Trạng thái chưa đọc (false = đã đọc), dùng để đánh dấu email (ví dụ: in đậm nếu true).
  "hasAttachment": true,                // Cờ báo có tệp đính kèm, dùng để hiển thị biểu tượng attachment trong danh sách hoặc chi tiết email.
  "attachments": [                      // Danh sách tệp đính kèm, dùng để hiển thị và cung cấp link tải xuống trong UI.
    {
      "name": "Ý tưởng lịch Nitto.xlsx",// Tên tệp, hiển thị trong danh sách đính kèm.
      "size": "840.8 KB",               // Kích thước tệp, hiển thị để người dùng biết dung lượng trước khi tải.
      "url": "/attachments/nitto.xlsx"  // Đường dẫn tải tệp, dùng để tạo link tải trong giao diện.
    },
    {
      "name": "Thiết kế lịch Nitto.pdf",// Tên tệp thứ hai, hiển thị trong danh sách đính kèm.
      "size": "1.2 MB",                 // Kích thước tệp thứ hai, hiển thị trong UI.
      "url": "/attachments/nitto.pdf"   // Đường dẫn tải tệp thứ hai, dùng để tạo link tải.
    }
  ],
  "images": [                           // Danh sách hình ảnh trong email, dùng để hiển thị hình ảnh trực tiếp trong nội dung email.
    {
      "src": "/ảnhmẫu.png",             // Đường dẫn hình ảnh, dùng để tải và hiển thị ảnh trong UI.
      "alt": "Thiết kế lịch",           // Văn bản thay thế, hiển thị nếu ảnh không tải được (tốt cho accessibility).
      "caption": "Mẫu thiết kế"         // Chú thích ảnh, hiển thị bên dưới ảnh trong UI để giải thích nội dung.
    },
    {
      "src": "/ảnhmẫu.png",             // Đường dẫn hình ảnh thứ hai (trùng lặp), hiển thị thêm ảnh nếu cần.
      "alt": "Thiết kế lịch",           // Văn bản thay thế thứ hai, tương tự trên.
      "caption": "Mẫu thiết kế"         // Chú thích ảnh thứ hai, tương tự trên.
    },
    {
      "src": "/ảnhmẫu.png",             // Đường dẫn hình ảnh thứ ba (trùng lặp), hiển thị thêm ảnh nếu cần.
      "alt": "Thiết kế lịch",           // Văn bản thay thế thứ ba, tương tự trên.
      "caption": "Mẫu thiết kế"         // Chú thích ảnh thứ ba, tương tự trên.
    }
  ],
  "summary": "Dear anh Sang, Báo giá bản scan là đc anh ạ...", // Tóm tắt nội dung email, hiển thị trong danh sách email (preview ngắn gọn).
  "content": {                          // Nội dung chi tiết của email, dùng để hiển thị toàn bộ thông tin khi mở email.
    "body": "Dear anh Sang,\n\nBáo giá bản scan là đc anh ạ.\n\nBest regards,\nNguyễn Tuấn Anh", // Nội dung chính, hiển thị trong phần thân email.
    "signature": {                      // Chữ ký của người gửi, hiển thị ở cuối email để cung cấp thông tin liên hệ.
      "company": "TECHUP Corporation",  // Tên công ty, hiển thị trong chữ ký.
      "details": [                      // Danh sách thông tin liên hệ, hiển thị dưới dạng danh sách trong chữ ký.
        "Address: 46 Nam Ngư, Cửa Nam, Hoàn Kiếm, Hà Nội", // Địa chỉ công ty, hiển thị trong chữ ký.
        "Tel: +84 981 077 093",         // Số điện thoại, hiển thị trong chữ ký.
        "Email: tuananh.nguyen@techup.vn" // Email liên hệ, hiển thị trong chữ ký (có thể làm link mailto).
      ]
    },
    "forwarded": {                      // Thông tin email được chuyển tiếp, hiển thị như một phần riêng trong nội dung nếu có.
      "sender": {                       // Người gửi email gốc, hiển thị thông tin người gửi email được forward.
        "name": "Sang Nguyễn",          // Tên người gửi email gốc, hiển thị trong phần forwarded.
        "email": "sang.nguyen@techup.vn"// Email người gửi gốc, hiển thị trong phần forwarded.
      },
      "timestamp": "2024-10-09T16:03:00Z", // Thời gian email gốc được gửi, hiển thị để phân biệt với email chính.
      "body": "Dear Nga,\n\nEm cung cấp giúp bên anh thông tin người nhận và địa chỉ cụ thể để bên anh chuyển báo giá qua nhé.\n\nCảm ơn em,\nSang" // Nội dung email gốc, hiển thị trong phần forwarded.
    }
  }
}
{
  "chats": [  // Mảng chứa danh sách các cuộc trò chuyện
    {
      "id": "3",  // ID duy nhất của cuộc trò chuyện, dùng để định danh và tham chiếu trong hệ thống
      "type": "group",  // Loại cuộc trò chuyện: "group" (nhóm) hoặc "direct" (trực tiếp), xác định cách hiển thị và quản lý
      "name": "Dự án Nitto Calendar",  // Tên cuộc trò chuyện, hiển thị trong danh sách chat (chỉ áp dụng cho nhóm)
      "participants": [  // Mảng chứa thông tin những người tham gia cuộc trò chuyện
        {
          "id": 1,  // ID duy nhất của người tham gia, liên kết với thông tin trong "contacts"
          "name": "Sang Nguyễn",  // Tên người tham gia, hiển thị trong giao diện chat
          "email": "sang.nguyen@techup.vn",  // Email của người tham gia, dùng để liên lạc hoặc xác thực
          "avatar": "/chats/avatar2.png",  // Đường dẫn đến ảnh đại diện, dùng để hiển thị hình ảnh trong chat
          "isOnline": true,  // Trạng thái trực tuyến: true (đang online), false (offline), hiển thị biểu tượng trạng thái
          "lastSeen": null  // Thời gian cuối cùng người dùng được nhìn thấy (định dạng ISO), hiển thị nếu offline
        },
        {
          "id": 2,  // ID của người tham gia khác
          "name": "Nguyễn Tuấn Anh",  // Tên người tham gia
          "email": "tuananh.nguyen@techup.vn",  // Email người tham gia
          "avatar": "/chats/avatar1.png",  // Đường dẫn ảnh đại diện
          "isOnline": true,  // Trạng thái trực tuyến
          "lastSeen": null  // Thời gian cuối cùng được nhìn thấy
        },
        {
          "id": 3,  // ID người tham gia
          "name": "Lưu Thị Dung",  // Tên người tham gia
          "email": "dung.luuthi@nitto.com",  // Email người tham gia
          "avatar": "/chats/avatar3.png",  // Đường dẫn ảnh đại diện
          "isOnline": false,  // Trạng thái trực tuyến
          "lastSeen": "2024-10-09T10:15:00Z"  // Thời gian cuối cùng được nhìn thấy khi offline
        },
        {
          "id": 4,  // ID người tham gia
          "name": "Đào Phương Uyên",  // Tên người tham gia
          "email": "uyen.dao@techup.vn",  // Email người tham gia
          "avatar": "/chats/avatar4.png",  // Đường dẫn ảnh đại diện
          "isOnline": false,  // Trạng thái trực tuyến
          "lastSeen": "2024-10-09T09:45:00Z"  // Thời gian cuối cùng được nhìn thấy
        }
      ],
      "messages": [  // Mảng chứa danh sách tin nhắn trong cuộc trò chuyện
        {
          "id": 301,  // ID duy nhất của tin nhắn, dùng để định danh và sắp xếp
          "senderId": 1,  // ID của người gửi, liên kết với "participants" để xác định ai gửi
          "content": "Chào mọi người, tôi tạo nhóm này để trao đổi về dự án lịch cho Nitto năm 2025.",  // Nội dung tin nhắn, hiển thị trong giao diện
          "timestamp": "2024-10-07T10:00:00Z",  // Thời gian gửi tin nhắn (định dạng ISO), dùng để sắp xếp và hiển thị thời gian
          "isRead": true,  // Trạng thái đã đọc: true (đã đọc), false (chưa đọc), hiển thị dấu tích hoặc thông báo
          "attachments": []  // Mảng chứa tệp đính kèm (rỗng nếu không có), lưu thông tin file gửi kèm
        },
        {
          "id": 302,  // ID tin nhắn
          "senderId": 3,  // ID người gửi
          "content": "Cảm ơn anh Sang. Tôi là Dung từ Nitto. Chúng tôi rất mong được hợp tác với TECHUP cho dự án lịch này.",  // Nội dung tin nhắn
          "timestamp": "2024-10-07T10:05:00Z",  // Thời gian gửi
          "isRead": true,  // Trạng thái đã đọc
          "attachments": []  // Danh sách tệp đính kèm
        },
        {
          "id": 305,  // ID tin nhắn
          "senderId": 3,  // ID người gửi
          "content": "Tôi đã gửi một số ý tưởng và yêu cầu ban đầu qua email. Mọi người có thể xem qua để nắm được định hướng của chúng tôi.",  // Nội dung tin nhắn
          "timestamp": "2024-10-07T10:15:00Z",  // Thời gian gửi
          "isRead": true,  // Trạng thái đã đọc
          "attachments": [  // Danh sách tệp đính kèm
            {
              "id": 3001,  // ID duy nhất của tệp đính kèm
              "name": "Ý tưởng lịch Nitto.xlsx",  // Tên tệp, hiển thị trong giao diện
              "type": "xlsx",  // Loại tệp (định dạng), dùng để hiển thị biểu tượng hoặc xử lý file
              "size": "840.8 KB",  // Kích thước tệp, hiển thị thông tin chi tiết
              "url": "/attachments/nitto.xlsx"  // Đường dẫn đến tệp, dùng để tải xuống hoặc xem
            }
          ]
        },
        {
          "id": 307,  // ID tin nhắn
          "senderId": 1,  // ID người gửi
          "content": "Tốt lắm. Chúng ta hẹn họp online vào thứ Năm tuần này để thảo luận chi tiết hơn nhé.",  // Nội dung tin nhắn
          "timestamp": "2024-10-07T10:25:00Z",  // Thời gian gửi
          "isRead": false,  // Trạng thái đã đọc
          "attachments": []  // Danh sách tệp đính kèm
        }
      ],
      "unreadCount": 1,  // Số lượng tin nhắn chưa đọc trong cuộc trò chuyện, hiển thị thông báo hoặc badge
      "lastMessageTime": "2024-10-07T10:25:00Z"  // Thời gian của tin nhắn cuối cùng, dùng để sắp xếp danh sách chat
    },
    {
      "id": "4",  // ID cuộc trò chuyện
      "type": "direct",  // Loại cuộc trò chuyện: "direct" (trò chuyện 1-1)
      "participants": [  // Danh sách người tham gia (chỉ 2 người trong chat trực tiếp)
        {
          "id": 1,  // ID người tham gia
          "name": "Sang Nguyễn",  // Tên người tham gia
          "email": "sang.nguyen@techup.vn",  // Email người tham gia
          "avatar": "/chats/avatar2.png",  // Đường dẫn ảnh đại diện
          "isOnline": true,  // Trạng thái trực tuyến
          "lastSeen": null  // Thời gian cuối cùng được nhìn thấy
        },
        {
          "id": 4,  // ID người tham gia
          "name": "Đào Phương Uyên",  // Tên người tham gia
          "email": "uyen.dao@techup.vn",  // Email người tham gia
          "avatar": "/chats/avatar4.png",  // Đường dẫn ảnh đại diện
          "isOnline": false,  // Trạng thái trực tuyến
          "lastSeen": "2024-10-09T09:45:00Z"  // Thời gian cuối cùng được nhìn thấy
        }
      ],
      "messages": [  // Danh sách tin nhắn trong cuộc trò chuyện trực tiếp
        {
          "id": 401,  // ID tin nhắn
          "senderId": 1,  // ID người gửi
          "content": "Uyên ơi, em liên hệ với nhà in chưa?",  // Nội dung tin nhắn
          "timestamp": "2024-10-08T09:00:00Z",  // Thời gian gửi
          "isRead": true,  // Trạng thái đã đọc
          "attachments": []  // Danh sách tệp đính kèm
        },
        {
          "id": 405,  // ID tin nhắn
          "senderId": 4,  // ID người gửi
          "content": "Anh Sang, em đã nhận được báo giá từ 3 nhà in rồi ạ. Em gửi anh xem qua.",  // Nội dung tin nhắn
          "timestamp": "2024-10-08T15:30:00Z",  // Thời gian gửi
          "isRead": true,  // Trạng thái đã đọc
          "attachments": [  // Danh sách tệp đính kèm
            {
              "id": 4001,  // ID tệp đính kèm
              "name": "Báo giá in lịch 2025.xlsx",  // Tên tệp
              "type": "xlsx",  // Loại tệp
              "size": "620.5 KB",  // Kích thước tệp
              "url": "/attachments/baogialich.xlsx"  // Đường dẫn tệp
            }
          ]
        }
      ],
      "unreadCount": 0,  // Số lượng tin nhắn chưa đọc
      "lastMessageTime": "2024-10-08T15:35:00Z"  // Thời gian tin nhắn cuối cùng
    }
  ],
  "contacts": [  // Mảng chứa danh sách liên hệ, lưu thông tin chi tiết của người dùng
    {
      "id": "1",  // ID duy nhất của liên hệ, liên kết với "participants" trong "chats"
      "name": "Sang Nguyễn",  // Tên liên hệ, hiển thị trong danh sách liên hệ hoặc chat
      "email": "sang.nguyen@techup.vn",  // Email liên hệ, dùng để liên lạc hoặc xác thực
      "avatar": "/chats/avatar1.png",  // Đường dẫn ảnh đại diện
      "phone": "+84 987 654 321",  // Số điện thoại, dùng để liên lạc bổ sung
      "department": "Management",  // Phòng ban của liên hệ, cung cấp thông tin bổ sung về vai trò
      "company": "TECHUP Corporation"  // Công ty của liên hệ, xác định tổ chức mà họ thuộc về
    },
    {
      "id": "2",  // ID liên hệ
      "name": "Nguyễn Tuấn Anh",  // Tên liên hệ
      "email": "tuananh.nguyen@techup.vn",  // Email liên hệ
      "avatar": "/chats/avatar2.png",  // Đường dẫn ảnh đại diện
      "phone": "+84 912 345 678",  // Số điện thoại
      "department": "Design",  // Phòng ban
      "company": "TECHUP Corporation"  // Công ty
    },
    {
      "id": "3",  // ID liên hệ
      "name": "Lưu Thị Dung",  // Tên liên hệ
      "email": "dung.luuthi@nitto.com",  // Email liên hệ
      "avatar": "/chats/avatar3.png",  // Đường dẫn ảnh đại diện
      "phone": "+84 923 456 789",  // Số điện thoại
      "department": "Marketing",  // Phòng ban
      "company": "Nitto Vietnam"  // Công ty
    },
    {
      "id": "4",  // ID liên hệ
      "name": "Đào Phương Uyên",  // Tên liên hệ
      "email": "uyen.dao@techup.vn",  // Email liên hệ
      "avatar": "/chats/avatar4.png",  // Đường dẫn ảnh đại diện
      "phone": "+84 934 567 890",  // Số điện thoại
      "department": "Production",  // Phòng ban
      "company": "TECHUP Corporation"  // Công ty
    },
    {
      "id": "5",  // ID liên hệ
      "name": "Peggy from Quire",  // Tên liên hệ
      "email": "peggy@quire.com",  // Email liên hệ
      "avatar": "/chats/avatar1.png",  // Đường dẫn ảnh đại diện
      "phone": "+1 123 456 7890",  // Số điện thoại
      "department": "Customer Success",  // Phòng ban
      "company": "Quire Inc."  // Công ty
    }
  ]
}