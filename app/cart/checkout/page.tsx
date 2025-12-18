"use client"
import CartSummaryItem from '@/components/cart/cartSummaryItem';
import OrderSummaryItem from '@/components/cart/orderSummaryItem';
import Modal from '@/components/modal';
import PaymentRequest from '@/components/payment/paymentRequest';
import { Sectiontitle } from '@/components/ui/sectionTitle';
import { dummyCartSummaryItem } from '@/data/cartItem';
import { deleteCartItem } from '@/services/deleteCartItem';
import { getCartItemList } from '@/services/getCartItemList';
import { TCartSummaryItem } from '@/types/cartTypes'
import { TPaymentInfo } from '@/types/paymentTypes';
import React, { useEffect, useState } from 'react'

const Cart = () => {

  const [cartItems, setCartItems] = useState<TCartSummaryItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<TCartSummaryItem[]>([]);
  const [isFetching, setFetching] = useState<boolean>(false);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState<boolean>(false);
  const [payInfo, setPayInfo] = useState<TPaymentInfo>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCartItemList();
      setCartItems(res.data);
    }
    
    fetchData();
  }, []);


  const toggleItem = (item: TCartSummaryItem, checked: boolean) => {
    setSelectedItems((prev) => {
      if (checked) {
        return [...prev, item];
      }
      return prev.filter((i) => i.cartItemId !== item.cartItemId);
    });
  };

  const deleteItem = async (cartItemId: string) => {
    const res = await deleteCartItem(cartItemId);
    alert(res.data);
  }

  return (
    <div
      className="mx-auto mt-5 w-full max-w-[1200px] px-4 flex flex-col gap-6 lg:flex-row lg:gap-10"
    >
      {/* 서버에서 결제 정보 가져오는 동안 보이는 Modal */}
      <Modal isModalOpen={isFetching} closeModal={() => setFetching(false)}>
        <div className="flex flex-col items-center justify-center min-h-[200px] bg-white rounded-xl px-8 py-10 shadow-lg">
          <span className="text-lg font-semibold mb-6 text-center">결제 정보 생성중입니다...</span>
          <div className="w-56">
          </div>
        </div>
      </Modal>

      {/* 결제 정보 가져온 후 결제할 수 있는 컴포넌트가 있는 Modal  */}
      <Modal
        isModalOpen={isPaymentModalOpen}
        closeModal={() => setPaymentModalOpen(false)}
      >
        <div className="flex flex-col items-center justify-center min-h-[200px] bg-white rounded-xl px-8 py-10 shadow-lg">
          {payInfo && <PaymentRequest payInfo={payInfo} />}
        </div>
      </Modal>
      
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
              onDelete={() => deleteItem(item.cartItemId)}
            />
          )
        }
      </div>
      
      </div>
     
      <div className="w-full lg:w-[340px] mb-4">
        <OrderSummaryItem
          isFetching={isFetching}
          items={selectedItems}
          setProgressingModal={setFetching}
          setPayInfo={setPayInfo}
          setPayModalOpen={setPaymentModalOpen}
        />
      </div>
      
    </div>
  )
}

export default Cart
