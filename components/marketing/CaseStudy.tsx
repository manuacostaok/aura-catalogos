import Link from "next/link";
import { ProductArt } from "@/components/catalog/ProductArt";
import { ArrowRightIcon } from "@/components/icons";
import { formatPrice } from "@/lib/format";
import { getAllTenants } from "@/lib/tenants";
import { tenantThemeStyle } from "@/lib/theme";

export function CaseStudy() {
  const tenants = getAllTenants();

  return (
    <section id="demo" className="border-b py-16 sm:py-24" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto max-w-6xl px-6">
        
          <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "var(--accent-strong)" }}>
            Casos reales
          </p>
          <h2 className="balance mt-3 max-w-2xl text-3xl sm:text-4xl font-display">
            Dos rubros distintos, el mismo motor de catálogo.
          </h2>
          <p className="mt-3 max-w-xl text-sm sm:text-base" style={{ color: "var(--text-muted)" }}>
            Estos catálogos son demos armadas con Aura Catálogos, no negocios reales de Aura. Así de distinto
            se ve el mismo producto según la identidad de cada uno — así podría verse el tuyo.
          </p>
        

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {tenants.map((tenant) => (
            <Link
              key={tenant.slug}
              href={`/catalogo/${tenant.slug}`}
                data-font-preset={tenant.theme.fontPreset}
                style={{ ...tenantThemeStyle(tenant.theme), background: "var(--tc-bg)" }}
                className="group block overflow-hidden rounded-2xl border transition-transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between px-5 pt-5">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--tc-accent-strong)" }}>
                      {tenant.niche}
                    </div>
                    <h3 className="text-xl font-bold" style={{ fontFamily: "var(--tf-display)", color: "var(--tc-text)" }}>
                      {tenant.name}
                    </h3>
                  </div>
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full border transition-transform group-hover:translate-x-1"
                    style={{ borderColor: "var(--tc-border)", color: "var(--tc-text)" }}
                  >
                    <ArrowRightIcon className="h-4 w-4" />
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 p-5">
                  {tenant.products.slice(0, 3).map((product) => (
                    <div key={product.id} className="overflow-hidden rounded-lg border" style={{ borderColor: "var(--tc-border)" }}>
                      <div className="h-16">
                        <ProductArt seed={product.artSeed} theme={tenant.theme} />
                      </div>
                      <div className="p-2" style={{ background: "var(--tc-surface)" }}>
                        <div className="truncate text-[0.68rem] font-bold" style={{ color: "var(--tc-text)" }}>
                          {product.name}
                        </div>
                        <div className="text-[0.68rem] font-semibold" style={{ fontFamily: "var(--tf-mono)", color: "var(--tc-text-muted)" }}>
                          {formatPrice(product.price, tenant)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Link>
            
          ))}
        </div>
      </div>
    </section>
  );
}
