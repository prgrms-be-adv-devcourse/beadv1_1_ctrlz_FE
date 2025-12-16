import { fetchInstance } from "./fetchInstances"

export const saveKeyWord = async (keyword: string): Promise<string> => {
  const res = await fetchInstance.post('/searches', keyword);
  return res.message;
}