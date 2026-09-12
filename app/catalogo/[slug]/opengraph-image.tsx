import { ImageResponse } from "next/og";
import { getTenant } from "@/lib/tenants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function TenantOpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tenant = getTenant(slug);
  const theme = tenant?.theme;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: theme?.bg ?? "#0c0c0d",
          color: theme?.text ?? "#f5f2ea",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, fontWeight: 700, color: theme?.accentStrong ?? "#f2542d", marginBottom: 24 }}>
          CATÁLOGO DE EJEMPLO
        </div>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 700 }}>{tenant?.name ?? "Aura Catálogos"}</div>
        <div style={{ display: "flex", fontSize: 28, color: theme?.textMuted ?? "#9c968a", marginTop: 24, maxWidth: 800 }}>
          {tenant?.tagline ?? "Catálogos web para cualquier rubro"}
        </div>
      </div>
    ),
    size
  );
}
