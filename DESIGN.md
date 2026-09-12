# DESIGN.md — Aura Catálogos

Fuente de verdad del sistema de diseño y la arquitectura de producto. Última actualización: 2026-09-12.

## Qué es esto

**Aura Catálogos es el producto.** Una plataforma para crear catálogos web con
identidad propia, filtros por categoría y botón de WhatsApp directo, pensada
para cualquier rubro (indumentaria, gastronomía, insumos de cultivo,
cosmética, artesanías, mayoristas, etc.).

**Semilla Franca y Vera Studio son demos**, no clientes reales. Son dos
catálogos de ejemplo, en dos rubros e identidades visuales completamente
distintas, construidos con el mismo motor — la prueba visual de que Aura
Catálogos es genérico y no está pensado para un solo nicho.

El core de la plataforma (`app/catalogo/[slug]`, `components/catalog/*`,
`lib/*`) no conoce ni "Semilla Franca" ni "Vera Studio": solo conoce
`Tenant`. Los negocios reales viven exclusivamente en `lib/tenants/*`.

## Arquitectura de producto

```
Aura Catálogos (plataforma)
  └─ Tenant / negocio          → lib/types.ts: Tenant
       └─ Catálogo público      → app/catalogo/[slug]
            └─ Productos        → Tenant.products
                 └─ Cliente final → botón de WhatsApp contextual
```

Cada tenant es un objeto de datos (`lib/tenants/semilla-franca.ts`,
`lib/tenants/vera-studio.ts`) con:

- identidad (`name`, `tagline`, `niche`, `whatsapp`, `instagram`)
- **theming** (`theme: ThemeTokens` — ver abajo)
- copy de hero (`hero.eyebrow/heading/description`)
- estructura de filtros (`filterGroups`, genérica: N grupos con N opciones)
- catálogo de productos (`products: Product[]`)
- moneda/locale (`currency`, `locale` — vía `Intl.NumberFormat`)

`lib/tenants/index.ts` es el único punto de entrada para leer tenants
(`getTenant`, `getAllTenants`, `getTenantSlugs`). Hoy es un array en memoria;
el día que haya base de datos, **solo ese archivo cambia** — ninguna página
ni componente necesita tocarse. Ver "De demo a multi-tenant real" abajo.

### Por qué no hay dashboard ni base de datos todavía

El estado real del proyecto al empezar este rediseño eran dos páginas HTML
estáticas sin backend, sin auth y sin base de datos. Construir un dashboard
de gestión, autenticación de usuarios o persistencia real implica decisiones
de infraestructura (proveedor de DB, proveedor de auth, costos de hosting)
que son decisiones de negocio, no de diseño — por eso este rediseño se
concentra en dejar la **arquitectura de datos y de rutas ya pensada** para
que ese paso sea agregar una fuente de datos detrás de `lib/tenants/index.ts`,
no rehacer el frontend. Ver el roadmap al final de este documento.

## Theming — cómo un mismo motor se ve distinto en cada negocio

`lib/theme.ts` convierte los `ThemeTokens` de un tenant en variables CSS
(`--tc-bg`, `--tc-accent`, etc.) inyectadas inline en el layout de
`/catalogo/[slug]`. Todos los componentes de catálogo leen esas variables,
nunca un color hardcodeado. Cambiar la identidad de un negocio es cambiar un
objeto de datos, no escribir CSS nuevo.

La tipografía funciona igual pero con un catálogo curado de 3 presets
(`fontPreset` en `ThemeTokens`), elegidos y cargados una sola vez en
`app/layout.tsx` vía `next/font/google`, y seleccionados por negocio con un
atributo `data-font-preset` (ver `app/globals.css`):

| Preset | Uso | Display | Body | Mono |
| --- | --- | --- | --- | --- |
| `platform` | Aura Catálogos (marketing) | Instrument Serif | Geist Sans | Geist Mono |
| `editorial-warm` | Semilla Franca (grow shop) | Fraunces | Work Sans | IBM Plex Mono |
| `editorial-bold` | Vera Studio (indumentaria) | Bricolage Grotesque | Manrope | JetBrains Mono |

Sumar un preset nuevo es agregar una entrada a esta tabla + una regla CSS;
no requiere tocar componentes. (Fuentes 100% libres a medida sí requieren
carga dinámica de `@font-face`, fuera de alcance de este paso — ver roadmap.)

### Fotos de producto

Ningún tenant demo tiene fotografía real. En vez de placeholders genéricos
grises, `components/catalog/ProductArt.tsx` genera una composición abstracta
determinística (seed = `product.artSeed`) con los colores del tenant — cada
producto tiene una "portada" consistente y con personalidad hasta que se
suben fotos reales. Reemplazar por `<img>` es un cambio de un componente.

## Identidad visual — Aura Catálogos (la plataforma)

Aura Catálogos es un producto **de** Aura Soft Solutions (la agencia que lo
desarrolla) — no una marca aparte. Por eso su identidad comparte el ADN
visual ya establecido en `aura-ia-solutions` (violeta/azul/cian sobre tinta
casi negra, aurora, glass, glow) en vez de inventar una paleta propia:

- **Paleta**: tinta casi negra (`#050507`, igual que el sitio madre) + trío
  violeta/azul/cian (`--violet #8b6bff`, `--blue #4f7dff`, `--cyan #4fd1ff`)
  como acento y gradientes — el mismo lenguaje cromático, no una copia pixel
  a pixel de sus componentes.
