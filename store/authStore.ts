import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthStore {
  isLogin: boolean;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLogin: false,
  checkAuth: () => {
    const token = Cookies.get("accessToken");
    set({ isLogin: !!token });
  }
}));