"use client"
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from "react-dom";
import { Input } from '@/components/ui/input'
import { Button } from '../ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAutoCompleteWordList } from '@/services/getAutoCompleteWordList';
import { saveKeyWord } from '@/services/saveKeyword';

const SearchInput = () => {

  //여기서 검색어 자동완성 api 호출해도 돼?
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const [keyword,setKeyword] = useState(q);

  const [autoCompleteResults, setAutoCompleteResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [dropdownStyle, setDropdownStyle] = useState<{
    width: number;
    left: number;
    top: number;
  } | null>(null);
  
  const searchParams = new URLSearchParams(params);
  const router = useRouter();

  useEffect(() => {
    setKeyword(q);
    setIsLoading(false); // 라우팅/검색 완료 시점에 로딩 해제
  }, [q]);


  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);

    if (!value.trim()) {
      setAutoCompleteResults([]);
      return;
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
      
      setAutoCompleteResults(res.data.map(item => item.word));
    } catch(e) {
      console.error(e);
    }
  }

  const MoveToSearchResult = async (searchWord?: string) => {
    const value = searchWord ?? keyword;
    if (!value.trim()) return;

    setIsLoading(true);
    await saveKeyWord(value)
    setAutoCompleteResults([]);
    searchParams.set("q", value);
    router.push("/search?" + searchParams.toString());
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // SearchInput 영역 클릭이면 닫지 않음
      if (containerRef.current?.contains(target)) return;

      // Portal로 뜬 자동완성 영역 클릭이면 닫지 않음
      if (dropdownRef.current?.contains(target)) return;

      setAutoCompleteResults([]);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="flex items-center gap-3 w-1/2 relative">
        <Input
          ref={inputRef}
          className='border-[#A57C76] border-2'
          placeholder='검색어를 입력하세요.'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // 폼 제출 방지
              MoveToSearchResult();
            }
          }}
          value={keyword}
        />
        {autoCompleteResults.length > 0 &&
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
              className="z-[9999]"
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
                {autoCompleteResults.map((item, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation(); // 🔥 바깥 클릭 감지보다 우선 처리
                      setKeyword(item);
                      setAutoCompleteResults([]);
                      MoveToSearchResult(item); // 🔥 클릭한 키워드로 즉시 이동
                    }}
                  >
                    {item}
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
          disabled={isLoading}
        >
          {isLoading ? "검색 중..." : <FontAwesomeIcon icon={faMagnifyingGlass} />}
        </Button>
      </div>
    </>
    
  )
}

export default SearchInput
