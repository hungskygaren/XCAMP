"use client";
import { useState } from "react";

const TextInput = ({
  className = "",
  value,
  placeholder,
  labelValue,
  onChange,
  label,
  leftIcon,
  eyeIcon, // Dành riêng cho toggle password
  eyeIconOff,
  rightIcon, // Icon tổng quát bên phải
  onRightIconClick = () => {}, // Callback khi nhấp vào rightIcon
  errorIcon,
  error = false,
  disabled = false,
  onTogglePassword = () => {},
  type = "text",
  errorMessage,
  iconSize = "w-5 h-5",
  margin = "mt-0",
  labelClassName = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    const newShowPassword = !showPassword;
    setShowPassword(newShowPassword);
    onTogglePassword(newShowPassword);
  };

  // Logic cho type của input
  const inputType =
    eyeIcon && type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className={`w-full ${margin} ${className}`}>
      {label && (
        <label htmlFor={labelValue} className={labelClassName}>
          {label}
        </label>
      )}
      <div className="relative flex items-center w-full h-full">
        <div className="flex items-center h-full w-full bg-transparent  rounded-xl focus-within:ring-2 focus-within:ring-red-500 focus-within:border-red-500 transition-all duration-200">
          {leftIcon && (
            <div className="flex-shrink-0  pl-[1.1875rem]">
              <img src={leftIcon} alt="left icon" className={iconSize} />
            </div>
          )}
          <input
            id={labelValue}
            type={inputType}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
            className={`flex-1 w-full py-2 pl-[1rem] h-full  placeholder-white bg-transparent border-none focus:outline-none ${
              disabled ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          />
          {errorIcon && error && (
            <div className="flex-shrink-0 px-2">
              <img src={errorIcon} alt="error icon" className={iconSize} />
            </div>
          )}
          {eyeIcon && type === "password" && (
            <div
              className="flex-shrink-0 px-2 cursor-pointer z-10"
              onClick={handleTogglePassword}
            >
              <img
                src={showPassword ? eyeIcon : eyeIconOff || eyeIcon}
                alt="eye icon"
                className={iconSize}
              />
            </div>
          )}
          {rightIcon && !eyeIcon && (
            <div
              className="flex-shrink-0 px-2 cursor-pointer z-10"
              onClick={onRightIconClick}
            >
              <img src={rightIcon} alt="right icon" className={iconSize} />
            </div>
          )}
        </div>
      </div>
      {error && errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
};

export default TextInput;
