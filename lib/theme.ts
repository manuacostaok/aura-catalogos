import type { CSSProperties } from "react";
import type { ThemeTokens } from "./types";

/**
 * Turns a tenant's design tokens into inline CSS custom properties. This is
 * the whole theming engine: no per-tenant code, no per-tenant CSS file —
 * any business gets its own identity by changing these values.
 */
export function tenantThemeStyle(theme: ThemeTokens): CSSProperties {
  return {
    "--tc-bg": theme.bg,
    "--tc-bg-alt": theme.bgAlt,
    "--tc-surface": theme.surface,
    "--tc-surface-alt": theme.surfaceAlt,
    "--tc-text": theme.text,
    "--tc-text-muted": theme.textMuted,
    "--tc-border": theme.border,
    "--tc-accent": theme.accent,
    "--tc-accent-strong": theme.accentStrong,
    "--tc-accent-ink": theme.accentInk,
    "--tc-success": theme.success,
    "--tc-success-ink": theme.successInk,
    "--tc-radius": theme.radius,
  } as CSSProperties;
}
