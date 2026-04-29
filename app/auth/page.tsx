"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { GraduationCap, Mail, Lock, User, ArrowRight, Eye, EyeOff, Chrome } from "lucide-react";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Visual only — no real auth
    alert(mode === "login" ? "Функция входа в разработке!" : "Функция регистрации в разработке!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0a0a0a] relative overflow-hidden px-4">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-500/8 dark:bg-brand-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-violet-500/8 dark:bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-brand-600/25">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span
              className="font-display text-2xl text-ink-900 dark:text-white tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Academik<span className="text-brand-600">.kz</span>
            </span>
          </Link>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-ink-900 rounded-3xl border border-ink-200/80 dark:border-ink-800/50 shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)] p-8"
        >
          {/* Tabs */}
          <div className="flex bg-ink-100 dark:bg-ink-800/50 rounded-xl p-1 mb-8">
            {(["login", "register"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setMode(tab)}
                className={`relative flex-1 text-sm font-semibold py-2.5 rounded-lg transition-colors ${
                  mode === tab
                    ? "text-ink-950 dark:text-white"
                    : "text-ink-500 dark:text-ink-400 hover:text-ink-700 dark:hover:text-ink-200"
                }`}
              >
                {mode === tab && (
                  <motion.div
                    layoutId="auth-tab"
                    className="absolute inset-0 bg-white dark:bg-ink-700 rounded-lg shadow-sm"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <span className="relative">{tab === "login" ? "Вход" : "Регистрация"}</span>
              </button>
            ))}
          </div>

          {/* Google button */}
          <button
            onClick={() => alert("Google авторизация в разработке!")}
            className="w-full flex items-center justify-center gap-3 bg-ink-50 dark:bg-ink-800/50 hover:bg-ink-100 dark:hover:bg-ink-800 border border-ink-200 dark:border-ink-700 rounded-xl px-4 py-3 text-sm font-semibold text-ink-700 dark:text-ink-200 transition-all duration-200 hover:shadow-sm mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Продолжить с Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-ink-200 dark:bg-ink-800" />
            <span className="text-xs text-ink-400 dark:text-ink-500 font-medium">или</span>
            <div className="flex-1 h-px bg-ink-200 dark:bg-ink-800" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {mode === "register" && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="text-xs font-bold text-ink-500 dark:text-ink-400 uppercase tracking-widest mb-2 block">Имя</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 bg-ink-50 dark:bg-ink-800/40 border border-ink-200 dark:border-ink-700 rounded-xl text-sm text-ink-900 dark:text-white placeholder:text-ink-400 dark:placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="text-xs font-bold text-ink-500 dark:text-ink-400 uppercase tracking-widest mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 bg-ink-50 dark:bg-ink-800/40 border border-ink-200 dark:border-ink-700 rounded-xl text-sm text-ink-900 dark:text-white placeholder:text-ink-400 dark:placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-ink-500 dark:text-ink-400 uppercase tracking-widest mb-2 block">Пароль</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-11 pr-12 py-3 bg-ink-50 dark:bg-ink-800/40 border border-ink-200 dark:border-ink-700 rounded-xl text-sm text-ink-900 dark:text-white placeholder:text-ink-400 dark:placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600 dark:hover:text-ink-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {mode === "login" && (
              <div className="flex justify-end">
                <button type="button" className="text-xs text-brand-600 dark:text-brand-400 font-medium hover:underline">
                  Забыли пароль?
                </button>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-brand-600/20 transition-colors text-sm mt-2"
            >
              {mode === "login" ? "Войти" : "Создать аккаунт"}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </form>

          {/* Footer text */}
          <p className="text-xs text-ink-400 dark:text-ink-500 text-center mt-6 leading-relaxed">
            {mode === "login"
              ? "Нет аккаунта? "
              : "Уже есть аккаунт? "}
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-brand-600 dark:text-brand-400 font-semibold hover:underline"
            >
              {mode === "login" ? "Зарегистрируйтесь" : "Войдите"}
            </button>
          </p>
        </motion.div>

        {/* Trust badges */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-xs text-ink-400 dark:text-ink-600 mt-6"
        >
          🔒 Данные защищены шифрованием • Без спама
        </motion.p>
      </div>
    </div>
  );
}
