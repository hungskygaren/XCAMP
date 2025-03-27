// components/ui/PasswordInput.jsx
"use client";
import { useState } from "react";

import FormInput from "./FormInput";

const PasswordInput = ({
  className = "",
  value,
  placeholder,
  labelValue,
  onChange,
  label,
  leftIcon,
  eyeIcon,
  eyeIconOff,
  errorIcon,
  error = false,
  disabled = false,
  errorMessage,
  iconSize = "w-5 h-5",
  margin = "mt-0",
  labelClassName = "",
  onTogglePassword = () => {},
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    const newShowPassword = !showPassword;
    setShowPassword(newShowPassword);
    onTogglePassword(newShowPassword);
  };

  return (
    <FormInput
      className={className}
      value={value}
      placeholder={placeholder}
      labelValue={labelValue}
      onChange={onChange}
      label={label}
      leftIcon={leftIcon}
      rightIcon={showPassword ? eyeIcon : eyeIconOff || eyeIcon}
      onRightIconClick={handleTogglePassword}
      errorIcon={errorIcon}
      error={error}
      disabled={disabled}
      type={showPassword ? "text" : "password"}
      errorMessage={errorMessage}
      iconSize={iconSize}
      margin={margin}
      labelClassName={labelClassName}
    />
  );
};

export default PasswordInput;
