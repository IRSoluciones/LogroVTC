"use client";
import { useState } from "react";

type QA = { q: string; a: string };

type FAQsProps = {
  title?: string;
  items: QA[];
};

export default function FAQs({ title = "Preguntas frecuentes", items }: FAQsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section className="mt-24">
      <h3 className="text-3xl font-semibold">{title}</h3>
      <div className="mt-6 grid gap-2">
        {items.map((it, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="rounded-xl border border-border bg-card/60 overflow-hidden">
              <button
                className="w-full text-left px-5 py-4 flex items-center justify-between"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                aria-expanded={isOpen}
              >
                <span className="text-base font-medium">{it.q}</span>
                <span className="ml-4 text-xl">{isOpen ? "–" : "+"}</span>
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-0 text-sm text-muted-foreground leading-relaxed">
                  {it.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}


