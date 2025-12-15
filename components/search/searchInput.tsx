"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '../ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useRouter, useSearchParams } from 'next/navigation';

const SearchInput = () => {

  //여기서 검색어 자동완성 api 호출해도 돼?
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const [keyword,setKeyword] = useState(q);

  const [autoCompleteResults, setAutoCompleteResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  
  const searchParams = new URLSearchParams(params);
  const router = useRouter();

  useEffect(() => {
    setKeyword(q);
  }, [q]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    const value = e.target.value;
    if (value.trim().length > 0) {
      // TODO: Replace with real API call
      setAutoCompleteResults([
        value,
        value,
        value,
      ]);
    } else {
      setAutoCompleteResults([]);
    }
  }

  const MoveToSearchResult = async () => {
    if (keyword.length < 0) return;

    setIsLoading(true);
    setAutoCompleteResults([]);
    searchParams.set("q", keyword);
    router.push("/search?" + searchParams.toString());
    setIsLoading(false);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setAutoCompleteResults([]);
      }
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
        {autoCompleteResults.length > 0 && (
          <ul className="absolute top-full left-0 w-full border rounded-md bg-white shadow-lg p-2 z-50">
            {autoCompleteResults.map((item, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setKeyword(item);
                  setAutoCompleteResults([]);
                  MoveToSearchResult();
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
        <Button
          variant="outline"
          className="
            border-[#A57C76] text-[#A57C76]
            hover:bg-[#A57C76] hover:text-white
            hover:cursor-pointer
          "
          onClick={MoveToSearchResult}
          disabled={isLoading}
        >
          {isLoading ? "검색 중..." : <FontAwesomeIcon icon={faMagnifyingGlass} />}
        </Button>
      </div>
    </>
    
  )
}

export default SearchInput
