import { searchFormSchema } from "@/lib/formSchema";
import {z} from "zod";

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