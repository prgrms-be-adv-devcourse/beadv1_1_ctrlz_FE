"use client"
import CartSummaryItem from '@/components/cart/cartSummaryItem';
import OrderSummaryItem from '@/components/cart/orderSummaryItem';
import { Sectiontitle } from '@/components/ui/sectionTitle';
import { dummyCartSummaryItem } from '@/data/cartItem';
import { TCartSummaryItem } from '@/types/cartTypes'
import React, { useEffect, useState } from 'react'

const Cart = () => {

  const [cartItems, setCartItems] = useState<TCartSummaryItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<TCartSummaryItem[]>([]);

  useEffect(() => {
    setCartItems(dummyCartSummaryItem.data);
  }, []);

  const toggleItem = (item: TCartSummaryItem, checked: boolean) => {
    setSelectedItems((prev) => {
      if (checked) {
        return [...prev, item];
      }
      return prev.filter((i) => i.cartItemId !== item.cartItemId);
    });
  };

  return (
    <div
      className="mx-auto mt-5 w-full max-w-[1200px] px-4 flex flex-col gap-6 lg:flex-row lg:gap-10"
    >
      
      
      <div className="flex-1">
      <div>
        <Sectiontitle
          className='p-2'
        >
          장바구니 목록({cartItems.length})
        </Sectiontitle>
      </div>
      <div className="flex-1 flex flex-col gap-4 mb-2 max-h-[600px] overflow-y-auto pr-2 ">
        {
          cartItems && cartItems.map((item) => 
            <CartSummaryItem
              key={item.cartItemId}
              item={item}
              checked={selectedItems.some(
                (selected) => selected.cartItemId === item.cartItemId
              )}
              onCheckedChange={(checked) => toggleItem(item, checked)}
            />
          )
        }
      </div>
      
      </div>
     
      <div className="w-full lg:w-[340px] mb-4">
        <OrderSummaryItem items={selectedItems} />
      </div>
      
    </div>
  )
}

export default Cart
