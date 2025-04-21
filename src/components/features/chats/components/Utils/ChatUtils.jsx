// Hàm lấy tên chat
export const getChatName = (chat, currentUser) => {
  let chatName;

  // Nếu là chat trực tiếp, lấy tên của người tham gia khác
  if (chat.type === "direct") {
    const otherParticipant = chat.participants.find(
      (p) => p.id !== currentUser.id
    );
    chatName = otherParticipant?.name || "Unknown";
  } else {
    // Nếu là nhóm, lấy tên nhóm hoặc mặc định là "Group Chat"
    chatName = chat.name || "Group Chat";
  }

  // Kiểm tra xem chat có các biểu tượng đặc biệt (tag, pinned, flagged, v.v.)
  const hasIcons =
    (chat.tag !== null && chat.tag !== undefined) ||
    chat.isPinned ||
    chat.isNotificationOff ||
    chat.isFlagged;

  // Giới hạn độ dài tên chat dựa trên việc có biểu tượng hay không
  const maxLength = hasIcons ? 15 : 18;
  return chatName.length > maxLength
    ? chatName.substring(0, maxLength) + "..."
    : chatName;
};

// Hàm lấy avatar chat
export const getChatAvatar = (chat, currentUser) => {
  if (chat.type === "direct") {
    // Nếu là chat trực tiếp, lấy avatar của người tham gia khác
    const otherParticipant = chat.participants.find(
      (p) => p.id !== currentUser.id
    );
    return otherParticipant?.avatar || "/avatar.png";
  } else if (chat.type === "group") {
    // Nếu là nhóm, ưu tiên avatar nhóm, nếu không có thì lấy avatar của các thành viên
    if (chat.avatar) return chat.avatar;
    if (chat.participants.length >= 1) {
      return chat.participants
        .slice(0, 3) // Lấy tối đa 3 avatar
        .map((p) => p.avatar || "/avatar.png");
    }
    return ["/group-avatar.png"]; // Avatar mặc định cho nhóm
  }
  return "/avatar.png"; // Avatar mặc định
};

// Hàm lấy tin nhắn cuối cùng
export const getLastMessage = (chat) => {
  // Nếu không có tin nhắn, trả về thông báo mặc định
  if (!chat.messages || chat.messages.length === 0) return "Chưa có tin nhắn";

  const lastMessage = chat.messages[chat.messages.length - 1]; // Lấy tin nhắn cuối cùng

  // Kiểm tra xem chat có các biểu tượng đặc biệt (tag, pinned, flagged, v.v.)
  const hasIcons =
    (chat.tag !== null && chat.tag !== undefined) ||
    chat.isPinned ||
    chat.isNotificationOff ||
    chat.isFlagged;

  // Giới hạn độ dài nội dung tin nhắn dựa trên việc có biểu tượng hay không
  const maxLength = hasIcons ? 20 : 35;
  return lastMessage.content.length > maxLength
    ? lastMessage.content.substring(0, maxLength) + "..."
    : lastMessage.content;
};

// Hàm định dạng thời gian
export const formatTime = (timestamp) => {
  if (!timestamp) return ""; // Nếu không có timestamp, trả về chuỗi rỗng

  const date = new Date(timestamp); // Chuyển đổi timestamp thành đối tượng Date
  const now = new Date(); // Lấy thời gian hiện tại
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Thời gian bắt đầu của ngày hôm nay
  const messageDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ); // Thời gian bắt đầu của ngày tin nhắn

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1); // Thời gian bắt đầu của ngày hôm qua

  // Kiểm tra xem tin nhắn có phải hôm nay, hôm qua, hay trong năm nay
  const isToday = messageDate.getTime() === today.getTime();
  const isYesterday = messageDate.getTime() === yesterday.getTime();
  const isThisYear = date.getFullYear() === now.getFullYear();

  if (isToday) {
    // Nếu là hôm nay, hiển thị giờ và phút
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  if (isYesterday) {
    // Nếu là hôm qua, hiển thị "Hôm qua"
    return "Hôm qua";
  }
  if (isThisYear) {
    // Nếu trong năm nay, hiển thị ngày và tháng
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
    });
  }
  // Nếu không phải trong năm nay, hiển thị ngày, tháng và năm
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
