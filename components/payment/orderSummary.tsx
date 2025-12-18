import React from 'react'

interface OrderSummaryProps {
  variant: 'success' | 'fail'
  orderId: string
  orderName: string
  usedDepositAmount: number
  totalAmount: number
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  variant,
  orderId,
  orderName,
  usedDepositAmount,
  totalAmount,
}) => {
  const borderColor =
    variant === 'success' ? 'border-green-500' : 'border-red-500'

  return (
    <div className={`text-left border rounded-lg p-4 mb-6 space-y-3 ${borderColor}`}>
      <h3 className="font-medium text-gray-800 mb-2">주문 정보</h3>

      <div className="flex justify-between text-sm">
        <span className="text-gray-500">주문번호</span>
        <span className="font-medium">{orderId}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-gray-500">상품명</span>
        <span className="font-medium">{orderName}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-gray-500">사용한 예치금</span>
        <span className="font-medium">₩ {usedDepositAmount.toLocaleString()}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-gray-500">결제금액</span>
        <span className="font-medium">₩ {totalAmount.toLocaleString()}</span>
      </div>
    </div>
  )
}

export default OrderSummary
