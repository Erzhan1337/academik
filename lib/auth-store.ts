"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  avatar: string;       // initials or emoji
  plan: "free" | "pro";
}

// Test accounts for dev mode
export const MOCK_USERS: { email: string; password: string; user: MockUser }[] = [
  {
    email: "test@academik.kz",
    password: "123456",
    user: {
      id: "u1",
      name: "Айгерим Сатпаева",
      email: "test@academik.kz",
      avatar: "АС",
      plan: "pro",
    },
  },
  {
    email: "demo@academik.kz",
    password: "demo",
    user: {
      id: "u2",
      name: "Ержан Тестов",
      email: "demo@academik.kz",
      avatar: "ЕТ",
      plan: "free",
    },
  },
];

interface AuthStore {
  user: MockUser | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (name: string, email: string, password: string) => { success: boolean; error?: string };
  loginWithGoogle: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,

      login: (email, password) => {
        const found = MOCK_USERS.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        if (found) {
          set({ user: found.user });
          return { success: true };
        }
        return { success: false, error: "Неверный email или пароль" };
      },

      register: (name, email, password) => {
        if (!name || !email || !password) {
          return { success: false, error: "Заполните все поля" };
        }
        if (password.length < 4) {
          return { success: false, error: "Пароль слишком короткий" };
        }
        // Mock: create a new user on-the-fly
        const newUser: MockUser = {
          id: `u_${Date.now()}`,
          name,
          email,
          avatar: name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2),
          plan: "free",
        };
        set({ user: newUser });
        return { success: true };
      },

      loginWithGoogle: () => {
        // Simulate Google login with the first mock user
        set({ user: MOCK_USERS[0].user });
      },

      logout: () => set({ user: null }),
    }),
    { name: "academik-auth" }
  )
);
