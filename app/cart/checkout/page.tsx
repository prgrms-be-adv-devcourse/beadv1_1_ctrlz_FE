"use client"
import OrderSummaryItem from '@/components/cart/orderSummaryItem';
import { dummyCartSummaryItem } from '@/data/cartItem';
import { TCartSummaryItem } from '@/types/cartTypes'
import React, { useEffect, useState } from 'react'

const Cart = () => {

  const [cartItems, setCartItems] = useState<TCartSummaryItem[]>([]);

  useEffect(() => {
    setCartItems(dummyCartSummaryItem.data);
  }, []);

  return (
    <div>
      
      <OrderSummaryItem
      items={cartItems}
      />
    </div>
  )
}

export default Cart
