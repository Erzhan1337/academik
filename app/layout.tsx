import type { Metadata } from "next";
import "./globals.css";
import { CompareProvider } from "@/lib/compare-store";
import { ThemeProvider } from "@/components/theme-provider";
import { AppShell } from "@/components/AppShell";

export const metadata: Metadata = {
  metadataBase: new URL("https://academik.kz"),
  title: "Academik.kz — магистратура в Казахстане",
  description:
    "Подбор программ магистратуры, гид по Болашак и чек-лист документов для поступления в университеты Казахстана.",
  icons: {
    icon: "/logo-mark.svg",
    shortcut: "/logo-mark.svg",
    apple: "/logo-mark.svg",
  },
  openGraph: {
    images: ["/logo.svg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/logo.svg"],
  },
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
            <AppShell>{children}</AppShell>
          </CompareProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
