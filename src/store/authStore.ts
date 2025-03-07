import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, UserRole, AppModule } from "@/types/global";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  activeModule: AppModule;

  // Actions
  login: (user: User, token: string) => void;
  logout: () => void;
  setActiveModule: (module: AppModule) => void;
  updateUser: (user: Partial<User>) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      activeModule: "lms",

      login: (user: User, token: string) =>
        set({
          isAuthenticated: true,
          user,
          token,
        }),

      logout: () =>
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        }),

      setActiveModule: (module: AppModule) =>
        set({
          activeModule: module,
        }),

      updateUser: (userData: Partial<User>) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
        activeModule: state.activeModule,
      }),
    }
  )
);

export default useAuthStore;
