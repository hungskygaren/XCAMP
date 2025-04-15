import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "600", "700", "800", "900"],
  variable: "--font-roboto",
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
