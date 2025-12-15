"use client";

import React from 'react'
import { Form, FormItem, FormLabel } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { SearchFormSchema, TSearchQueryParams } from '@/types/searches';
import { Table } from 'lucide-react';
import { Input } from '../ui/input';
import { TTag } from '@/types/tagTypes';
import { TCategory } from '@/types/categoryTypes';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Props = {
  params: TSearchQueryParams;
  selectedCategory: string;
  selectedTags: string[];
  tag?: TTag[];
  category: TCategory[];
  minPrice: string;
  maxPrice: string;
  handleChangeCategory: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleChangeMinPrice: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleChangeMaxPrice: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleChangeTags: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  selectedStatus: "NEW" | "GOOD" | "ALL";
  selectedTradeStatus: "SELLING" | "ALL";
  handleChangeStatus: (value: "NEW" | "GOOD" | "ALL") => void;
  handleChangeTradeStatus: (value: "SELLING" | "ALL") => void;
  sort: "score"| "popular"| "price_asc"| "price_desc"| "newest"| "listing_count_desc";
  handleChangeSort: (value: "score"| "popular"| "price_asc"| "price_desc"| "newest"| "listing_count_desc") => void;
}

const SearchFilterForm = ({
  params, 
  selectedCategory,
  selectedTags,
  tag,
  category,
  minPrice,
  maxPrice,
  selectedStatus,
  selectedTradeStatus,
  sort,
  handleChangeSort,
  handleChangeCategory, 
  handleChangeMinPrice, 
  handleChangeMaxPrice,
  handleChangeTags,
  handleChangeStatus,
  handleChangeTradeStatus,
}: Props) => {

  const form = useForm<SearchFormSchema>({

  });

  const buildSearchHref = () => {
    const searchParams = new URLSearchParams();

    if (params.q) searchParams.set("q", params.q);
    if (selectedCategory) searchParams.set("category", selectedCategory);
    if (minPrice) searchParams.set("minPrice", minPrice);
    if (maxPrice) searchParams.set("maxPrice", maxPrice);
    if (selectedTags.length > 0) {
      searchParams.set("tags", selectedTags.join(","));
    }
    if (selectedStatus !== "ALL") searchParams.set("status", selectedStatus);
    if (selectedTradeStatus !== "ALL") searchParams.set("tradeStatus", selectedTradeStatus);
    if (sort !== "score") searchParams.set("sort", sort);

    searchParams.set("page", "1"); // reset to first page on new search

    return "/search?" + searchParams.toString();
  };

  return (
    <div
      className='p-2'
    >
      <Form {...form}>
        <FormLabel
          className='text-xl font-semibold'
        >
          조건검색
        </FormLabel>
        <form
          onSubmit={(e) => e.preventDefault()}
        >
          <table className="
            w-full
            border border-[#2E2B2F]
            rounded-xl
            border-separate
            border-spacing-y-4
            bg-[#FAFAFA]
            p-4
          ">
            <tbody>
              <tr>
                <td className="w-28 align-top font-semibold text-sm text-[#2E2B2F] pt-3">
                  카테고리
                </td>
                <td>
                  <div className="rounded-lg bg-white p-3 border border-[#E5E7EB]">
                    <div className="flex flex-wrap gap-2">
                      {category.map((c) => {
                        const isSelected = selectedCategory === String(c.id);

                        return (
                          <Button
                            key={c.id}
                            type="button"
                            variant="outline"
                            size="sm"
                            className={
                              isSelected
                                ? "bg-[#A57C76] text-white border-[#A57C76]"
                                : "border-[#2E2B2F] text-[#2E2B2F]"
                            }
                            onClick={() =>
                              handleChangeCategory({
                                target: { value: String(c.id) },
                              } as React.ChangeEvent<HTMLInputElement>)
                            }
                          >
                            {c.name}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="w-28 align-top font-semibold text-sm text-[#2E2B2F] pt-3">
                  가격
                </td>
                <td>
                  <div className="rounded-lg bg-white p-3 border border-[#E5E7EB]">
                    <div className="flex items-center gap-2">
                      <Input
                        value={minPrice}
                        onChange={handleChangeMinPrice}
                        type="number"
                        min={0}
                        placeholder="최소 가격"
                        className="
                          w-32 text-sm
                          appearance-none
                          border-[#2E2B2F]
                          focus:border-2 focus:border-[#A57C76]
                          [&::-webkit-inner-spin-button]:appearance-none
                          [&::-webkit-outer-spin-button]:appearance-none
                          [-moz-appearance:textfield]
                        "
                      />
                      <span className="text-gray-400">~</span>
                      <Input
                        value={maxPrice}
                        onChange={handleChangeMaxPrice}
                        type="number"
                        min={0}
                        placeholder="최대 가격"
                        className="
                          w-32 text-sm
                          appearance-none
                          border-[#2E2B2F]
                          focus:border-2 focus:border-[#A57C76]
                          [&::-webkit-inner-spin-button]:appearance-none
                          [&::-webkit-outer-spin-button]:appearance-none
                          [-moz-appearance:textfield]
                        "
                      />
                    </div>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="w-28 align-top font-semibold text-sm text-[#2E2B2F] pt-3">
                  옵션
                </td>
                <td>
                  <div className="rounded-lg bg-white p-3 border border-[#E5E7EB]">
                    <div className="flex flex-wrap items-center gap-6">
                      {/* 상품 상태 */}
                      <div>
                        <FormLabel className="block mb-2 text-sm">상품 상태</FormLabel>
                        <div className="flex gap-2">
                          {[
                            { label: "전체", value: "ALL" },
                            { label: "새상품", value: "NEW" },
                            { label: "중고", value: "GOOD" },
                          ].map(({ label, value }) => (
                            <Button
                              key={value}
                              type="button"
                              size="sm"
                              variant="outline"
                              className={
                                selectedStatus === value
                                  ? "bg-[#A57C76] text-white border-[#A57C76]"
                                  : "border-[#2E2B2F] text-[#2E2B2F]"
                              }
                              onClick={() => handleChangeStatus(value as any)}
                            >
                              {label}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* 거래 상태 */}
                      <div>
                        <FormLabel className="block mb-2 text-sm">거래 상태</FormLabel>
                        <div className="flex gap-2">
                          {[
                            { label: "전체", value: "ALL" },
                            { label: "거래 가능", value: "SELLING" },
                          ].map(({ label, value }) => (
                            <Button
                              key={value}
                              type="button"
                              size="sm"
                              variant="outline"
                              className={
                                selectedTradeStatus === value
                                  ? "bg-[#A57C76] text-white border-[#A57C76]"
                                  : "border-[#2E2B2F] text-[#2E2B2F]"
                              }
                              onClick={() => handleChangeTradeStatus(value as any)}
                            >
                              {label}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>


              <tr>
                <td className="w-28 align-top font-semibold text-sm text-[#2E2B2F] pt-3">
                  태그
                </td>
                <td>
                  <div className="rounded-lg bg-white p-3 border border-[#E5E7EB]">
                    <div className="flex flex-wrap gap-2">
                      {(tag ?? []).map((t) => {
                        const isSelected = selectedTags.includes(String(t.id));

                        return (
                          <Button
                            key={t.id}
                            type="button"
                            variant="outline"
                            size="sm"
                            className={
                              isSelected
                                ? "bg-[#A57C76] text-white border-[#A57C76]"
                                : "border-[#2E2B2F] text-[#2E2B2F]"
                            }
                            onClick={() =>
                              handleChangeTags({
                                target: { value: String(t.id) },
                              } as React.ChangeEvent<HTMLInputElement>)
                            }
                          >
                            #{t.name}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="w-28 align-top font-semibold text-sm text-[#2E2B2F] pt-3">
                  정렬
                </td>
                <td>
                   {/* 정렬 */}
                   <div>
                        <FormLabel className="block mb-2 text-sm">정렬</FormLabel>
                        <Select value={sort} onValueChange={handleChangeSort}>
                          <SelectTrigger className="w-36">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent
                            className="z-50 bg-white shadow-lg border border-gray-200"
                          >
                            <SelectItem value="score" >관련도순</SelectItem>
                            <SelectItem value="popularㅣ">인기순</SelectItem>
                            <SelectItem value="price_asc">가격 낮은 순</SelectItem>
                            <SelectItem value="price_desc">가격 높은 순</SelectItem>
                            <SelectItem value="newest">최신순</SelectItem>
                            <SelectItem value="lostining_count_desc">조회수</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                </td>
              </tr>
              <tr>
                <td />
                <td className="pt-2">
                  <div className="flex justify-end pt-4">
                    <Link href={buildSearchHref()}>
                      <Button
                        type="button"
                        className="bg-[#A57C76] text-white hover:bg-[#8f6964]"
                      >
                        검색하기
                      </Button>
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        <FormItem>
          
        </FormItem>
        </form>
      </Form>
    </div>
  )
}

export default SearchFilterForm
