import { TApiResponse } from "./base"

export type TRecommand = {
  status: ["OK" | "LIMIT_REACHED" | "NO_RESULTS"]
  message: string
}

export type TRecommandResponse = TApiResponse<TRecommand>