import { reviewFormSchema } from "@/lib/formSchema";
import { z } from "zod";
import { TApiResponse } from "./base";

export type ReviewFormSchema = z.infer<typeof reviewFormSchema>;

export type TReview = {
  reviewId: string;
  userId: string,
  nickname: string,
  profileImageUrl: string,
  contents: string,
  userRating: number,
  productRating: number,
  orderedAt: string,
  isMine: boolean
}

export type TReviewResponse = TApiResponse<TReview>
