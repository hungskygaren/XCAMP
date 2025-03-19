import React, { useState, useEffect, useRef } from "react";

const TagManagement = ({
  onClose,
  onSaveTag,
  onUpdateTag,
  onDeleteTag,
  onUpdateTags,
}) => {
  const [tags, setTags] = useState([]);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [editingTag, setEditingTag] = useState(null);
  const [newTagName, setNewTagName] = useState("");
  const [selectedColor, setSelectedColor] = useState("#4A30B1");
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const dragRef = useRef(null);
  const colors = [
    "#4A30B1",
    "#FF0000",
    "#800080",
    "#FF00FF",
    "#FFA500",
    "#FFFF00",
    "#00FF00",
    "#00FFFF",
    "#0000FF",
    "#A8ABB8",
  ];

  // Fetch danh sách tag từ server
  useEffect(() => {
    fetch("http://192.168.31.231:4000/tags?_sort=order&_order=asc") // Thêm query sắp xếp
      .then((res) => res.json())
      .then((data) => setTags(data))
      .catch((err) => console.error("Error fetching tags:", err));
  }, []);

  // Xử lý kéo thả thủ công
  const handleDragStart = (e, index) => {
    setDraggingIndex(index);
    dragRef.current = e.target;
    e.target.style.opacity = "0.5";
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggingIndex === null || draggingIndex === dropIndex) return;

    const reorderedTags = [...tags];
    const [movedTag] = reorderedTags.splice(draggingIndex, 1);
    reorderedTags.splice(dropIndex, 0, movedTag);

    const updatedTags = reorderedTags.map((tag, index) => ({
      ...tag,
      order: index,
    }));

    setTags(updatedTags);
    setDraggingIndex(null);
    setDragOverIndex(null);

    Promise.all(
      updatedTags.map((tag) =>
        fetch(`http://192.168.31.231:4000/tags/${tag.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tag),
        })
      )
    )
      .then(() => {
        // Fetch lại danh sách đã sắp xếp
        fetch("http://192.168.31.231:4000/tags?_sort=order&_order=asc")
          .then((res) => res.json())
          .then((data) => setTags(data));
        onUpdateTags();
      })
      .catch((err) => console.error("Error updating tag order:", err));

    if (dragRef.current) {
      dragRef.current.style.opacity = "1";
    }
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
    setDragOverIndex(null);
    if (dragRef.current) {
      dragRef.current.style.opacity = "1";
    }
  };

  const handleSave = () => {
    if (!newTagName.trim() || !selectedColor) return;

    const newTag = {
      id: Date.now().toString(),
      name: newTagName.trim(),
      color: selectedColor,
      order: tags.length, // Đặt order cho tag mới
    };

    fetch("http://192.168.31.231:4000/tags", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTag),
    })
      .then((res) => res.json())
      .then((savedTag) => {
        setTags([...tags, savedTag]);
        onSaveTag(savedTag.id);
        setNewTagName("");
        setSelectedColor("#4A30B1");
        setIsAddingTag(false);
        // Fetch lại danh sách đã sắp xếp
        fetch("http://192.168.31.231:4000/tags?_sort=order&_order=asc")
          .then((res) => res.json())
          .then((data) => setTags(data));
        onUpdateTags();
      })
      .catch((err) => console.error("Error saving tag:", err));
  };

  const handleEdit = (tag) => {
    setEditingTag(tag);
    setNewTagName(tag.name);
    setSelectedColor(tag.color);
    setIsAddingTag(true);
  };

  const handleUpdate = () => {
    if (!editingTag || !newTagName.trim() || !selectedColor) return;

    const updatedTag = {
      ...editingTag,
      name: newTagName.trim(),
      color: selectedColor,
    };
    fetch(`http://192.168.31.231:4000/tags/${editingTag.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTag),
    })
      .then((res) => res.json())
      .then((savedTag) => {
        const updatedTags = tags.map((t) =>
          t.id === savedTag.id ? savedTag : t
        );
        setTags(updatedTags);
        onUpdateTag(savedTag.id, savedTag);
        setEditingTag(null);
        setNewTagName("");
        setSelectedColor("#4A30B1");
        setIsAddingTag(false);
        // Gọi lại API để lấy danh sách tag mới nhất
        onUpdateTags();
      })
      .catch((err) => console.error("Error updating tag:", err));
  };

  const handleDelete = (tagId) => {
    fetch(`http://192.168.31.231:4000/tags/${tagId}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedTags = tags.filter((t) => t.id !== tagId);
        setTags(updatedTags);
        onDeleteTag(tagId);
        // Gọi lại API để lấy danh sách tag mới nhất
        onUpdateTags();
      })
      .catch((err) => console.error("Error deleting tag:", err));
  };

  const handleSaveOrder = () => {
    onClose();
  };

  // Component SVG inline để thay đổi màu
  const TagIcon = ({ color }) => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.6959 8.9218L15.6964 8.9223C15.7984 9.02422 15.8665 9.132 15.9087 9.24713C15.9585 9.38311 15.9813 9.51246 15.9813 9.6375C15.9813 9.76236 15.9586 9.88675 15.9106 10.0133C15.8692 10.1224 15.8012 10.2292 15.6964 10.3339L10.3339 15.6964C10.2294 15.801 10.117 15.8747 9.99555 15.9233C9.86253 15.9765 9.73788 16 9.61875 16C9.49962 16 9.37497 15.9765 9.24195 15.9233C9.12047 15.8747 9.00813 15.801 8.90355 15.6964L2.2848 9.0777C2.19419 8.98708 2.12461 8.88302 2.07451 8.76195C2.02509 8.64252 2 8.51697 2 8.38125V3C2 2.72116 2.09345 2.49491 2.29418 2.29418C2.49491 2.09345 2.72116 2 3 2H8.38125C8.51135 2 8.63755 2.02599 8.7637 2.08065C8.89632 2.13812 9.00551 2.21267 9.09622 2.30333C9.0963 2.3034 9.09637 2.30348 9.09645 2.30355L15.6959 8.9218ZM9.2647 15.3531L9.61825 15.7076L9.9723 15.3536L15.3348 9.99105L15.6879 9.638L15.3353 9.28445L8.71655 2.64695L8.57002 2.5H8.3625H3H2.5V3V8.3625V8.56919L2.64595 8.71555L9.2647 15.3531ZM5.31832 5.31832C5.1944 5.44224 5.05641 5.5 4.875 5.5C4.69359 5.5 4.5556 5.44224 4.43168 5.31832C4.30776 5.1944 4.25 5.05641 4.25 4.875C4.25 4.69359 4.30776 4.5556 4.43168 4.43168C4.5556 4.30776 4.69359 4.25 4.875 4.25C5.05641 4.25 5.1944 4.30776 5.31832 4.43168C5.44224 4.5556 5.5 4.69359 5.5 4.875C5.5 5.05641 5.44224 5.1944 5.31832 5.31832Z"
        fill={color}
        stroke={color}
      />
    </svg>
  );

  return (
    <div className="fixed inset-0 i bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        {!isAddingTag ? (
          <>
            <h2 className="text-lg font-semibold mb-4">Quản lý thẻ</h2>
            <div className="mb-4 max-h-[300px] overflow-y-auto">
              {tags.map((tag, index) => (
                <div
                  key={tag.id}
                  className={`flex items-center justify-between mb-2 p-2 bg-gray-50 rounded-lg ${
                    dragOverIndex === index ? "bg-gray-100" : ""
                  }`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                >
                  <div className="flex items-center">
                    <div className="mr-2">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="2" cy="2" r="2" fill="#A8ABB8" />
                        <circle cx="8" cy="2" r="2" fill="#A8ABB8" />
                        <circle cx="14" cy="2" r="2" fill="#A8ABB8" />
                        <circle cx="2" cy="8" r="2" fill="#A8ABB8" />
                        <circle cx="8" cy="8" r="2" fill="#A8ABB8" />
                        <circle cx="14" cy="8" r="2" fill="#A8ABB8" />
                        <circle cx="2" cy="14" r="2" fill="#A8ABB8" />
                        <circle cx="8" cy="14" r="2" fill="#A8ABB8" />
                        <circle cx="14" cy="14" r="2" fill="#A8ABB8" />
                      </svg>
                    </div>
                    <TagIcon color={tag.color} />
                    <span className="ml-2">{tag.name}</span>
                  </div>
                  <div>
                    <button
                      className="mr-2 text-blue-500"
                      onClick={() => handleEdit(tag)}
                    >
                      <img
                        src="/chats/iconlist/edit.png"
                        alt="Edit"
                        className="w-4 h-4"
                      />
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => handleDelete(tag.id)}
                    >
                      <img
                        src="/chats/iconlist/delete.png"
                        alt="Delete"
                        className="w-4 h-4"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg mb-4 flex items-center justify-center"
              onClick={() => setIsAddingTag(true)}
            >
              <span className="mr-2">+</span> Thêm thẻ
            </button>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg"
                onClick={onClose}
              >
                Đóng
              </button>
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-lg"
                onClick={handleSaveOrder}
              >
                Lưu
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-4">
              {editingTag ? "Chỉnh sửa thẻ" : "Thêm thẻ mới"}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Tên thẻ
              </label>
              <input
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                className="mt-1 p-2 w-full border rounded-lg"
                placeholder="Nhập tên thẻ"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Màu sắc
              </label>
              <div className="flex items-center gap-4 mt-2">
                <TagIcon color={selectedColor} />
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <div
                      key={color}
                      className="w-8 h-8 rounded-full cursor-pointer border-2"
                      style={{
                        backgroundColor: color,
                        borderColor:
                          selectedColor === color ? "#000" : "transparent",
                      }}
                      onClick={() => setSelectedColor(color)}
                    >
                      {selectedColor === color && (
                        <span className="text-white text-xs">✓</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg"
                onClick={() => {
                  setIsAddingTag(false);
                  setEditingTag(null);
                  setNewTagName("");
                  setSelectedColor("#4A30B1");
                }}
              >
                Đóng
              </button>
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-lg"
                onClick={editingTag ? handleUpdate : handleSave}
              >
                {editingTag ? "Cập nhật" : "Lưu"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TagManagement;
