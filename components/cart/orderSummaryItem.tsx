import { TProductSummaryItem } from "@/types/productPostTypes";
import React from "react";
import { Button } from "../ui/button";
import { TCartSummaryItem } from "@/types/cartTypes";

type Props = {
  items: TCartSummaryItem[];
};

const OrderSummaryItem = ({ items }: Props) => {
  const totalPrice = items.reduce((acc, item) => acc + item.price, 0);
  const deliveryFee = 0;
  const finalPrice = totalPrice + deliveryFee;

  return (
    <div className="rounded-xl border p-4 space-y-3">
      <p className="font-semibold text-lg">주문 예상 금액</p>

      <div className="flex justify-between text-sm">
        <span>총 상품 가격</span>
        <span>{totalPrice.toLocaleString()}원</span>
      </div>

      <div className="flex justify-between text-sm">
        <span>총 배송비</span>
        <span>{deliveryFee.toLocaleString()}원</span>
      </div>

      <hr />

      <div className="flex justify-between font-semibold">
        <span>결제 예상 금액</span>
        <span>{finalPrice.toLocaleString()}원</span>
      </div>

      <Button className="w-full mt-2">
        구매하기
      </Button>
    </div>
  );
};

export default OrderSummaryItem;
