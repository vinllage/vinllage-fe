import type { Metadata } from "next";
import "./globals.css";
import Header from './_global/outlines/Header'
import Footer from './_global/outlines/Footer'

export const metadata: Metadata = {
  title: 'vinllage',
  description:
    'AI 기반 카메라 인식을 통해 쓰레기를 올바르게 분리배출할 수 있도록 돕는 친환경 플랫폼',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ko">
      <body>
        <Header />
        <main className="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
