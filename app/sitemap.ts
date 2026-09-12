import type { MetadataRoute } from "next";
import { getAllTenants } from "@/lib/tenants";

const baseUrl = "https://aura-catalogos-site.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const tenantRoutes = getAllTenants().flatMap((tenant) => [
    { url: `${baseUrl}/catalogo/${tenant.slug}`, lastModified: new Date() },
    ...tenant.products.map((product) => ({
      url: `${baseUrl}/catalogo/${tenant.slug}/${product.id}`,
      lastModified: new Date(),
    })),
  ]);

  return [{ url: baseUrl, lastModified: new Date(), priority: 1 }, ...tenantRoutes];
}
