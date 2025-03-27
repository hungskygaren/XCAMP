"use client";
import Button from "@/components/ui/buttons/Button";
import FormInput from "@/components/ui/inputs/FormInput";

import PasswordInput from "@/components/ui/inputs/PasswordInput";
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

  // Chỉ cập nhật giá trị, không validate trong onChange
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTogglePassword = (isVisible) => {
    console.log("Password visibility:", isVisible);
  };

  // Hàm xử lý khi nhấn nút Đăng nhập
  const handleSubmit = () => {
    let hasError = false;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Vui lòng nhập email hợp lệ");
      hasError = true;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    // Validate password
    if (password.length < 8) {
      setPasswordError(true);
      setPasswordErrorMessage("Mật khẩu phải có ít nhất 8 ký tự");
      hasError = true;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    // Nếu không có lỗi, tiến hành đăng nhập
    if (!hasError) {
      console.log("Đăng nhập thành công với:", { email, password });
      // Thêm logic đăng nhập thực tế ở đây (gọi API, v.v.)
    }
  };

  return (
    <div className="text-white flex flex-col w-[23.125rem]">
      <div className="w-[7.5rem] h-[7rem] relative">
        <Image src="/logo.png" fill alt="logo" className="object-cover" />
      </div>

      <FormInput
        labelValue="email"
        placeholder="Nhập email"
        value={email}
        onChange={handleEmailChange}
        leftIcon="/login/envelope 1.png"
        error={emailError}
        errorMessage={emailErrorMessage}
        type="email"
        margin="mt-[4.1294rem]"
        className="bg-[#2000A2] rounded-lg w-full h-[3.125rem]"
        iconSize="w-5 h-5"
      />

      <PasswordInput
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
        margin="mt-[2.75rem]"
        className="bg-[#2000A2] rounded-lg w-full h-[3.125rem]"
        iconSize="w-5 h-5"
        onTogglePassword={handleTogglePassword}
      />

      <Link href="/login" className="flex justify-end">
        <p className="text-sm mt-[1.875rem] underline">Quên mật khẩu?</p>
      </Link>

      <Button
        children={"Đăng nhập"}
        className="bg-[#EE316B] w-[10.625rem] h-[3.125rem] rounded-[.625rem] mt-[2.6875rem]"
        onClick={handleSubmit} // Gắn hàm handleSubmit vào nút
      />
    </div>
  );
}
