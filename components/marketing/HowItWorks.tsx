"use client";

import { useEffect, useRef } from "react";

const steps = [
  { n: "01", title: "Nos contás qué vendés", body: "Marca, colores, y tus productos: nombre, precio y fotos si tenés." },
  { n: "02", title: "Armamos tu catálogo", body: "Con tu identidad, filtros y categorías, y el botón de WhatsApp ya configurado." },
  { n: "03", title: "Lo revisás", body: "Te pasamos el link. Pedís los ajustes que quieras antes de salir a compartirlo." },
  { n: "04", title: "Empezás a vender", body: "Lo sumás a tu bio de Instagram y cada visita se convierte en un chat de WhatsApp." },
];

export function HowItWorks() {
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    const section = sectionRef.current;
    if (!line || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      line.style.transform = "scaleY(1)";
      return;
    }

    let cancelled = false;
    import("animejs").then(({ onScroll, animate }) => {
      if (cancelled) return;
      animate(line, {
        scaleX: [0, 1],
        ease: "linear",
        autoplay: onScroll({
          target: section,
          enter: "top center",
          leave: "bottom center",
          sync: true,
        }),
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="como-funciona" ref={sectionRef} className="border-b py-16 sm:py-24" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto max-w-6xl px-6">
        
          <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "var(--accent-strong)" }}>
            Cómo funciona
          </p>
          <h2 className="balance mt-3 max-w-2xl text-3xl sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
            De tu Instagram a tu catálogo, en cuatro pasos.
          </h2>
        

        <div className="relative mt-14 grid gap-10 sm:grid-cols-4">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[9px] hidden h-px sm:block"
            style={{ background: "var(--line)" }}
          >
            <div
              ref={lineRef}
              className="h-full origin-left"
              style={{ background: "var(--accent)", transform: "scaleX(0)" }}
            />
          </div>

          {steps.map((step, i) => (
            <div key={step.n}>
              <span
                  className="relative z-10 mb-4 flex h-5 w-5 items-center justify-center rounded-full text-[0.6rem] font-bold"
                  style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
                >
                  {i + 1}
                </span>
                <h3 className="text-base font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {step.body}
                </p>
              </div>
            
          ))}
        </div>
      </div>
    </section>
  );
}
