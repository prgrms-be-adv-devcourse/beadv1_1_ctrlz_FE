"use client";

import { DUMMY_KEYWORDS } from "@/data/searchKeyword";
import { getDaliyPopularKeywordList } from "@/services/getPopularKeywordList";
import { TPopularKeyword } from "@/types/searches";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SearchDailyPopularSummary = () => {
  const router = useRouter();
  const defaultKeyword = "잠시만 기다려주세요...";

  const [daliyPopularKeywordList, setList] = useState<TPopularKeyword[]>([{
    originValue: defaultKeyword,
    qwertyInput: "wkatlaks rlekfuwntpdy..."
  }]);

  // 2시간마다 일간 인기 검색어 목록 갱신
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await getDaliyPopularKeywordList();
        const keywordList = res.data.filter((keyword) => !!keyword.originValue);

        if (!isMounted) return;
        if (!res?.data) return;
        if (keywordList.length === 0) return; // 결과 리스트 없으면 기존 상태 유지

        setList(keywordList);
      } catch (err) {
        console.error("Failed to fetch daily popular keywords", err);
      }
    };

    // 최초 1회 실행
    fetchData();

    // 2시간(7200000ms)마다 실행
    const intervalId = setInterval(fetchData, 1000 * 60 * 60 * 2);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const handleClickKeyword = (keyword: string) => {
    if(keyword === defaultKeyword) {
      return;
    }
    router.push(`/search?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="font-semibold text-gray-600">🔥 인기 검색어</span>

      <ul className="flex items-center gap-2">
        {daliyPopularKeywordList.map((keyword, index) => (
          <li
            key={index}
            onClick={() => handleClickKeyword(keyword.originValue)}
            className="cursor-pointer rounded-full bg-white px-3 py-1 text-gray-700 shadow-sm hover:bg-[#A57C76] hover:text-white transition"
          >
            {keyword.originValue}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchDailyPopularSummary;
