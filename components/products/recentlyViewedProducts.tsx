import { cn } from "@/lib/utils"

import React from 'react'
import RecentlyViewedPostImage from "../ui/recentlyViewedPostImage";

//회면의 사이드에 고정, 이 상태에서 최근 본 상품 조회 api 호출 가능?
const RecentlyViewedProducts = () => {

  const recentlyViewedImageList: string[] = [
    // 서버 연동 필요
    "https://img.kr.gcp-karroter.net/origin/article/202511/17640512693869a02d755e6df1e547874829dec32f42f233c2bf6f66fc3c96a5b4e2cb9d1711c0.webp?q=82&s=300x300&t=crop&f=webp",
    "https://img.kr.gcp-karroter.net/origin/article/202511/17640512693869a02d755e6df1e547874829dec32f42f233c2bf6f66fc3c96a5b4e2cb9d1711c0.webp?q=82&s=300x300&t=crop&f=webp",
    "https://img.kr.gcp-karroter.net/origin/article/202511/17640512693869a02d755e6df1e547874829dec32f42f233c2bf6f66fc3c96a5b4e2cb9d1711c0.webp?q=82&s=300x300&t=crop&f=webp"
  ];

  return (
    <>
      {/* 데스크탑: 오른쪽 사이드 고정 */}
      <div
        className={cn(
          "hidden lg:flex fixed right-16 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 border rounded-xl p-2 border-gray-300" 
        )}
      >
        <span
          className="text-[#9CA3AF] "
        >
          최근 본 상품
        </span>
        {recentlyViewedImageList.map((url, index) => (
          <RecentlyViewedPostImage 
            key={url + index} 
            src={url} 
            alt="사진" 
            className="w-16 h-16 rounded-lg m-auto"
          />
        ))}
      </div>

      {/* 모바일: 우측 하단에 사진 1개만 */}
      <div
        className={cn(
          "lg:hidden fixed bottom-4 right-4 z-50"
        )}
      >
        <RecentlyViewedPostImage
          src={recentlyViewedImageList[0]}
          alt="사진"
          className="w-12 h-12 rounded-3xl"
        />
      </div>
    </>
  )
}

export default RecentlyViewedProducts
