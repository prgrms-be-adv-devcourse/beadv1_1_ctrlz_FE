import { fetchInstance } from "./fetchInstances";

export type GetMyInfoResponse = {
  message: string;
  data: {
    userId: string;
    name: string;
    nickname: string;
    phoneNumber: string;
    zipCode: string;
    state: string;
    street: string;
    city: string;
    details: string;
    email: string;
    roles: string[];
    profileImageUrl: string;
    imageId: string;
  };
};

export const getMyInfo = async (): Promise<GetMyInfoResponse> => {
  try {
    const data = await fetchInstance.get('/users/my-info');
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}