import { TApiResponse } from "./base"

export type TRequestPaymentConfirm = {
  paymentKey: string;
  orderId: string;
  amount: number;
  usedDepositAmount: number;
  totalAmount: number;
};

export type TPaymentInfo = {
  userId: string;
  orderId: string;
  amount: number;          // BigDecimal → number
  depositBalance: number;  // BigDecimal → number
  orderName: string;
}


export type TPaymentInfoResponse = TApiResponse<TPaymentInfo>;