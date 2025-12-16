"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { productPostFormSchema } from "@/lib/formSchema";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";

type ProductPostFormValues = z.infer<typeof productPostFormSchema>;

type Tag = {
  id: string;
  name: string;
};

type Category = {
  id: string;
  name: string;
};

type Props = {
  tags?: Tag[]; // 서버에서 내려줄 태그 목록
  categories?: Category[]; // ✅ 카테고리 목록
};

const STATUS_OPTIONS = [
  { value: "NEW", label: "새상품" },
  { value: "GOOD", label: "중고" },
  { value: "FAIR", label: "사용감 많음" },
];

const ProductPostEnrollForm = ({ tags = [], categories = [] }: Props) => {
  const [images, setImages] = useState<File[]>([]);
  const [primaryIndex, setPrimaryIndex] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagKeyword, setTagKeyword] = useState("");

  const form = useForm<ProductPostFormValues>({
    resolver: zodResolver(productPostFormSchema),
    defaultValues: {
      title: "",
      name: "",
      price: 0,
      description: "",
      categoryId: "",
      status: "NEW",
      tagIds: [],
    },
  });

  useEffect(() => {
    
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);

    setImages((prev) => {
      // 최초 업로드일 때만 대표 이미지 0번
      if (prev.length === 0) {
        setPrimaryIndex(0);
        return newFiles;
      }
      return [...prev, ...newFiles];
    });

    // 같은 파일 다시 선택 가능하도록 초기화
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const next = prev.filter((_, i) => i !== index);

      // 대표 이미지 인덱스 보정
      if (primaryIndex === index) {
        setPrimaryIndex(0);
      } else if (primaryIndex > index) {
        setPrimaryIndex((prev) => prev - 1);
      }

      return next;
    });
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
    form.setValue(
      "tagIds",
      selectedTags.includes(tagId)
        ? selectedTags.filter((id) => id !== tagId)
        : [...selectedTags, tagId]
    );
  };

  const onSubmit = async (values: ProductPostFormValues) => {
    const formData = new FormData();

    const orderedImages = [...images];
    if (primaryIndex !== 0) {
      const [primary] = orderedImages.splice(primaryIndex, 1);
      orderedImages.unshift(primary);
    }

    orderedImages.forEach((file) => {
      formData.append("images", file);
    });

    formData.append(
      "request",
      new Blob([JSON.stringify({ ...values, tagIds: selectedTags })], {
        type: "application/json",
      })
    );

    try {
      await fetch("/api/products", {
        method: "POST",
        body: formData,
      });
    } catch (e) {
      console.error("상품 등록 실패", e);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="
          w-[90%]
          md:w-[60%]
          lg:w-[55%]
          max-w-3xl
          
          my-6
          md:my-10
          lg:my-14
          space-y-6
          bg-white
          px-5 py-6
          sm:px-6 sm:py-7
          rounded-2xl
          shadow-md
          mx-auto
        "
      >
        <h2 className="text-2xl font-bold text-gray-800">상품 등록</h2>
        <div className="h-px w-full bg-gray-200" />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>게시글 제목</FormLabel>
              <FormControl className="mt-2">
                <Input {...field} placeholder="상품 게시글 제목" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>상품명</FormLabel>
                <FormControl className="mt-2">
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>가격</FormLabel>
                <FormControl className="mt-2">
                  <Input
                    className="
                          [&::-webkit-inner-spin-button]:appearance-none
                          [&::-webkit-outer-spin-button]:appearance-none
                          [-moz-appearance:textfield]"
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {categories.length > 0 && (
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>상품 카테고리</FormLabel>
                <FormControl className="mt-2">
                  <select
                    {...field}
                    className="
                      w-full h-10 px-3
                      border border-gray-300 rounded-md
                      focus:outline-none focus:ring-2 focus:ring-[#A57C76]
                    "
                  >
                    <option value="">카테고리를 선택하세요</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>상품 설명</FormLabel>
              <FormControl className="mt-2">
                <Textarea
                  {...field}
                  className="w-full border rounded-md p-2 min-h-[120px] resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>상품 상태</FormLabel>
              <FormControl className="mt-2">
                <div className="flex gap-2">
                  {STATUS_OPTIONS.map((s) => (
                    <Button
                      key={s.value}
                      type="button"
                      variant={
                        field.value === s.value ? "default" : "outline"
                      }
                      onClick={() => field.onChange(s.value)}
                    >
                      {s.label}
                    </Button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormLabel>상품 이미지 (대표 이미지 선택)</FormLabel>
          <FormControl className="mt-2">
            <Input type="file" accept="image/*" multiple onChange={handleImageChange}/>
          </FormControl>

          {images.length > 0 && (
            <div className="flex gap-3 mt-4 flex-wrap">
              {images.map((file, idx) => (
                <div
                  key={idx}
                  className={`relative rounded-lg p-1 border transition ${
                    idx === primaryIndex
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-300"
                  }`}
                >
                  {/* 이미지 (클릭 → 대표 이미지 변경) */}
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="
                      w-32 h-32 
                      object-cover 
                      rounded-md 
                      cursor-pointer 
                      bg-gray-100
                    "
                    onClick={() => setPrimaryIndex(idx)}
                    title="클릭하면 대표 이미지로 설정됩니다"
                  />

                  {/* 대표 배지 */}
                  {idx === primaryIndex && (
                    <div className="absolute bottom-1 left-1">
                      <Badge variant="default">대표</Badge>
                    </div>
                  )}

                  {/* 삭제 배지 */}
                  <div className="absolute top-1 right-1">
                    <Badge
                      variant="destructive"
                      className="cursor-pointer bg-red-500 text-white hover:bg-red-600"
                      onClick={() => removeImage(idx)}
                    >
                      삭제
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {tags.length > 0 && (
          <div>
            <FormLabel>태그 선택</FormLabel>

            {/* 태그 검색 Input */}
            <FormControl className="mt-2">
              <Input
                placeholder="태그를 입력하세요"
                value={tagKeyword}
                onChange={(e) => setTagKeyword(e.target.value)}
              />
            </FormControl>

            {/* 자동완성 태그 목록 */}
            <div className="flex gap-2 flex-wrap mt-3">
              {tags
                .filter(
                  (tag) =>
                    tag.name.includes(tagKeyword) &&
                    !selectedTags.includes(tag.id)
                )
                .map((tag) => (
                  <Button
                    key={tag.id}
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      toggleTag(tag.id);
                      setTagKeyword("");
                    }}
                  >
                    #{tag.name}
                  </Button>
                ))}
            </div>

            {/* 선택된 태그 */}
            {selectedTags.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-3">
                {tags
                  .filter((tag) => selectedTags.includes(tag.id))
                  .map((tag) => (
                    <Badge
                      key={tag.id}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => toggleTag(tag.id)}
                    >
                      #{tag.name} ✕
                    </Badge>
                  ))}
              </div>
            )}
          </div>
        )}

        <Button type="submit" className="mt-5 w-full bg-[#A57C76] text-[#F9F6F3]">
          상품 등록하기
        </Button>
      </form>
    </Form>
  );
};

export default ProductPostEnrollForm;
