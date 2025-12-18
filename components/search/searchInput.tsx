"use client"
import React, { useEffect, useRef, useState, useTransition } from 'react'
import { createPortal } from "react-dom";
import { Input } from '@/components/ui/input'
import { Button } from '../ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { getAutoCompleteWordList } from '@/services/getAutoCompleteWordList';
import { saveKeyWord } from '@/services/saveKeyword';
import { getTrendPopularKeywordList } from '@/services/getPopularKeywordList';
import { TAutoCompleteWord } from '@/types/searches';

const SearchInput = () => {

  //여기서 검색어 자동완성 api 호출해도 돼?
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const [keyword,setKeyword] = useState(q);

  const [autoCompleteResults, setAutoCompleteResults] = useState<TAutoCompleteWord[]>([]);
  const [popularKeywords, setPopularKeywords] = useState<TAutoCompleteWord[]>([]);
  const [showPopular, setShowPopular] = useState(false);
  const [isPending, startTransition] = useTransition();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [dropdownStyle, setDropdownStyle] = useState<{
    width: number;
    left: number;
    top: number;
  } | null>(null);
  
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setKeyword(q);
  }, [q]);


  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);

    if (!value.trim()) {
      setAutoCompleteResults([]);
      setShowPopular(true);
      return;
    } else {
      setShowPopular(false);
    }

    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownStyle({
        width: rect.width,
        left: rect.left,
        top: rect.bottom + 6, // 🔥 input 바로 아래 + 여백
      });
    }

    try {
      const res = await getAutoCompleteWordList(value);
      console.log(res);
      
      setAutoCompleteResults(res.data);
    } catch(e) {
      console.error(e);
    }
  }

  const handleFocus = async () => {
    if (!keyword.trim()) {
      if (inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        setDropdownStyle({
          width: rect.width,
          left: rect.left,
          top: rect.bottom + 6,
        });
      }
      try {
        const res = await getTrendPopularKeywordList();
        setPopularKeywords(res.data);
        setShowPopular(true);
      } catch(e) {
        console.error(e);
      }
    }
  }

  const MoveToSearchResult = async (searchWord?: string) => {
    const value = searchWord ?? keyword;

    await saveKeyWord(value);
    setAutoCompleteResults([]);
    setShowPopular(false);

    // 🔥 조건 초기화: 새로운 URLSearchParams 사용
    const nextSearchParams = new URLSearchParams();
    nextSearchParams.set("q", value);

    const nextUrl = "/search?" + nextSearchParams.toString();
    const currentUrl = pathname + "?" + params.toString();

    startTransition(() => {
      // ✅ 동일 URL이어도 검색 결과를 다시 가져오도록 강제 리프레시
      if (nextUrl === currentUrl) {
        router.refresh();
        return;
      }

      router.push(nextUrl);
    });
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // SearchInput 영역 클릭이면 닫지 않음
      if (containerRef.current?.contains(target)) return;

      // Portal로 뜬 자동완성 영역 클릭이면 닫지 않음
      if (dropdownRef.current?.contains(target)) return;

      setAutoCompleteResults([]);
      setShowPopular(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="flex items-center gap-3 w-1/2 relative x-70">
        <Input
          ref={inputRef}
          className='border-[#A57C76] border-2'
          placeholder='검색어를 입력하세요.'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
          onFocus={handleFocus}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // 폼 제출 방지
              MoveToSearchResult();
            }
          }}
          value={keyword}
        />
        {( (autoCompleteResults.length > 0 && !showPopular) || (showPopular && popularKeywords.length > 0) ) &&
          dropdownStyle &&
          typeof window !== "undefined" &&
          createPortal(
            <div
              ref={dropdownRef}
              style={{
                position: "fixed",
                top: dropdownStyle.top,
                left: dropdownStyle.left,
                width: dropdownStyle.width,
              }}
              className="z-70"
              onMouseDown={(e) => {
                // document mousedown(outside-click)보다 먼저 실행되는 단계에서 차단
                e.stopPropagation();
              }}
            >
              <ul
                className="
                  border rounded-md bg-white shadow-xl
                  p-2
                "
              >
                {(showPopular ? popularKeywords : autoCompleteResults).map((item, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation(); // 🔥 바깥 클릭 감지보다 우선 처리
                      setKeyword(item.word);
                      setAutoCompleteResults([]);
                      setShowPopular(false);
                      MoveToSearchResult(item.word); // 🔥 클릭한 키워드로 즉시 이동
                    }}
                  >
                    {item.word}
                  </li>
                ))}
              </ul>
            </div>,
            document.body
          )}
        <Button
          variant="outline"
          className="
            border-[#A57C76] text-[#A57C76]
            hover:bg-[#A57C76] hover:text-white
            hover:cursor-pointer
          "
          onClick={() => MoveToSearchResult()}
          disabled={isPending}
        >
          {isPending ? "검색 중..." : <FontAwesomeIcon icon={faMagnifyingGlass} />}
        </Button>
      </div>
    </>
    
  )
}

export default SearchInput
