import { TApiResponse, TPageResponse } from "./base";

//상세
export type TProductPost = {
  id: string;
  nickName: string;
  name: string;
  title: string;
  description: string;
  tags: string[];
  categoryName: string;
  price: number;
  imageUrls: string[];
  primaryImageUrl: string;
  likedCount: number;
  viewCount: number;
  status: string;
  tradeStatus: string;
  deleteStatus: string;
  createdAt: string;
  updatedAt: string;
  isMine: boolean;
}

export type TProductPostResponse = TApiResponse<TProductPost>

//목록
export type TProductSummaryItem = {
  id: string;
  title: string;
  price: number;
  primaryImageUrl: string;
  tradeStatus: string;
  likedCount: number;
  viewCount: number;
  updatedAt: string;
}

export type TProductSummaryResponse = TApiResponse<TProductSummaryItem[]>


export type TProductPageSummaryItem = TPageResponse<TProductSummaryItem[]>;
