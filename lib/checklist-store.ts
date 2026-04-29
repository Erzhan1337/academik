"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ChecklistDoc = {
  id: string;
  name: string;
  category: string;
  required: boolean;
};

export const GENERAL_DOCS: ChecklistDoc[] = [
  { id: "g1", name: "Удостоверение личности / паспорт", category: "Личные документы", required: true },
  { id: "g2", name: "Фотография 3x4 (4 штуки)", category: "Личные документы", required: true },
  { id: "g3", name: "Копия диплома бакалавра (нотариально заверенная)", category: "Образование", required: true },
  { id: "g4", name: "Транскрипт оценок (нотариально заверенный)", category: "Образование", required: true },
  { id: "g5", name: "Диплом о среднем образовании", category: "Образование", required: false },
  { id: "g6", name: "Мотивационное письмо (SOP)", category: "Заявочные документы", required: true },
  { id: "g7", name: "CV / резюме на английском", category: "Заявочные документы", required: true },
  { id: "g8", name: "2 рекомендательных письма", category: "Заявочные документы", required: true },
  { id: "g9", name: "Сертификат IELTS / TOEFL", category: "Языковые сертификаты", required: false },
  { id: "g10", name: "Медицинская справка (форма 086)", category: "Медицинские документы", required: false },
  { id: "g11", name: "Справка об отсутствии судимости", category: "Юридические документы", required: false },
];

export const BOLASHAK_EXTRA: ChecklistDoc[] = [
  { id: "b1", name: "Заявление на грант Болашак", category: "Болашак", required: true },
  { id: "b2", name: "Решение работодателя / НПД (если есть)", category: "Болашак", required: false },
  { id: "b3", name: "Справка о составе семьи", category: "Болашак", required: true },
  { id: "b4", name: "Письмо о приёме из иностранного университета", category: "Болашак", required: true },
];

export const getChecklistDocs = (bolashakMode: boolean) =>
  bolashakMode ? [...GENERAL_DOCS, ...BOLASHAK_EXTRA] : GENERAL_DOCS;

export const getChecklistStats = (checked: string[], bolashakMode: boolean) => {
  const allDocs = getChecklistDocs(bolashakMode);
  const totalRequired = allDocs.filter((doc) => doc.required).length;
  const checkedRequired = allDocs.filter((doc) => doc.required && checked.includes(doc.id)).length;
  const totalChecked = checked.filter((id) => allDocs.some((doc) => doc.id === id)).length;

  return {
    allDocs,
    totalRequired,
    checkedRequired,
    totalChecked,
    remaining: allDocs.length - totalChecked,
    progress: Math.round((totalChecked / allDocs.length) * 100),
    requiredProgress: Math.round((checkedRequired / totalRequired) * 100),
  };
};

type ChecklistStore = {
  checked: string[];
  bolashakMode: boolean;
  selectedProgram: string;
  setBolashakMode: (value: boolean) => void;
  setSelectedProgram: (id: string) => void;
  toggleDoc: (id: string) => void;
  toggleCategory: (ids: string[]) => void;
  resetAll: () => void;
};

export const useChecklistStore = create<ChecklistStore>()(
  persist(
    (set) => ({
      checked: [],
      bolashakMode: false,
      selectedProgram: "",

      setBolashakMode: (value) => set({ bolashakMode: value }),
      setSelectedProgram: (id) => set({ selectedProgram: id }),

      toggleDoc: (id) =>
        set((state) => ({
          checked: state.checked.includes(id)
            ? state.checked.filter((item) => item !== id)
            : [...state.checked, id],
        })),

      toggleCategory: (ids) =>
        set((state) => {
          const allChecked = ids.every((id) => state.checked.includes(id));
          return {
            checked: allChecked
              ? state.checked.filter((id) => !ids.includes(id))
              : [...new Set([...state.checked, ...ids])],
          };
        }),

      resetAll: () => set({ checked: [] }),
    }),
    {
      name: "academik-checklist",
    }
  )
);
