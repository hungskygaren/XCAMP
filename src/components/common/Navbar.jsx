import Image from "next/image";

export default function Navbar() {
  return (
    <>
      <div className="flex h-[4.125rem] items-center justify-between w-full pr-[36px]">
        <div className="pl-4">
          <h3 className="font-semibold text-sm text-[#141416]">Tin nhắn</h3>
        </div>
        <div className="flex gap-[1.8125rem]">
          <div className="flex gap-6">
            <Image src="/Navbar/Search.png" alt="" width={24} height={24} />
            <Image src="/Navbar/Bell.png" alt="" width={24} height={24} />
            <Image
              src={"/Navbar/Grid Four 01.png"}
              alt=""
              width={24}
              height={24}
            />
          </div>
          <div className="flex gap-[.6875rem] items-center">
            <Image src={"/Navbar/avatar.png"} alt="" width={24} height={24} />
            <p>Jack Nguyen</p>
          </div>
        </div>
      </div>
    </>
  );
}
