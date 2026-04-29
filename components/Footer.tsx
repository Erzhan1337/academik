import Link from "next/link";
import { GraduationCap, Mail, MapPin } from "lucide-react";

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
    <footer className="bg-ink-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span
                className="text-xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Academik<span className="text-brand-400">.kz</span>
              </span>
            </div>
            <p className="text-ink-400 text-sm leading-relaxed mb-6">
              Платформа для выбора магистратуры и подготовки к поступлению в Казахстане.
            </p>
            <div className="flex flex-col gap-2 text-sm text-ink-400">
              <a href="mailto:hello@academik.kz" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5" />
                hello@academik.kz
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                Алматы, Казахстан
              </span>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Платформа</h4>
            <ul className="flex flex-col gap-3">
              {LINKS.platform.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ink-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Поддержка</h4>
            <ul className="flex flex-col gap-3">
              {LINKS.support.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-ink-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Сроки на почту</h4>
            <p className="text-sm text-ink-400 mb-4">
              Получайте напоминания о сроках подачи и полезные советы по поступлению.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="email@example.com"
                className="flex-1 bg-ink-800 text-white text-sm px-3 py-2.5 rounded-lg border border-ink-700 focus:outline-none focus:border-brand-500 placeholder:text-ink-500"
              />
              <button className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-ink-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-500">
            © 2025 Academik.kz. Все права защищены.
          </p>
          <div className="flex gap-4 text-xs text-ink-500">
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
