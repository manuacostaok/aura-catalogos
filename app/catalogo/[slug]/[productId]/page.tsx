import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CatalogFooter, CatalogHeader } from "@/components/catalog/CatalogChrome";
import { ProductArt } from "@/components/catalog/ProductArt";
import { WhatsAppIcon } from "@/components/icons";
import { formatPrice } from "@/lib/format";
import { getTenant, getTenantSlugs } from "@/lib/tenants";
import { buildProductInquiryUrl } from "@/lib/whatsapp";

export function generateStaticParams() {
  return getTenantSlugs().flatMap((slug) => {
    const tenant = getTenant(slug);
    return tenant ? tenant.products.map((product) => ({ slug, productId: product.id })) : [];
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; productId: string }>;
}): Promise<Metadata> {
  const { slug, productId } = await params;
  const tenant = getTenant(slug);
  const product = tenant?.products.find((p) => p.id === productId);
  if (!tenant || !product) return {};

  return {
    title: `${product.name} — ${tenant.name}`,
    description: `${product.subtitle} · ${formatPrice(product.price, tenant)}`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string; productId: string }>;
}) {
  const { slug, productId } = await params;
  const tenant = getTenant(slug);
  const product = tenant?.products.find((p) => p.id === productId);
  if (!tenant || !product) notFound();

  return (
    <>
      <CatalogHeader tenant={tenant} />
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-10">
        <Link
          href={`/catalogo/${tenant.slug}`}
          className="text-sm font-semibold"
          style={{ color: "var(--tc-text-muted)" }}
        >
          ← Volver al catálogo
        </Link>

        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          <div className="h-64 overflow-hidden rounded-xl sm:h-full">
            <ProductArt seed={product.artSeed} theme={tenant.theme} />
          </div>

          <div>
            {product.badges && (
              <div className="mb-3 flex flex-wrap gap-1.5">
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
            <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--tf-display)" }}>
              {product.name}
            </h1>
            <p className="mt-1 text-sm" style={{ color: "var(--tc-text-muted)" }}>
              {product.subtitle}
            </p>

            <div className="mt-5 flex items-baseline justify-between border-y py-4" style={{ borderColor: "var(--tc-border)" }}>
              <div>
                <span className="text-2xl font-semibold" style={{ fontFamily: "var(--tf-mono)" }}>
                  {formatPrice(product.price, tenant)}
                </span>
                {product.priceNote && (
                  <div className="text-xs" style={{ color: "var(--tc-text-muted)" }}>
                    {product.priceNote}
                  </div>
                )}
              </div>
              {product.stock && (
                <span className="text-sm font-semibold" style={{ color: "var(--tc-accent-strong)" }}>
                  {product.stock}
                </span>
              )}
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm" style={{ fontFamily: "var(--tf-mono)" }}>
              {product.specs.map((spec) => (
                <div key={spec.label} className="contents">
                  <dt style={{ color: "var(--tc-text-muted)" }}>{spec.label}</dt>
                  <dd className="text-right font-semibold">{spec.value}</dd>
                </div>
              ))}
            </dl>

            <a
              href={buildProductInquiryUrl(tenant, product)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold transition-transform hover:scale-[1.01]"
              style={{ background: "var(--tc-success)", color: "var(--tc-success-ink)" }}
            >
              <WhatsAppIcon className="h-4 w-4" />
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </main>
      <CatalogFooter tenant={tenant} />
    </>
  );
}
