import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          background: "#0c0c0d",
          color: "#f5f2ea",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, fontWeight: 700, color: "#f2542d", marginBottom: 28 }}>
          AURA CATÁLOGOS
        </div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 900 }}>
          Tus productos ya están buenos. Que tu catálogo también.
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#9c968a", marginTop: 32, maxWidth: 780 }}>
          Catálogos web con tu identidad y botón de WhatsApp directo — para cualquier rubro.
        </div>
      </div>
    ),
    size
  );
}
