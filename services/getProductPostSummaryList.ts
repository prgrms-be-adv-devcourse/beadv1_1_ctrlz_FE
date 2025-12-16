import { TSearchQueryParams } from "@/types/searches";
import { fetchInstance } from "./fetchInstances";
import { TProductPageSummaryItem } from "@/types/productPostTypes";

export const getSearchedPostResult = async (params: TSearchQueryParams): Promise<TProductPageSummaryItem> => {
  try {
    const data = await fetchInstance.get('/product-posts/search', {
      q: params.q,
      category: params.category,
      minPrice: params.minPrice,
      maxPrice: params.maxPrice,
      tags: params.tags,
      status: params.status, 
      sort: params.sort,
      page: params.page
    });
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}