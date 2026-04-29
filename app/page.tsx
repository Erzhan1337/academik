"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useInView, animate } from "motion/react";
import {
  Search, ArrowRight, Award, FileCheck, BellRing,
  SlidersHorizontal, BarChart2, Star, ChevronRight, Sparkles,
} from "lucide-react";
import { PROGRAMS } from "@/lib/data";
import { ProgramCard } from "@/components/ProgramCard";

/* ─── Animated counter ──────────────────────────────────────────── */
function Counter({ from = 0, to, suffix = "" }: { from?: number; to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(from, to, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate(v) {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return controls.stop;
  }, [inView, from, to, suffix]);

  return <span ref={ref}>{from}{suffix}</span>;
}

/* ─── How it works steps ─────────────────────────────────────────── */
const STEPS = [
  {
    icon: SlidersHorizontal,
    color: "bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400",
    title: "Выбери программу",
    desc: "Фильтруйте по городу, стоимости, языку и срокам подачи. Подберите подходящую программу за пару минут.",
  },
  {
    icon: FileCheck,
    color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    title: "Собери документы",
    desc: "Используйте чек-лист документов и отслеживайте готовность к подаче заявки.",
  },
  {
    icon: Award,
    color: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    title: "Проверь Болашак",
    desc: "Проверьте базовые требования гранта и найдите программы, которые подходят для Болашак.",
  },
];

/* ─── Stats ─────────────────────────────────────────────────────── */
const STATS = [
  { value: 500, suffix: "+", label: "Программ магистратуры" },
  { value: 50, suffix: "+", label: "Университетов" },
  { value: 12, suffix: "", label: "Городов Казахстана" },
  { value: 3200, suffix: "+", label: "Студентов помогли" },
];

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(query.trim() ? `/programs?q=${encodeURIComponent(query)}` : "/programs");
  };

  const featured = PROGRAMS.filter((p) => p.bolashak).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-50 dark:bg-ink-950 pt-32 pb-24 px-4 transition-colors">
        {/* Background blobs / Mesh Gradient */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-400/20 dark:bg-brand-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-multiply dark:mix-blend-normal" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-400/20 dark:bg-amber-600/15 rounded-full blur-[80px] pointer-events-none mix-blend-multiply dark:mix-blend-normal" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-400/10 dark:bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/60 dark:bg-white/10 backdrop-blur-md text-ink-700 dark:text-white/80 text-sm px-4 py-1.5 rounded-full border border-ink-200/50 dark:border-white/20 mb-8 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-gold-400" />
            Подбор магистратуры в Казахстане
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-950 dark:text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Найдите свою{" "}
            <span className="relative inline-block">
              <span className="text-brand-600 dark:text-gold-400">магистратуру</span>
            </span>
            <br />в Казахстане
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-ink-600 dark:text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Сравнивайте программы, следите за сроками подачи, готовьте документы
            и проверяйте возможности гранта Болашак — всё в одном месте.
          </motion.p>

          {/* Search bar */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex gap-2 max-w-xl mx-auto mb-8"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="IT, бизнес, право..."
                className="w-full bg-white dark:bg-ink-950 text-ink-900 dark:text-white placeholder:text-ink-400 dark:placeholder:text-ink-500 pl-11 pr-4 py-3.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 shadow-lg border border-transparent dark:border-ink-800"
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors shadow-lg whitespace-nowrap"
            >
              Найти
            </motion.button>
          </motion.form>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/programs"
              className="flex items-center gap-2 text-sm text-ink-600 hover:text-ink-900 dark:text-white/80 dark:hover:text-white transition-colors font-medium"
            >
              Смотреть программы <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-ink-300 dark:text-white/20">|</span>
            <Link
              href="/bolashak"
              className="flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 dark:text-gold-400 dark:hover:text-gold-300 transition-colors font-medium"
            >
              <Award className="w-3.5 h-3.5" />
              Гид по программе Болашак
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────── */}
      <section className="bg-white dark:bg-ink-950 border-b border-ink-100 dark:border-ink-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div
                  className="text-3xl font-bold text-ink-900 dark:text-white mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="text-sm text-ink-500 dark:text-ink-400">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-widest mb-3">
            Как это работает
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-ink-900 dark:text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Три шага к поступлению
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative bg-white dark:bg-ink-900 rounded-2xl border border-ink-200 dark:border-ink-800 p-6 card-hover"
            >
              <div className="text-5xl font-bold text-ink-100 dark:text-ink-800/50 absolute top-4 right-5 select-none"
                style={{ fontFamily: "var(--font-display)" }}>
                {i + 1}
              </div>
              <div className={`w-11 h-11 rounded-xl ${s.color} flex items-center justify-center mb-4`}>
                <s.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-ink-900 dark:text-white text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-ink-500 dark:text-ink-400 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── BOLASHAK BANNER ───────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-gradient-to-r from-amber-500 to-amber-600 dark:from-ink-950 dark:via-amber-950 dark:to-ink-900 rounded-3xl border border-transparent dark:border-amber-500/20 p-8 sm:p-10 text-white shadow-sm dark:shadow-[0_24px_80px_-40px_rgba(245,158,11,0.45)]"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-px bg-white/30 dark:bg-amber-300/30" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-14 h-14 bg-white/20 dark:bg-amber-500/15 rounded-2xl flex items-center justify-center shrink-0 ring-1 ring-white/20 dark:ring-amber-400/25">
              <Award className="w-7 h-7 text-white dark:text-amber-300" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>
                Стипендия Болашак
              </h3>
              <p className="text-white/80 dark:text-ink-300 text-sm leading-relaxed max-w-xl">
                Государственный грант покрывает обучение за рубежом.
                Посмотрите требования, сроки и подходящие программы.
              </p>
            </div>
            <Link href="/bolashak">
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-center gap-2 bg-white dark:bg-amber-400 text-amber-600 dark:text-ink-950 font-semibold text-sm px-5 py-3 rounded-xl cursor-pointer whitespace-nowrap transition-colors dark:hover:bg-amber-300"
              >
                Узнать больше <ChevronRight className="w-4 h-4" />
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── POPULAR PROGRAMS ──────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-end justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-widest mb-1">
              Рекомендуемые программы
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-ink-900 dark:text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Программы, подходящие для Болашак
            </h2>
          </motion.div>
          <Link
            href="/programs?bolashak=true"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
          >
            Смотреть все <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((p, i) => (
            <ProgramCard key={p.id} program={p} index={i} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300"
          >
            Смотреть все программы <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── CTA BOTTOM ────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-brand-600 dark:bg-ink-900 dark:border dark:border-ink-800 rounded-3xl p-10 text-center text-white"
        >
          <h2
            className="text-3xl font-bold mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Готовы начать?
          </h2>
          <p className="text-white/80 dark:text-ink-300 mb-8 max-w-md mx-auto">
            Более 500 программ магистратуры в одном месте. Найдите подходящую уже сейчас.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/programs">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white text-brand-600 dark:bg-brand-600 dark:text-white dark:hover:bg-brand-500 font-semibold px-6 py-3 rounded-xl cursor-pointer"
              >
                Найти программу
              </motion.div>
            </Link>
            <Link href="/checklist">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white/15 hover:bg-white/25 dark:bg-ink-800 dark:hover:bg-ink-700 text-white font-semibold px-6 py-3 rounded-xl cursor-pointer transition-colors border border-white/30 dark:border-ink-700"
              >
                Открыть чек-лист
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
