import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

const LINKS = {
  platform: [
    { href: "/programs", label: "Каталог программ" },
    { href: "/bolashak", label: "Стипендия Болашак" },
    { href: "/compare", label: "Сравнение программ" },
    { href: "/checklist", label: "Чек-лист документов" },
  ],
  support: [
    { href: "#", label: "FAQ" },
    { href: "#", label: "Контакты" },
    { href: "#", label: "Блог" },
    { href: "#", label: "О проекте" },
  ],
};

export function Footer() {
  return (
    <footer className="mt-20 border-t border-ink-200 bg-white text-ink-900 transition-colors dark:border-ink-800 dark:bg-ink-950 dark:text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Academik"
                width={201}
                height={48}
                className="h-12 w-auto object-contain dark:brightness-0 dark:invert"
              />
            </div>
            <p className="mb-6 text-sm leading-relaxed text-ink-600 dark:text-ink-400">
              Платформа для выбора магистратуры и подготовки к поступлению в Казахстане.
            </p>
            <div className="flex flex-col gap-2 text-sm text-ink-600 dark:text-ink-400">
              <a href="mailto:hello@academik.kz" className="flex items-center gap-2 transition-colors hover:text-brand-600 dark:hover:text-white">
                <Mail className="h-3.5 w-3.5" />
                hello@academik.kz
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" />
                Алматы, Казахстан
              </span>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink-950 dark:text-white">Платформа</h4>
            <ul className="flex flex-col gap-3">
              {LINKS.platform.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ink-600 transition-colors hover:text-brand-600 dark:text-ink-400 dark:hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink-950 dark:text-white">Поддержка</h4>
            <ul className="flex flex-col gap-3">
              {LINKS.support.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-ink-600 transition-colors hover:text-brand-600 dark:text-ink-400 dark:hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink-950 dark:text-white">Сроки на почту</h4>
            <p className="mb-4 text-sm text-ink-600 dark:text-ink-400">
              Получайте напоминания о сроках подачи и полезные советы по поступлению.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="email@example.com"
                className="min-w-0 flex-1 rounded-lg border border-ink-200 bg-ink-50 px-3 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-brand-500 focus:outline-none dark:border-ink-800 dark:bg-ink-900 dark:text-white dark:placeholder:text-ink-500"
              />
              <button className="whitespace-nowrap rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700 dark:hover:bg-brand-500">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-200 pt-6 dark:border-ink-800 sm:flex-row">
          <p className="text-xs text-ink-500 dark:text-ink-500">
            © 2025 Academik.kz. Все права защищены.
          </p>
          <div className="flex gap-4 text-xs text-ink-500 dark:text-ink-500">
            <a href="#" className="transition-colors hover:text-brand-600 dark:hover:text-white">Политика конфиденциальности</a>
            <a href="#" className="transition-colors hover:text-brand-600 dark:hover:text-white">Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
