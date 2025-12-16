import { TAutoComplerWordResponse } from "@/types/searches";
import { fetchInstance } from "@/services/fetchInstances";


export const getAutoCompleteWordList = async (keyword: string): Promise<TAutoComplerWordResponse> => {
  try {
    const data = await fetchInstance.get('/searches/suggestion', {
      prefix: keyword,
    });
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}