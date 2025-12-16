import { z } from "zod";

/**
 * 리뷰 작성 폼
 * - 클라이언트 1차 검증용
 */
export const reviewFormSchema = z.object({
  contents: z
    .string()
    .min(1, { message: "내용을 입력하세요." }),

  userRating: z
    .number()
    .min(1, { message: "판매자 평점을 선택하세요." })
    .max(5, { message: "평점은 최대 5점입니다." }),

  productRating: z
    .number()
    .min(1, { message: "상품 평점을 선택하세요." })
    .max(5, { message: "상품 평점은 최대 5점입니다." }),
});

/**
 * 검색 필터 폼
 * - input은 string 기반
 * - submit 시 number로 변환
 */
export const searchFormSchema = z
  .object({
    q: z.string().optional(),
    category: z.string().optional(),

    minPrice: z
      .string()
      .optional()
      .transform((v) => (v === "" ? undefined : Number(v)))
      .refine((v) => v === undefined || v >= 0, {
        message: "최소 가격은 0원 이상입니다.",
      }),

    maxPrice: z
      .string()
      .optional()
      .transform((v) => (v === "" ? undefined : Number(v))),

    tags: z.array(z.string()).optional(),
  })
  .refine(
    (data) =>
      data.minPrice === undefined ||
      data.maxPrice === undefined ||
      data.minPrice <= data.maxPrice,
    {
      message: "최소 가격은 최대 가격보다 클 수 없습니다.",
      path: ["maxPrice"],
    }
  );

/**
 * 사용자 정보 수정 폼
 */
export const userInfoFormSchema = z.object({
  email: z.string().email("이메일 형식이 올바르지 않습니다."),

  phoneNumber: z
    .string()
    .min(10, { message: "전화번호를 입력하세요." }),

  street: z
    .string()
    .min(1, { message: "도로명을 입력하세요." }),

  zipCode: z
    .string()
    .min(1, { message: "우편번호를 입력하세요." }),

  state: z
    .string()
    .min(1, { message: "구/군 정보를 입력하세요." }),

  city: z
    .string()
    .min(1, { message: "도시를 입력하세요." }),

  details: z.string().optional(),

  name: z
    .string()
    .min(1, { message: "이름을 입력하세요." }),

  nickname: z
    .string()
    .min(1, { message: "닉네임을 입력하세요." }),

  oauthId: z.enum(["google"]),

  gender: z.enum(["male", "female"], {
    message: "성별을 선택하세요.",
  }),

  age: z
    .number()
    .min(1, { message: "나이는 1살 이상이어야 합니다." }),
});


/**
 * 상품 등록 폼 (ProductPostRequest 대응)
 * - multipart/form-data 요청 중 JSON request 파트
 * - 서버 @Valid 검증과 1:1 매칭
 */
export const productPostFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "제목은 필수입니다." })
    .max(200, { message: "제목은 200자를 초과할 수 없습니다." }),

  name: z
    .string()
    .min(1, { message: "상품명은 필수입니다." })
    .max(255, { message: "상품명은 255자를 초과할 수 없습니다." }),

  price: z
    .number()
    .min(0, { message: "가격은 0원 이상이어야 합니다." }),

  description: z
    .string()
    .min(1, { message: "상품 설명은 필수입니다." }),

  categoryId: z
    .string()
    .min(1, { message: "카테고리는 필수입니다." }),

  status: z.enum(["NEW", "GOOD", "FAIR"], {
    message: "상품 상태를 선택하세요.",
  }),

  tagIds: z.array(z.string()).optional(),
});
