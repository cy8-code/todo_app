import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "할 일 목록",
  description: "할 일을 기록하고 완료 상태를 관리하세요.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
