import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aura Catálogos",
    short_name: "Aura Catálogos",
    description: "Catálogos web para cualquier rubro, con botón de WhatsApp directo.",
    start_url: "/",
    display: "standalone",
    background_color: "#1a1512",
    theme_color: "#1a1512",
    icons: [{ src: "/icon", sizes: "32x32", type: "image/png" }],
  };
}
