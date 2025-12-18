import { create } from "zustand";
import { getMyInfo } from "@/services/getMyInfo";
import { fetchInstance } from "@/services/fetchInstances";

interface AuthStore {
  isLogin: boolean;
  isChecking: boolean;
  checkAuth: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
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
    set({ isChecking: true });
    try {
      await getMyInfo(); // fetchInstance가 401 시 자동 refresh + 재시도
      set({ isLogin: true });
    } catch {
      set({ isLogin: false });
    } finally {
      set({ isChecking: false });
    }
  },

  /**
   * 로그아웃 시 호출
   * (서버 로그아웃 API에서 쿠키 제거 후 호출)
   */
  logout: () => {
    set({ isLogin: false });
  },
}));