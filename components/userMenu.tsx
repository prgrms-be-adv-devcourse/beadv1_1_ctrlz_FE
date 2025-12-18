"use client"
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import LoginModal from '@/components/login/loginModal'
import UserDeposit from './userDeposit'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import Link from 'next/link'
import { Button } from './ui/button'

const UserMenu = () => {
  const { isLogin, checkAuth, isChecking } = useAuthStore();
  const pathname = usePathname();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth, pathname]);

  if (isChecking) {
    return null; // 또는 로딩 UI
  }

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
        onSuccess={async () => {
          await checkAuth();
          setIsLoginModalOpen(false);
        }}
      />
    </div>
  )
}

export default UserMenu
