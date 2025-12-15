"use client"
import React from 'react'
import { Sectiontitle } from '../ui/sectionTitle'
import { TProductSummaryItem } from '@/types/productPostTypes'
import { Card, CardDate, CardDescription, CardHeader, CardImage, CardPrice, CardTitle } from '../ui/card'
import { useRouter } from 'next/navigation'
import { formatPrice } from '@/lib/price'
import { getTimeAgo } from '@/lib/date'

type Props = {
  items: TProductSummaryItem[];
  title: string;
};

const ProductSummaryList = ({ items, title }: Props) => {

  const router = useRouter();
  const moveToPostDetail = (id: string) => {
    router.push(`/post/detail/${id}`)
  }



  return (
    <section className="my-10"> 
        <Sectiontitle>{title}</Sectiontitle>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {
            items.map((item, index)=> 
              <Card
                className="border-none p-0 shadow-none m-auto hover:cursor-pointer"
                onClick={() => moveToPostDetail(item.id)}
                key={index}
              >
                <CardHeader>  
                  <CardImage
                    src={item.primaryImageUrl}
                    alt={item.title}
                  />
                </CardHeader>
                <CardDescription>
                    <CardTitle>{item.title}</CardTitle>
                    <CardPrice>{formatPrice(item.price)}원</CardPrice>
                    <CardDate>{getTimeAgo(item.updatedAt)}</CardDate>
                  </CardDescription>
              </Card>
            )
          }
          
        </div>
      </section>
  )
}

export default ProductSummaryList
