import React, { useState } from 'react'
import { Sectiontitle } from '../ui/sectionTitle'
import { Button } from '@/components/ui/button'
import { TRecommand, TRecommandResponse } from '@/types/aiTypes'
import { getRecommand } from '@/services/getRecommand'
import { getAiRecommand } from '@/services/getAiRecommand'

type Props = {
  keyword?: string;
}

const AiRecommandResult = ({keyword}: Props) => {

  const [recommand, setRecommand] = useState<TRecommand>();
  const [isFetching, setFetching] = useState<boolean>(false);

  const getAiRecommandResult = async (keyword?: string) => {
    if(isFetching) {
      alert('잠시만 기다려주세요.')
    }
    try {
      setFetching(true);
      if(keyword) {
        const res = await getAiRecommand(keyword);
        setRecommand(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  }

  return (
    <div
      className='border-[#A57C76] bg-[#F9F6F3]'
    >
      <Sectiontitle>AI 추천 상품</Sectiontitle>
      <Button
        variant='destructive'
        size='lg'
        onClick={() => getAiRecommandResult(keyword)}
      >
        추천 받기
      </Button>
      <div>
        {isFetching && <p>답변 생성 중입니다...</p>}
        <p>{recommand?.message}</p>
      </div>
    </div>
  )
}

export default AiRecommandResult
