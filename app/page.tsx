import MainCarousel from "@/components/mainCarousel";
import { Sectiontitle } from "@/components/ui/sectionTitle";
import { TProductSummaryItem } from "@/types/productPostTypes";
import { dummyRecommandProductList } from "@/data/productPost";
import ProductSummaryList from "@/components/products/productSummaryList";


export default async function Home() {

  //여기서 서버와 렌더링?
  const recommandProductList: TProductSummaryItem[] = dummyRecommandProductList.data;
  //각 카드 클릭시 상품 상세 페이지로 이동


  return (
    <div className="w-full sm:w-[95vw] md:w-[90vw] lg:w-[80vw] m-auto p-5">
      <MainCarousel/>
      <section className="mt-10"> 
        <Sectiontitle></Sectiontitle>
        <ProductSummaryList
          items={recommandProductList}
          title="오늘의 추천 상품"
        />
      </section>

    </div>
  );
}
