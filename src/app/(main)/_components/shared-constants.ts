/**
 * Shared constants used across Plottale pages
 * Extracted to avoid duplication between home, novels, feed, etc.
 */

export const GLASS_STYLE: React.CSSProperties = {
  borderRadius: "var(--glass-radius-lg)",
  background: "var(--glass-bg)",
  backdropFilter: "blur(var(--glass-blur)) saturate(var(--glass-saturation))",
  WebkitBackdropFilter:
    "blur(var(--glass-blur)) saturate(var(--glass-saturation))",
  border: "1px solid var(--glass-border)",
  boxShadow: "var(--glass-shadow)",
};

export const THAI_HEADER_FONT =
  "var(--font-ibm-plex-thai), var(--font-jakarta), system-ui, sans-serif";

export const THAI_HEADER_STYLE = {
  fontFamily: THAI_HEADER_FONT,
  lineHeight: 1.35,
} as const;
