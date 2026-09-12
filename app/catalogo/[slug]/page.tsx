import { notFound } from "next/navigation";
import { CatalogExplorer } from "@/components/catalog/CatalogExplorer";
import { CatalogFooter, CatalogHeader, CatalogHero } from "@/components/catalog/CatalogChrome";
import { getTenant } from "@/lib/tenants";

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tenant = getTenant(slug);
  if (!tenant) notFound();

  return (
    <>
      <CatalogHeader tenant={tenant} />
      <CatalogHero tenant={tenant} />
      <main className="mx-auto w-full max-w-6xl px-6">
        <CatalogExplorer tenant={tenant} />
      </main>
      <CatalogFooter tenant={tenant} />
    </>
  );
}
