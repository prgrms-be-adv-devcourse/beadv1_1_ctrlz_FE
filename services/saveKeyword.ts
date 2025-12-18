import { fetchInstance } from "./fetchInstances"

export const saveKeyWord = async (keyword: string) => {
  try {
    const res = await fetchInstance.post('/searches', keyword);
    return res;
  } catch (err) {
    console.error(err);
  }
}