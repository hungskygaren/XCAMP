"use client";
import Button from "@/components/ui/buttons/Button";
import TextInput from "@/components/ui/inputs/TextInput";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State để toggle

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError(true);
      setEmailErrorMessage("Vui lòng nhập email hợp lệ");
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 8) {
      setPasswordError(true);
      setPasswordErrorMessage("Mật khẩu phải có ít nhất 8 ký tự");
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }
  };

  const handleTogglePassword = (isVisible) => {
    setShowPassword(isVisible); // Cập nhật state showPassword
  };

  return (
    <div className="text-white flex flex-col w-[23.125rem]">
      <div className="w-[7.5rem] h-[7rem] relative">
        <Image src="/logo.png" fill alt="logo" className="object-cover" />
      </div>

      <TextInput
        labelValue="email"
        placeholder="Nhập email"
        value={email}
        onChange={handleEmailChange}
        leftIcon="/login/envelope 1.png"
        error={emailError}
        errorMessage={emailErrorMessage}
        type="email"
        margin="mt-[4.1294rem]"
        className="bg-[#2000A2]  rounded-lg w-full h-[3.125rem]"
        iconSize="w-5 h-5"
      />

      <TextInput
        labelValue="password"
        placeholder="Nhập password"
        value={password}
        onChange={handlePasswordChange}
        leftIcon="/login/Filled.png"
        eyeIcon="/login/eye.png"
        eyeIconOff="/login/Eyeoff.png"
        errorIcon="/login/error.png"
        error={passwordError}
        errorMessage={passwordErrorMessage}
        type="password"
        margin="mt-[2.75rem]"
        className="bg-[#2000A2] rounded-lg w-full h-[3.125rem]"
        iconSize="w-5 h-5"
        onTogglePassword={handleTogglePassword} // Truyền hàm callback
      />

      <Link href="/login" className="flex justify-end">
        <p className="text-sm mt-[1.875rem] underline">Quên mật khẩu?</p>
      </Link>

      <Button
        children={"Đăng nhập"}
        className="bg-[#EE316B] w-[10.625rem] h-[3.125rem] rounded-[.625rem] mt-[2.6875rem]"
      />
    </div>
  );
}
