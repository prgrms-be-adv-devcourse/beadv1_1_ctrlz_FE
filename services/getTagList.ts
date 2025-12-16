import { TTagResponse } from "@/types/tagTypes";
import { fetchInstance } from "./fetchInstances";

export const getTagList = async ( ): Promise<TTagResponse> => {
  const res = await fetchInstance.get('/tags');
  return res;
}