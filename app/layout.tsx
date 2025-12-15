import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

import Header from "@/components/header";
import Providers from "@/app/provider";
import Footer from "@/components/footer";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import RecentlyViewedProducts from "@/components/products/recentlyViewedProducts";
import { Suspense } from "react";

config.autoAddCss = false;

// 로컬 폰트 Pretendard 설정
const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920", // 가변 폰트 범위
  variable: "--font-pretendard"
});

export const metadata: Metadata = {
  title: "연근마켓",
  description: "이커머스 중고 플랫폼"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} flex min-h-screen flex-col font-pretendard`}>
        <Providers>
        <Suspense fallback={null}>
          <Header />   {/* useSearchParams 사용 */}
        </Suspense>
          <main className="grow pt-24">
            {children}
          </main>
          <RecentlyViewedProducts/>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}