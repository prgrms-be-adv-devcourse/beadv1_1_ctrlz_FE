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

const PAGE_WINDOW = 5;

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

  // current is 0-based, so convert to 1-based for grouping
  const currentPage = current + 1;
  const groupStart =
    Math.floor((currentPage - 1) / PAGE_WINDOW) * PAGE_WINDOW + 1;

  const startPage = groupStart;
  const endPage = Math.min(length, startPage + PAGE_WINDOW - 1);

  return (
    <Pagination
      className='mb-10'
    >
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={sethref(Math.max(0, startPage - 2))}
            className={current > 1 ? "" : "hidden"}
          />
        </PaginationItem>
        {Array.from({ length: endPage - startPage + 1 }).map((_, i) => {
          const pageNumber = startPage + i;

          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                className={current === pageNumber - 1 ? "bg-[#A57C76] text-[#F9F6F3]" : ""}
                isActive={current === pageNumber - 1}
                href={sethref(pageNumber - 1)}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            href={sethref(Math.min(length - 1, endPage))}
            className={hasNext ? "" : "hidden"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default SearchPagination;
