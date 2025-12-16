import { TUserSignupInfo, UserInfoFormSchema } from "@/types/userTypes";
import { fetchInstance } from "./fetchInstances";

export const signUp = async (data: UserInfoFormSchema): Promise<TUserSignupInfo> => {
  const resData = await fetchInstance.post('/users', data);
  return resData;
}