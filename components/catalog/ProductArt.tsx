import { hashSeed } from "@/lib/hash";
import type { ThemeTokens } from "@/lib/types";

/**
 * Generated placeholder artwork for products without real photography.
 * Deterministic per artSeed so a product always renders the same piece —
 * swap for a real <img> the moment a tenant uploads photos.
 */
export function ProductArt({
  seed,
  theme,
}: {
  seed: string;
  theme: ThemeTokens;
}) {
  const h = hashSeed(seed);
  const angle = h % 360;
  const cx = 24 + (h % 52);
  const cy = 22 + ((h >> 3) % 40);
  const r1 = 26 + ((h >> 5) % 20);
  const cx2 = 10 + ((h >> 7) % 70);
  const cy2 = 55 + ((h >> 9) % 35);
  const r2 = 16 + ((h >> 11) % 16);
  const rotate = (h >> 13) % 180;

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`grad-${seed}`} gradientTransform={`rotate(${angle})`}>
          <stop offset="0%" stopColor={theme.accentStrong} />
          <stop offset="100%" stopColor={theme.surfaceAlt} />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#grad-${seed})`} />
      <circle cx={cx} cy={cy} r={r1} fill={theme.accent} opacity="0.35" />
      <circle cx={cx2} cy={cy2} r={r2} fill={theme.text} opacity="0.08" />
      <g transform={`rotate(${rotate} 50 50)`} opacity="0.5">
        <line x1="10" y1="50" x2="90" y2="50" stroke={theme.text} strokeOpacity="0.14" strokeWidth="1" />
        <line x1="50" y1="10" x2="50" y2="90" stroke={theme.text} strokeOpacity="0.14" strokeWidth="1" />
      </g>
    </svg>
  );
}
