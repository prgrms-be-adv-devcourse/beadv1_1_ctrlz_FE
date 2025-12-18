import Cookies from "js-cookie";
import { ProductPostFormSchema } from "@/types/productPostTypes";

export const createProductPost = async (
  data: ProductPostFormSchema,
  images: File[],
  primaryIndex: number
) => {
  const formData = new FormData();

  // 대표 이미지 정렬
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
    new Blob([JSON.stringify(data)], {
      type: "application/json",
    })
  );

  const accessToken = Cookies.get("ACCESS_TOKEN");

  const headers: HeadersInit = {};
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product-posts`,
    {
      method: "POST",
      credentials: "include",
      headers,        // ✅ Authorization만 추가
      body: formData, // ❌ Content-Type 설정 금지
    }
  );

  console.log(res);

  if (!res.ok) {
    throw new Error("상품 등록 실패");
  }

  return res.json();
};