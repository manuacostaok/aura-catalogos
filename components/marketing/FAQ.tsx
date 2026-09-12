
const faqs = [
  {
    q: "¿Tengo que dejar de atender por WhatsApp?",
    a: "No. El catálogo no reemplaza el chat, lo hace más corto: el cliente llega con el producto, el precio y la variante ya elegidos.",
  },
  {
    q: "¿Sirve si tengo muchas variantes por producto (talles, marcas, proveedores)?",
    a: "Sí — los filtros se arman a medida de cómo organizás tu inventario, sea por marca, proveedor, talle o categoría.",
  },
  {
    q: "¿Qué pasa si no tengo fotos de mis productos?",
    a: "Armamos una identidad visual propia para cada ficha mientras sumás fotos reales; nunca queda con espacios vacíos.",
  },
  {
    q: "¿Puedo sumar Mercado Pago más adelante aunque arranque solo con WhatsApp?",
    a: "Sí, es 100% opcional y se activa cuando quieras sin rehacer el catálogo.",
  },
  {
    q: "¿Cuánto tarda armarlo?",
    a: "Con tus productos, colores y logo, el catálogo simple queda listo en pocos días.",
  },
];

export function FAQ() {
  return (
    <section className="border-b py-16 sm:py-24" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto max-w-3xl px-6">
        
          <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "var(--accent-strong)" }}>
            Preguntas frecuentes
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-display">
            Antes de escribirnos.
          </h2>
        

        <div className="mt-10 divide-y" style={{ borderColor: "var(--line)" }}>
          {faqs.map((faq) => (
            <details key={faq.q} className="group border-t py-5" style={{ borderColor: "var(--line)" }}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold">
                  {faq.q}
                  <span className="shrink-0 text-lg transition-transform group-open:rotate-45" style={{ color: "var(--accent)" }}>
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {faq.a}
                </p>
              </details>
            
          ))}
        </div>
      </div>
    </section>
  );
}
