import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "급식 클립보드 - Meal Clipboard",
  description: "광양고등학교 인스타그램 운영 지원을 위한 급식 클립보드",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
