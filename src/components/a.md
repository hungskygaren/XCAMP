components/
│
├── common
├── ui
├── features/
│ ├── auth
│ ├── email/
│ ├── ui
│ ├── detail
│ └── inbox.jsx
├── sent.jsx
│ ├── trash.jsx
├── navbar.jsx
├── verticalnavbar.jsx
│ └── sidebarinemail.jsx
├── emaildetail.jsx
├── emailitem.jsx
│

│ ├── buttons/ # Nhóm các button components
│ │ ├── BaseButton.tsx # Button cơ bản
│ │ ├── PrimaryButton.tsx # Button chính của hệ thống
│ │ ├── SecondaryButton.tsx # Button phụ
│ │ ├── IconButton.tsx # Button chỉ có icon
│ │ └── LoadingButton.tsx # Button có trạng thái loading
│ │
│ ├── forms/ # Các thành phần form
│ │ ├── FormGroup.tsx # Wrapper cho form group
│ │ ├── FormLabel.tsx # Label cho form
│ │ └── FormError.tsx # Component hiển thị lỗi form
│ │
│ ├── typography/ # Các component văn bản
│ │ ├── Title.tsx # Tiêu đề
│ │ ├── Subtitle.tsx # Phụ đề
│ │ └── Text.tsx # Văn bản thông thường
│ │
│ └── feedback/ # Các component phản hồi
│ ├── Tooltip.tsx # Tooltip
│ ├── Alert.tsx # Cảnh báo
│ └── Toast.tsx # Thông báo nhanh
│
├── common/ # Các component phức tạp, tái sử dụng
│ ├── Select.tsx # Dropdown select
│ ├── DatePicker.tsx # Chọn ngày
│ ├── Modal.tsx # Modal
│ └── Pagination.tsx # Phân trang
│
└── features/ # Các component theo tính năng
├── auth/
│ ├── LoginForm.tsx # Form login cụ thể
│ └── RegisterForm.tsx # Form đăng ký cụ thể
│
└── profile/
└── ProfileEditForm.tsx # Form chỉnh sửa profile
