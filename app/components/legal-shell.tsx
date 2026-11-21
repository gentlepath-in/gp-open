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
    <div className="min-h-screen bg-[#f7f8f5] text-[#1d2a27]">
      <header className="border-b border-[#dfe5df] bg-[#f7f8f5]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="GentlePath app home">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#315b50] text-sm font-semibold text-white">
              M
            </span>
            <span className="text-lg font-semibold tracking-tight">GentlePath</span>
          </Link>
          <nav aria-label="Legal navigation" className="flex items-center gap-1 rounded-full border border-[#dde5de] bg-white p-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors sm:px-4 ${
                  item.href === activeHref
                    ? "bg-[#315b50] text-white"
                    : "text-[#65736e] hover:bg-[#edf2ec] hover:text-[#315b50]"
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
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#77877f]">
              {eyebrow}
            </p>
            <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-[#18352e] sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-sm text-base leading-7 text-[#66756f]">{description}</p>
            <div className="mt-6 inline-flex rounded-full border border-[#dbe4dc] bg-white px-3 py-1.5 text-xs font-medium text-[#65736e]">
              Updated {updated}
            </div>
          </aside>

          <article className="rounded-[28px] border border-[#e1e7e1] bg-white px-6 py-8 shadow-[0_12px_40px_rgba(37,72,61,0.06)] sm:px-10 sm:py-12 lg:px-12">
            {children}
          </article>
        </div>
      </main>

      <footer className="border-t border-[#e1e7e1] px-5 py-8 text-center text-sm text-[#7a8983]">
        For urgent support, contact local emergency services or a crisis line. This service is not an emergency service.
      </footer>
    </div>
  );
}
