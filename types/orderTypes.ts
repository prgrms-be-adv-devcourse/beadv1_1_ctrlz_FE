import { TApiResponse } from "./base"

export type TOrderInfo = {
  orderName: string;
  orderId: string;
  buyerId: string;
  orderDate: string; // ISO string (LocalDateTime)
  totalAmount: number; // BigDecimal
  orderStatus: OrderStatus;
  orderItems: TOrderItemInfo[];
};

export type TOrderItemInfo = {
  orderItemId: string;
  priceSnapshot: number;
  orderItemStatus: OrderItemStatus;
};

export type OrderStatus =
  | "PAYMENT_PENDING"      // 결제 대기
  | "PAYMENT_COMPLETED"    // 결제 완료
  | "CANCELLED"            // 결제 전 취소
  | "REFUND_AFTER_PAYMENT" // 결제 후 환불
  | "PURCHASE_CONFIRMED"   // 구매 확정 (정산 준비)
  | "SETTLED";             // 정산 완료

export type OrderItemStatus =
  | "PAYMENT_PENDING"      // 결제 대기
  | "PAYMENT_COMPLETED"    // 결제 완료
  | "CANCELLED"            // 결제 전 취소
  | "REFUND_AFTER_PAYMENT" // 결제 후 환불
  | "PURCHASE_CONFIRMED"   // 구매 확정 (정산 대기)
  | "SETTLED";             // 정산 완료

export type TOrderInfoResponse = TApiResponse<TOrderInfo>;
