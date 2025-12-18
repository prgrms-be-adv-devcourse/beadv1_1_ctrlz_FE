import { TOrderInfoResponse } from "@/types/orderTypes";
import { fetchInstance } from "./fetchInstances"
import { TPaymentInfoResponse } from "@/types/paymentTypes";

export const prepareOrderInfo = async (cartItemIds: string[]) => {
  const createOrderRes: TOrderInfoResponse = await fetchInstance.post('/orders', {
    cartItemIds,
  });
  
  const payInfoRes: TPaymentInfoResponse = await fetchInstance.get(`/payments/ready/${createOrderRes.data.orderId}`)

  return payInfoRes;
};