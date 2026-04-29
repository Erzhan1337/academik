"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Award, CheckCircle2, XCircle, ChevronRight,
  Globe, GraduationCap, FileText, Calendar, ArrowRight,
} from "lucide-react";
import { PROGRAMS, BOLASHAK_QUIZ } from "@/lib/data";

const REQUIREMENTS = [
  { icon: GraduationCap, title: "Образование", desc: "Диплом бакалавра с отличием или высокий GPA" },
  { icon: Globe, title: "Гражданство", desc: "Гражданин Республики Казахстан" },
  { icon: Calendar, title: "Возраст", desc: "До 30 лет для магистратуры и до 35 лет для докторантуры" },
  { icon: FileText, title: "Обязательства", desc: "Возвращение и работа в Казахстане после завершения обучения" },
];

const PARTNER_UNIS = [
  { name: "MIT", country: "США", city: "Кембридж" },
  { name: "Imperial College London", country: "Великобритания", city: "Лондон" },
  { name: "ETH Zurich", country: "Швейцария", city: "Цюрих" },
  { name: "NUS Singapore", country: "Сингапур", city: "Сингапур" },
  { name: "TU Munich", country: "Германия", city: "Мюнхен" },
  { name: "University of Toronto", country: "Канада", city: "Торонто" },
];

