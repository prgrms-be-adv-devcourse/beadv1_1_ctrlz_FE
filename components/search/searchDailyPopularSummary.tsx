"use client";

import { DUMMY_KEYWORDS } from "@/data/searchKeyword";
import { getDaliyPopularKeywordList } from "@/services/getPopularKeywordList";
import { TAutoCompleteWord, TPopularKeyword } from "@/types/searches";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SearchDailyPopularSummary = () => {
  const router = useRouter();
  const defaultKeyword = "잠시만 기다려주세요...";

  const [daliyPopularKeywordList, setList] = useState<TAutoCompleteWord[]>([{
    word: defaultKeyword,
    qwertyInput: "wkatlaks rlekfuwntpdy..."
  }]);

  // 2시간마다 일간 인기 검색어 목록 갱신
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await getDaliyPopularKeywordList();

        console.log("🔥 daily popular keyword response:", res);
        console.log("🔥 res.data:", res?.data);
    
        const keywordList = res.data.filter(
          (keyword) => keyword.word && keyword.word.trim() !== ""
        );
    
        console.log("🔥 filtered keywordList:", keywordList);
    
        if (!isMounted) return;
        if (!res?.data) return;
        if (keywordList.length === 0) return;
    
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
    //"를 제거"
    keyword = keyword.replace(/"/g, "");
    router.push(`/search?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="font-semibold text-gray-600">🔥 인기 검색어</span>

      <ul className="flex items-center gap-2">
        {daliyPopularKeywordList.map((keyword, index) => (
          <li
            key={index}
            onClick={() => handleClickKeyword(keyword.word)}
            className="cursor-pointer rounded-full bg-white px-3 py-1 text-gray-700 shadow-sm hover:bg-[#A57C76] hover:text-white transition"
          >
            {keyword.word}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchDailyPopularSummary;
