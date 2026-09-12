import { LiveCatalogPreview } from "./LiveCatalogPreview";
import { WhatsAppIcon } from "@/components/icons";
import { auraBrand } from "@/lib/aura-brand";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section id="producto" className="relative overflow-hidden border-b" style={{ borderColor: "var(--line)" }}>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--accent)" }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:py-24 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "var(--accent-strong)" }}>
            Catálogos web para cualquier rubro
          </p>
          <h1
            className="balance text-4xl leading-[1.05] sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Tus productos ya están buenos.
            <br />
            <em className="not-italic" style={{ color: "var(--accent)" }}>
              Que tu catálogo también.
            </em>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-muted)" }}>
            Armamos catálogos web para tu negocio, vendas lo que vendas: cada producto con su foto, su ficha
            y su precio, y un botón de WhatsApp para cerrar la venta al toque.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={buildWhatsAppUrl(auraBrand.whatsapp, "Hola! Quiero mi catálogo digital con Aura Catálogos.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition-transform hover:scale-105"
              style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
            >
              <WhatsAppIcon className="h-4 w-4" />
              Quiero mi catálogo
            </a>
            <a href="#demo" className="text-sm font-semibold underline-offset-4 hover:underline">
              Ver un caso real →
            </a>
          </div>
        </div>

        <LiveCatalogPreview />
      </div>
    </section>
  );
}
