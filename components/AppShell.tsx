"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CompareBar } from "./CompareBar";

const HIDDEN_SHELL_ROUTES = ["/auth"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideShell = HIDDEN_SHELL_ROUTES.some((r) => pathname.startsWith(r));

  return (
    <>
      {!hideShell && <Navbar />}
      <main>{children}</main>
      {!hideShell && <CompareBar />}
      {!hideShell && <Footer />}
    </>
  );
}
