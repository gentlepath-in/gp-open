import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { LegalShell } from "../components/legal-shell";

export const metadata: Metadata = {
  title: "Terms & Conditions | GentlePath",
  description: "Terms for using the GentlePath wellness coaching application.",
};

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-[#E6E1E5]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function MarkdownContent({ markdown }: { markdown: string }) {
  const lines = markdown.split(/\r?\n/);
  const elements: React.ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith("# ")) {
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={index}
          className="mt-10 mb-4 text-xl font-semibold tracking-tight text-[#E6E1E5] first:mt-0 sm:text-2xl"
        >
          {line.slice(3)}
        </h2>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (index < lines.length) {
        const item = lines[index].trim();
        if (!item.startsWith("- ")) break;
        items.push(item.slice(2));
        index += 1;
      }
      elements.push(
        <ul
          key={index}
          className="my-4 space-y-2 pl-5 text-[15px] leading-7 text-[#C7C1C8]"
        >
          {items.map((item, itemIndex) => (
            <li key={itemIndex} className="list-disc pl-1">
              {renderInline(item)}
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    const paragraphLines: string[] = [];
    while (index < lines.length) {
      const paragraphLine = lines[index].trim();
      if (
        !paragraphLine
        || paragraphLine.startsWith("#")
        || paragraphLine.startsWith("- ")
      ) {
        break;
      }
      paragraphLines.push(paragraphLine);
      index += 1;
    }
    elements.push(
      <p key={index} className="my-4 text-[15px] leading-7 text-[#C7C1C8]">
        {renderInline(paragraphLines.join(" "))}
      </p>,
    );
  }

  return <div className="max-w-3xl">{elements}</div>;
}

export default async function TermsPage() {
  const markdown = await readFile(
    path.join(process.cwd(), "app", "tnc", "termsandconditions.md"),
    "utf8",
  );

  return (
    <LegalShell
      eyebrow="Terms & conditions"
      title="Terms and Conditions"
      description="The terms that apply to using GentlePath and related services."
      updated="November 28, 2026"
      activeHref="/tnc"
    >
      <MarkdownContent markdown={markdown} />
    </LegalShell>
  );
}
