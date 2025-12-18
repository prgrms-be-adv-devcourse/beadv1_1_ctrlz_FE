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
    <div className="mt-6 rounded-xl border border-[#A57C76] bg-[#F9F6F3] p-5">
      <div className="flex items-center justify-between">
        <Sectiontitle>AI 추천 상품</Sectiontitle>
        <Button
          variant="outline"
          size='lg'
          className="border-[#A57C76] text-[#A57C76] hover:bg-[#A57C76] hover:text-white"
          onClick={() => getAiRecommandResult(keyword)}
        >
          추천 받기
        </Button>
      </div>
      <div className="my-4 h-px w-full bg-[#E6DED8]" />
      <div className="rounded-lg bg-white p-4 text-sm text-gray-700">
        {isFetching && <p className="mb-2 text-sm text-gray-400">AI가 추천을 생성 중입니다...</p>}
        <p>{recommand?.message}</p>
      </div>
    </div>
  )
}

export default AiRecommandResult
