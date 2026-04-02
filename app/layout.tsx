import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CompareProvider } from "@/lib/compare-store";
import { CompareBar } from "@/components/CompareBar";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Academi.kz — Твоя магистратура в Казахстане",
  description:
    "Умный подбор программ магистратуры, модуль Болашак и чек-лист документов для поступления в университеты Казахстана.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CompareProvider>
            <Navbar />
            <main>{children}</main>
            <CompareBar />
            <Footer />
          </CompareProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
