
const features = [
  {
    n: "01",
    title: "Identidad propia",
    body: "Tu nombre, tus colores y tu logo — no una plantilla genérica igual a la de cualquier otro negocio.",
  },
  {
    n: "02",
    title: "Filtros y categorías",
    body: "Por tipo, por marca, por proveedor o como vos organices tu inventario — cada producto con su foto.",
  },
  {
    n: "03",
    title: "Ficha por producto",
    body: "Las características que le importan a tu comprador, ordenadas igual en cada producto.",
  },
  {
    n: "04",
    title: "Botón de WhatsApp directo",
    body: "Cada producto abre un mensaje ya redactado. El comprador solo confirma y manda.",
  },
  {
    n: "05",
    title: "Mercado Pago, si querés",
    body: "100% opcional. Lo activás cuando estés list@ para cobrar directo desde el catálogo.",
  },
  {
    n: "06",
    title: "Pensado para celular",
    body: "El 90% de tus seguidores te van a comprar desde el teléfono — el catálogo está armado para eso.",
  },
];

export function Features() {
  return (
    <section className="border-b py-16 sm:py-24" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto max-w-6xl px-6">
        
          <h2 className="balance max-w-xl text-3xl sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
            Todo lo que necesita un catálogo de verdad.
          </h2>
        

        <div className="mt-10 divide-y" style={{ borderColor: "var(--line)" }}>
          {features.map((feature) => (
            <div
              key={feature.n}
              className="grid gap-4 border-t py-6 sm:grid-cols-[80px_1fr_1.4fr] sm:items-baseline"
              style={{ borderColor: "var(--line)" }}
            >
              <span className="text-sm font-semibold" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                {feature.n}
              </span>
              <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed sm:text-base" style={{ color: "var(--text-muted)" }}>
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
