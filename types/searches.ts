import { searchFormSchema } from "@/lib/formSchema";
import {z} from "zod";
import { TApiResponse } from "./base";


export type TAutoCompleteWord = {
  word: string;
  qwertyInput: string;
}

export type TAutoComplerWordResponse = TApiResponse<TAutoCompleteWord[]>;

//통합겁색
export type TSearchQueryParams  = {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string;
  page?: number;
  status?: "NEW" | "GOOD" | "ALL";
  tradeStatus?: "SELLING" | "ALL";
  sort?: "score"| "popular"| "price_asc"| "price_desc"| "newest"
};

export type SearchFormSchema = z.infer<typeof searchFormSchema>;

export type TPopularKeyword = {
  originValue: string;
  qwertyInput: string;
}

export type TPopularKeywordResponse = TApiResponse<TPopularKeyword[]>;