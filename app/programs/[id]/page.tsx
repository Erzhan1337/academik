"use client";

import { useState, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft, MapPin, Clock, Star, Award, Globe,
  FileCheck, Calendar, BarChart2, CheckCircle2, Circle,
  Bell, X, ChevronRight,
} from "lucide-react";
import { PROGRAMS } from "@/lib/data";
import { useCompareStore } from "@/lib/compare-store";

const TABS = ["Обзор", "Требования", "Документы", "Сроки", "Отзывы и вопросы"] as const;

export default function ProgramDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const program = PROGRAMS.find((p) => p.id === id);
  if (!program) notFound();

  const [tab, setTab] = useState<typeof TABS[number]>("Обзор");
  const [checked, setChecked] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { items, favorites, add, remove, toggleFavorite } = useCompareStore();
  const inCompare = items.some((p) => p.id === program.id);
  const inFavorites = favorites.some((p) => p.id === program.id);

  const toggleDoc = (doc: string) =>
    setChecked((prev) => (prev.includes(doc) ? prev.filter((d) => d !== doc) : [...prev, doc]));

  const progress = Math.round((checked.length / program.documents.length) * 100);

  const handleReminderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setShowModal(false); setSubmitted(false); setEmail(""); }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
      {/* Back */}
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
        <Link href="/programs" className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Назад к каталогу
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-ink-200 p-6 mb-5"
          >
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {program.bolashak && (
                <span className="tag-pill-gold flex items-center gap-1">
                  <Award className="w-3 h-3" /> Болашак
                </span>
              )}
              <span className="tag-pill">{program.field}</span>
              {program.tags.map((t) => (
                <span key={t} className="tag-pill">{t}</span>
              ))}
            </div>
            <h1
              className="text-2xl sm:text-3xl font-bold text-ink-900 mb-2 leading-snug"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {program.title}
            </h1>
            <p className="text-ink-500 mb-4">{program.university}</p>
            <div className="flex flex-wrap gap-4 text-sm text-ink-500">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{program.city}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{program.duration}</span>
              <span className="flex items-center gap-1.5"><Globe className="w-4 h-4" />{program.language.join(", ")}</span>
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                {program.rating} · {program.students.toLocaleString("ru")} студентов
              </span>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-ink-200 overflow-hidden"
          >
            {/* Tab bar */}
            <div className="flex border-b border-ink-100 overflow-x-auto">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`relative px-5 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                    tab === t ? "text-brand-600" : "text-ink-500 hover:text-ink-900"
                  }`}
                >
                  {tab === t && (
                    <motion.span
                      layoutId="tab-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600 rounded-full"
                    />
                  )}
                  {t}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {tab === "Обзор" && (
                  <motion.div key="overview"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                    <p className="text-ink-600 leading-relaxed">{program.description}</p>
                  </motion.div>
                )}
                {tab === "Требования" && (
                  <motion.div key="req"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                    <ul className="flex flex-col gap-3">
                      {program.requirements.map((r, i) => (
                        <motion.li
                          key={r}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-3 text-sm text-ink-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                          {r}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
                {tab === "Документы" && (
                  <motion.div key="docs"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                    {/* Progress */}
                    <div className="mb-5">
                      <div className="flex items-center justify-between mb-2 text-sm">
                        <span className="font-medium text-ink-700">Прогресс сбора</span>
                        <span className="font-bold text-brand-600">{checked.length}/{program.documents.length}</span>
                      </div>
                      <div className="progress-bar">
                        <motion.div
                          className="progress-bar-fill"
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                    <ul className="flex flex-col gap-2.5">
                      {program.documents.map((doc, i) => {
                        const done = checked.includes(doc);
                        return (
                          <motion.li
                            key={doc}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04 }}
                          >
                            <label className="flex items-center gap-3 cursor-pointer group">
                              <input type="checkbox" className="sr-only" checked={done} onChange={() => toggleDoc(doc)} />
                              <motion.div whileTap={{ scale: 0.9 }}
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${done ? "border-brand-500 bg-brand-500" : "border-ink-300 group-hover:border-brand-400"}`}
                              >
                                {done && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                                </motion.div>}
                              </motion.div>
                              <span className={`text-sm transition-colors ${done ? "line-through text-ink-400" : "text-ink-700"}`}>
                                {doc}
                              </span>
                            </label>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </motion.div>
                )}
                {tab === "Сроки" && (
                  <motion.div key="deadlines"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                    <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl border border-amber-200 mb-4">
                      <Calendar className="w-8 h-8 text-amber-500 shrink-0" />
                      <div>
                        <div className="font-semibold text-ink-900">Срок подачи</div>
                        <div className="text-2xl font-bold text-amber-600" style={{ fontFamily: "var(--font-display)" }}>
                          {program.deadlineLabel}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-ink-500 leading-relaxed">
                      Убедитесь, что документы готовы заранее. Рекомендуем начать подготовку за 4–6 недель до срока подачи.
                    </p>
                  </motion.div>
                )}
                {tab === "Отзывы и вопросы" && (
                  <motion.div key="reviews"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                    
                    <div className="mb-8">
                      <h3 className="font-bold text-ink-900 dark:text-white mb-4">Отзывы студентов</h3>
                      <div className="flex flex-col gap-4">
                        <div className="bg-ink-50 dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-ink-900 dark:text-white text-sm">Айгерим С.</span>
                            <div className="flex items-center text-gold-500">
                              <Star className="w-3.5 h-3.5 fill-gold-500" />
                              <Star className="w-3.5 h-3.5 fill-gold-500" />
                              <Star className="w-3.5 h-3.5 fill-gold-500" />
                              <Star className="w-3.5 h-3.5 fill-gold-500" />
                              <Star className="w-3.5 h-3.5 fill-gold-500" />
                            </div>
                          </div>
                          <p className="text-sm text-ink-600 dark:text-ink-400">
                            "Отличная программа, помогла мне устроиться в международную компанию. Преподаватели — практики с огромным опытом. Однозначно рекомендую!"
                          </p>
                        </div>
                        <div className="bg-ink-50 dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-ink-900 dark:text-white text-sm">Ильяс Н.</span>
                            <div className="flex items-center text-gold-500">
                              <Star className="w-3.5 h-3.5 fill-gold-500" />
                              <Star className="w-3.5 h-3.5 fill-gold-500" />
                              <Star className="w-3.5 h-3.5 fill-gold-500" />
                              <Star className="w-3.5 h-3.5 fill-gold-500" />
                              <Star className="w-3.5 h-3.5" />
                            </div>
                          </div>
                          <p className="text-sm text-ink-600 dark:text-ink-400">
                            "Обучение интенсивное, особенно на втором семестре. Было тяжело совмещать с работой. Но качество знаний на высоте."
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-ink-900 dark:text-white mb-4">Часто задаваемые вопросы</h3>
                      <div className="flex flex-col gap-3">
                        <div className="border border-ink-200 dark:border-ink-800 rounded-xl p-4">
                          <div className="font-semibold text-sm mb-1 dark:text-white">Есть ли общежитие?</div>
                          <p className="text-sm text-ink-500 dark:text-ink-400">Да, университет предоставляет места для студентов магистратуры при наличии квоты.</p>
                        </div>
                        <div className="border border-ink-200 dark:border-ink-800 rounded-xl p-4">
                          <div className="font-semibold text-sm mb-1 dark:text-white">Возможно ли обучение онлайн?</div>
                          <p className="text-sm text-ink-500 dark:text-ink-400">По правилам Болашак онлайн-обучение не допускается. Формат — очно.</p>
                        </div>
                      </div>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-4"
        >
          {/* Cost card */}
          <div className="bg-white rounded-2xl border border-ink-200 p-5">
            <div className="text-2xl font-bold text-ink-900 mb-0.5" style={{ fontFamily: "var(--font-display)" }}>
              {program.costLabel}
            </div>
            <div className="text-sm text-ink-400 mb-5">в год</div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => setShowModal(true)}
                className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
              >
                <Bell className="w-4 h-4" />
                Напомнить о сроке подачи
              </button>
              <button
                onClick={() => inCompare ? remove(program.id) : add(program)}
                className={`w-full flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-xl border transition-colors ${
                  inCompare
                    ? "bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 border-brand-200 dark:border-transparent"
                    : "bg-ink-50 dark:bg-ink-900 text-ink-700 dark:text-ink-300 border-ink-200 dark:border-ink-800 hover:bg-brand-50 dark:hover:bg-brand-500/10 hover:text-brand-700 dark:hover:text-brand-400"
                }`}
              >
                <BarChart2 className="w-4 h-4" />
                {inCompare ? "В сравнении ✓" : "Сравнить"}
              </button>
              
              <button
                onClick={() => toggleFavorite(program)}
                className={`w-full flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-xl border transition-colors ${
                  inFavorites
                    ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-transparent"
                    : "bg-ink-50 dark:bg-ink-900 text-ink-700 dark:text-ink-300 border-ink-200 dark:border-ink-800 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                <Calendar className="w-4 h-4" />
                {inFavorites ? "В календаре ✓" : "Добавить в календарь"}
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-ink-900 text-white text-sm font-semibold py-2.5 rounded-xl opacity-50 cursor-not-allowed">
                Подать заявку
                <span className="text-[10px] font-normal opacity-70">— скоро</span>
              </button>
            </div>
          </div>

          {/* Quick stats */}
          <div className="bg-white rounded-2xl border border-ink-200 p-5">
            <h4 className="font-semibold text-ink-900 text-sm mb-3">Информация</h4>
            <div className="flex flex-col gap-2.5 text-sm">
              {[
                ["Город", program.city],
                ["Длительность", program.duration],
                ["Язык", program.language.join(", ")],
                ["Студенты", program.students.toLocaleString("ru")],
                ["Болашак", program.bolashak ? "✓ Подходит" : "✗ Нет"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between">
                  <span className="text-ink-500">{k}</span>
                  <span className={`font-medium ${k === "Болашак" && program.bolashak ? "text-amber-600" : "text-ink-800"}`}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.aside>
      </div>

      {/* Deadline reminder modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
            onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-ink-900">Напоминание о сроке подачи</h3>
                <button onClick={() => setShowModal(false)} className="text-ink-400 hover:text-ink-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {!submitted ? (
                <form onSubmit={handleReminderSubmit}>
                  <p className="text-sm text-ink-500 mb-4">
                    Мы пришлём напоминание на email за неделю до срока подачи{" "}
                    <strong className="text-amber-600">{program.deadlineLabel}</strong>.
                  </p>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full border border-ink-200 rounded-xl px-4 py-2.5 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <button
                    type="submit"
                    className="w-full bg-brand-600 text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-brand-700 transition-colors"
                  >
                    Подписаться
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="text-center py-4"
                >
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                  <p className="font-semibold text-ink-900">Готово!</p>
                  <p className="text-sm text-ink-500 mt-1">Напоминание будет отправлено на {email}</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
