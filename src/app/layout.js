import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";

import VerticalNavbar from "@/components/common/VerticalNavbar";
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "600", "700", "800", "900"], // Chọn các trọng số cần thiết
  variable: "--font-roboto", // Tạo biến CSS
});
export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={roboto.className}>
      <body>
        <div>
          <main className="">{children}</main>
        </div>
      </body>
    </html>
  );
}
