import { TUserDepositResponse } from "@/types/paymentTypes";
import { fetchInstance } from "./fetchInstances"

export const getDeposit = async (): Promise<TUserDepositResponse> => {
  const res = await fetchInstance.get('/deposits');
  return res;
} 