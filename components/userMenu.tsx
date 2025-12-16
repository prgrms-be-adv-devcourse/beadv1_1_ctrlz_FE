"use client"
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import LoginModal from '@/components/login/loginModal'
import UserDeposit from './userDeposit'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { getMyInfo } from '@/services/getMyInfo'
import { Button } from './ui/button'

const UserMenu = () => {
  const {isLogin, checkAuth, login} =  useAuthStore();
  const pathname = usePathname();
  const { data } = useQuery({
    queryKey: ["getMyInfo"],
    queryFn: getMyInfo,
    enabled: isLogin,
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="flex justify-center items-center gap-4">
      {
        isLogin ? (
          <>
            <UserDeposit/>
            <Link
              href={'/cart/checkout'}
            >
              <FontAwesomeIcon 
                icon={faCartShopping} 
                size="lg" 
                className='hover:cursor-pointer'
              />
            </Link>
            <Link
              href={'/myPage'}
            >
              <FontAwesomeIcon 
                icon={faUser} 
                size="lg" 
                className='hover:cursor-pointer'
              />
            </Link>
          </>
        ) : (
          <Button
            variant='link'
            onClick={() => setIsLoginModalOpen(true)}
          >
            로그인
          </Button>
        )
      }
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  )
}

export default UserMenu
