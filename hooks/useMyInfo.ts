import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "@/services/getMyInfo";

export const useMyInfo = () => {
  return useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
    staleTime: 1000 * 60 * 5, // 5분
    retry: false,
  });
};