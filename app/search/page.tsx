"use client";

import ProductSummaryList from '@/components/products/productSummaryList'
import SearchFilterForm from '@/components/search/searchFilterForm'
import { dummyCategoryList } from '@/data/category';
import { dummyPagedProductList, dummyRecommandProductList } from '@/data/productPost'
import { dummyTagList } from '@/data/tag';
import { TCategory } from '@/types/categoryTypes';
import { TProductPageSummaryItem } from '@/types/productPostTypes'
import { TSearchQueryParams } from '@/types/searches'
import { TTag } from '@/types/tagTypes';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import ApiPagination from '@/components/search/apiPagination';
import SearchPagination from '@/components/search/searchPagination';
import { getSearchedPostResult } from '@/services/getProductPostSummaryList';
import AiRecommandResult from '@/components/products/aiRecommandResult';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getCategoryList } from '@/services/getCategoryList';
import { getTagList } from '@/services/getTagList';

type Props = {
  searchParams: Promise<TSearchQueryParams>
}

const Search = ({ searchParams }: Props) => {
  const resolvedParams = React.use(searchParams);

  const router = useRouter();

  const [searchProductResponseList, setProductResponseList] = useState<TProductPageSummaryItem | null>(null);

  const [category, setCategory] = useState<TCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(resolvedParams.category ?? "");
  const [minPrice, setMinPrice] = useState<string>(
    resolvedParams.minPrice !== undefined ? String(resolvedParams.minPrice) : ""
  );
  const [maxPrice, setMaxPrice] = useState<string>(
    resolvedParams.maxPrice !== undefined ? String(resolvedParams.maxPrice) : ""
  );
  const [tags, setTags] = useState<TTag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>(
    resolvedParams.tags
      ? resolvedParams.tags.split(",")
      : []
  ); //id값이 저장.

  const [selectedStatus, setSelectedStatus] = useState<"NEW" | "GOOD" | "ALL">(
    resolvedParams.status ?? "ALL"
  );

  const [selectedTradeStatus, setSelectedTradeStatus] = useState<
    "SELLING" | "ALL"
  >(resolvedParams.tradeStatus ?? "ALL");

  const [sort, setSort] = useState<"score"| "popular"| "price_asc"| "price_desc"| "newest"| "listing_count_desc">(
    resolvedParams.sort ?? "score"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postRes = await getSearchedPostResult(resolvedParams);
        const categoryRes = await getCategoryList();
        const tagRes = await getTagList();
        setProductResponseList(postRes);
        setCategory(categoryRes.data);
        setTags(tagRes.data);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    // 여기서 검색 API 호출 (fetch)
    console.log("검색 조건 변경 → 재요청", resolvedParams);
  }, [resolvedParams])

  const handleChangeCategory = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  }

  const handleChangeMinprice = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setMinPrice(e.target.value);
  }

  const handleChangeMaxPrice = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setMaxPrice(e.target.value);
  }

  const handleChangeTags = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedTags(prev =>
      prev.includes(selectedValue)
        ? prev.filter(tag => tag !== selectedValue)
        : [...prev, selectedValue]
    );
  };

  const handleChangeStatus = (value: "NEW" | "GOOD" | "ALL") => {
    setSelectedStatus(value);
  };

  const handleChangeTradeStatus = (value: "SELLING" | "ALL") => {
    setSelectedTradeStatus(value);
  };

  const handleChangeSort = (value: "score"| "popular"| "price_asc"| "price_desc"| "newest"| "listing_count_desc") => {
    setSort(value);
  };

  const applySearch = () => {
    const params = new URLSearchParams();

    if (resolvedParams.q) params.set("q", resolvedParams.q);

    const minPriceNum = minPrice !== "" ? Number(minPrice) : undefined;
    const maxPriceNum = maxPrice !== "" ? Number(maxPrice) : undefined;

    if (minPriceNum !== undefined) params.set("minPrice", String(minPriceNum));
    if (maxPriceNum !== undefined) params.set("maxPrice", String(maxPriceNum));

    if (
      minPriceNum !== undefined &&
      maxPriceNum !== undefined &&
      minPriceNum > maxPriceNum
    ) {
      alert("최소 금액은 최대 금액보다 클 수 없습니다.");
      return;
    }

    if (selectedCategory) params.set("category", selectedCategory);

    if (selectedTags.length > 0) params.set("tags", selectedTags.join(","));

    if (selectedStatus !== "ALL") params.set("status", selectedStatus);
    if (selectedTradeStatus !== "ALL") params.set("tradeStatus", selectedTradeStatus);

    if (sort !== "score") params.set("sort", sort);

    router.push("/search?" + params.toString());
  };

  

  return (
    <div
      className='flex flex-col lg:w-[80vw] m-auto gap-y-2'
    >
      {/* SearchBox에서 옵션을 선택하면 갑 변경*/}
      <SearchFilterForm
        params={resolvedParams}
        category={category}
        tag={tags}
        selectedCategory={selectedCategory}
        selectedTags={selectedTags}
        selectedStatus={selectedStatus}
        selectedTradeStatus={selectedTradeStatus}
        sort={sort}
        minPrice={minPrice}
        maxPrice={maxPrice}
        handleChangeCategory={handleChangeCategory}
        handleChangeMinPrice={handleChangeMinprice}
        handleChangeMaxPrice={handleChangeMaxPrice}
        handleChangeTags={handleChangeTags}
        handleChangeStatus={handleChangeStatus}
        handleChangeTradeStatus={handleChangeTradeStatus}
        handleChangeSort={handleChangeSort}
      />
      {searchProductResponseList && (
        <ProductSummaryList
          title={`"${resolvedParams.q}" 검색 결과`}
          items={searchProductResponseList.contents}
          headerRight={
            <Link href="/post/enroll">
              <Button variant="link">상품 등록</Button>
            </Link>
          }
          subHeader={<AiRecommandResult keyword={resolvedParams.q} />}
        />
          
      )}
      {searchProductResponseList && (
        <SearchPagination
          current={Number(
            resolvedParams.page ?? searchProductResponseList.pageNum
          )}
          route="search"
          length={searchProductResponseList.totalPages}
          params={resolvedParams}
          hasNext={searchProductResponseList.hasNext}
        />
      )}
    </div>
  )
}

export default Search
