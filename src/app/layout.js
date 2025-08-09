import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "۱۵۰۰ سالہ جشنِ ولادتِ مصطفیٰ ﷺ",
  description: "حضرت محمد مصطفیٰ ﷺ کی ولادت باسعادت کے 1500 سالہ جشن کے موقع پر خصوصی ویب سائٹ",
  icons: {
    icon: "/favicon.ico"
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
