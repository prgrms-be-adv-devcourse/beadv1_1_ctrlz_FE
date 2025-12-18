"use client"

import MainCarousel from "@/components/mainCarousel";
import { Sectiontitle } from "@/components/ui/sectionTitle";
import { TProductSummaryItem } from "@/types/productPostTypes";
import { dummyRecommandProductList } from "@/data/productPost";
import ProductSummaryList from "@/components/products/productSummaryList";
import { useAccessTokenStore } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getDailyProductList } from "@/services/getProductPostSummaryList";

export default function Home() {
  
  const [dailyProductList, setDailyProductList] = useState<TProductSummaryItem[]>([]); 

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDailyProductList();

      setDailyProductList(res.contents);
    }

    fetchData();
  },[])

  return (
    <div className="w-full sm:w-[95vw] md:w-[90vw] lg:w-[80vw] m-auto p-5">
      <MainCarousel/>
      <section className="mt-10"> 
        <Sectiontitle></Sectiontitle>
        <ProductSummaryList
          items={dailyProductList || []}
          title="오늘의 추천 상품"
        />
      </section>
    </div>
  );
}
