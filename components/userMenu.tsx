"use client"
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import UserDeposit from './userDeposit'
import { useRouter } from 'next/navigation'

const UserMenu = () => {

  const router = useRouter(); 
  const moveToCart = () => {
    router.push('/cart/checkout')
  }
  return (
    <div className="flex justify-center items-center gap-4">
      <UserDeposit/>
      <FontAwesomeIcon 
        icon={faCartShopping} 
        size="lg" 
        className='hover:cursor-pointer'
        onClick={() => moveToCart()}
      />
      <FontAwesomeIcon icon={faUser} size="lg" className='hover:cursor-pointer'/>
    </div>
  )
}

export default UserMenu
