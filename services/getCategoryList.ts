import { fetchInstance } from "./fetchInstances";
import { TCategoryResponse } from "@/types/categoryTypes";

export const getCategoryList = async ( ): Promise<TCategoryResponse> => {
  const res = await fetchInstance.get('/categories');
  return res;
}