import { TRecommandResponse } from "@/types/aiTypes";
import { fetchInstance } from "./fetchInstances"

export const getAiRecommand = async (query:string): Promise<TRecommandResponse> => {
  //"아이폰이라입력하면 아이폰 그대로"
  const res = await fetchInstance.get(`/recommendations?query=${encodeURIComponent(query)}`);
  
  return res;
}