import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import UserDeposit from './userDeposit'

const UserMenu = () => {
  return (
    <div className="flex justify-center items-center gap-4">
      <UserDeposit/>
      <FontAwesomeIcon icon={faCartShopping} size="lg" className='hover:cursor-pointer'/>
      <FontAwesomeIcon icon={faUser} size="lg" className='hover:cursor-pointer'/>
    </div>
  )
}

export default UserMenu
