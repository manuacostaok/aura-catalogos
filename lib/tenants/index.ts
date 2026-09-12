import type { Tenant } from "../types";
import { semillaFranca } from "./semilla-franca";
import { veraStudio } from "./vera-studio";

/**
 * Demo tenant registry. In production this comes from a database keyed by
 * slug/subdomain — see DESIGN.md "De demo a multi-tenant real" for the
 * migration path. Every page in app/catalogo/[slug] reads tenants only
 * through this module, so swapping the source later touches one file.
 */
const tenants: Tenant[] = [semillaFranca, veraStudio];

export function getTenant(slug: string): Tenant | undefined {
  return tenants.find((tenant) => tenant.slug === slug);
}

export function getAllTenants(): Tenant[] {
  return tenants;
}

export function getTenantSlugs(): string[] {
  return tenants.map((tenant) => tenant.slug);
}
