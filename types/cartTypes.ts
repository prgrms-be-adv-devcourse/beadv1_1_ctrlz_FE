import { TApiResponse } from "./base";


export type TCartSummaryItem = {
  cartItemId: string,
  title: string,
  primaryUrl: string,
  name: string,
  price: number,
  isSelected: boolean;
}

export type TCartSummaryItemResponse = TApiResponse<TCartSummaryItem[]>;