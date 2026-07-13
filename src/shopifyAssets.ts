// Resolves a local asset path to a Shopify CDN URL when the app runs embedded in
// the Shopify theme (which sets window.MJ_ASSETS). Falls back to the original
// path everywhere else (Vercel / local dev), so this is a no-op outside Shopify.
declare global {
  interface Window {
    MJ_ASSETS?: Record<string, string>
  }
}

export const asset = (path: string): string => {
  if (typeof window !== 'undefined' && window.MJ_ASSETS && window.MJ_ASSETS[path]) {
    return window.MJ_ASSETS[path]
  }
  return path
}
