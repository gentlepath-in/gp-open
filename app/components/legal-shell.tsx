import Link from "next/link";
import type { ReactNode } from "react";

const navItems = [
  { href: "/privacypolicy", label: "Privacy" },
  { href: "/tnc", label: "Terms" },
  { href: "/userdata", label: "Your data" },
];

export function LegalShell({
  eyebrow,
  title,
  description,
  updated,
  activeHref,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  activeHref: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#1C1B1F] text-[#E6E1E5]">
      <header className="border-b border-[#3A383E] bg-[#1C1B1F]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="GentlePath app home">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#29B6F6] text-sm font-semibold text-[#FFFFFF]">
              G
            </span>
            <span className="text-lg font-semibold tracking-tight text-[#E6E1E5]">GentlePath</span>
          </Link>
          <nav aria-label="Legal navigation" className="flex items-center gap-1 rounded-full border border-[#3A383E] bg-[#252429] p-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors sm:px-4 ${
                  item.href === activeHref
                    ? "bg-[#29B6F6] text-[#FFFFFF]"
                    : "text-[#81D4FA] hover:bg-[#004D68] hover:text-[#BFE9FF]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#81D4FA]">
              {eyebrow}
            </p>
            <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-[#E6E1E5] sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-sm text-base leading-7 text-[#B8B2B8]">{description}</p>
            <div className="mt-6 inline-flex rounded-full border border-[#004D68] bg-[#252429] px-3 py-1.5 text-xs font-medium text-[#BFE9FF]">
              Updated {updated}
            </div>
          </aside>

          <article className="rounded-[28px] border border-[#3A383E] bg-[#252429] px-6 py-8 shadow-[0_16px_50px_rgba(0,0,0,0.24)] sm:px-10 sm:py-12 lg:px-12">
            {children}
          </article>
        </div>
      </main>

      <footer className="border-t border-[#3A383E] px-5 py-8 text-center text-sm text-[#AFA8B0]">
        For urgent support, contact local emergency services or a crisis line. This service is not an emergency service.
      </footer>
    </div>
  );
}
