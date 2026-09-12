"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import type { Tenant } from "@/lib/types";

export function CatalogExplorer({ tenant }: { tenant: Tenant }) {
  const [active, setActive] = useState<Record<string, string>>({});

  const visible = useMemo(() => {
    return tenant.products.filter((product) =>
      Object.values(active).every(
        (optionId) => !optionId || product.categoryIds.includes(optionId)
      )
    );
  }, [tenant.products, active]);

  return (
    <div>
      <div className="flex flex-col gap-4 py-6">
        {tenant.filterGroups.map((group) => (
          <div key={group.id}>
            <span
              className="mb-2 block text-[0.68rem] font-bold uppercase tracking-wider"
              style={{ color: "var(--tc-text-muted)" }}
            >
              {group.label}
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActive((prev) => ({ ...prev, [group.id]: "" }))}
                aria-pressed={!active[group.id]}
                className="rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors"
                style={
                  !active[group.id]
                    ? { background: "var(--tc-text)", borderColor: "var(--tc-text)", color: "var(--tc-bg)" }
                    : { borderColor: "var(--tc-border)", background: "var(--tc-surface)" }
                }
              >
                Todas
              </button>
              {group.options.map((option) => {
                const isActive = active[group.id] === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() =>
                      setActive((prev) => ({
                        ...prev,
                        [group.id]: isActive ? "" : option.id,
                      }))
                    }
                    aria-pressed={isActive}
                    className="rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors"
                    style={
                      isActive
                        ? { background: "var(--tc-accent)", borderColor: "var(--tc-accent)", color: "var(--tc-accent-ink)" }
                        : { borderColor: "var(--tc-border)", background: "var(--tc-surface)" }
                    }
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {visible.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 pb-16 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} tenant={tenant} />
          ))}
        </div>
      ) : (
        <p className="py-20 text-center" style={{ color: "var(--tc-text-muted)" }}>
          No hay productos en esta combinación todavía.
        </p>
      )}
    </div>
  );
}
