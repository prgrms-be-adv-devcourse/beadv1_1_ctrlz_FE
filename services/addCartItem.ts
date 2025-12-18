import { TCartSummaryItemResponse } from "@/types/cartTypes";
import { fetchInstance } from "./fetchInstances"
import { promises } from "dns";

export const addCartItem = async (id: string): Promise<TCartSummaryItemResponse> => {
  const res = await fetchInstance.post(`/carts/items?productPostId=${id}`, null);
  return res;
}