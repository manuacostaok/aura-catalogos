
const niches = [
  { name: "Indumentaria y calzado", detail: "Talles, colores y variantes, con filtros para encontrar rápido.", bg: "#1f1410", accent: "#e0793f" },
  { name: "Gastronomía y delivery", detail: "Menú o productos con precio, foto y pedido directo por WhatsApp.", bg: "#141c14", accent: "#6fae5e" },
  { name: "Insumos de cultivo", detail: "Múltiples marcas y proveedores en un mismo catálogo, filtrable por cada uno.", bg: "#1c1a10", accent: "#c99a3a" },
  { name: "Cosmética y skincare", detail: "Fichas con ingredientes o uso recomendado, prolijas y consistentes.", bg: "#1a1418", accent: "#d989a8" },
  { name: "Artesanías y diseño", detail: "Piezas únicas o por tanda, mostradas con la identidad de tu marca.", bg: "#12181c", accent: "#5aa9c4" },
  { name: "Mayoristas y distribuidores", detail: "Catálogos grandes, organizados por categoría, marca o rubro.", bg: "#171718", accent: "#9a97e0" },
];

export function ForWhom() {
  return (
    <section id="rubros" className="border-b py-16 sm:py-24" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto max-w-6xl px-6">
        
          <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "var(--accent-strong)" }}>
            Para qué negocios sirve
          </p>
          <h2 className="balance mt-3 max-w-2xl text-3xl sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
            Si vendés por Instagram o WhatsApp, sirve para vos.
          </h2>
          <p className="mt-3 max-w-xl text-sm sm:text-base" style={{ color: "var(--text-muted)" }}>
            El motor es el mismo — identidad propia, fichas de producto y botón de WhatsApp — pero cada
            negocio tiene su propia paleta, tipografía y organización. Así de distinto puede verse.
          </p>
        

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {niches.map((niche) => (
            <div
              key={niche.name}
              className="group h-full rounded-2xl border p-6 transition-transform hover:-translate-y-1"
              style={{ background: niche.bg, borderColor: "var(--line)" }}
            >
              <span className="block h-2 w-8 rounded-full" style={{ background: niche.accent }} />
              <h3 className="mt-4 text-lg font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>
                {niche.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                {niche.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
