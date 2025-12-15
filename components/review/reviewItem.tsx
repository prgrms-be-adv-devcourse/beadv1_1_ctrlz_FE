"use client";

import React from "react";
import SummaryProfile from "@/components/users/summaryProfile";
import { Star } from "lucide-react";
import { getTimeAgo } from "@/lib/date";
import { TReview } from "@/types/reviewTypes";
import ReviewRate from "./reviewRate";

interface ReviewItemProps {
  review: TReview;
}

const ReviewItem = ({review}: ReviewItemProps) => {
  const timeAgo = getTimeAgo(review.orderedAt);

  return (
    <div className="w-[90%] border border-[#2E2B2F] rounded-xl p-5 bg-white shadow-sm space-y-4 mt-4">
      
      {/* 상단: 프로필 + 작성 시간 */}
      <div className="flex items-center justify-between">
        <SummaryProfile 
          nickname={review.nickname} 
          profileImage={review.profileImageUrl}
        />
        <span className="text-sm text-[#9CA3AF]">{timeAgo}에 구매</span>
      </div>

      {/* 별점 */}
      <div className="space-y-1">
        {/* 상품 평점 */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-[#2E2B2F]">상품 상태</span>
          <ReviewRate rating={review.productRating} />
        </div>

        {/* 판매자 평점 */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-[#2E2B2F]">판매자 만족도</span>
          <ReviewRate rating={review.userRating} />
        </div>
      </div>

      {/* 리뷰 내용 */}
      <p className="text-[#2E2B2F] leading-relaxed whitespace-pre-line">
        {review.contents}
      </p>
    </div>
  );
};

export default ReviewItem;