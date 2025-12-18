import { TProductPostResponse } from "@/types/productPostTypes";
import { fetchInstance } from "./fetchInstances";

export const getProductPostDetail = async (id: string): Promise<TProductPostResponse> => {
  const res = await fetchInstance.get(`/product-posts/${id}`);
  return res;
}