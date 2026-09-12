import type { Product, Tenant } from "./types";
import { formatPrice } from "./format";

function cleanNumber(raw: string): string {
  return raw.replace(/[^0-9]/g, "");
}

export function buildWhatsAppUrl(whatsapp: string, message: string): string {
  return `https://wa.me/${cleanNumber(whatsapp)}?text=${encodeURIComponent(message)}`;
}

export function buildProductInquiryUrl(tenant: Tenant, product: Product): string {
  const message = `Hola! Te escribo por ${product.name} (${product.subtitle}) del catálogo de ${tenant.name}, ¿tenés disponible?`;
  return buildWhatsAppUrl(tenant.whatsapp, message);
}

export function buildCatalogRequestUrl(tenant: Tenant): string {
  const message = `Hola! Vi el catálogo de ${tenant.name} hecho con Aura Catálogos y quiero uno para mi negocio.`;
  return buildWhatsAppUrl(tenant.whatsapp, message);
}

export function buildQuoteRequestUrl(product: Product, tenant: Tenant): string {
  const message = `Hola! Quiero consultar por ${product.name} — vi que está en ${formatPrice(product.price, tenant)}.`;
  return buildWhatsAppUrl(tenant.whatsapp, message);
}
