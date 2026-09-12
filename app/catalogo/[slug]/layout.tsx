import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTenant, getTenantSlugs } from "@/lib/tenants";
import { tenantThemeStyle } from "@/lib/theme";

export function generateStaticParams() {
  return getTenantSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tenant = getTenant(slug);
  if (!tenant) return {};

  return {
    title: `${tenant.name} — catálogo`,
    description: tenant.hero.description,
    openGraph: {
      title: `${tenant.name} — catálogo`,
      description: tenant.hero.description,
      images: [`/catalogo/${tenant.slug}/opengraph-image`],
    },
  };
}

export default async function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tenant = getTenant(slug);
  if (!tenant) notFound();

  return (
    <div
      data-font-preset={tenant.theme.fontPreset}
      style={{
        ...tenantThemeStyle(tenant.theme),
        background: "var(--tc-bg)",
        color: "var(--tc-text)",
        fontFamily: "var(--tf-body)",
      }}
      className="flex min-h-screen flex-col"
    >
      {children}
    </div>
  );
}
