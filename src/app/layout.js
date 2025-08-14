import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header"; // 1. ADD THIS IMPORT LINE

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Profile Management App",
  description: "A student profile management application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header /> {/* 2. USE THE COMPONENT LIKE THIS */}
        <main>{children}</main>
      </body>
    </html>
  );
}