export default function BolashakPage() {
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const eligible =
    answers.length === BOLASHAK_QUIZ.length &&
    answers.every((ans, i) => ans === BOLASHAK_QUIZ[i].correct);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (quizStep < BOLASHAK_QUIZ.length - 1) {
      setTimeout(() => setQuizStep((s) => s + 1), 300);
    } else {
      setTimeout(() => setShowResult(true), 300);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  const bolashakPrograms = PROGRAMS.filter((p) => p.bolashak);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 dark:from-ink-950 dark:via-amber-950 dark:to-ink-900 pt-32 pb-20 px-4 border-b border-transparent dark:border-amber-500/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 dark:bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-white/30 dark:bg-amber-300/30" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="w-20 h-20 bg-white/20 dark:bg-amber-500/15 rounded-3xl flex items-center justify-center mx-auto mb-6 ring-1 ring-white/20 dark:ring-amber-400/25"
          >
            <Award className="w-10 h-10 text-white dark:text-amber-300" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Стипендия Болашак
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/85 dark:text-ink-300 text-lg max-w-2xl mx-auto mb-8"
          >
            Государственная программа Казахстана, которая финансирует обучение
            сильных кандидатов в ведущих университетах мира
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 text-white"
          >
            {[
              ["3000+", "стипендий в год"],
              ["120+", "стран для обучения"],
              ["100%", "Покрытие стоимости"],
            ].map(([num, label]) => (
              <div key={label} className="bg-white/15 dark:bg-white/5 backdrop-blur rounded-2xl border border-white/10 dark:border-amber-500/15 px-6 py-4 text-center">
                <div className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>{num}</div>
                <div className="text-sm text-white/80 dark:text-ink-300">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Requirements */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 dark:text-white" style={{ fontFamily: "var(--font-display)" }}>
            Условия участия
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {REQUIREMENTS.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-ink-900 rounded-2xl border border-ink-200 dark:border-ink-800 p-5 card-hover text-center"
            >
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <r.icon className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-semibold text-ink-900 dark:text-white mb-2">{r.title}</h3>
              <p className="text-sm text-ink-500 dark:text-ink-400 leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quiz */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-amber-50 via-white to-white dark:from-ink-900 dark:to-ink-800 rounded-3xl border border-amber-200 dark:border-transparent p-8 text-ink-900 dark:text-white shadow-sm"
        >
          <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
            Проверь соответствие
          </h2>
          <p className="text-ink-500 dark:text-ink-400 text-sm mb-6">4 вопроса — проверьте базовое соответствие требованиям Болашак</p>

          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div key={quizStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                {/* Progress */}
                <div className="flex gap-1.5 mb-6">
                  {BOLASHAK_QUIZ.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${i <= quizStep ? "bg-amber-500" : "bg-amber-100 dark:bg-white/20"}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-amber-600 dark:text-amber-400 mb-2">Вопрос {quizStep + 1} из {BOLASHAK_QUIZ.length}</p>
                <h3 className="text-lg font-semibold mb-5">{BOLASHAK_QUIZ[quizStep].question}</h3>
                <div className="flex flex-col gap-2.5">
                  {BOLASHAK_QUIZ[quizStep].options.map((opt) => (
                    <motion.button
                      key={opt}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(opt)}
                      className="text-left px-4 py-3 rounded-xl border border-amber-200 dark:border-white/20 bg-white/70 dark:bg-transparent hover:border-amber-400 hover:bg-amber-100/70 dark:hover:bg-amber-500/10 text-sm font-medium transition-all"
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                {eligible ? (
                  <>
                    <CheckCircle2 className="w-16 h-16 text-emerald-500 dark:text-emerald-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-ink-900 dark:text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
                      Вы соответствуете базовым требованиям
                    </h3>
                    <p className="text-ink-500 dark:text-ink-400 text-sm mb-6">
                      По вашим ответам вы проходите базовую проверку по требованиям Болашак.
                      Следующий шаг — выбрать программу и начать подготовку документов.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Link href="/programs?bolashak=true">
                        <div className="bg-amber-500 hover:bg-amber-400 text-white dark:text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors cursor-pointer flex items-center gap-2 justify-center">
                          Смотреть программы <ArrowRight className="w-4 h-4" />
                        </div>
                      </Link>
                      <button onClick={resetQuiz} className="text-ink-500 dark:text-ink-400 hover:text-ink-900 dark:hover:text-white text-sm underline">
                        Пройти снова
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="w-16 h-16 text-red-500 dark:text-red-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-ink-900 dark:text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
                      Пока есть ограничения
                    </h3>
                    <p className="text-ink-500 dark:text-ink-400 text-sm mb-6">
                      По некоторым критериям есть несоответствия. Посмотрите другие
                      гранты и программы с частичным финансированием.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Link href="/programs">
                        <div className="bg-brand-600 hover:bg-brand-500 text-white font-semibold px-6 py-3 rounded-xl text-sm cursor-pointer flex items-center gap-2 justify-center">
                          Другие программы <ArrowRight className="w-4 h-4" />
                        </div>
                      </Link>
                      <button onClick={resetQuiz} className="text-ink-500 dark:text-ink-400 hover:text-ink-900 dark:hover:text-white text-sm underline">
                        Пройти снова
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Partner Universities */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-ink-900 dark:text-white mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Партнёрские университеты
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PARTNER_UNIS.map((u, i) => (
            <motion.div
              key={u.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-xl p-3 text-center card-hover"
            >
              <div className="text-sm font-semibold text-ink-900 dark:text-white mb-0.5">{u.name}</div>
              <div className="text-xs text-ink-400 dark:text-ink-500">{u.country}</div>
            </motion.div>
          ))}
        </div>
        <p className="text-sm text-ink-400 mt-3">
          * Это примерный список. Актуальный перечень смотрите на официальном сайте Болашак.
        </p>
      </section>

      {/* Bolashak programs from catalog */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-ink-900 dark:text-white" style={{ fontFamily: "var(--font-display)" }}>
            Программы, подходящие для Болашак
          </h2>
          <Link href="/programs?bolashak=true" className="text-sm font-medium text-brand-600 flex items-center gap-1 hover:underline">
            Смотреть все <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bolashakPrograms.slice(0, 3).map((p, i) => (
            <Link href={`/programs/${p.id}`} key={p.id}>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-ink-900 rounded-2xl border border-amber-200 dark:border-amber-900/50 p-4 card-hover"
              >
                <div className="tag-pill-gold inline-flex items-center gap-1 mb-2">
                  <Award className="w-3 h-3" /> Болашак
                </div>
                <h3 className="font-semibold text-ink-900 dark:text-white text-sm mb-1">{p.title}</h3>
                <p className="text-xs text-ink-500 dark:text-ink-400 mb-3">{p.university}</p>
                <div className="flex items-center justify-between text-xs text-ink-500 dark:text-ink-400">
                  <span>{p.city}</span>
                  <span className="font-semibold text-ink-900 dark:text-white">{p.costLabel}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
