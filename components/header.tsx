"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import logo from '@/public/logo.svg'
import UserMenu from '@/components/userMenu'
import SearchInput from './search/searchInput'
import SearchDailyPopularSummary from './search/searchDailyPopularSummary'
import LogoutButton from './users/logoutButton'
import { useAuthStore } from '@/store/authStore'

const Header = () => {
  const { isLogin, isChecking, checkAuth } = useAuthStore()

  // 최초 마운트 시 서버 기반 로그인 상태 확인
  useEffect(() => {
    checkAuth()
  }, [checkAuth])



  return (
    <header>
      <div className="fixed top-0 z-50 h-20 w-full bg-white shadow-md">
        <div className="m-auto flex h-20 max-w-6xl justify-between p-4">
          <div className="flex items-center gap-4"> 
            <Link href="/">
              <h1 className="cursor-pointer">
                <Image src={logo} alt="logo" width={150} />
              </h1>
            </Link>
          </div>

          <SearchInput />

          <div className="flex gap-8">
            <UserMenu />
          </div>
        </div>
      </div>

      {/* 하단 서브 헤더 영역 */}
      <div className="fixed top-20 z-40 w-full border-t bg-gray-50">
        <div className="m-auto flex max-w-6xl items-center justify-end gap-6 px-4 py-3">
          <SearchDailyPopularSummary />

          {/* 로그인 상태일 때만 로그아웃 버튼 노출 */}
          {isLogin && <LogoutButton />}
        </div>
      </div>
      <div className="h-12" />

    </header>
  )
}

export default Header
