/**
 * Shared utility functions used across Plottale pages
 */

/** Format a large number to compact form (e.g. 1240 → "1.2K") */
export function formatCount(n: number): string {
  if (n >= 1_000_000)
    return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}
