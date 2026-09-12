
const pains = [
  {
    q: "¿Tenés stock?",
    a: "Cada consulta arranca de cero, aunque ya la respondiste veinte veces esta semana.",
  },
  {
    q: "¿Qué precio tiene?",
    a: "El precio está en una foto vieja del feed, si es que lo encontrás.",
  },
  {
    q: "¿Tenés en otro color o talle?",
    a: "Se pierde el pedido en el scroll del chat mientras el cliente se enfría.",
  },
];

export function ProblemSection() {
  return (
    <section className="border-b py-16 sm:py-24" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto max-w-6xl px-6">
        
          <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "var(--accent-strong)" }}>
            El problema de vender solo por DM
          </p>
          <h2 className="balance mt-3 max-w-2xl text-3xl sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
            Tus seguidores quieren comprar. El chat no alcanza.
          </h2>
        

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-3" style={{ borderColor: "var(--line)", background: "var(--line)" }}>
          {pains.map((pain) => (
            <div key={pain.q} className="h-full px-6 py-8" style={{ background: "var(--ink)" }}>
              <p className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                “{pain.q}”
              </p>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {pain.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
