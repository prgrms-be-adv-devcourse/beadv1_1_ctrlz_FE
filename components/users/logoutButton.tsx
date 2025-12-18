import React from 'react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/authStore'
import { processLogout } from '@/services/logout';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {

  const {logout} = useAuthStore();

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await processLogout();
      logout();
      router.replace('/');
    } catch (err) {
      console.error(err);
    }

  }


  return (
    <Button
      variant='link'
      className='hover:cursor-pointer text-[#2E2B2F]'
      onClick={() => handleLogout()}
    >
      로그아웃
    </Button>
  )
}

export default LogoutButton
