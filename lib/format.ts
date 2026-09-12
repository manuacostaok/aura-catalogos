import type { Tenant } from "./types";

export function formatPrice(amount: number, tenant: Pick<Tenant, "currency" | "locale">): string {
  return new Intl.NumberFormat(tenant.locale, {
    style: "currency",
    currency: tenant.currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
