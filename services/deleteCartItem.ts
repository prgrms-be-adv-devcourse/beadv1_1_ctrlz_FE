import { TDeleteCartItemResponse } from "@/types/cartTypes";
import { fetchInstance } from "./fetchInstances"

export const deleteCartItem = async (cartItemId: string): Promise<TDeleteCartItemResponse> => {
  const res = await fetchInstance.delete(`/carts/items/${cartItemId}`);
  return res;
}