import { faWallet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const UserDeposit = () => {
  return (
    // border-radius 속성 지정, border 두께 조정
    <div className='border-2 border-[#A57C76] rounded-2xl p-2 flex items-center gap-2 justify-center'> 
      <FontAwesomeIcon icon={faWallet} size="lg" className='hover:cursor-pointer'/>
      <div>14,000</div>
    </div>
  )
}

export default UserDeposit
