import { TApiResponse } from "./base";

export type TCartSummaryItem = {
  cartItemId: string,
  title: string,
  url: string,
  name: string,
  price: number,
  isSelected: boolean;
}

export type TCartSummaryItemResponse = TApiResponse<TCartSummaryItem[]>;