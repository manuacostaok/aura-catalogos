import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Fraunces,
  Geist,
  Geist_Mono,
  IBM_Plex_Mono,
  Instrument_Serif,
  JetBrains_Mono,
  Manrope,
  Work_Sans,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

// Tenant font presets — loaded once here, selected per-tenant via CSS (see globals.css).
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"] });
const workSans = Work_Sans({ variable: "--font-work-sans", subsets: ["latin"] });
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["500", "600"],
});
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aura-catalogos-site.vercel.app"),
  title: {
    default: "Aura Catálogos — catálogos web para cualquier rubro",
    template: "%s · Aura Catálogos",
  },
  description:
    "Convertí tu Instagram y tu WhatsApp en un catálogo web con tu identidad, filtros por categoría y botón de compra directo. Armado en días, sin plantillas genéricas.",
  keywords: [
    "catálogo digital",
    "catálogo web",
    "catálogo para Instagram",
    "vender por WhatsApp",
    "catálogo online Argentina",
  ],
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Aura Catálogos",
    title: "Aura Catálogos — catálogos web para cualquier rubro",
    description:
      "Tus productos ya están buenos. Que tu catálogo también. Catálogos web con tu identidad y botón de WhatsApp directo.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aura Catálogos",
    description: "Catálogos web para cualquier rubro, con botón de WhatsApp directo.",
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
};

export const viewport = {
  themeColor: "#050507",
};

const fontVariables = [
  geistSans.variable,
  geistMono.variable,
  instrumentSerif.variable,
  fraunces.variable,
  workSans.variable,
  ibmPlexMono.variable,
  bricolage.variable,
  manrope.variable,
  jetbrainsMono.variable,
].join(" ");

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
