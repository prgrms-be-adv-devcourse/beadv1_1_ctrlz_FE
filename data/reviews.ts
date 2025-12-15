import { TReviewResponse } from "@/types/reviewTypes";

export const dummyReviewData: TReviewResponse = {
  data: {
    reviewId: "review-1",
    userId: "user-2",
    nickname: "닉네임2",
    profileImageUrl: "https://team03-ctrlz-5775efc3-b7e8.s3.ap-northeast-2.amazonaws.com/images/USER/defualt-profile-image.png",
    contents: "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용",
    userRating: 3,
    productRating: 4,
    orderedAt: "2025-12-10T13:48:33.658+09:00",
    isMine: true
  },
  message: "성공"
}