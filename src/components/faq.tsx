"use client";

import type { FaqItem } from "@/config/faqs";
import { useState, type KeyboardEvent } from "react";

export function Faq({ items }: { items: FaqItem[] }) {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const toggleItem = (index: number) => setOpenItem((current) => current === index ? null : index);
  const toggleWithKeyboard = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    toggleItem(index);
  };

  return <section className="article-section"><h2>Questions to settle before acting</h2><div className="divide-y divide-slate-200 border-y border-slate-200">{items.map((item, index) => {
    const isOpen = openItem === index;
    const answerId = `faq-answer-${index}`;
    return <div key={item.question} className="py-5"><button type="button" aria-expanded={isOpen} aria-controls={answerId} onClick={() => toggleItem(index)} onKeyDown={(event) => toggleWithKeyboard(event, index)} className="faq-toggle"><span>{item.question}</span><span aria-hidden="true" className={isOpen ? "rotate-45" : ""}>+</span></button><p id={answerId} hidden={!isOpen} className="mt-3 max-w-3xl leading-7 text-slate-600">{item.answer}</p></div>;
  })}</div></section>;
}
