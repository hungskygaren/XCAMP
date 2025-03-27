// components/ui/TextInput.jsx
"use client";
import React from "react";

const FormInput = ({
  className = "",
  value,
  placeholder,
  labelValue,
  onChange,
  label,
  leftIcon,
  rightIcon,
  onRightIconClick = () => {},
  errorIcon,
  error = false,
  disabled = false,
  type = "text",
  errorMessage,
  iconSize = "w-5 h-5",
  margin = "mt-0",
  labelClassName = "",
}) => {
  return (
    <div className={`w-full ${margin} ${className}`}>
      {label && (
        <label htmlFor={labelValue} className={labelClassName}>
          {label}
        </label>
      )}
      <div className="relative flex items-center w-full h-full">
        <div
          className={`flex items-center h-full w-full bg-transparent rounded-xl transition-all duration-200 ${
            error ? "ring-2 ring-red-500 border-red-500" : ""
          }`}
        >
          {leftIcon && (
            <div className="flex-shrink-0 pl-[1.1875rem]">
              <img src={leftIcon} alt="left icon" className={iconSize} />
            </div>
          )}
          <input
            id={labelValue}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
            className={`flex-1 w-full py-2 pl-[1rem] h-full placeholder-white bg-transparent border-none focus:outline-none ${
              disabled ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          />
          {errorIcon && error && (
            <div className="flex-shrink-0 px-2">
              <img src={errorIcon} alt="error icon" className={iconSize} />
            </div>
          )}
          {rightIcon && (
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

export default FormInput;
