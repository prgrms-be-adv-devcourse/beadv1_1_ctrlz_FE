"use client";

import {
  loadTossPayments,
  ANONYMOUS,
} from "@tosspayments/tosspayments-sdk";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { processDepositPayment, processPaymentConfirm } from "@/services/processPayment";
import { TPaymentInfo, TRequestPaymentConfirm } from "@/types/paymentTypes";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  payInfo: TPaymentInfo;
};

const PaymentRequest = ({ payInfo }: Props) => {
  const [useDeposit, setUseDeposit] = useState(false);
  const [finalAmount, setFinalAmount] = useState(payInfo.amount);
  const [usedDeposit, setUsedDeposit] = useState(0);
  const [widgets, setWidgets] = useState<any>(null);
  const [ready, setReady] = useState(false);

  const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;

  const router = useRouter();

  const displayOrderId = useMemo(() => {
    return payInfo.orderId.split("-").slice(0, 3).join("-");
  }, [payInfo.orderId]);

  /** 예치금 계산 */
  useEffect(() => {
    if (useDeposit) {
      const used = Math.min(payInfo.depositBalance, payInfo.amount);
      setUsedDeposit(used);
      setFinalAmount(payInfo.amount - used);
    } else {
      setUsedDeposit(0);
      setFinalAmount(payInfo.amount);
    }
  }, [useDeposit, payInfo]);

  /** Toss 위젯 초기화 */
  useEffect(() => {
    async function initToss() {
      const tossPayments = await loadTossPayments(clientKey);

      const widgets = tossPayments.widgets({
        customerKey: ANONYMOUS,
      });

      setWidgets(widgets);
    }

    initToss();
  }, [clientKey]);

  /** 위젯 렌더링 */
  useEffect(() => {
    if (!widgets) return;

    async function renderWidgets() {
      await widgets.setAmount({
        currency: "KRW",
        value: finalAmount,
      });

      await Promise.all([
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        }),
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      setReady(true);
    }

    renderWidgets();
  }, [widgets]);

  /** 금액 변경 시 반영 */
  useEffect(() => {
    if (!widgets) return;

    widgets.setAmount({
      currency: "KRW",
      value: finalAmount,
    });
  }, [finalAmount, widgets]);

  /** 결제 요청 */
  const handlePayment = async () => {
    const request: TRequestPaymentConfirm = {
      orderId: payInfo.orderId,
      amount: payInfo.amount,
      usedDepositAmount: usedDeposit,
      totalAmount: finalAmount,
      paymentKey: ""
    };

    const queryParams = new URLSearchParams();
    queryParams.set("orderId", payInfo.orderId);
    queryParams.set("orderName", payInfo.orderName);
    queryParams.set("usedDepositAmount", String(usedDeposit));
    queryParams.set("totalAmount", String(finalAmount));

    if (finalAmount === 0) {
      try{
        const res = await processDepositPayment(request);
        router.push(`/payments/succes?${queryParams.toString()}`)
      } catch (err) {
        alert(err);
      }
    }
    
    await widgets.requestPayment({
      orderId: payInfo.orderId,
      orderName: payInfo.orderName,
      successUrl: `${window.location.origin}/payment/success?${queryParams.toString()}`,
      failUrl: `${window.location.origin}/payment/fail?${queryParams.toString()}`,
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6 max-h-[700px] overflow-y-scroll">
      <h2 className="text-xl font-semibold">결제 확인</h2>

      <div className="space-y-1 text-sm text-gray-700">
        <p className="font-medium">{payInfo.orderName}</p>
        <p className="text-gray-500">주문번호: {displayOrderId}</p>
      </div>

      <div className="border-t pt-4 space-y-2 text-sm">
        <Row label="상품금액" value={payInfo.amount} />
        <Row label="보유 예치금" value={payInfo.depositBalance} />

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={useDeposit}
            onChange={(e) => setUseDeposit(e.target.checked)}
            disabled={!ready}
          />
          예치금 전액 사용
        </label>

        <Row label="사용한 예치금" value={usedDeposit} />
        <Row label="배송비" text="무료" />
        <Row label="총 결제금액" value={finalAmount} highlight />
      </div>

      <div id="payment-method" />
      <div id="agreement" />

      <Button
        disabled={!ready}
        onClick={handlePayment}
        className="w-full py-3 rounded-lg bg-[#A57C76] text-white font-medium hover:bg-[#946963]"
      >
        결제하기
      </Button>
    </div>
  );
};

const Row = ({
  label,
  value,
  text,
  highlight,
}: {
  label: string;
  value?: number;
  text?: string;
  highlight?: boolean;
}) => (
  <div className="flex justify-between">
    <span className="text-gray-600">{label}</span>
    <span className={highlight ? "font-semibold text-black" : "text-gray-800"}>
      {value !== undefined ? `₩ ${value.toLocaleString()}` : text}
    </span>
  </div>
);

export default PaymentRequest;