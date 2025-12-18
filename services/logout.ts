import { fetchInstance } from "./fetchInstances"

export const processLogout = async () => {
  const res = await fetchInstance.get('/auth/logout');
  return res;
}