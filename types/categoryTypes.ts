import { TApiResponse } from "./base";

export type TCategory = {
  id:string,
  name: string
}

export type TCategoryResponse = TApiResponse<TCategory[]>;