"use client";
import { TProductPost, TProductPostResponse, TProductSummaryItem, TProductSummaryResponse } from '@/types/productPostTypes';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { ProductDetailDescription, ProductDetailPrice, ProductDetailSpan, ProductDetailTitle } from '@/components/products/productDetailDescription';
import { getTimeAgo } from '@/lib/date';
import { formatPrice } from '@/lib/price';
import { ProductTag } from '@/components/products/productTag';
import { Button } from '@/components/ui/button';
import Modal from '@/components/modal';
import ReviewForm from '@/components/review/reviewForm';
import { TReview, TReviewResponse } from '@/types/reviewTypes';
import { dummyProductPostDetail, dummyRecommandProductList } from '@/data/productPost';
import { dummyReviewData } from '@/data/reviews';
import ReviewItem from '@/components/review/reviewItem';
import ProductSummaryList from '@/components/products/productSummaryList';
import { getProductPostDetail } from '@/services/getProductPostDetail';
import { addCartItem } from '@/services/addCartItem';

const PostDetail = () => {
  
  const { postId } = useParams<{postId: string}>();
  const [post, setPost] = useState<TProductPost | null>(null);
  const [review, setReview] = useState<TReview | null>(null);
  const [similarProducts, setSimilarProducts] = useState<TProductSummaryItem[] | null>(null);
  {/* 함께 본 상품 */}
  const [alsoViewedProducts, setAlsoViewedProducts] = useState<TProductSummaryItem[] | null>(null);

  const [isModalOpen, setModalOpen] = useState<boolean| null>(false);

  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      const postRes: TProductPostResponse = await getProductPostDetail(postId);
      const reviewRes: TReviewResponse = dummyReviewData;
      const similarRes: TProductSummaryResponse = dummyRecommandProductList;
      const alsoViewedRes: TProductSummaryResponse = dummyRecommandProductList;

      setPost(postRes.data)
      setReview(reviewRes.data);
      setSimilarProducts(similarRes.data);
      setAlsoViewedProducts(alsoViewedRes.data);
    };

    fetchPost();
  }, []);

  const addItemToHeart =  () => {
    try{
      alert('구현에정입니다.')
      
    } catch (e) {
      console.error(e);
    }
  }

  const clickAddToCartButton = async () => {
    await addItemToCart();
    alert('장바구니 완료');
  }

  const addItemToCart = async () => {
    try{
      const res = await addCartItem(postId);
      console.log(res);
      alert('장바구니에 담았습니다.')
    } catch (e) {
      console.error(e);
    }
  }

  const movetoPaymentPage = async () => {
    try {
      await addItemToCart();
    } catch (e) {
      console.error(e);
    }
    router.push('/cart/checkout');
  }

  return (
    <div className="w-full sm:w-[95vw] md:w-[90vw] lg:w-[80vw] m-auto p-5">
      <ProductDetailDescription
        className='ml-4 mb-2'
      >{post?.categoryName}</ProductDetailDescription>
      <div className='flex flex-col sm:flex-row sm:items-start sm:gap-8 items-center'>
        <Carousel className=" relative w-72 h-72 sm:w-64 sm:h-64 md:w-96 md:h-96 lg:w-96 lg:h-96 max-w-3xl" opts={{ loop: true }}>
          <CarouselContent className="gap-2">
            {post?.imageUrls?.map((url, index) => (
              <CarouselItem key={index}>
                <img
                  src={url}
                  alt="사진"
                  className="w-72 h-72 sm:w-72 sm:h-72 md:w-96 md:h-96 lg:w-96 lg:h-96 object-cover rounded-xl"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden sm:flex bg-white shadow-md w-6 h-6 mx-2" />
          <CarouselNext className="hidden sm:flex bg-white shadow-md w-6 h-6 mx-2" />
        </Carousel>

    
        <ProductDetailDescription
          className='mt-2 sm:mt-2 sm:ml-10'
        >
          <ProductDetailTitle>{post?.title}</ProductDetailTitle>
          <ProductDetailSpan
            className="mt-2 text-[#9CA3AF]"
          >
            {post?.updatedAt ? getTimeAgo(post.updatedAt) : ""}
          </ProductDetailSpan>
          <ProductDetailPrice
            className="mt-1"
          >
            {post?.price ? formatPrice(post?.price) : ""}원
          </ProductDetailPrice>
          <ProductDetailSpan
            className='my-3 text-[#2E2B2F] text-lg font-normal'
          >
            {post?.description}
          </ProductDetailSpan>
          <div>
          <ProductDetailSpan
            className='text-[#2E2B2F] text-lg block font-medium'
          >
            태그
          </ProductDetailSpan>
            {
              post?.tags?.map((tag, index) => 
                <ProductTag
                  key={index}
                >
                  {tag}
                </ProductTag>
              )
            }
          </div>
          <div
            className='mt-4 flex flex-col gap-3 sm:flex-row'
          >
            <Button
              variant="default"
              className="
                px-8 py-5 text-md font-semibold mr-4
                border-[#D99AB3] bg-[#D99AB3] text-[#F9F6F3]
                hover:bg-[#C884A3] hover:text-[#F9F6F3]
                hover:cursor-pointer
              "
              onClick={() => addItemToHeart()}
            >
              찜하기
            </Button>

            <Button
              variant="default"
              className="
                px-8 py-5 text-md font-semibold mr-4
                border-[#9CA3AF] bg-[#9CA3AF] text-[#F9F6F3]
                hover:bg-[#7F868F] hover:text-[#F9F6F3]
                hover:cursor-pointer 
              "
              onClick={() => clickAddToCartButton()}
            >
              장바구니 담기
            </Button>

            <Button
              variant="default"
              className="
                px-8 py-5 text-md font-semibold mr-4
                border-[#A57C76] bg-[#A57C76] text-[#F9F6F3]
                hover:bg-[#8C605B] hover:text-[#F9F6F3]
                hover:cursor-pointer
              "
              onClick={() => movetoPaymentPage()}
            >
              구매하기
            </Button>
          </div>
        </ProductDetailDescription>
      </div>
     <div
      className='mt-14'
     >
      {/* 리뷰 공간 */}
      <span
        className='text-2xl font-semibold'
      >
        리뷰
      </span>
      <Button
        variant="link"
        className="
           hover:cursor-pointer text-[#9CA3AF] decoration-[#9CA3AF]
        "
        onClick={() => setModalOpen(true)}
      >
        리뷰 작성하기
      </Button>
      {review && (
        <ReviewItem
          review={review}
        />
      )}
      {
        isModalOpen && <Modal
          isModalOpen={isModalOpen}
          closeModal={() => setModalOpen(false)}
        >
          <ReviewForm
            postId={postId}
            closeModal={() => setModalOpen(false)}
          />
        </Modal>
      }
     </div>
     {/* 유사 상품 */}
     {
      similarProducts && (
        <ProductSummaryList
          items={similarProducts}
          title="이 상품과 유사한 상품"
        />
      )
     }
     {/* 함께 본 상품 */}
     {
      alsoViewedProducts && (
        <ProductSummaryList
          items={alsoViewedProducts}
          title="다른 사용자는 이 상품도 같이 찾아봤어요"
        />
      )
     }
    </div>
  )
}

export default PostDetail
