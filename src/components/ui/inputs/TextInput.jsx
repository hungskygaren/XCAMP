// components/ui/inputs/TextInput.jsx
"use client";
import React from "react";

const TextInput = ({
  inputClassName = "", // Class cho <input>
  value,
  onChange,
  placeholder = "",
  type = "text",
  disabled = false,
  onFocus,
  rightIcon, // Đường dẫn hoặc component cho icon bên phải
  rightIconClassName = "", // Class tùy chỉnh cho rightIcon
  onRightIconClick = () => {}, // Sự kiện khi click vào rightIcon
}) => {
  return (
    <div className="relative inline-flex items-center w-full ">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={onFocus}
        className={`${inputClassName} pr-8 `} // Thêm padding-right để tránh đè icon
      />
      {rightIcon && (
        <div
          className={`absolute right-2 flex items-center cursor-pointer ${rightIconClassName}`}
          onClick={onRightIconClick}
        >
          {typeof rightIcon === "string" ? (
            <img src={rightIcon} alt="right icon" className="w-4 h-4" />
          ) : (
            rightIcon // Hỗ trợ component/icon nếu không phải string
          )}
        </div>
      )}
    </div>
  );
};

export default TextInput;
