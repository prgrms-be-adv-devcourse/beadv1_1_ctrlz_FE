import { TRequestPaymentConfirm } from "@/types/paymentTypes";
import { fetchInstance } from "./fetchInstances";

export const processPaymentConfirm = async (request: TRequestPaymentConfirm) => {
  return await fetchInstance.post('/payments/confirm', request);
};

export const processDepositPayment = async (request: TRequestPaymentConfirm) => {
  return await fetchInstance.post('/payments/deposit', request)
}
