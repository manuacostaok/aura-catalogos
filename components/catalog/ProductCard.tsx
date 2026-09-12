import Link from "next/link";
import { ProductArt } from "./ProductArt";
import { WhatsAppIcon } from "@/components/icons";
import { formatPrice } from "@/lib/format";
import { buildProductInquiryUrl } from "@/lib/whatsapp";
import type { Product, Tenant } from "@/lib/types";

export function ProductCard({ product, tenant }: { product: Product; tenant: Tenant }) {
  return (
    <article
      className="flex flex-col overflow-hidden border"
      style={{
        background: "var(--tc-surface)",
        borderColor: "var(--tc-border)",
        borderRadius: "var(--tc-radius)",
      }}
    >
      <Link href={`/catalogo/${tenant.slug}/${product.id}`} className="block h-36 sm:h-40">
        <ProductArt seed={product.artSeed} theme={tenant.theme} />
      </Link>

      <div
        className="border-b px-4 py-3"
        style={{ borderColor: "var(--tc-border)", background: "var(--tc-surface-alt)" }}
      >
        <Link href={`/catalogo/${tenant.slug}/${product.id}`}>
          <h3 className="text-base font-bold leading-tight" style={{ fontFamily: "var(--tf-display)" }}>
            {product.name}
          </h3>
        </Link>
        <p className="text-xs" style={{ color: "var(--tc-text-muted)" }}>
          {product.subtitle}
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-4 py-4">
        {product.badges && product.badges.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {product.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-md border px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide"
                style={{ borderColor: "var(--tc-border)", color: "var(--tc-text-muted)" }}
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        <dl className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs" style={{ fontFamily: "var(--tf-mono)" }}>
          {product.specs.slice(0, 4).map((spec) => (
            <div key={spec.label} className="contents">
              <dt style={{ color: "var(--tc-text-muted)" }}>{spec.label}</dt>
              <dd className="text-right font-semibold">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex items-baseline justify-between pt-1">
          <div>
            <span className="text-lg font-semibold" style={{ fontFamily: "var(--tf-mono)" }}>
              {formatPrice(product.price, tenant)}
            </span>
            {product.priceNote && (
              <div className="text-[0.7rem]" style={{ color: "var(--tc-text-muted)" }}>
                {product.priceNote}
              </div>
            )}
          </div>
          {product.stock && (
            <span className="text-[0.7rem] font-semibold" style={{ color: "var(--tc-accent-strong)" }}>
              {product.stock}
            </span>
          )}
        </div>

        <a
          href={buildProductInquiryUrl(tenant, product)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold transition-transform hover:scale-[1.02]"
          style={{ background: "var(--tc-success)", color: "var(--tc-success-ink)" }}
        >
          <WhatsAppIcon className="h-4 w-4" />
          Consultar
        </a>
      </div>
    </article>
  );
}
