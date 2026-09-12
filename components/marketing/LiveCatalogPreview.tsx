"use client";

import { useEffect, useRef } from "react";
import { ProductArt } from "@/components/catalog/ProductArt";
import { WhatsAppIcon } from "@/components/icons";
import { formatPrice } from "@/lib/format";
import { semillaFranca } from "@/lib/tenants/semilla-franca";
import { tenantThemeStyle } from "@/lib/theme";

const previewProducts = semillaFranca.products.slice(0, 3);

export function LiveCatalogPreview() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = rootRef.current?.querySelectorAll("[data-preview-card]");
    if (!cards || cards.length === 0) return;

    if (prefersReducedMotion) {
      cards.forEach((card) => {
        (card as HTMLElement).style.opacity = "1";
        (card as HTMLElement).style.transform = "none";
      });
      return;
    }

    let cancelled = false;
    import("animejs").then(({ animate, stagger }) => {
      if (cancelled) return;
      animate(cards, {
        opacity: [0, 1],
        translateY: [24, 0],
        delay: stagger(120, { start: 200 }),
        duration: 650,
        ease: "outQuad",
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="overflow-hidden rounded-2xl border shadow-2xl shadow-black/40"
      style={{ borderColor: "var(--line-strong)" }}
    >
      {/* browser chrome */}
      <div className="flex items-center gap-2 border-b px-4 py-3" style={{ borderColor: "var(--line)", background: "var(--ink-raised)" }}>
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span
          className="ml-3 truncate rounded-md px-3 py-1 text-xs"
          style={{ background: "var(--ink)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
        >
          tu-negocio.com/catalogo
        </span>
      </div>

      {/* tenant preview */}
      <div
        data-font-preset={semillaFranca.theme.fontPreset}
        style={{
          ...tenantThemeStyle(semillaFranca.theme),
          background: "var(--tc-bg)",
        }}
        className="p-5 sm:p-7"
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-bold" style={{ fontFamily: "var(--tf-display)", color: "var(--tc-text)" }}>
              {semillaFranca.name}
            </div>
            <div className="text-[0.7rem]" style={{ color: "var(--tc-text-muted)" }}>
              {semillaFranca.tagline}
            </div>
          </div>
          <span
            className="rounded-full border px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide"
            style={{ borderColor: "var(--tc-border)", color: "var(--tc-text-muted)" }}
          >
            catálogo de ejemplo
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {previewProducts.map((product) => (
            <div
              key={product.id}
              data-preview-card
              className="overflow-hidden rounded-xl border opacity-0"
              style={{ borderColor: "var(--tc-border)", background: "var(--tc-surface)" }}
            >
              <div className="h-20">
                <ProductArt seed={product.artSeed} theme={semillaFranca.theme} />
              </div>
              <div className="p-3">
                <div className="truncate text-xs font-bold" style={{ color: "var(--tc-text)" }}>
                  {product.name}
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-sm font-semibold" style={{ fontFamily: "var(--tf-mono)", color: "var(--tc-text)" }}>
                    {formatPrice(product.price, semillaFranca)}
                  </span>
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-full"
                    style={{ background: "var(--tc-success)", color: "var(--tc-success-ink)" }}
                  >
                    <WhatsAppIcon className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
