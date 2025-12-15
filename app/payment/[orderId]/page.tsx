"use client"
import { useParams } from 'next/navigation';
import React from 'react'

const PaymentReady = () => {
  const { orderId } = useParams<{orderId: string}>();

  return (
    <div>
      <p>orderId : {orderId}</p>
    </div>
  )
}

export default PaymentReady
