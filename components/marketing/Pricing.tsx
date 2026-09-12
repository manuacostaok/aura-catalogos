import { WhatsAppIcon } from "@/components/icons";
import { auraBrand } from "@/lib/aura-brand";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const plans = [
  {
    name: "Catálogo simple",
    price: "$150.000",
    note: "Pago único",
    description: "Tu catálogo online, listo para compartir en tu bio.",
    items: ["Hasta 15 productos, con foto y ficha", "Tu identidad: nombre, colores, logo", "Botón de WhatsApp en cada producto"],
    highlight: false,
  },
  {
    name: "Catálogo + Mercado Pago",
    price: "$220.000",
    note: "Pago único · el más pedido",
    description: "Todo lo del plan simple, más cobro directo desde el catálogo.",
    items: ["Todo lo del Catálogo Simple", "Botón de Mercado Pago por producto", "Filtros y categorías a medida"],
    highlight: true,
  },
  {
    name: "A medida",
    price: "Desde $350.000",
    note: "+ mantenimiento desde $35.000/mes",
    description: "Para catálogos grandes o que cambian seguido.",
    items: ["Productos y stock sin límite fijo", "Carga y actualización mensual incluida", "Prioridad para cambios y ajustes"],
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="precios" className="border-b py-16 sm:py-24" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto max-w-6xl px-6">
        
          <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "var(--accent-strong)" }}>
            Planes · precio de lanzamiento
          </p>
          <h2 className="balance mt-3 max-w-2xl text-3xl sm:text-4xl font-display">
            Empezá simple. Sumá lo que necesites después.
          </h2>
        

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={
                plan.highlight
                  ? "glass glow-border flex h-full flex-col rounded-2xl border p-7"
                  : "flex h-full flex-col rounded-2xl border p-7"
              }
              style={
                plan.highlight
                  ? { borderColor: "var(--accent)" }
                  : { borderColor: "var(--line)", background: "var(--ink-raised)" }
              }
            >
                {plan.highlight && (
                  <span
                    className="stamp-badge mb-4 w-fit px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Más pedido
                  </span>
                )}
                <h3 className="text-lg font-semibold font-display">
                  {plan.name}
                </h3>
                <p className="mt-3 text-3xl font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                  {plan.price}
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {plan.note}
                </p>
                <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>
                  {plan.description}
                </p>
                <ul className="mt-5 flex-1 space-y-2.5 text-sm">
                  {plan.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span style={{ color: "var(--accent)" }}>—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={buildWhatsAppUrl(auraBrand.whatsapp, `Hola! Quiero el plan "${plan.name}" de Aura Catálogos.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold"
                  style={
                    plan.highlight
                      ? { background: "var(--accent)", color: "var(--accent-ink)" }
                      : { border: "1px solid var(--line-strong)" }
                  }
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {plan.name === "A medida" ? "Cotizar por WhatsApp" : "Empezar ahora"}
                </a>
              </div>
            
          ))}
        </div>
      </div>
    </section>
  );
}
