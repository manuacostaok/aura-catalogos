import { WhatsAppIcon } from "@/components/icons";
import { auraBrand } from "@/lib/aura-brand";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function FinalCTA() {
  return (
    <section className="border-b py-20 text-center sm:py-28" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto max-w-2xl px-6">
        
          <h2 className="balance text-3xl sm:text-5xl font-display">
            Armemos el catálogo de tu cuenta.
          </h2>
          <p className="mt-4 text-base sm:text-lg" style={{ color: "var(--text-muted)" }}>
            Contanos qué vendés y en un par de días tenés el link listo para compartir.
          </p>
          <a
            href={buildWhatsAppUrl(auraBrand.whatsapp, "Hola! Quiero mi catálogo digital con Aura Catálogos.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-bold transition-transform hover:scale-105"
            style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
          >
            <WhatsAppIcon className="h-4 w-4" />
            Escribir por WhatsApp
          </a>
        
      </div>
    </section>
  );
}
