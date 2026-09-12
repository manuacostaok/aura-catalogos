import Link from "next/link";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { buildCatalogRequestUrl, buildWhatsAppUrl } from "@/lib/whatsapp";
import type { Tenant } from "@/lib/types";

export function CatalogHeader({ tenant }: { tenant: Tenant }) {
  return (
    <header className="border-b" style={{ borderColor: "var(--tc-border)", background: "var(--tc-bg)" }}>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-4">
        <div className="flex items-center gap-3">
          <span
            className="grid h-9 w-9 place-items-center rounded-lg text-sm font-bold"
            style={{ background: "var(--tc-accent)", color: "var(--tc-accent-ink)" }}
          >
            {tenant.name.charAt(0)}
          </span>
          <div>
            <div className="text-base font-bold" style={{ fontFamily: "var(--tf-display)" }}>
              {tenant.name}
            </div>
            <div className="text-xs" style={{ color: "var(--tc-text-muted)" }}>
              {tenant.tagline}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {tenant.instagram && (
            <a
              href={tenant.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold"
              style={{ borderColor: "var(--tc-border)", background: "var(--tc-surface)" }}
            >
              <InstagramIcon className="h-3.5 w-3.5" />
              Instagram
            </a>
          )}
          <a
            href={buildWhatsAppUrl(tenant.whatsapp, `Hola! Te escribo por el catálogo de ${tenant.name}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold"
            style={{ borderColor: "var(--tc-border)", background: "var(--tc-surface)" }}
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}

export function CatalogHero({ tenant }: { tenant: Tenant }) {
  return (
    <section className="border-b" style={{ borderColor: "var(--tc-border)", background: "var(--tc-bg-alt)" }}>
      <div className="mx-auto max-w-6xl px-6 py-10">
        <p
          className="mb-2 text-xs font-bold uppercase tracking-widest"
          style={{ color: "var(--tc-accent-strong)" }}
        >
          {tenant.hero.eyebrow}
        </p>
        <h1
          className="balance max-w-3xl text-3xl font-bold sm:text-4xl"
          style={{ fontFamily: "var(--tf-display)" }}
        >
          {tenant.hero.heading}
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: "var(--tc-text-muted)" }}>
          {tenant.hero.description}
        </p>
      </div>
    </section>
  );
}

export function CatalogFooter({ tenant }: { tenant: Tenant }) {
  return (
    <footer className="mt-auto border-t" style={{ borderColor: "var(--tc-border)", background: "var(--tc-bg-alt)" }}>
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="text-lg font-bold" style={{ fontFamily: "var(--tf-display)" }}>
              Envíos y condiciones
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed" style={{ color: "var(--tc-text-muted)" }}>
              {tenant.contactNote}
            </p>
            {tenant.legalNote && (
              <p
                className="mt-4 max-w-md border-t pt-4 text-xs leading-relaxed"
                style={{ borderColor: "var(--tc-border)", color: "var(--tc-text-muted)" }}
              >
                {tenant.legalNote}
              </p>
            )}
          </div>
          <div
            className="rounded-xl border p-5"
            style={{ borderColor: "var(--tc-accent)", borderStyle: "dashed", background: "var(--tc-surface)" }}
          >
            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--tc-accent-strong)" }}>
              Catálogo de ejemplo
            </p>
            <h3 className="mt-1 text-base font-bold" style={{ fontFamily: "var(--tf-display)" }}>
              ¿Tenés un negocio y querés uno así?
            </h3>
            <p className="mt-2 text-sm" style={{ color: "var(--tc-text-muted)" }}>
              Este catálogo está hecho con Aura Catálogos. Armamos el tuyo con tu nombre, tu paleta y tus productos.
            </p>
            <a
              href={buildCatalogRequestUrl(tenant)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold"
              style={{ background: "var(--tc-accent)", color: "var(--tc-accent-ink)" }}
            >
              Pedir mi catálogo
            </a>
          </div>
        </div>
        <div
          className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t pt-5 text-xs"
          style={{ borderColor: "var(--tc-border)", color: "var(--tc-text-muted)" }}
        >
          <span>{tenant.name} · catálogo de ejemplo</span>
          <Link href="/" className="font-semibold underline-offset-2 hover:underline">
            Hecho con Aura Catálogos ↗
          </Link>
        </div>
      </div>
    </footer>
  );
}
