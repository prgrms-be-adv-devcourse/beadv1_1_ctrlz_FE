import { TRecommandResponse } from "@/types/aiTypes";
import { fetchInstance } from "./fetchInstances";

export const getRecommand = async (keyword: string): Promise<TRecommandResponse> => {
  const res = await fetchInstance.get('/recommendations', {
    query: keyword
  });

  return res;
}