- **Tipografía**: Instrument Serif (display, editorial, con personalidad)
  + Geist Sans (cuerpo, moderno, no es Inter) + Geist Mono (precios/datos).
  Serif + grotesk es la combinación "SaaS con carácter editorial" que evita
  el look de plantilla genérica.
- **Marcas compartidas** (`app/globals.css`): `.brand-aura` (glow pulsante
  sobre el wordmark, igual clase y timing que el sitio madre), `.aurora-blob`
  + `.animate-aurora-drift-*` (blobs violeta/cian a la deriva), `.glass` y
  `.glow-border` (cards con borde que se ilumina al hover) — utilidades
  reusadas tal cual porque ya están resueltas y son parte de la identidad de
  familia, no reinventadas por reinventar.
- **Link a la marca madre**: el wordmark del nav y el crédito del footer
  apuntan a `auraBrand.parentUrl` (`https://aura-soft-solutions.vercel.app`,
  ver `lib/aura-brand.ts`) — Aura Catálogos nunca se presenta como una marca
  aislada.
- **Composición**: hero asimétrico con el producto funcionando en vivo
  (mockup de navegador + catálogo real embebido y animado), no una
  ilustración decorativa. Features en formato lista editorial numerada, no
  tres cards repetidas. Rubros en mosaico con paleta propia por card —
  demuestra el theming en la misma sección que lo explica.
- **Fondo del hero — "Catalog Field"** (`components/marketing/CatalogField.tsx`):
  en vez de un blob decorativo genérico, un campo de nodos que representa
  literalmente el producto — "un catálogo es una red de productos
  conectados". Cada nodo se conecta solo a sus 1-2 vecinos más cercanos
  (no a una malla densa) y flota con `anime.js` (`utils.random` por nodo,
  sin patrón repetitivo). Es SVG + CSS, no WebGL — la galaxia 3D de
  Three.js del sitio madre no se portó porque agregaría una dependencia
  pesada solo por consistencia visual, sin aportar función al catálogo.
- **Motion (anime.js)**: entrada escalonada del hero (headline + CTAs) y de
  las cards del catálogo en vivo, drift de los nodos del fondo, y línea de
  progreso dibujada en scroll en "Cómo funciona" (usa `onScroll` con
  `sync: true`, así se recalcula sola sin importar desde dónde entra el
  usuario). El resto son transiciones CSS estándar en hovers/CTAs. Todo
  respeta `prefers-reduced-motion` (desactivado globalmente en
  `globals.css`), y toda animación de entrada usa el patrón "visible por
  default, JS oculta-y-revela antes del primer paint" — ver la sección
  siguiente.

## Una lección de esta implementación: reveal-on-scroll y accesibilidad

La primera versión de las secciones de marketing usaba un patrón común de
"aparecer al hacer scroll" (`IntersectionObserver` + opacidad 0→1). Se sacó
deliberadamente: si un visitante navega con los links del menú (anclas tipo
`#demo`), el salto es instantáneo y el navegador no siempre renderiza los
frames intermedios — el observer nunca ve la sección "entrar" en el
viewport y el contenido queda con opacidad 0 para siempre, incluso para
gente sin JS o con conexión lenta, donde nunca llega a valer 1. Se
reemplazó por contenido siempre visible; el motion se reservó para los
lugares donde no hay este riesgo (arriba del fold, o animaciones que se
recalculan en base al scroll real en vez de "dispararse una vez").

## WhatsApp-first

`lib/whatsapp.ts` genera siempre el mismo tipo de mensaje contextual
(`Hola! Te escribo por {producto} del catálogo de {negocio}...`) a partir de
datos del tenant/producto — nunca texto ni número hardcodeado de un negocio
específico dentro de un componente compartido. El número de WhatsApp de
**Aura Catálogos** (la plataforma, para pedir un catálogo) vive aparte en
`lib/aura-brand.ts`, separado a propósito de los tenants.

## SEO / metadata / identidad técnica

- `app/layout.tsx`: metadata completa (title template, description, OG,
  Twitter card), sin defaults de Vercel/Next.
- `app/icon.tsx` / `app/apple-icon.tsx`: favicon generado (marca "A" sobre
  tinta + acento), no el ícono genérico de Next.
- `app/opengraph-image.tsx`: social preview de la plataforma.
- `app/catalogo/[slug]/opengraph-image.tsx`: social preview **por tenant**,
  con sus propios colores — cuando alguien comparte el link de su catálogo,
  la preview ya tiene su identidad, no la de Aura.
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`: generados a partir
  del registro de tenants, no hardcodeados.

## Roadmap (fuera de alcance de este paso — decisiones de infraestructura)

Estos puntos requieren elegir proveedor/costo, por eso quedan documentados
en vez de implementados a ciegas:

1. **Persistencia real**: reemplazar `lib/tenants/index.ts` por una consulta
   a base de datos (Postgres/Supabase, o el que se decida) keyed por slug o
   subdominio. El resto del código no cambia.
2. **Auth + dashboard** (`/app/dashboard`, `/app/products`, `/app/branding`,
   etc.): panel para que cada negocio edite su propio `Tenant` sin tocar
   código — requiere proveedor de auth (Clerk/Auth.js/Supabase Auth).
3. **Carga de imágenes reales** de producto (reemplaza `ProductArt`).
4. **Mercado Pago** por producto (el copy y el plan ya lo anuncian como
   opcional; falta la integración real de cobro).
5. **Analytics** (visitas, clics a WhatsApp, productos más vistos) — hoy no
   hay backend que loguee eventos; el dashboard lo va a necesitar.
6. **Planes / billing real** si Aura Catálogos cobra de forma recurrente.
