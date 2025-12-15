import Link from 'next/link';
import React from 'react'

const Footer = () => {
  return (
    <div className="bg-[#2E2B2F] h-20 flex items-center justify-center">
      <Link
        href="/default"
        className="text-[#F9F6F3] hover:text-primary transition-colors cursor-pointer"
      >
        기본 홈화면으로 이동하기
      </Link>
    </div>
  )
}

export default Footer;
