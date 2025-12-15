// 모든 API 응답 공통 타입
export type TApiResponse<T> = {
  data: T;
  message: string;
};


export type TPageResponse<T> = {
  pageNum: number;
  totalPages: number;
  pageSize: number;
  hasNext: boolean;
  contents: T;
}