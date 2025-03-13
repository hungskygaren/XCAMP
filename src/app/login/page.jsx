import LoginForm from "@/components/features/auth/LoginForm";
import Image from "next/image";
import React from "react";

export default function Login() {
  return (
    <div className="flex justify-center w-[100%] lg:h-[64rem] bg-[#4A30B1]">
      <div className="container flex justify-end  relative  px-10  h-full ">
        <div className="w-[37.875rem] h-[43.9375rem] left-0 absolute object-contain">
          <Image src="/login/Ellipse 3.png" alt="" fill className="" />
        </div>
        <div className="mt-[20.5%] mr-[16.3%] ">
          <LoginForm />
        </div>

        <div className="w-[16.5625rem] h-[16.5625rem] absolute bottom-[9.375%] left-[34.6%] z-10">
          <Image
            src="/login/Ellipse 1.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        <div className="w-[7.0625rem] h-[7.0625rem] absolute right-[22rem] top-[4.875rem]">
          <Image
            src="/login/Ellipse 2.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <div className="w-[22.625rem]   h-[29.5rem] absolute right-0 top-[12.9375rem]">
          <Image
            src="/login/Ellipse 5.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
