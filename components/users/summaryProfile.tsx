import React from 'react'

type SummaryProfileProps = {
  nickname: string;
  profileImage: string;
}

const SummaryProfile = ({nickname, profileImage}: SummaryProfileProps) => {
  return (
    <div>
      <img 
        className='inline w-10 h-10 mr-2'
        src={profileImage} 
        alt="이미지"
      />
      <span>{nickname}</span>
    </div>
  )
}

export default SummaryProfile
