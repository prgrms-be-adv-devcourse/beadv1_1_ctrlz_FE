import { TCartSummaryItemResponse } from "@/types/cartTypes";
import { fetchInstance } from "./fetchInstances";

export const getCartItemList = async (): Promise<TCartSummaryItemResponse> => {
  const res = await fetchInstance.get('/carts'); 
  return res;
}