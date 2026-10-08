import { create } from "zustand";
import { login } from "../service/calls/auth";
import { STORAGE_TOKEN_KEY, STORAGE_USER_KEY } from "../constants";

interface IUser {
  id: string;
  email: string;
  username: string;
  role: string;
}

interface AuthState {
  user: IUser | null;
  splashLoading: boolean;
  signed: boolean;
  loadStorageData: () => void;
  signIn: (email: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  splashLoading: true,
  signed: false,

  loadStorageData: () => {
    set({ splashLoading: true });
    const storageUserData = localStorage.getItem(STORAGE_USER_KEY);

    if (storageUserData) {
      const storageUser: IUser = JSON.parse(storageUserData);
      set({ user: storageUser, signed: true });
    }

    setTimeout(() => {
      set({ splashLoading: false });
    }, 4000);
  },

  signIn: async (email: string, password: string) => {
    try {
      const userLogged = await login(email, password);
      const { token } = userLogged;

      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(userLogged));
      localStorage.setItem(STORAGE_TOKEN_KEY, token);

      set({ user: userLogged, signed: true });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
}));
