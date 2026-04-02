"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Search, SlidersHorizontal, X, Award, ChevronDown } from "lucide-react";
import { PROGRAMS, CITIES, LANGUAGES, FIELDS } from "@/lib/data";
import { ProgramCard } from "@/components/ProgramCard";

function ProgramsContent() {
  const params = useSearchParams();
  const initialQ = params.get("q") || "";
  const initialBolashak = params.get("bolashak") === "true";

  const [query, setQuery] = useState(initialQ);
  const [city, setCity] = useState("Все города");
  const [field, setField] = useState("Все направления");
  const [langs, setLangs] = useState<string[]>([]);
  const [bolashak, setBolashak] = useState(initialBolashak);
  const [maxCost, setMaxCost] = useState(3000);
  const [sortBy, setSortBy] = useState<"cost-asc" | "cost-desc" | "deadline" | "rating">("rating");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleLang = (l: string) =>
    setLangs((prev) => (prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]));

  const resetFilters = () => {
    setQuery("");
    setCity("Все города");
    setField("Все направления");
    setLangs([]);
    setBolashak(false);
    setMaxCost(3000);
    setSortBy("rating");
  };

  const filtered = useMemo(() => {
    let result = PROGRAMS.filter((p) => {
      if (query && !p.title.toLowerCase().includes(query.toLowerCase()) &&
          !p.university.toLowerCase().includes(query.toLowerCase()) &&
          !p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))) return false;
      if (city !== "Все города" && p.city !== city) return false;
      if (field !== "Все направления" && p.field !== field) return false;
      if (langs.length > 0 && !langs.some((l) => p.language.includes(l))) return false;
      if (bolashak && !p.bolashak) return false;
      if (p.cost > maxCost) return false;
      return true;
    });

    return result.sort((a, b) => {
      if (sortBy === "cost-asc") return a.cost - b.cost;
      if (sortBy === "cost-desc") return b.cost - a.cost;
      if (sortBy === "deadline") return a.deadline.localeCompare(b.deadline);
      return b.rating - a.rating;
    });
  }, [query, city, field, langs, bolashak, maxCost, sortBy]);

  const hasFilters = city !== "Все города" || field !== "Все направления" || langs.length > 0 || bolashak || maxCost < 3000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
      {/* Header */}
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold text-ink-900 mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Каталог программ
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-ink-500"
        >
          {filtered.length} программ найдено
        </motion.p>
      </div>

      {/* Search + Sort bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex gap-3 mb-6"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по названию, университету или тегу..."
            className="w-full bg-white dark:bg-ink-950 border border-ink-200 dark:border-ink-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-ink-900 dark:text-white placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors md:hidden ${
            filtersOpen || hasFilters ? "bg-brand-600 text-white border-brand-600" : "bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-300 border-ink-200 dark:border-ink-800"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Фильтры
          {hasFilters && <span className="w-2 h-2 rounded-full bg-white/80" />}
        </button>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="hidden sm:block bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-xl px-3 py-2.5 text-sm text-ink-700 dark:text-ink-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="rating">По рейтингу</option>
          <option value="cost-asc">Дешевле сначала</option>
          <option value="cost-desc">Дороже сначала</option>
          <option value="deadline">По дедлайну</option>
        </select>
      </motion.div>

      <div className="flex gap-6">
        {/* Sidebar filters — desktop */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="hidden md:block w-64 shrink-0"
        >
          <FilterPanel
            city={city} setCity={setCity}
            field={field} setField={setField}
            langs={langs} toggleLang={toggleLang}
            bolashak={bolashak} setBolashak={setBolashak}
            maxCost={maxCost} setMaxCost={setMaxCost}
            sortBy={sortBy} setSortBy={setSortBy}
            onReset={resetFilters} hasFilters={hasFilters}
          />
        </motion.aside>

        {/* Mobile filter drawer */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden w-full overflow-hidden mb-4"
            >
              <FilterPanel
                city={city} setCity={setCity}
                field={field} setField={setField}
                langs={langs} toggleLang={toggleLang}
                bolashak={bolashak} setBolashak={setBolashak}
                maxCost={maxCost} setMaxCost={setMaxCost}
                sortBy={sortBy} setSortBy={setSortBy}
                onReset={resetFilters} hasFilters={hasFilters}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cards grid */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4"
              >
                {filtered.map((p, i) => (
                  <ProgramCard key={p.id} program={p} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 text-ink-400"
              >
                <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium text-ink-500">Программы не найдены</p>
                <p className="text-sm mt-1">Попробуй изменить фильтры</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 text-sm text-brand-600 font-medium hover:underline"
                >
                  Сбросить фильтры
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ── Filter panel ──────────────────────────────────────────────── */
function FilterPanel({
  city, setCity, field, setField,
  langs, toggleLang, bolashak, setBolashak,
  maxCost, setMaxCost, sortBy, setSortBy,
  onReset, hasFilters,
}: {
  city: string; setCity: (v: string) => void;
  field: string; setField: (v: string) => void;
  langs: string[]; toggleLang: (l: string) => void;
  bolashak: boolean; setBolashak: (v: boolean) => void;
  maxCost: number; setMaxCost: (v: number) => void;
  sortBy: string; setSortBy: (v: any) => void;
  onReset: () => void; hasFilters: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl border border-ink-200 p-5 sticky top-20">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-ink-900 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Фильтры
        </h3>
        {hasFilters && (
          <button
            onClick={onReset}
            className="text-xs text-brand-600 font-medium flex items-center gap-1 hover:underline"
          >
            <X className="w-3 h-3" /> Сбросить
          </button>
        )}
      </div>

      {/* Bolashak toggle */}
      <label className="flex items-center justify-between gap-2 mb-5 cursor-pointer">
        <span className="flex items-center gap-2 text-sm font-medium text-ink-700">
          <Award className="w-3.5 h-3.5 text-gold-500" />
          Только Болашак
        </span>
        <div
          onClick={() => setBolashak(!bolashak)}
          className={`w-10 h-5.5 rounded-full relative transition-colors ${bolashak ? "bg-amber-500" : "bg-ink-200"}`}
          style={{ height: "22px" }}
        >
          <div className={`absolute top-0.5 w-4 h-4 bg-white dark:bg-ink-950 rounded-full shadow transition-transform ${bolashak ? "translate-x-5" : "translate-x-0.5"}`} />
        </div>
      </label>

      {/* City */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-ink-500 uppercase tracking-wider mb-2">Город</label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full bg-ink-50 border border-ink-200 rounded-lg px-3 py-2 text-sm text-ink-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          {CITIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Field */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-ink-500 uppercase tracking-wider mb-2">Направление</label>
        <select
          value={field}
          onChange={(e) => setField(e.target.value)}
          className="w-full bg-ink-50 border border-ink-200 rounded-lg px-3 py-2 text-sm text-ink-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          {FIELDS.map((f) => <option key={f}>{f}</option>)}
        </select>
      </div>

      {/* Language */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-ink-500 uppercase tracking-wider mb-2">Язык обучения</label>
        <div className="flex flex-col gap-2">
          {LANGUAGES.map((l) => (
            <label key={l} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={langs.includes(l)}
                onChange={() => toggleLang(l)}
                className="w-4 h-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
              />
              <span className="text-sm text-ink-700">{l}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Cost range */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-ink-500 uppercase tracking-wider mb-2">
          Стоимость до: <span className="text-ink-900 font-bold">{maxCost.toLocaleString("ru")} 000 ₸</span>
        </label>
        <input
          type="range"
          min={500}
          max={3000}
          step={100}
          value={maxCost}
          onChange={(e) => setMaxCost(Number(e.target.value))}
          className="w-full accent-brand-600"
        />
        <div className="flex justify-between text-xs text-ink-400 mt-1">
          <span>500K</span><span>3M</span>
        </div>
      </div>

      {/* Sort (mobile) */}
      <div className="md:hidden">
        <label className="block text-xs font-semibold text-ink-500 uppercase tracking-wider mb-2">Сортировка</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full bg-ink-50 border border-ink-200 rounded-lg px-3 py-2 text-sm text-ink-800 focus:outline-none"
        >
          <option value="rating">По рейтингу</option>
          <option value="cost-asc">Дешевле сначала</option>
          <option value="cost-desc">Дороже сначала</option>
          <option value="deadline">По дедлайну</option>
        </select>
      </div>
    </div>
  );
}

export default function ProgramsPage() {
  return (
    <Suspense>
      <ProgramsContent />
    </Suspense>
  );
}
