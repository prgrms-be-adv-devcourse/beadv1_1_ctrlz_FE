import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '@/public/logo.svg'
import UserMenu from '@/components/userMenu'
import SearchInput from './search/searchInput'

const Header = () => {
  
  return (
    <header>
      <div className="fixed z-50 h-20 w-full bg-white shadow-md">
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
    </header>
  )
}

export default Header;
