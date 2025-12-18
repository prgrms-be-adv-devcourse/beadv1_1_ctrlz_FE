"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { processPaymentConfirm } from "@/services/processPayment";
import { TRequestPaymentConfirm } from "@/types/paymentTypes";
import { Button } from "@/components/ui/button";
import OrderSummary from "@/components/payment/orderSummary";

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const orderId = searchParams.get("orderId");
  const orderName = searchParams.get("orderName");
  const paymentKey = searchParams.get("paymentKey");

  const usedDepositAmount = Number(searchParams.get("usedDepositAmount") ?? 0);
  const totalAmount = Number(searchParams.get("totalAmount") ?? 0);

  /** 주문번호 축약 표시 */
  const displayOrderId = (() => {
    if (!orderId) return "";
    const parts = orderId.split("-");
    return parts.length >= 3
      ? `${parts[0]}-${parts[1]}-${parts[2]}`
      : orderId;
  })();

  useEffect(() => {
    // ✅ 예치금만 결제한 경우 (Toss confirm 필요 없음)
    if (totalAmount === 0) {
      setLoading(false);
      return;
    }


    // ✅ 일반 결제 → 서버 confirm 요청
    const confirmPayment = async () => {
      if (!paymentKey || !orderId) {
        throw new Error("결제 필수 정보가 없습니다.");
      }

      const requestData: TRequestPaymentConfirm = {
        paymentKey,
        orderId,
        amount: totalAmount + usedDepositAmount,
        usedDepositAmount: usedDepositAmount,
        totalAmount: totalAmount
      }

      try {
        const res = await processPaymentConfirm(requestData);

        if (
          res.message === "결제 처리 완료" ||
          res.message === "이미 처리된 결제입니다."
        ) {
          setLoading(false);
        } else {
          throw new Error("결제 실패");
        }
      } catch (err) {
        console.error("결제 확인 실패:", err);

        router.replace(
          `/payment/fail?orderId=${orderId}&orderName=${orderName}&usedDepositAmount=${usedDepositAmount}&totalAmount=${totalAmount}`
        );
      }
    };

    confirmPayment();
  }, [
    orderId,
    orderName,
    paymentKey,
    totalAmount,
    usedDepositAmount,
    router,
  ]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow">
        {loading ? (
          <div className="text-center text-gray-600">
            결제 정보를 확인 중입니다...
          </div>
        ) : (
          <>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-2xl text-white">
                ✓
              </div>
              <h1 className="text-xl font-bold">결제가 완료되었습니다</h1>
              <p className=" text-sm text-gray-500">
                주문이 정상적으로 처리되었습니다.
              </p>
            </div>

            <OrderSummary
              variant="success"
              orderId={displayOrderId}
              orderName={orderName ?? ""}
              usedDepositAmount={usedDepositAmount}
              totalAmount={totalAmount}
            />

            <Button
              onClick={() => router.push("/")}
              className="mt-6 w-full rounded-md bg-[#A57C76] py-2 text-white hover:cursor-pointer hover:bg-[#946963]"
            >
              확인
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccessPage;