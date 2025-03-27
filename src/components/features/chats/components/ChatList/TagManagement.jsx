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
  const modalRef = useRef(null); // Ref để kiểm tra nhấp ngoài modal
  const colors = [
    "#00B6FF",
    "#4B6DF0",
    "#4A30B1",
    "#7F56E8",
    "#A53FBA",
    "#C359A1",
    "#EE316B",
    "#F33E3E",
    "#FF6628",
    "#FFA12E",
    "#FFB800",
    "#A8C019",
    "#66C51B",
    "#00C1B1",
  ];

  useEffect(() => {
    fetch("http://192.168.31.231:4000/tags?_sort=order&_order=asc")
      .then((res) => res.json())
      .then((data) => setTags(data))
      .catch((err) => console.error("Error fetching tags:", err));
  }, []);

  // Xử lý nhấp ra ngoài lớp opacity để đóng modal
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose(); // Đóng modal khi nhấp ra ngoài
        setIsAddingTag(false); // Reset trạng thái thêm/sửa thẻ
        setEditingTag(null);
        setNewTagName("");
        setSelectedColor("#4A30B1");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

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
      order: tags.length,
    };

    fetch("http://192.168.31.231:4000/tags", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTag),
    })
      .then((res) => res.json())
      .then((savedTag) => {
        setTags([...tags, savedTag]);
        setNewTagName("");
        setSelectedColor("#4A30B1");
        setIsAddingTag(false);
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
        onUpdateTags();
      })
      .catch((err) => console.error("Error deleting tag:", err));
  };

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white  rounded-lg w-[570px]  ">
        {!isAddingTag ? (
          <div className="px-[29px] pt-[23px] pb-[46px] ">
            <h2 className="text-lg font-semibold mb-4">Quản lý thẻ</h2>
            <div className="overflow-y-auto scrollbar-thin">
              <div className="mb-4 p-2 max-h-[284px]  cursor-pointer ">
                {tags.map((tag, index) => (
                  <div
                    key={tag.id}
                    className={`flex items-center justify-between mb-2 py-[7px] pr-[7px] pl-[5px] border-[1px] border-[#E6E8EC] rounded-lg ${
                      dragOverIndex === index ? "bg-gray-400" : ""
                    }`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                  >
                    <div className="flex items-center">
                      <div className="mr-2">
                        <img
                          src="/chats/iconlist/Verticaldots.png"
                          className="w-[18px] h-[18px]"
                          alt=""
                        />
                      </div>
                      <TagIcon color={tag.color} />
                      <span className="ml-2">{tag.name}</span>
                    </div>
                    <div className="flex items-center gap-5">
                      <button
                        className=" text-blue-500"
                        onClick={() => handleEdit(tag)}
                      >
                        <img
                          src="/chats/iconlist/edit.png"
                          alt="Edit"
                          className="w-[18px] h-[18px]"
                        />
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() => handleDelete(tag.id)}
                      >
                        <img
                          src="/chats/iconlist/delete.png"
                          alt="Delete"
                          className="w-[18px] h-[18px]"
                        />
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg mb-4 flex items-center justify-center "
                  onClick={() => setIsAddingTag(true)}
                >
                  <span className="mr-2">+</span> Thêm thẻ
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-[29px] pt-[23px] pb-[46px]">
            <h2 className="text-xl font-semibold mb-7">
              {editingTag ? "Chỉnh sửa thẻ" : "Thẻ mới"}
            </h2>
            <div className="mb-4">
              <label className="block text-xs font-medium text-[#777E90]">
                Tên thẻ
              </label>
              <input
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                className="mt-1 p-2 w-full border border-[#E6E8EC] placeholder:text-xs rounded-lg"
                placeholder="Nhập tên thẻ"
              />
            </div>
            <div className="mb-11">
              <label className="block text-xs font-medium text-[#777E90]">
                Màu sắc
              </label>
              <div className="flex items-center gap-4 mt-3">
                {/* <TagIcon color={selectedColor} /> */}
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <div
                      key={color}
                      className="w-[50px] h-[50px] rounded-full cursor-pointer border-2 flex items-center justify-center" // Thêm flex để căn giữa
                      style={{
                        backgroundColor: color,
                        borderColor:
                          selectedColor === color ? "#000" : "transparent",
                      }}
                      onClick={() => setSelectedColor(color)}
                    >
                      {selectedColor === color && (
                        <img
                          src="/chats/iconlist/WhiteCheck.png"
                          className="w-5 h-[15px]" // Giữ nguyên kích thước
                          alt=""
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-4">
              <button
                className="px-[30px] py-[10px] bg-[#F4F5F6] text-[#777E90] text-sm rounded-[10px] cursor-pointer"
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
                className="px-[38.5px] py-[10px] bg-[#4A30B1] text-white text-sm rounded-[10px] cursor-pointer"
                onClick={editingTag ? handleUpdate : handleSave}
              >
                {editingTag ? "Cập nhật" : "Lưu"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TagManagement;
