import { create } from "zustand";
import { getMyInfo } from "@/services/getMyInfo";

interface AuthStore {
  isLogin: boolean;
  isChecking: boolean;
  checkAuth: () => Promise<void>;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  // 초기값은 false (서버 확인 전)
  isLogin: false,
  isChecking: true,

  /**
   * 서버 기반 인증 확인
   * - HttpOnly 쿠키는 자동으로 서버에 포함됨
   * - 성공: 로그인 상태
   * - 실패(401/403): 비로그인 상태
   */
  checkAuth: async () => {
    try {
      await getMyInfo();
      set({ isLogin: true, isChecking: false });
    } catch (error) {
      set({ isLogin: false, isChecking: false });
    }
  },

  /**
   * 로그인 성공 시 호출
   * (쿠키는 서버에서 설정)
   */
  login: () => {
    set({ isLogin: true });
  },

  /**
   * 로그아웃 시 호출
   * (서버 로그아웃 API에서 쿠키 제거 후 호출)
   */
  logout: () => {
    set({ isLogin: false });
  },
}));