// Hàm lấy tên chat
export const getChatName = (chat, currentUser) => {
  let chatName;
  if (chat.type === "direct") {
    const otherParticipant = chat.participants.find(
      (p) => p.id !== currentUser.id
    );
    chatName = otherParticipant?.name || "Unknown";
  } else {
    chatName = chat.name || "Group Chat";
  }
  const hasIcons =
    (chat.tag !== null && chat.tag !== undefined) ||
    chat.isPinned ||
    chat.isNotificationOff ||
    chat.isFlagged;
  const maxLength = hasIcons ? 15 : 18;
  return chatName.length > maxLength
    ? chatName.substring(0, maxLength) + "..."
    : chatName;
};

// Hàm lấy avatar chat
export const getChatAvatar = (chat, currentUser) => {
  if (chat.type === "direct") {
    const otherParticipant = chat.participants.find(
      (p) => p.id !== currentUser.id
    );
    return otherParticipant?.avatar || "/avatar.png";
  } else if (chat.type === "group") {
    if (chat.avatar) return chat.avatar;
    if (chat.participants.length >= 1) {
      return chat.participants
        .slice(0, 3)
        .map((p) => p.avatar || "/avatar.png");
    }
    return ["/group-avatar.png"];
  }
  return "/avatar.png";
};

// Hàm lấy tin nhắn cuối cùng
export const getLastMessage = (chat) => {
  if (!chat.messages || chat.messages.length === 0) return "Chưa có tin nhắn";
  const lastMessage = chat.messages[chat.messages.length - 1];
  const hasIcons =
    (chat.tag !== null && chat.tag !== undefined) ||
    chat.isPinned ||
    chat.isNotificationOff ||
    chat.isFlagged;
  const maxLength = hasIcons ? 20 : 35;
  return lastMessage.content.length > maxLength
    ? lastMessage.content.substring(0, maxLength) + "..."
    : lastMessage.content;
};

// Hàm định dạng thời gian
export const formatTime = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const messageDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const isToday = messageDate.getTime() === today.getTime();
  const isYesterday = messageDate.getTime() === yesterday.getTime();
  const isThisYear = date.getFullYear() === now.getFullYear();

  if (isToday) {
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  if (isYesterday) {
    return "Hôm qua";
  }
  if (isThisYear) {
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
    });
  }
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
