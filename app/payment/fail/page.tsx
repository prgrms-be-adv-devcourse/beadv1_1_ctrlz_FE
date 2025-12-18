"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import OrderSummary from "@/components/payment/orderSummary";

const PaymentFail = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [orderId, setOrderId] = useState("");
  const [orderName, setOrderName] = useState("");
  const [usedDepositAmount, setUsedDepositAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const rawOrderId = searchParams.get("orderId") ?? "";
    const rawOrderName = searchParams.get("orderName") ?? "";
    const usedDeposit = Number(searchParams.get("usedDepositAmount") ?? 0);
    const amount = Number(searchParams.get("totalAmount") ?? 0);

    let displayOrderId = rawOrderId;

    if (rawOrderId) {
      const parts = rawOrderId.split("-");
      if (parts.length >= 3) {
        displayOrderId = `${parts[0]}-${parts[1]}-${parts[2]}`;
      }
    }

    setOrderId(displayOrderId);
    setOrderName(rawOrderName);
    setUsedDepositAmount(usedDeposit);
    setTotalAmount(amount);
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 text-center">
        {/* 실패 아이콘 */}
        <div className="text-red-500 text-5xl font-bold mb-4">✕</div>

        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          결제에 실패했습니다
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          결제 과정에서 문제가 발생했습니다.
        </p>

        <OrderSummary
          variant="fail"
          orderId={orderId}
          orderName={orderName}
          usedDepositAmount={usedDepositAmount}
          totalAmount={totalAmount}
        />

        {/* 버튼 */}
        <div className="flex gap-3">
          <button
            onClick={() => router.back()}
            className="flex-1 rounded-md border border-gray-300 py-2 text-sm font-medium hover:cursor-pointer hover:bg-gray-100"
          >
            다시 시도
          </button>

          <button
            onClick={() => router.push("/")}
            className="flex-1 rounded-md bg-gray-900 text-white py-2 text-sm font-medium hover:cursor-pointer hover:bg-gray-800"
          >
            홈으로
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFail;