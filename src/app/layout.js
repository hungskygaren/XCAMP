import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";

import VerticalNavbar from "@/components/common/VerticalNavbar";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "600", "700", "800", "900"], // Chọn các trọng số cần thiết
  variable: "--font-montserrat", // Tạo biến CSS
});
export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={montserrat.className}>
      <body>
        <div>
          <main className="">{children}</main>
        </div>
      </body>
    </html>
  );
}
