"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileText, Copy, CheckCircle2, FileSignature, BookOpen } from "lucide-react";

const TEMPLATES = [
  { id: "sop", title: "Мотивационное письмо (SOP)" },
  { id: "cv", title: "Academic CV" },
] as const;

export default function TemplatesPage() {
  const [activeTab, setActiveTab] = useState<"sop" | "cv">("sop");
  
  const [formData, setFormData] = useState({
    name: "Aigerim S.",
    university: "UCL / Назарбаев Университет",
    field: "Компьютерные Науки",
    reason: "хочу развивать Data Science в Казахстане",
    gpa: "3.8/4.0",
    experience: "помощник исследователя 1 год",
  });

  const [copied, setCopied] = useState(false);

  const generateSOP = () => `Dear Admissions Committee of ${formData.university},

I am writing to express my profound interest in applying for the Master's program in ${formData.field}. My name is ${formData.name}, and during my undergraduate studies, I achieved a GPA of ${formData.gpa}.

The primary reason I am drawn to your program is my desire to advance my knowledge and skills because ${formData.reason}. My prior experience as a ${formData.experience} has equipped me with practical insights that align perfectly with the curriculum at ${formData.university}.

I am confident that the rigorous academic environment at your institution will provide the ideal platform for my growth. I look forward to contributing to your dynamic community.

Sincerely,
${formData.name}
`;

  const generateCV = () => `# ${formData.name}
**Contact**: [Your Email] | [Your LinkedIn]

## Education
**BSc in [Your Bachelor Major]**
*University Name* (2019 - 2023)
- GPA: ${formData.gpa}

## Professional Experience
**${formData.experience.charAt(0).toUpperCase() + formData.experience.slice(1)}**
*[Company/Lab Name]* (Dates)
- Conducted research and analysis in ${formData.field}
- Supported key initiatives leading to [Insert result]

## Objective
To pursue a Master's degree at ${formData.university} to further specialize in ${formData.field}.
`;

  const outputText = activeTab === "sop" ? generateSOP() : generateCV();

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold text-ink-900 dark:text-white mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Генератор документов
        </motion.h1>
        <p className="text-ink-500 dark:text-ink-400">Сгенерируйте базовую структуру для своих IELTS, CV или эссе в один клик</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="bg-white dark:bg-ink-900 rounded-2xl border border-ink-200 dark:border-ink-800 p-6">
            <div className="flex bg-ink-50 dark:bg-ink-950 p-1 rounded-xl mb-6">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                    activeTab === t.id
                      ? "bg-white dark:bg-ink-800 text-brand-600 dark:text-brand-400 shadow-sm"
                      : "text-ink-500 dark:text-ink-400 hover:text-ink-900 dark:hover:text-white"
                  }`}
                >
                  {t.title}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink-500 uppercase mb-1.5 dark:text-ink-400">Ваше Имя</label>
                <input
                  name="name" value={formData.name} onChange={handleChange}
                  className="w-full border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-950 text-ink-900 dark:text-white rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink-500 uppercase mb-1.5 dark:text-ink-400">Университет мечты</label>
                  <input
                    name="university" value={formData.university} onChange={handleChange}
                    className="w-full border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-950 text-ink-900 dark:text-white rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-500 uppercase mb-1.5 dark:text-ink-400">Направление</label>
                  <input
                    name="field" value={formData.field} onChange={handleChange}
                    className="w-full border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-950 text-ink-900 dark:text-white rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink-500 uppercase mb-1.5 dark:text-ink-400">Средний балл (GPA)</label>
                  <input
                    name="gpa" value={formData.gpa} onChange={handleChange}
                    className="w-full border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-950 text-ink-900 dark:text-white rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-500 uppercase mb-1.5 dark:text-ink-400">Опыт работы</label>
                  <input
                    name="experience" value={formData.experience} onChange={handleChange}
                    className="w-full border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-950 text-ink-900 dark:text-white rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-500 uppercase mb-1.5 dark:text-ink-400">Зачем поступаете?</label>
                <textarea
                  name="reason" value={formData.reason} onChange={handleChange} rows={2}
                  className="w-full border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-950 text-ink-900 dark:text-white rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-brand-500 resize-none"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <div className="relative bg-ink-950 text-ink-50 rounded-2xl p-6 shadow-2xl h-full flex flex-col border border-ink-800">
            <div className="flex items-center justify-between mb-4 border-b border-ink-800 pb-4">
              <div className="flex items-center gap-2">
                {activeTab === "sop" ? <FileSignature className="w-5 h-5 text-brand-400" /> : <BookOpen className="w-5 h-5 text-emerald-400" />}
                <h3 className="font-semibold text-white">Предпросмотр результата</h3>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Скопировано" : "Скопировать"}
              </button>
            </div>
            
            <pre className="flex-1 overflow-auto text-sm font-mono text-ink-300 whitespace-pre-wrap leading-relaxed">
              {outputText}
            </pre>
            
            <p className="text-xs text-ink-500 mt-4 border-t border-ink-800 pt-4">
              * Сгенерированный текст является только начальной структурой. Рекомендуем дополнить его личными историями.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
