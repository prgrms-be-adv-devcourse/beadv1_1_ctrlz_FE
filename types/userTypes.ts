import { userInfoFormSchema } from "@/lib/formSchema";
import z from "zod";
import { TApiResponse } from "./base";

export type UserInfoFormSchema = z.infer<typeof userInfoFormSchema>;

export type TUserInfoQueryParams = {
  nickname: string,
  email: string,
  profileImage: string
};

export type TUserSignupInfo = {
  userId: string,
  profileImage: string,
  nickname: string
}

export type TUserSignupResponse = TApiResponse<TUserSignupInfo>;