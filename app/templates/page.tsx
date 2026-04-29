"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Copy, CheckCircle2, FileSignature, BookOpen, Mail, Sparkles, Printer } from "lucide-react";

const TEMPLATES = [
  { id: "sop", title: "Мотивационное (SOP)", icon: FileSignature },
  { id: "cv", title: "Academic CV", icon: BookOpen },
  { id: "cold_email", title: "Письмо профессору", icon: Mail },
  { id: "recommendation", title: "Запрос рекомендации", icon: FileSignature },
] as const;

type TemplateId = typeof TEMPLATES[number]["id"];

export default function TemplatesPage() {
  const [activeTab, setActiveTab] = useState<TemplateId>("sop");
  
  const [formData, setFormData] = useState({
    name: "Aigerim S.",
    university: "Назарбаев Университет",
    field: "Компьютерные науки",
    reason: "хочу развивать Data Science в Казахстане",
    gpa: "3.8/4.0",
    experience: "помощник исследователя 1 год",
    professorName: "Dr. Alan Turing",
    researchTopic: "искусственный интеллект в медицине",
  });

  const [editedText, setEditedText] = useState("");
  const [copied, setCopied] = useState(false);
  const [isAIEnhancing, setIsAIEnhancing] = useState(false);

  const generateSOP = () => `Dear Admissions Committee of ${formData.university},

I am writing to express my strong interest in the Master's program in ${formData.field}. My name is ${formData.name}, and during my undergraduate studies I achieved a GPA of ${formData.gpa}.

I am drawn to this program because ${formData.reason}. My experience as a ${formData.experience} has given me practical skills that align with the curriculum at ${formData.university}.

I am confident that the academic environment at your institution will help me grow professionally and contribute meaningfully to the university community.

Sincerely,
${formData.name}`;

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
To pursue a Master's degree at ${formData.university} to further specialize in ${formData.field}.`;

  const generateColdEmail = () => `Subject: Prospective Master's Student Interested in Your Research

Dear ${formData.professorName},

I hope this email finds you well. My name is ${formData.name} and I am planning to apply for the Master's program in ${formData.field} at ${formData.university}.

I have read your recent papers on ${formData.researchTopic} and was deeply inspired. Because ${formData.reason}, I believe that joining your lab would be the perfect environment for me to grow as a researcher. During my time as a ${formData.experience}, I developed skills that I believe would be valuable to your ongoing projects.

Would you be open to a brief chat sometime next week to discuss potential opportunities in your lab? I have attached my CV for your reference.

Best regards,
${formData.name}`;

  const generateRec = () => `Subject: Recommendation Letter Request - ${formData.name}

Dear ${formData.professorName},

I hope this email finds you well. I am currently applying for Master's programs in ${formData.field}, including my top choice at ${formData.university}.

Given my experience as a ${formData.experience} under your guidance and my strong academic performance (GPA: ${formData.gpa}), I was hoping you might be willing to write a strong letter of recommendation on my behalf.

I have attached my updated CV and a draft of my statement of purpose for your reference. Please let me know if you would be able to support my application.

Thank you for your time and continued support.

Sincerely,
${formData.name}`;

  // Update text when form data changes (simple binding)
  useEffect(() => {
    if (activeTab === "sop") setEditedText(generateSOP());
    else if (activeTab === "cv") setEditedText(generateCV());
    else if (activeTab === "cold_email") setEditedText(generateColdEmail());
    else setEditedText(generateRec());
  }, [formData, activeTab]);

  const handleCopy = () => {
    navigator.clipboard.writeText(editedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const printRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;
    try {
      // Dynamically import to avoid SSR errors
      const html2pdf = (await import("html2pdf.js")).default;
      const opt = {
        margin:       0.75,
        filename:     `${activeTab}_document.pdf`,
        image:        { type: 'jpeg' as const, quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in' as const, format: 'a4', orientation: 'portrait' as const }
      };
      html2pdf().set(opt).from(printRef.current).save();
    } catch (error) {
      console.error("PDF generation failed", error);
      window.print(); // fallback
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAIEnhance = () => {
    setIsAIEnhancing(true);
    // Simulate AI processing delay
    setTimeout(() => {
      let enhanced = editedText;
      
      // Simulate intelligent rewrites based on template
      enhanced = enhanced.replace("I am writing to express my strong interest", "It is with profound enthusiasm that I submit my application");
      enhanced = enhanced.replace("I hope this email finds you well.", "I am writing to express my deep admiration for your esteemed research group.");
      enhanced = enhanced.replace("Because", "Driven by a profound motivation,");
      enhanced = enhanced.replace("I was hoping you might be willing", "I would be deeply honored if you would consider");
      enhanced = enhanced.replace("I am confident that", "I am highly confident that");
      
      setEditedText(enhanced);
      setIsAIEnhancing(false);
    }, 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 print:p-0 print:m-0">
        <div className="mb-10 text-center max-w-2xl mx-auto print:hidden">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 text-sm px-4 py-1.5 rounded-full mb-6 font-medium"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Интерактивный редактор
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-ink-950 dark:text-white mb-4 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Генератор документов
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-ink-600 dark:text-ink-400"
          >
            Соберите базовую структуру академического письма или CV за пару кликов и доведите её до идеала с помощью ИИ.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Left Panel - Premium Form (Hidden on Print) */}
          <motion.div 
            initial={{ opacity: 0, x: -20, filter: "blur(10px)" }} 
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full lg:w-[450px] shrink-0 print:hidden"
          >
            <div className="bg-white/70 dark:bg-ink-900/40 backdrop-blur-2xl rounded-[2rem] border border-white/50 dark:border-ink-800/50 shadow-2xl shadow-ink-200/20 dark:shadow-black/40 p-6 sticky top-28">
              
              {/* iOS Style Tabs */}
              <div className="bg-ink-100/50 dark:bg-ink-950/50 p-1.5 rounded-2xl mb-8 grid grid-cols-2 gap-1">
                {TEMPLATES.map((t) => {
                  const Icon = t.icon;
                  const isActive = activeTab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id)}
                      className={`relative flex items-center justify-center gap-2 py-3 px-2 flex-1 min-w-[120px] text-[13px] font-semibold rounded-xl transition-all duration-300 z-10 ${
                        isActive
                          ? "text-brand-600 dark:text-brand-400 shadow-sm"
                          : "text-ink-500 dark:text-ink-400 hover:text-ink-900 dark:hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-white dark:bg-ink-800 rounded-xl -z-10 shadow-sm border border-black/5 dark:border-white/5"
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />
                      )}
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{t.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Form with Premium Inputs */}
              <div className="flex flex-col gap-5">
                <div className="group">
                  <label className="block text-xs font-bold text-ink-500 dark:text-ink-400 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-brand-500">Ваше имя</label>
                  <input
                    name="name" value={formData.name} onChange={handleChange}
                    className="w-full bg-ink-50/50 dark:bg-ink-950/50 border border-ink-200/50 dark:border-ink-800 focus:bg-white dark:focus:bg-ink-900 focus:border-brand-500/50 dark:focus:border-brand-500/50 text-ink-950 dark:text-white rounded-xl px-4 py-3 transition-all duration-300"
                  />
                </div>

                <AnimatePresence mode="popLayout">
                  {(activeTab === "cold_email" || activeTab === "recommendation") && (
                    <motion.div initial={{ opacity: 0, height: 0, scale: 0.95 }} animate={{ opacity: 1, height: "auto", scale: 1 }} exit={{ opacity: 0, height: 0, scale: 0.95 }} className="group mt-1">
                      <label className="block text-xs font-bold text-ink-500 dark:text-ink-400 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-brand-500">Имя профессора</label>
                      <input
                        name="professorName" value={formData.professorName} onChange={handleChange}
                        className="w-full bg-ink-50/50 dark:bg-ink-950/50 border border-ink-200/50 dark:border-ink-800 focus:bg-white dark:focus:bg-ink-900 focus:border-brand-500/50 dark:focus:border-brand-500/50 text-ink-950 dark:text-white rounded-xl px-4 py-3 transition-all duration-300"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="group mt-1">
                  <label className="block text-xs font-bold text-ink-500 dark:text-ink-400 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-brand-500">Целевой университет</label>
                  <input
                    name="university" value={formData.university} onChange={handleChange}
                    className="w-full bg-ink-50/50 dark:bg-ink-950/50 border border-ink-200/50 dark:border-ink-800 focus:bg-white dark:focus:bg-ink-900 focus:border-brand-500/50 dark:focus:border-brand-500/50 text-ink-950 dark:text-white rounded-xl px-4 py-3 transition-all duration-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-xs font-bold text-ink-500 dark:text-ink-400 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-brand-500">Специальность</label>
                    <input
                      name="field" value={formData.field} onChange={handleChange}
                      className="w-full bg-ink-50/50 dark:bg-ink-950/50 border border-ink-200/50 dark:border-ink-800 focus:bg-white dark:focus:bg-ink-900 focus:border-brand-500/50 dark:focus:border-brand-500/50 text-ink-950 dark:text-white rounded-xl px-4 py-3 transition-all duration-300"
                    />
                  </div>
                  <AnimatePresence mode="popLayout">
                    {(activeTab === "sop" || activeTab === "cv" || activeTab === "recommendation") && (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="group">
                        <label className="block text-xs font-bold text-ink-500 dark:text-ink-400 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-brand-500">GPA</label>
                        <input
                          name="gpa" value={formData.gpa} onChange={handleChange}
                          className="w-full bg-ink-50/50 dark:bg-ink-950/50 border border-ink-200/50 dark:border-ink-800 focus:bg-white dark:focus:bg-ink-900 focus:border-brand-500/50 dark:focus:border-brand-500/50 text-ink-950 dark:text-white rounded-xl px-4 py-3 transition-all duration-300"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence mode="popLayout">
                  {activeTab === "cold_email" && (
                    <motion.div initial={{ opacity: 0, height: 0, scale: 0.95 }} animate={{ opacity: 1, height: "auto", scale: 1 }} exit={{ opacity: 0, height: 0, scale: 0.95 }} className="group mt-1">
                      <label className="block text-xs font-bold text-ink-500 dark:text-ink-400 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-brand-500">Тема исследования</label>
                      <input
                        name="researchTopic" value={formData.researchTopic} onChange={handleChange}
                        className="w-full bg-ink-50/50 dark:bg-ink-950/50 border border-ink-200/50 dark:border-ink-800 focus:bg-white dark:focus:bg-ink-900 focus:border-brand-500/50 dark:focus:border-brand-500/50 text-ink-950 dark:text-white rounded-xl px-4 py-3 transition-all duration-300"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="group mt-1">
                  <label className="block text-xs font-bold text-ink-500 dark:text-ink-400 uppercase tracking-widest mb-2 flex items-center justify-between transition-colors group-focus-within:text-brand-500">
                    Опыт работы
                    <span className="text-[10px] text-ink-400 dark:text-ink-500 font-normal normal-case tracking-normal">Кратко</span>
                  </label>
                  <input
                    name="experience" value={formData.experience} onChange={handleChange}
                    className="w-full bg-ink-50/50 dark:bg-ink-950/50 border border-ink-200/50 dark:border-ink-800 focus:bg-white dark:focus:bg-ink-900 focus:border-brand-500/50 dark:focus:border-brand-500/50 text-ink-950 dark:text-white rounded-xl px-4 py-3 transition-all duration-300"
                  />
                </div>

                <AnimatePresence mode="popLayout">
                  {(activeTab === "sop" || activeTab === "cold_email") && (
                    <motion.div initial={{ opacity: 0, height: 0, scale: 0.95 }} animate={{ opacity: 1, height: "auto", scale: 1 }} exit={{ opacity: 0, height: 0, scale: 0.95 }} className="group mt-1">
                      <label className="block text-xs font-bold text-ink-500 dark:text-ink-400 uppercase tracking-widest mb-2 flex items-center justify-between transition-colors group-focus-within:text-brand-500">
                        Ваша мотивация
                        <span className="text-[10px] text-ink-400 dark:text-ink-500 font-normal normal-case tracking-normal">Зачем вам это?</span>
                      </label>
                      <textarea
                        name="reason" value={formData.reason} onChange={handleChange} rows={2}
                        className="w-full bg-ink-50/50 dark:bg-ink-950/50 border border-ink-200/50 dark:border-ink-800 focus:bg-white dark:focus:bg-ink-900 focus:border-brand-500/50 dark:focus:border-brand-500/50 text-ink-950 dark:text-white rounded-xl px-4 py-3 resize-none transition-all duration-300"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Right Panel - A4 Preview with True Dark Mode */}
          <motion.div 
            initial={{ opacity: 0, x: 20, filter: "blur(10px)" }} 
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} 
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="flex-1 flex flex-col print:w-full print:block"
          >
            {/* Action Bar (Hidden on Print) */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 print:hidden">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-2 text-sm font-semibold text-ink-700 dark:text-ink-200 hover:text-ink-950 dark:hover:text-white bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <Printer className="w-4 h-4" />
                  <span className="hidden sm:inline">Скачать PDF</span>
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 text-sm font-semibold text-ink-700 dark:text-ink-200 hover:text-ink-950 dark:hover:text-white bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 w-36 sm:w-40 justify-center"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? "Скопировано" : "Копировать"}</span>
                </button>
              </div>

              {/* Premium AI Button */}
              <button
                onClick={handleAIEnhance}
                disabled={isAIEnhancing}
                className="relative overflow-hidden group flex items-center gap-2 text-sm font-bold text-white px-6 py-2.5 rounded-xl transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-brand-500 to-emerald-500 bg-[length:200%_auto] animate-gradient" />
                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white mix-blend-overlay transition-opacity duration-300" />
                
                <Sparkles className={`relative z-10 w-4 h-4 ${isAIEnhancing ? "animate-spin" : ""}`} />
                <span className="relative z-10">{isAIEnhancing ? "Улучшение..." : "Улучшить с ИИ"}</span>
              </button>
            </div>
            
            {/* The Document Area */}
            <div className="relative group flex-1 min-h-[800px] print:min-h-0 perspective-1000">
              
              {/* AI Processing Overlay */}
              <AnimatePresence>
                {isAIEnhancing && (
                  <motion.div 
                    initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                    exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    className="absolute inset-0 z-20 bg-white/40 dark:bg-[#121212]/60 rounded-xl flex flex-col items-center justify-center print:hidden overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 to-brand-500/10 animate-pulse" />
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-16 h-16 relative mb-6">
                        <div className="absolute inset-0 border-4 border-brand-200/30 dark:border-brand-500/20 rounded-full" />
                        <div className="absolute inset-0 border-4 border-transparent border-t-brand-600 dark:border-t-brand-400 rounded-full animate-spin" />
                        <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-brand-600 dark:text-brand-400 animate-pulse" />
                      </div>
                      <p className="text-xl font-bold text-ink-900 dark:text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
                        Магия ИИ в действии
                      </p>
                      <p className="text-sm text-ink-600 dark:text-ink-400">Обогащаем словарный запас и структуру...</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* True Dark Mode Document */}
              {/* In dark mode: dark:bg-[#121212] gives a sleek black paper look. */}
              {/* In print: print:bg-white print:text-black forces standard printing. */}
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="w-full h-full bg-white text-ink-950 dark:bg-[#121212] dark:text-ink-200 p-12 sm:p-16 rounded-xl outline-none resize-none font-serif text-[15px] sm:text-[17px] leading-[1.8] border border-transparent dark:border-ink-800/50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transition-colors duration-500 print:shadow-none print:p-0 print:text-black print:bg-white print:border-none focus:ring-0"
                spellCheck={false}
              />
            </div>
            
            <p className="text-xs text-ink-400 dark:text-ink-600 mt-6 text-center print:hidden flex items-center justify-center gap-2">
              <span>💡</span> Текст можно редактировать прямо на листе. Нажмите «Улучшить с ИИ» для авто-редактуры.
            </p>

            {/* Hidden container for PDF generation */}
            <div className="hidden">
              <div ref={printRef} className="font-serif text-[16px] leading-[1.6] whitespace-pre-wrap text-black bg-white p-8">
                {editedText}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Global styles for this page (Print and Animations) */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { background: white !important; color: black !important; }
          textarea { height: auto !important; overflow: visible !important; border: none !important; }
          .min-h-screen { min-height: 0 !important; background: white !important; }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}} />
    </div>
  );
}
