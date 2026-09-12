import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { auraBrand } from "@/lib/aura-brand";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 text-sm" style={{ color: "var(--text-muted)" }}>
        <span style={{ fontFamily: "var(--font-display)" }}>{auraBrand.parentCompany}</span>
        <div className="flex gap-4">
          <a href={auraBrand.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[var(--text)]">
            <InstagramIcon className="h-4 w-4" /> Instagram
          </a>
          <a
            href={buildWhatsAppUrl(auraBrand.whatsapp, "Hola! Quiero mi catálogo digital con Aura Catálogos.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[var(--text)]"
          >
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
      <p className="mx-auto mt-6 max-w-6xl px-6 text-xs leading-relaxed" style={{ color: "var(--text-faint)" }}>
        {auraBrand.parentCompany} desarrolla Aura Catálogos, la plataforma para crear catálogos web. Cuando el
        rubro lo requiere, sumamos los avisos y referencias legales que correspondan; la venta la gestiona
        siempre cada negocio de forma independiente.
      </p>
    </footer>
  );
}
