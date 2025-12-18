import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


//zustand로 accessToken값 관리후 전역사용
type AccessTokenState = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  clearAccessToken: () => void;
};

//로그인 성공 시 파라미터로 오는 값 저장하기 위한 함수 - 미적용
export const useAccessTokenStore = create<AccessTokenState>()(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (token) => set({ accessToken: token }),
      clearAccessToken: () => set({ accessToken: null }),
    }),
    {
      name: "auth-access-token",
      partialize: (state) => ({ accessToken: state.accessToken }),
    }
  )
);