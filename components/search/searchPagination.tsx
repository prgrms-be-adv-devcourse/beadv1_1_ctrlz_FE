import { TSearchQueryParams } from '@/types/searches';
import React from 'react'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';


type Props = {
  route: string;
  current: number;
  length: number;
  params: TSearchQueryParams;
  hasNext: boolean;
}
const SearchPagination = ({current, route, length, params, hasNext}: Props) => {

const searchParams = new URLSearchParams();

Object.entries(params).forEach(([key, value]) => {
  if (value === undefined) return;

  if (Array.isArray(value)) {
    searchParams.set(key, value.join(","));
  } else {
    searchParams.set(key, String(value));
  }
});

  const sethref = (page: number) => {
    searchParams.set("page", page.toString());
    return "/" + route + "?" + searchParams.toString();
  };


  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={sethref(Math.max(1, current - 1))}
            className={current > 1 ? "" : "hidden"}
          />
        </PaginationItem>
        {Array.from({ length: length || 0 }).map((_, i) => {
          const pageNumber = i + 1;

          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                className={current === pageNumber-1 ? "bg-[#A57C76] text-[#F9F6F3]" : ""}
                isActive={current === pageNumber-1}
                href={sethref(pageNumber-1)}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            href={sethref(current + 1)}
            className={hasNext ? "" : "hidden"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default SearchPagination;
