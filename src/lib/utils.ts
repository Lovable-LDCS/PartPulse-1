/**
 * Get the correct asset path with basePath prefix for production builds
 * In development, returns the path as-is
 * In production (GitHub Pages), prepends /PartPulse-1
 */
export function getAssetPath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/PartPulse-1' : '';
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}
