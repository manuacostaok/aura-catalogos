import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "var(--accent-strong)" }}>
        Error 404
      </p>
      <h1 className="mt-4 text-4xl sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
        Esta página no existe.
      </h1>
      <p className="mt-4 max-w-md" style={{ color: "var(--text-muted)" }}>
        Puede que el catálogo que buscás todavía no esté publicado, o que el link tenga un error.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full px-6 py-3 text-sm font-bold"
        style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
      >
        Volver al inicio
      </Link>
    </div>
  );
}
