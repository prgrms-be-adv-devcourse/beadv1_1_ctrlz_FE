import { Star } from "lucide-react";
import { ReviewFormSchema } from '@/types/reviewTypes'
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import React from 'react'
import { useForm } from 'react-hook-form'
import { reviewFormSchema } from '@/lib/formSchema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FormDescription } from "@/components/ui/form";
import { Textarea } from '../ui/textarea';
import ReviewRate from "@/components/review/reviewRate";
import { Button } from "@/components/ui/button";
import { Sectiontitle } from "../ui/sectionTitle";

type Props = {
  postId: string
  closeModal: () => void;
}

const ReviewForm = ({postId, closeModal} : Props) => {
  const router = useRouter();
  const form = useForm<ReviewFormSchema>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      contents: "",
      userRating: 0,
      productRating: 0,
    },
  });
  const [userRating, setUserRating] = React.useState(0);
  const [productRating, setProductRating] = React.useState(0);

  const onValid = (data: ReviewFormSchema) => {
    console.log("valid data:", data);
    closeModal();
  };

  const onInvalid = (errors: any) => {
    console.log("validation errors:", errors);
  };

  return (
    <div
      className="
        bg-[#F9F6F3] w-full max-w-md md:max-w-xl lg:max-w-2xl 
        mx-auto p-4 md:p-6
        rounded-sm
      "
    >
      <Sectiontitle
        className="m-0 mb-1 text-lg font-bold"
      >
        리뷰 작성하기
      </Sectiontitle>
      <span
        className="block text-sm mb-4 text-[#9CA3AF]"
      >
        해당 상품을 구매한 사용자만 리뷰를 남길 수 있습니다.
      </span>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onValid, onInvalid)}
          className="space-y-6 w-full"
        >
          {/* 사용자 평점 UI */}
          <FormField
            control={form.control}
            name="userRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>사용자 평점</FormLabel>
                <FormDescription>사용자에 대한 평점을 선택해주세요.</FormDescription>
                <FormControl>
                <ReviewRate
                  rating={userRating}
                  setRating={setUserRating}
                  field={field}
                />
                </FormControl>
                
                <FormMessage/>
              </FormItem>
            )}
          />
          {/* 상품 평점 UI */}
          <FormField
            control={form.control}
            name="productRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>상품 평점</FormLabel>
                <FormDescription>상품 상태에 대한 평점을 선택해주세요.</FormDescription>
                <FormControl>
                <ReviewRate
                  rating={productRating}
                  setRating={setProductRating}
                  field={field}
                />
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>내용</FormLabel>
                <FormControl>
                  {/* 크기 조정 및 크기 변경 불가 */}
                  <Textarea
                    placeholder="내용을 입력하세요."
                    className="min-h-[120px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="border-[#A57C76] text-[#A57C76] hover:bg-[#A57C76] hover:text-white"
              onClick={closeModal}
            >
              취소
            </Button>

            <Button
              type="submit"
              className="bg-[#A57C76] text-white hover:opacity-90"
            >
              등록
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ReviewForm
