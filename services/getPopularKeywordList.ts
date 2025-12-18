import {  TPopularKeywordResponse } from "@/types/searches"
import { fetchInstance } from "./fetchInstances"

export const getTrendPopularKeywordList = async ():Promise<TPopularKeywordResponse> => {
  const res = await fetchInstance.get('/searches/trend');
  return res;
}

export const getDaliyPopularKeywordList = async ():Promise<TPopularKeywordResponse> => {
  const res = await fetchInstance.get('/searches/popular-daily');
  return res;
}