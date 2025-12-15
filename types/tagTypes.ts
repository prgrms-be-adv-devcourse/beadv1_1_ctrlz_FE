import { TApiResponse } from "./base"

export type TTag = {
  id: string,
  name: string
}

export type TTagResponse = TApiResponse<TTag[]>; 