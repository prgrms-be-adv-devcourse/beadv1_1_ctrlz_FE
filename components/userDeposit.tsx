import { formatPrice } from '@/lib/price'
import { getDeposit } from '@/services/getDeposit'
import { faWallet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'

const UserDeposit = () => {

  const [deposit, setDeposit] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDeposit();
        const data = await res.data;
        setDeposit(data.balance);
      } catch (err) {
        console.error(err);
        
      }
      
      fetchData();
    }
  }, [])
  return (
    // border-radius 속성 지정, border 두께 조정
    <div className='border-2 border-[#A57C76] rounded-2xl p-2 flex items-center gap-2 justify-center'> 
      <FontAwesomeIcon icon={faWallet} size="lg" className='hover:cursor-pointer'/>
      <div>{formatPrice(deposit)}</div>
    </div>
  )
}

export default UserDeposit
