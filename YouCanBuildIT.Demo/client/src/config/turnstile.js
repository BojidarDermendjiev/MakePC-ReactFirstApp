/**
 * Cloudflare Turnstile configuration
 *
 * For development, you can use the test site key which always passes:
 * Site Key: 1x00000000000000000000AA (always passes)
 * Site Key: 2x00000000000000000000AB (always blocks)
 * Site Key: 3x00000000000000000000FF (forces interactive challenge)
 *
 * For production, get your keys from Cloudflare Dashboard > Turnstile
 */

// Use environment variable if available, otherwise use test key for development
export const TURNSTILE_SITE_KEY =
  import.meta.env.VITE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

// Turnstile widget appearance
export const TURNSTILE_THEME = "light"; // 'light', 'dark', or 'auto'
export const TURNSTILE_SIZE = "normal"; // 'normal' or 'compact'
