import { TProductSummaryItem } from "@/types/productPostTypes";
import React from "react";
import { Button } from "../ui/button";
import { TCartSummaryItem } from "@/types/cartTypes";
import { useRouter } from "next/navigation";
import { prepareOrderInfo } from "@/services/prepareOrder";

type Props = {
  items: TCartSummaryItem[];
  isFetching: boolean
  setProgressingModal: (v: boolean) => void;
  setPayInfo: (info: any) => void;
  setPayModalOpen: (v: boolean) => void;
};

const OrderSummaryItem = ({
  items,
  isFetching,
  setProgressingModal,
  setPayInfo,
  setPayModalOpen,
}: Props) => {
  const totalPrice = items.reduce((acc, item) => acc + item.price, 0);
  const deliveryFee = 0;
  const finalPrice = totalPrice + deliveryFee;
  const router = useRouter();

  const moveToPaymentPage = async () => {
    if(isFetching) return;
    try {
      setProgressingModal(true);
      const cartItemIds = items.map(item => item.cartItemId);
      const res = await prepareOrderInfo(cartItemIds);
      setPayInfo(res.data);
    } catch (e) {
      alert(e);
    } finally {
      setProgressingModal(false);
      setPayModalOpen(true);
    }  
  }

  return (
    <div 
      className="
        rounded-xl border p-4 space-y-3
        lg:w-[400px] sm:w-[90vw] max-h-fit
        sm:mb-4
      "
    >
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

      <Button 
        className="w-full mt-2"
        onClick={() => moveToPaymentPage()}
      >
        구매하기
      </Button>
    </div>
  );
};

export default OrderSummaryItem;
