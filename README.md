# Aura Catálogos

Catálogos web con identidad propia, filtros por categoría y botón de
WhatsApp directo — para cualquier rubro. Next.js 16 (App Router) +
TypeScript + Tailwind CSS v4 + anime.js.

**Aura Catálogos es la plataforma.** [Semilla Franca](http://localhost:3000/catalogo/semilla-franca)
(insumos de cultivo) y [Vera Studio](http://localhost:3000/catalogo/vera-studio)
(indumentaria) son catálogos de **ejemplo** construidos con el mismo motor,
para mostrar cómo se ve en dos rubros e identidades completamente distintas
— no son negocios reales de Aura. El detalle de esta distinción y de la
arquitectura completa está en [`DESIGN.md`](./DESIGN.md).

## Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4**
- **anime.js v4** — motion puntual (ver `DESIGN.md`)
- Sin base de datos ni auth todavía — los tenants son datos estáticos en
  `lib/tenants/*`, pensados para migrar a una fuente real sin tocar el resto
  del código (ver "Roadmap" en `DESIGN.md`).

## Estructura

```
app/
  page.tsx                       Marketing site de Aura Catálogos
  catalogo/[slug]/                Motor de catálogo (genérico, por tenant)
    page.tsx                      Listado + filtros
    [productId]/page.tsx          Ficha de producto
    opengraph-image.tsx           Social preview por tenant
  icon.tsx, apple-icon.tsx,       Identidad técnica (favicon, OG, manifest,
  opengraph-image.tsx,            sitemap, robots)
  manifest.ts, sitemap.ts, robots.ts

components/
  catalog/                       ProductCard, CatalogExplorer (filtros),
                                  ProductArt (arte generado), CatalogChrome
  marketing/                     Hero, Features, ForWhom, HowItWorks,
                                  CaseStudy, Pricing, FAQ, Nav, Footer

lib/
  types.ts                       Tenant, Product, ThemeTokens, FilterGroup
  theme.ts                       Tokens de tenant → CSS custom properties
  whatsapp.ts                    Mensajes de WhatsApp contextuales
  aura-brand.ts                  Contacto de la plataforma (no de un tenant)
  tenants/                       Registro de negocios demo (Semilla Franca,
                                  Vera Studio) + lib/tenants/index.ts
```

## Desarrollo

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000). Catálogos demo en
`/catalogo/semilla-franca` y `/catalogo/vera-studio`.

## Agregar un negocio demo nuevo

1. Crear `lib/tenants/mi-negocio.ts` exportando un objeto `Tenant` (ver
   `lib/types.ts` y los dos ejemplos existentes como referencia).
2. Sumarlo al array en `lib/tenants/index.ts`.
3. Elegir un `fontPreset` existente o sumar uno nuevo en `app/layout.tsx` +
   `app/globals.css` (ver tabla en `DESIGN.md`).

No hace falta tocar ninguna página ni componente de `app/catalogo/[slug]`.

## Variables de entorno

Ninguna todavía — no hay servicios externos conectados (ver roadmap en
`DESIGN.md` para Mercado Pago, auth y analytics).

## Deploy

Pensado para Vercel, sin configuración especial (`next build` estándar).
Antes de deployar a producción, actualizar `metadataBase` en
`app/layout.tsx` y las URLs de `app/sitemap.ts` / `app/robots.ts` si el
dominio final cambia.

## Roadmap

Ver la sección "Roadmap" al final de [`DESIGN.md`](./DESIGN.md) — dashboard
de gestión, persistencia real, auth, Mercado Pago y analytics quedan
documentados como próximos pasos porque implican decisiones de
infraestructura y costo que no corresponde tomar en un rediseño de frontend.
