import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons";
import { auraBrand } from "@/lib/aura-brand";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const links = [
  { href: "#producto", label: "Producto" },
  { href: "#rubros", label: "Rubros" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#demo", label: "Demo" },
  { href: "#precios", label: "Precios" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b backdrop-blur" style={{ borderColor: "var(--line)", background: "rgba(12,12,13,0.82)" }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          Aura Catálogos
        </Link>
        <nav className="hidden gap-7 text-sm md:flex" style={{ color: "var(--text-muted)" }}>
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-[var(--text)]">
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={buildWhatsAppUrl(auraBrand.whatsapp, "Hola! Quiero mi catálogo digital con Aura Catálogos.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-transform hover:scale-105"
          style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
        >
          <WhatsAppIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Quiero mi catálogo</span>
          <span className="sm:hidden">Empezar</span>
        </a>
      </div>
    </header>
  );
}
